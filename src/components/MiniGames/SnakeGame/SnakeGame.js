import React, { useEffect, useRef, useState } from "react";
import "./SnakeGame.scss";

const SnakeGame = () => {
    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState(400);
    const [scale, setScale] = useState(20);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState({ x: 1, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    // Add a directional input queue to handle multiple inputs between game ticks
    const [directionQueue, setDirectionQueue] = useState([]);


    // Adjust canvas to mobile screen
    useEffect(() => {
        const screenWidth = window.innerWidth;
        const maxSize = 300; // ↓ from 400 to 300
        const adjusted = Math.min(screenWidth - 40, maxSize);
        const adjustedScale = Math.floor(adjusted / 25); // ↑ from 20 to 25 smaller blocks
        const actualSize = adjustedScale * 20;

        setCanvasSize(actualSize);
        setScale(adjustedScale);
    }, []);

    const rows = canvasSize / scale;
    const cols = canvasSize / scale;

    // Updated direction change function that adds directions to a queue
    const changeDirection = (newDir) => {
        // Get the last direction in the queue or the current direction
        const lastDir = directionQueue.length > 0
            ? directionQueue[directionQueue.length - 1]
            : direction;

        // Prevent 180-degree turns (moving directly back on yourself)
        if (
            (newDir.x === -lastDir.x && newDir.y === lastDir.y) ||
            (newDir.x === lastDir.x && newDir.y === -lastDir.y)
        ) {
            return;
        }

        // Only allow perpendicular movement (can't change both x and y at the same time)
        if ((newDir.x !== 0 && lastDir.x === 0) || (newDir.y !== 0 && lastDir.y === 0)) {
            // Add the new direction to the queue
            setDirectionQueue(prev => [...prev, newDir]);
        }
    };

    // Game loop
    useEffect(() => {
        const context = canvasRef.current.getContext("2d");

        const gameLoop = setInterval(() => {
            if (gameOver) return;

            // Process the next direction from the queue
            let currentDirection = direction;
            if (directionQueue.length > 0) {
                const nextDirection = directionQueue[0];
                setDirection(nextDirection);
                currentDirection = nextDirection;
                // Remove the processed direction from the queue
                setDirectionQueue(prev => prev.slice(1));
            }

            const newHead = {
                x: snake[0].x + currentDirection.x,
                y: snake[0].y + currentDirection.y,
            };

            if (
                newHead.x < 0 || newHead.x >= cols ||
                newHead.y < 0 || newHead.y >= rows ||
                snake.some(seg => seg.x === newHead.x && seg.y === newHead.y)
            ) {
                setGameOver(true);
                return;
            }

            const newSnake = [newHead, ...snake];

            if (newHead.x === food.x && newHead.y === food.y) {
                const newFood = {
                    x: Math.floor(Math.random() * cols),
                    y: Math.floor(Math.random() * rows),
                };
                setFood(newFood);
            } else {
                newSnake.pop();
            }

            setSnake(newSnake);
        }, 140);

        return () => clearInterval(gameLoop);
    }, [snake, direction, food, gameOver, directionQueue]);

    // Keyboard input
    useEffect(() => {
        const handleKey = (e) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }

            if (!gameOver) {
                switch (e.key) {
                    case "ArrowUp": changeDirection({ x: 0, y: -1 }); break;
                    case "ArrowDown": changeDirection({ x: 0, y: 1 }); break;
                    case "ArrowLeft": changeDirection({ x: -1, y: 0 }); break;
                    case "ArrowRight": changeDirection({ x: 1, y: 0 }); break;
                }
            }
        };

        window.addEventListener("keydown", handleKey, { passive: false });
        return () => window.removeEventListener("keydown", handleKey);
    }, [directionQueue, gameOver]);

    // Draw on canvas
    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        context.clearRect(0, 0, canvasSize, canvasSize);

        context.fillStyle = "red";
        context.fillRect(food.x * scale, food.y * scale, scale, scale);

        context.fillStyle = "lime";
        snake.forEach(seg => {
            context.fillRect(seg.x * scale, seg.y * scale, scale, scale);
        });
    }, [snake, food, scale]);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) });
        setDirection({ x: 1, y: 0 });
        setDirectionQueue([]);
        setGameOver(false);
    };

    return (
        <div className="snake-container">
            <canvas
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
                style={{ touchAction: "none" }}
            />

            {gameOver && (
                <div className="game-overlay">
                    <div className="game-over-text">GAME OVER</div>
                    <button className="replay-button" onClick={resetGame}>
                        REPLAY
                    </button>
                </div>
            )}

            {/* Keypad placed below */}
            <div className="mobile-keypad t-layout">
                <div className="row up-row">
                    <button onClick={() => changeDirection({ x: 0, y: -1 })}>↑</button>
                </div>
                <div className="row side-row">
                    <button onClick={() => changeDirection({ x: -1, y: 0 })}>←</button>
                    <button onClick={() => changeDirection({ x: 0, y: 1 })}>↓</button>
                    <button onClick={() => changeDirection({ x: 1, y: 0 })}>→</button>
                </div>
            </div>
        </div>
    );
};

export default SnakeGame;