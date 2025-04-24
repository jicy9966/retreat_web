import { useState } from 'react';
import game_stations from '../../config/game_stations';
import { useNavigate } from 'react-router-dom';
import './RecreationPage.scss';

const RecreationPage = () => {
    const navigate = useNavigate();
    const [selectedStation, setSelectedStation] = useState(null);

    const handleStationSelect = (stationId) => {
        setSelectedStation(prev => {
            const newSelection = stationId === prev ? null : stationId;
            if (stationId !== prev) {
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 0);
            }
            return newSelection;
        });
    };

    return (
        <div className='window'>
            <div className="title-bar">
                <div className="title-bar-text">레크레이션.bat - 지락실</div>
                <div className="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button onClick={() => navigate("/home")}>×</button>
                </div>
            </div>
            <div className='window-content'>
                <div className="retro-container">
                    <div className="retro-window">
                        <div className="retro-content">
                            <h1 className="game-manual-title">수양회 지락실 활동 메뉴얼!</h1>
                            <div className="game-manual-subtitle">환영합니다!</div>

                            <div className="game-catalog">
                                {selectedStation === null ? (
                                    // Game station grid view
                                    <div className="game-grid">
                                        {game_stations.map((station) => (
                                            <div
                                                key={station.id}
                                                className="game-card"
                                                onClick={() => handleStationSelect(station.id)}
                                            >
                                                <div className="game-card-image">
                                                    <img
                                                        src={`/assets/station${station.id}.png`}
                                                        alt={station.name}
                                                        onError={(e) => {
                                                            e.target.onError = null;
                                                            e.target.src = "/images/games/placeholder.png";
                                                        }}
                                                    />
                                                </div>
                                                <div className="game-card-title">{station.name}</div>
                                                <div className="game-card-location">{station.location}</div>
                                                <div className="game-card-footer">
                                                    <span className="blinking-cursor">{'>'}</span> CLICK TO VIEW
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    // Game detail view
                                    <div className="game-detail">
                                        {(() => {
                                            const station = game_stations.find(s => s.id === selectedStation);
                                            return (
                                                <>
                                                    <div className="game-detail-header">
                                                        <button
                                                            className="back-button"
                                                            onClick={() => setSelectedStation(null)}
                                                        >
                                                            {'<< BACK'}
                                                        </button>
                                                        <h2 className="game-detail-title">{station.stagename}</h2>
                                                    </div>

                                                    <div className="game-detail-content">
                                                        <div className="game-detail-image">
                                                            <img
                                                                src={`/assets/station${station.id}.png`}
                                                                alt={station.name}
                                                                onError={(e) => {
                                                                    e.target.onError = null;
                                                                    e.target.src = "/images/games/placeholder.png";
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="game-rules">
                                                            <div className="game-rules-header">
                                                                <span className="pixelated-icon">📜</span> GAME RULES:
                                                            </div>
                                                            <div className="game-rules-content">
                                                                <ol className="rules-list">
                                                                    {station.rules.map((rule, index) => (
                                                                        <li key={index} className="rule-item">
                                                                            <span className="rule-number">{index + 1}.</span>
                                                                            <span className="rule-text">{rule}</span>
                                                                        </li>
                                                                    ))}
                                                                </ol>
                                                            </div>
                                                            <div className="game-info-box">
                                                                <div className="game-info-item">
                                                                    <span className="game-info-label">LOCATION:</span>
                                                                    <span className="game-info-value">{station.location}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>

                            <div className="system-status">
                                <div className="scanline"></div>
                                <div className="status-bar">
                                    <span>SYSTEM: ONLINE</span>
                                    <span className="blinking-status">GAMES LOADED: {game_stations.length}</span>
                                    <span className="hide-on-mobile">HAVE FUN!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecreationPage;