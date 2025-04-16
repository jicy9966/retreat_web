import { useState } from 'react';
import './GoldenBellPage.scss';
import { topics, questions } from '../../config/questions';

const GoldenBellPage = () => {
    const [teams, setTeams] = useState([
        { name: "Team 1", score: 0 },
        { name: "Team 2", score: 0 },
        { name: "Team 3", score: 0 },
        { name: "Team 4", score: 0 },
        { name: "Team 5", score: 0 },
        { name: "Team 6", score: 0 },
        { name: "Team 7", score: 0 }
    ]);

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [revealedCells, setRevealedCells] = useState({});
    const [showAnswer, setShowAnswer] = useState(false);
    const [editingTeamIndex, setEditingTeamIndex] = useState(null);
    const [editingTeamName, setEditingTeamName] = useState("");
    const [activeTeam, setActiveTeam] = useState(null);

    const handleCellClick = (topic) => {
        if (revealedCells[topic]) return;
        setSelectedQuestion({ topic, question: questions[topic] });
        setShowAnswer(false);
    };

    const handleAwardPoints = (teamIndex) => {
        const updatedTeams = [...teams];
        updatedTeams[teamIndex].score += 10;
        setTeams(updatedTeams);
        setActiveTeam(teamIndex);

        // Close the question popup and mark the cell as revealed
        if (selectedQuestion) {
            setRevealedCells({ ...revealedCells, [selectedQuestion.topic]: true });
            setSelectedQuestion(null);
            setShowAnswer(false);
        }

        setTimeout(() => setActiveTeam(null), 1500);
    };

    const handleCloseQuestion = () => {
        if (selectedQuestion) {
            setRevealedCells({ ...revealedCells, [selectedQuestion.topic]: true });
            setSelectedQuestion(null);
            setShowAnswer(false);
        }
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

    // Create rows for the game board (6×6 grid)
    const rows = [];
    for (let i = 0; i < 6; i++) rows.push(topics.slice(i * 6, (i + 1) * 6));

    return (
        <div className="golden-bell-page">
            <header className="game-header">
                <div className="team-board">
                    {teams.map((team, index) => (
                        <div key={index} className={`team-panel ${activeTeam === index ? 'active' : ''}`}>
                            {editingTeamIndex === index ? (
                                <div className="edit-panel">
                                    <input
                                        type="text"
                                        value={editingTeamName}
                                        onChange={(e) => setEditingTeamName(e.target.value)}
                                    />
                                    <button onClick={handleSaveTeamName}>✓</button>
                                </div>
                            ) : (
                                <div className="team-info">
                                    <div className="team-name" onClick={() => handleEditTeamName(index)}>
                                        {team.name}
                                    </div>
                                    <div className="team-score">
                                        {team.score}
                                    </div>
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
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`question-cell ${isRevealed ? 'revealed' : ''}`}
                                onClick={() => !isRevealed && handleCellClick(topic)}
                            >
                                {!isRevealed ? topic : ''}
                            </div>
                        );
                    })
                )}
            </div>

            {selectedQuestion && (
                <div className="question-modal">
                    <div className="modal-box">
                        <h2 className="modal-topic">{selectedQuestion.topic}</h2>
                        <div className="question-display">
                            <p>{showAnswer ? selectedQuestion.question.answer : selectedQuestion.question.question}</p>
                        </div>
                        {!showAnswer ? (
                            <button className="primary-btn" onClick={() => setShowAnswer(true)}>
                                Show Answer
                            </button>
                        ) : (
                            <>
                                <h3>Award Points to First Correct Team:</h3>
                                <div className="award-grid">
                                    {teams.map((team, index) => (
                                        <button key={index} onClick={() => handleAwardPoints(index)} className="award-btn">
                                            {team.name}
                                        </button>
                                    ))}
                                </div>
                                <button className="secondary-btn" onClick={handleCloseQuestion}>
                                    Close Question
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoldenBellPage;