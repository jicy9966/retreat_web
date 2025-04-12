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

    // Adjust canvas to mobile screen
    useEffect(() => {
        const screenWidth = window.innerWidth;
        const maxSize = 400;
        const adjusted = Math.min(screenWidth - 40, maxSize);
        const adjustedScale = Math.floor(adjusted / 20); // aim for 20x20 grid
        const actualSize = adjustedScale * 20;

        setCanvasSize(actualSize);
        setScale(adjustedScale);
    }, []);

    const rows = canvasSize / scale;
    const cols = canvasSize / scale;

    const changeDirection = (newDir) => {
        if ((newDir.x !== 0 && direction.x === 0) || (newDir.y !== 0 && direction.y === 0)) {
            setDirection(newDir);
        }
    };

    // Game loop
    useEffect(() => {
        const context = canvasRef.current.getContext("2d");

        const gameLoop = setInterval(() => {
            if (gameOver) return;

            const newHead = {
                x: snake[0].x + direction.x,
                y: snake[0].y + direction.y,
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
        }, 120); // slowed to 150ms

        return () => clearInterval(gameLoop);
    }, [snake, direction, food, gameOver]);

    // Keyboard input
    useEffect(() => {
        const handleKey = (e) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }

            switch (e.key) {
                case "ArrowUp": changeDirection({ x: 0, y: -1 }); break;
                case "ArrowDown": changeDirection({ x: 0, y: 1 }); break;
                case "ArrowLeft": changeDirection({ x: -1, y: 0 }); break;
                case "ArrowRight": changeDirection({ x: 1, y: 0 }); break;
            }
        };

        window.addEventListener("keydown", handleKey, { passive: false });
        return () => window.removeEventListener("keydown", handleKey);
    }, [direction]);

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

    return (
        <div className="snake-container">
            <canvas
                ref={canvasRef}
                width={canvasSize}
                height={canvasSize}
                style={{ touchAction: "none" }}
            />
            {gameOver && <div className="game-over">GAME OVER</div>}

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
