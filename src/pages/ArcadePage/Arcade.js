import React, { useState } from "react";
import "./Arcade.scss";
import { useNavigate } from "react-router-dom";
import { SnakeGame, BreakoutGame } from "../../components/MiniGames/games";

const ArcadePage = () => {
    const navigate = useNavigate();
    const [activeGame, setActiveGame] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showGame, setShowGame] = useState(false);

    const games = [
        { id: "snake", name: "Snake", icon: "🐍" },
        { id: "breakout", name: "Breakout", icon: "🧱" },
        { id: "tetris", name: "Tetris", icon: "🧩" },
        { id: "pong", name: "Pong", icon: "🏓" },
        { id: "pacman", name: "Pac-Man", icon: "👾" },
        { id: "space", name: "Space Invaders", icon: "👽" }
    ];

    const selectGame = (gameId) => {
        setActiveGame(gameId);
        setShowConfirmation(true);
    };

    const startGame = () => {
        setShowConfirmation(false);
        setShowGame(true);
    };

    const cancelGame = () => {
        setShowConfirmation(false);
        setActiveGame(null);
    };

    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">미니게임.exe</div>
                <div className="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button onClick={() => {
                        setShowGame(false);
                        setActiveGame(null);
                        setShowConfirmation(false);
                        navigate("/home");
                    }}>×</button>
                </div>
            </div>
            <div className="arcade-screen">
                <div className="arcade-monitor">
                    <div className="arcade-display">
                        <div className="status-bar">
                            <div className="hi-score">HI-SCORE<br />123000</div>
                            <div className="lives">
                                <span className="heart">♥</span>
                                <span className="heart">♥</span>
                                <span className="heart">♥</span>
                            </div>
                        </div>

                        {showGame ? (
                            <>
                                <div className="back-button-wrapper">
                                    <button className="back-button" onClick={() => {
                                        setShowGame(false);
                                        setActiveGame(null);
                                    }}>
                                        Back to Games
                                    </button>
                                </div>
                                {activeGame === "snake" && <SnakeGame />}
                                {activeGame === "breakout" && <BreakoutGame />}
                                {(activeGame !== "snake" && activeGame !== "breakout") && <div>Game not implemented</div>}

                            </>
                        ) : showConfirmation ? (

                            <div className="confirmation-screen">
                                <h1 className="game-title-text">
                                    {activeGame && games.find(g => g.id === activeGame).name.toUpperCase()}
                                </h1>
                                <p className="ready-text">ARE YOU READY?</p>
                                <div className="choice-buttons">
                                    <button className="yes-button" onClick={startGame}>
                                        YES
                                    </button>
                                    <button className="no-button" onClick={cancelGame}>
                                        NO
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="arcade-title">
                                    <h1 className="pixel-text">MINI GAMES</h1>
                                </div>
                                <div className="game-grid">
                                    {games.map((game) => (
                                        <div
                                            className="game-icon-wrapper"
                                            key={game.id}
                                            onClick={() => selectGame(game.id)}
                                        >
                                            <div className="game-icon-box">
                                                <span className="game-emoji">{game.icon}</span>
                                            </div>
                                            <span className="game-name">{game.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        <div className="scan-lines"></div>
                        <div className="monitor-glare"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArcadePage;
