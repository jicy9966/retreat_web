// Updated GoldenBellPage.js with multi-team award and image support + instant score award on click
import { useState, useEffect, useRef } from 'react';
import './GoldenBellPage.scss';
import { topics, questions } from '../../config/questions';

const GoldenBellPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [passcodeError, setPasscodeError] = useState('');
    const correctPasscode = 'golden123';

    const [teams, setTeams] = useState([
        { name: "1조", score: 0 },
        { name: "2조", score: 0 },
        { name: "3조", score: 0 },
        { name: "4조", score: 0 },
        { name: "5조", score: 0 },
        { name: "6조", score: 0 },
        { name: "7조", score: 0 }
    ]);

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [revealedCells, setRevealedCells] = useState({});
    const [showAnswer, setShowAnswer] = useState(false);
    const [editingTeamIndex, setEditingTeamIndex] = useState(null);
    const [editingTeamName, setEditingTeamName] = useState("");
    const [activeTeam, setActiveTeam] = useState(null);
    const [awardedTeams, setAwardedTeams] = useState([]);

    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedTeamIndex, setSelectedTeamIndex] = useState(null);
    const spinTimeout = useRef(null);
    const spinDuration = 3000;

    const handlePasscodeChange = (e) => {
        setPasscode(e.target.value);
        setPasscodeError('');
    };

    const handlePasscodeSubmit = (e) => {
        e.preventDefault();
        if (passcode === correctPasscode) {
            setIsAuthenticated(true);
            localStorage.setItem('goldenBellAuth', 'true');
        } else {
            setPasscodeError('Incorrect passcode. Please try again.');
            setPasscode('');
        }
    };

    useEffect(() => {
        const authStatus = localStorage.getItem('goldenBellAuth');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleCellClick = (topic) => {
        if (revealedCells[topic]) return;
        setSelectedQuestion({ topic, question: questions[topic] });
        setShowAnswer(false);
        setAwardedTeams([]);
    };

    const handleAwardPointsInstant = (index) => {
        if (awardedTeams.includes(index)) return;
        const updatedTeams = [...teams];
        updatedTeams[index].score += 10;
        setTeams(updatedTeams);
        setAwardedTeams(prev => [...prev, index]);
    };

    const handleCloseQuestion = () => {
        if (selectedQuestion) {
            setRevealedCells({ ...revealedCells, [selectedQuestion.topic]: true });
            setSelectedQuestion(null);
            setShowAnswer(false);
        }
        setAwardedTeams([]);
    };

    const handleEditTeamName = (index) => {
        setEditingTeamIndex(index);
        setEditingTeamName(teams[index].name);
    };

    const handleSaveTeamName = () => {
        if (editingTeamIndex !== null) {
            const updatedTeams = [...teams];
            updatedTeams[editingTeamIndex].name = editingTeamName;
            setTeams(updatedTeams);
            setEditingTeamIndex(null);
            setEditingTeamName("");
        }
    };

    const rows = [];
    for (let i = 0; i < 7; i++) rows.push(topics.slice(i * 7, (i + 1) * 7));

    const spinRoulette = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setSelectedTeamIndex(null);

        if (spinTimeout.current) clearTimeout(spinTimeout.current);

        const spinInterval = setInterval(() => {
            setSelectedTeamIndex(Math.floor(Math.random() * teams.length));
        }, 100);

        spinTimeout.current = setTimeout(() => {
            clearInterval(spinInterval);
            const finalTeamIndex = Math.floor(Math.random() * teams.length);
            setSelectedTeamIndex(finalTeamIndex);
            setIsSpinning(false);
        }, spinDuration);
    };

    useEffect(() => {
        return () => {
            if (spinTimeout.current) clearTimeout(spinTimeout.current);
        };
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="golden-bell-page">
                <div className="passcode-container">
                    <div className="passcode-modal">
                        <h2>청1 수양회 골든벨</h2>
                        <p>게임 입장을 위해 패스워드를 입력해주세요.</p>
                        <form onSubmit={handlePasscodeSubmit}>
                            <div className="input-group">
                                <input type="password" value={passcode} onChange={handlePasscodeChange} placeholder="Enter passcode" autoFocus />
                            </div>
                            {passcodeError && <div className="error-message">{passcodeError}</div>}
                            <button type="submit" className="passcode-submit-btn">Enter Game</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="golden-bell-page">
            <div className="game-layout">
                <div className="main-content">
                    <header className="game-header">
                        <div className="team-board">
                            {teams.map((team, index) => (
                                <div key={index} className={`team-panel ${activeTeam === index ? 'active' : ''} ${selectedTeamIndex === index ? 'selected' : ''}`}>
                                    {editingTeamIndex === index ? (
                                        <div className="edit-panel">
                                            <input type="text" value={editingTeamName} onChange={(e) => setEditingTeamName(e.target.value)} />
                                            <button onClick={handleSaveTeamName}>✓</button>
                                        </div>
                                    ) : (
                                        <div className="team-info">
                                            <div className="team-name" onClick={() => handleEditTeamName(index)}>{team.name}</div>
                                            <div className="team-score">{team.score}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </header>
                    <div className="game-board">
                        {rows.map((row, rowIndex) =>
                            row.map((topic, colIndex) => {
                                const isRevealed = revealedCells[topic];
                                return (
                                    <div key={`${rowIndex}-${colIndex}`} className={`question-cell ${isRevealed ? 'revealed' : ''}`} onClick={() => !isRevealed && handleCellClick(topic)}>
                                        {!isRevealed ? topic : ''}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
                <div className="roulette-sidebar">
                    <div className="roulette-container">
                        <h2 className="roulette-title">~ 돌림판 ~</h2>
                        <div className="roulette-wheel">
                            {teams.map((team, index) => (
                                <div key={index} className={`roulette-team ${selectedTeamIndex === index ? 'selected' : ''}`}>{team.name}</div>
                            ))}
                        </div>
                        <div className="roulette-result">
                            {selectedTeamIndex !== null && !isSpinning && (
                                <div className="winner-display"><span>{teams[selectedTeamIndex].name}!</span></div>
                            )}
                        </div>
                        <button className="spin-button" onClick={spinRoulette} disabled={isSpinning}>
                            {isSpinning ? '돌리는 중...' : '돌려돌려 돌림판~'}
                        </button>
                    </div>
                </div>
            </div>
            {selectedQuestion && (
                <div className="question-modal">
                    <div className="modal-box">
                        <h2 className="modal-topic">{selectedQuestion.topic}</h2>
                        <div className="question-display">
                            {!showAnswer && selectedQuestion.question.image && (
                                <img
                                    src={selectedQuestion.question.image}
                                    alt="Question"
                                    className="question-image"
                                />
                            )}
                            <p className="question-text">
                                {showAnswer
                                    ? selectedQuestion.question.answer
                                    : selectedQuestion.question.question}
                            </p>
                        </div>
                        {!showAnswer ? (
                            <button className="primary-btn" onClick={() => setShowAnswer(true)}>정답보기</button>
                        ) : (
                            <>
                                <div className="award-grid">
                                    {teams.map((team, index) => (
                                        <button
                                            key={index}
                                            className={`award-btn ${awardedTeams.includes(index) ? 'awarded' : ''}`}
                                            onClick={() => handleAwardPointsInstant(index)}
                                        >
                                            {team.name}
                                        </button>
                                    ))}
                                </div>
                                <button className="secondary-btn" onClick={handleCloseQuestion}>정답 창 닫기</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoldenBellPage;
