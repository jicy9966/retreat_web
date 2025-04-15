import React, { useEffect, useRef, useState } from "react";
import "./Invaders.scss";

const Invaders = () => {
    const canvasRef = useRef(null);
    const moveDir = useRef(null);
    const bullets = useRef([]);
    const aliens = useRef([]);
    const playerRef = useRef(null);
    const alienSpeed = useRef(0.5);
    const gameOver = useRef(false);
    const loopRef = useRef(null);
    const shootIntervalRef = useRef(null);

    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const canvasWidth = 200;
    const canvasHeight = 300;

    const initPlayer = () => ({
        x: canvasWidth / 2 - 20,
        y: canvasHeight - 25,
        width: 40,
        height: 15,
        speed: 3,
    });

    const spawnAlienRow = () => {
        const alienCount = 6;
        const alienSpacing = 28;
        const startX = 10;
        for (let i = 0; i < alienCount; i++) {
            aliens.current.push({
                x: startX + i * alienSpacing,
                y: 10,
                width: 20,
                height: 16,
                speedY: alienSpeed.current,
                alive: true
            });
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const player = playerRef.current;

        // Player
        ctx.fillStyle = "lime";
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Bullets
        ctx.fillStyle = "white";
        bullets.current.forEach(bullet => {
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });

        // Aliens
        ctx.fillStyle = "red";
        aliens.current.forEach(alien => {
            if (alien.alive) {
                ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
            }
        });

        // Game Over
        if (gameOver.current) {
            ctx.fillStyle = "yellow";
            ctx.font = "bold 24px monospace";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        }
    };

    const resetGame = () => {
        stopGameLoop();
        gameOver.current = false;
        setIsGameOver(false);
        setScore(0); // reset score
        aliens.current = [];
        bullets.current = [];
        alienSpeed.current = 0.2;
        playerRef.current = initPlayer();
        spawnAlienRow();
        clearCanvas();
        draw();
        startGameLoop();
    };

    const update = () => {
        if (gameOver.current) return;

        const player = playerRef.current;

        if (moveDir.current === "left") player.x -= player.speed;
        if (moveDir.current === "right") player.x += player.speed;
        player.x = Math.max(0, Math.min(canvasWidth - player.width, player.x));

        bullets.current.forEach(bullet => {
            bullet.y -= bullet.speed;
        });
        bullets.current = bullets.current.filter(bullet => bullet.y + bullet.height > 0);

        aliens.current.forEach(alien => {
            if (alien.alive) alien.y += alien.speedY;
        });

        bullets.current.forEach(bullet => {
            aliens.current.forEach(alien => {
                if (
                    alien.alive &&
                    bullet.x < alien.x + alien.width &&
                    bullet.x + bullet.width > alien.x &&
                    bullet.y < alien.y + alien.height &&
                    bullet.y + bullet.height > alien.y
                ) {
                    alien.alive = false;
                    bullet.y = -20;
                    setScore(prev => prev + 100); // +100 points
                }
            });
        });

        for (const alien of aliens.current) {
            if (!alien.alive) continue;

            const hitBottom = alien.y + alien.height >= canvasHeight;
            const hitPlayer =
                alien.x < player.x + player.width &&
                alien.x + alien.width > player.x &&
                alien.y < player.y + player.height &&
                alien.y + alien.height > player.y;

            if (hitBottom || hitPlayer) {
                gameOver.current = true;
                setIsGameOver(true);
                stopGameLoop();
                draw();
                return;
            }
        }

        if (aliens.current.length > 0 && aliens.current.every(a => !a.alive)) {
            alienSpeed.current += 0.05;
            aliens.current = [];
            spawnAlienRow();
        }
    };

    const gameLoop = () => {
        update();
        draw();
        if (!gameOver.current) {
            loopRef.current = requestAnimationFrame(gameLoop);
        }
    };

    const startGameLoop = () => {
        loopRef.current = requestAnimationFrame(gameLoop);
        shootIntervalRef.current = setInterval(() => {
            if (!gameOver.current && playerRef.current) {
                bullets.current.push({
                    x: playerRef.current.x + playerRef.current.width / 2 - 2,
                    y: playerRef.current.y,
                    width: 4,
                    height: 10,
                    speed: 5
                });
            }
        }, 400);
    };

    const stopGameLoop = () => {
        cancelAnimationFrame(loopRef.current);
        clearInterval(shootIntervalRef.current);
    };

    useEffect(() => {
        playerRef.current = initPlayer();
        spawnAlienRow();
        startGameLoop();

        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") moveDir.current = "left";
            if (e.key === "ArrowRight") moveDir.current = "right";
        };
        const handleKeyUp = (e) => {
            if (
                (e.key === "ArrowLeft" && moveDir.current === "left") ||
                (e.key === "ArrowRight" && moveDir.current === "right")
            ) {
                moveDir.current = null;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            stopGameLoop();
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <div className="space-invaders-container">
            <div className="score-display">Score: {score}</div>

            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight}></canvas>

            <div className="controls">
                <button
                    className="control-btn"
                    onTouchStart={() => moveDir.current = "left"}
                    onTouchEnd={() => moveDir.current = null}
                    onMouseDown={() => moveDir.current = "left"}
                    onMouseUp={() => moveDir.current = null}
                    onMouseLeave={() => moveDir.current = null}
                >
                    ⬅️
                </button>
                <button
                    className="control-btn"
                    onTouchStart={() => moveDir.current = "right"}
                    onTouchEnd={() => moveDir.current = null}
                    onMouseDown={() => moveDir.current = "right"}
                    onMouseUp={() => moveDir.current = null}
                    onMouseLeave={() => moveDir.current = null}
                >
                    ➡️
                </button>
            </div>

            {isGameOver && (
                <div className="game-over-ui">
                    <button className="restart-btn" onClick={resetGame}>
                        🔄 Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default Invaders;
