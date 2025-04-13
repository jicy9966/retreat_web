import "./Breakout.scss";
import React, { useRef, useEffect, useState } from "react";

const BreakoutGame = () => {
    const canvasRef = useRef(null);
    const leftPressedRef = useRef(false);
    const rightPressedRef = useRef(false);
    const gameLoopRef = useRef(null);
    const lastTimeRef = useRef(0);
    const bricksRef = useRef([]);
    const speedMultiplierRef = useRef(1); // starts at normal speed

    const xRef = useRef(0);
    const yRef = useRef(0);
    const dxRef = useRef(0);
    const dyRef = useRef(0);
    const ballRadiusRef = useRef(0);
    const paddleXRef = useRef(0);

    const [gameOver, setGameOver] = useState(false);
    const [gamePaused, setGamePaused] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameCleared, setGameCleared] = useState(false);

    // Function to reset the game state
    const resetGame = () => {
        // Reset all game states
        setGameOver(false);
        setGamePaused(false);
        setGameStarted(false);
        setGameCleared(false);

        // Reset speed multiplier
        speedMultiplierRef.current = 1;

        // The rest of the game values will be reset in initializeGame
        // when the game restarts due to gameStarted changing to false

        // After resetting states, we'll let the game be started again
        setGameStarted(true);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let paddleHeight = 0;
        let paddleWidth = 0;

        const brickRowCount = 3;
        const brickColumnCount = 5;
        let brickWidth = 0;
        let brickHeight = 0;
        let brickPadding = 0;
        let brickOffsetTop = 0;
        let brickOffsetLeft = 0;

        // Speed increase constants
        const BRICK_SPEED_INCREASE = 0.15;
        const PADDLE_SPEED_INCREASE = 0.13;
        const MAX_SPEED_MULTIPLIER = 3.0;

        // Randomness range for collision angles (in radians)
        const BRICK_ANGLE_RANDOMNESS = 0.3; // About ±17 degrees
        const PADDLE_ANGLE_RANDOMNESS = 0.2; // About ±11 degrees

        function initializeGame() {
            ballRadiusRef.current = canvas.width * 0.015;
            xRef.current = canvas.width / 2;
            yRef.current = canvas.height - 30;
            const baseSpeed = canvas.width * 0.004;
            dxRef.current = baseSpeed * speedMultiplierRef.current;
            dyRef.current = -baseSpeed * speedMultiplierRef.current;

            paddleHeight = canvas.height * 0.025;
            paddleWidth = canvas.width * 0.25;
            paddleXRef.current = (canvas.width - paddleWidth) / 2;

            brickWidth = canvas.width * 0.15;
            brickHeight = canvas.height * 0.04;
            brickPadding = canvas.width * 0.02;
            brickOffsetTop = canvas.height * 0.1;
            brickOffsetLeft = (canvas.width - ((brickWidth + brickPadding) * brickColumnCount - brickPadding)) / 2;

            const bricks = [];
            for (let c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (let r = 0; r < brickRowCount; r++) {
                    // Using className to reference the brick's color in SCSS
                    const brickClass = `brick-row-${r}`;

                    const brickX = brickOffsetLeft + c * (brickWidth + brickPadding);
                    const brickY = brickOffsetTop + r * (brickHeight + brickPadding);
                    bricks[c][r] = {
                        x: brickX,
                        y: brickY,
                        width: brickWidth,
                        height: brickHeight,
                        broken: false,
                        className: brickClass,
                        points: 10
                    };
                }
            }
            bricksRef.current = bricks;
        }

        const resizeCanvas = () => {
            const container = canvas.parentElement;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            initializeGame();
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Helper function to generate a random number within a range
        function getRandomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        // Helper function to apply a random angle change to the ball
        function applyRandomAngle(randomnessFactor) {
            // Get current velocity vector
            const speed = Math.sqrt(dxRef.current * dxRef.current + dyRef.current * dyRef.current);

            // Calculate current angle
            let angle = Math.atan2(dyRef.current, dxRef.current);

            // Apply random angle change within the randomness range
            angle += getRandomInRange(-randomnessFactor, randomnessFactor);

            // Set new velocity with same speed but new angle
            dxRef.current = Math.cos(angle) * speed;
            dyRef.current = Math.sin(angle) * speed;

            // Ensure vertical component doesn't get too small
            // This prevents ball from moving almost horizontally
            const minVerticalRatio = 0.2;
            if (Math.abs(dyRef.current) / speed < minVerticalRatio) {
                // Adjust angle to maintain minimum vertical component
                const signY = dyRef.current < 0 ? -1 : 1;
                dyRef.current = signY * speed * minVerticalRatio;

                // Recalculate horizontal component to maintain speed
                const newDxMagnitude = Math.sqrt(speed * speed - dyRef.current * dyRef.current);
                const signX = dxRef.current < 0 ? -1 : 1;
                dxRef.current = signX * newDxMagnitude;
            }
        }

        // Helper function to accelerate the ball
        function accelerateBall(speedIncrease) {
            // Increase speed multiplier, but cap it at maximum
            speedMultiplierRef.current = Math.min(
                speedMultiplierRef.current + speedIncrease,
                MAX_SPEED_MULTIPLIER
            );

            // Get current angle of movement
            const angle = Math.atan2(dyRef.current, dxRef.current);

            // Apply new speed while maintaining direction
            const newSpeed = canvas.width * 0.004 * speedMultiplierRef.current;
            dxRef.current = Math.cos(angle) * newSpeed;
            dyRef.current = Math.sin(angle) * newSpeed;
        }

        function detectBrickCollision() {
            for (let c = 0; c < bricksRef.current.length; c++) {
                for (let r = 0; r < bricksRef.current[c].length; r++) {
                    const brick = bricksRef.current[c][r];
                    if (!brick || brick.broken) continue;

                    const distX = Math.abs(xRef.current - (brick.x + brick.width / 2));
                    const distY = Math.abs(yRef.current - (brick.y + brick.height / 2));

                    const withinX = distX <= (brick.width / 2 + ballRadiusRef.current);
                    const withinY = distY <= (brick.height / 2 + ballRadiusRef.current);

                    if (withinX && withinY) {
                        const overlapX = (brick.width / 2 + ballRadiusRef.current) - distX;
                        const overlapY = (brick.height / 2 + ballRadiusRef.current) - distY;

                        if (overlapX < overlapY) {
                            dxRef.current = -dxRef.current;
                        } else {
                            dyRef.current = -dyRef.current;
                        }

                        brick.broken = true;

                        const allBroken = bricksRef.current.every(col => col.every(b => b.broken));
                        if (allBroken) setGameCleared(true);

                        // Increase ball speed on brick collision
                        accelerateBall(BRICK_SPEED_INCREASE);

                        // Apply random angle change on brick collision
                        applyRandomAngle(BRICK_ANGLE_RANDOMNESS);

                        return;
                    }
                }
            }
        }

        function drawGameOver() {
            // We'll use the basic colors here for the canvas context
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#ff6600";
            ctx.textAlign = "center";
            ctx.font = `bold ${Math.floor(canvas.width * 0.06)}px 'PixelFont', 'Courier New'`;
            ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        }

        function drawGameClear() {
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#4eff00";
            ctx.textAlign = "center";
            ctx.font = `bold ${Math.floor(canvas.width * 0.06)}px 'PixelFont', 'Courier New'`;
            ctx.fillText("STAGE CLEAR!", canvas.width / 2, canvas.height / 2);
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Canvas background
            ctx.fillStyle = "#241945"; // Canvas background color kept here
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ball
            ctx.beginPath();
            ctx.arc(xRef.current, yRef.current, ballRadiusRef.current, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFFFF"; // Ball color
            ctx.fill();
            ctx.closePath();

            // Paddle
            ctx.beginPath();
            ctx.rect(paddleXRef.current, canvas.height - paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#8a56db"; // Paddle color
            ctx.fill();
            ctx.closePath();

            // Bricks - colors now reference SCSS classes
            bricksRef.current.flat().forEach(brick => {
                if (!brick.broken) {
                    ctx.beginPath();
                    ctx.rect(brick.x, brick.y, brick.width, brick.height);

                    // Color mapping based on row
                    let color;
                    switch (brick.className) {
                        case "brick-row-0": color = "#ff9d00"; break;
                        case "brick-row-1": color = "#ffcf00"; break;
                        case "brick-row-2": color = "#4eff00"; break;
                        default: color = "#8a56db";
                    }
                    ctx.fillStyle = color;

                    ctx.fill();
                    ctx.strokeStyle = "#ffffff";
                    ctx.stroke();
                    ctx.closePath();
                }
            });

            if (gameOver) drawGameOver();
            if (gameCleared) drawGameClear();
        }

        function update(deltaTime) {
            if (!gameStarted || gameOver || gameCleared || gamePaused) return;

            const scale = deltaTime / 16.67;
            xRef.current += dxRef.current * scale;
            yRef.current += dyRef.current * scale;

            if (xRef.current + ballRadiusRef.current > canvas.width || xRef.current - ballRadiusRef.current < 0) {
                dxRef.current = -dxRef.current;
                // Apply slight randomness on wall collision
                applyRandomAngle(BRICK_ANGLE_RANDOMNESS / 2);
            }
            if (yRef.current - ballRadiusRef.current < 0) {
                dyRef.current = -dyRef.current;
                // Apply slight randomness on ceiling collision
                applyRandomAngle(BRICK_ANGLE_RANDOMNESS / 2);
            } else if (yRef.current + ballRadiusRef.current > canvas.height) {
                if (xRef.current > paddleXRef.current && xRef.current < paddleXRef.current + paddleWidth) {
                    dyRef.current = -Math.abs(dyRef.current);

                    // Increase ball speed on paddle collision
                    accelerateBall(PADDLE_SPEED_INCREASE);

                    // Add angle variation based on where ball hits paddle
                    const hitPosition = (xRef.current - paddleXRef.current) / paddleWidth;
                    const angleModifier = hitPosition * 0.5 - 0.25; // -0.25 to +0.25 range

                    // Rotate velocity vector
                    const speed = Math.sqrt(dxRef.current * dxRef.current + dyRef.current * dyRef.current);
                    const angle = Math.atan2(dyRef.current, dxRef.current) + angleModifier;
                    dxRef.current = Math.cos(angle) * speed;
                    dyRef.current = Math.sin(angle) * speed;

                    // Apply additional randomness to paddle collisions
                    applyRandomAngle(PADDLE_ANGLE_RANDOMNESS);
                } else {
                    setGameOver(true);
                }
            }

            const paddleSpeed = canvas.width * 0.01 * scale * speedMultiplierRef.current;
            if (leftPressedRef.current && paddleXRef.current > 0) {
                paddleXRef.current -= paddleSpeed;
            }
            if (rightPressedRef.current && paddleXRef.current < canvas.width - paddleWidth) {
                paddleXRef.current += paddleSpeed;
            }

            detectBrickCollision();
        }

        function loop(timestamp) {
            if (!lastTimeRef.current) lastTimeRef.current = timestamp;
            const deltaTime = timestamp - lastTimeRef.current;
            lastTimeRef.current = timestamp;
            update(deltaTime);
            draw();
            gameLoopRef.current = requestAnimationFrame(loop);
        }

        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") leftPressedRef.current = true;
            if (e.key === "ArrowRight") rightPressedRef.current = true;
            if (e.key === " ") setGameStarted(true);
            // Add 'R' key for restarting the game
            if (e.key === "r" && (gameOver || gameCleared)) resetGame();
        };

        const handleKeyUp = (e) => {
            if (e.key === "ArrowLeft") leftPressedRef.current = false;
            if (e.key === "ArrowRight") rightPressedRef.current = false;
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        gameLoopRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(gameLoopRef.current);
            window.removeEventListener("resize", resizeCanvas);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [gameStarted, gameOver, gameCleared, gamePaused]);

    return (
        <div className="breakout-game">
            <canvas ref={canvasRef} onClick={() => !gameStarted && setGameStarted(true)} />

            {/* Replay button that appears when game is over or cleared */}
            {(gameOver || gameCleared) && (
                <button
                    className="break-replay-button"
                    onClick={resetGame}
                >
                    TRY AGAIN
                </button>
            )}

            <div className="keypad-container">
                <button
                    className="keypad-button"
                    onMouseDown={() => { rightPressedRef.current = false; leftPressedRef.current = true; }}
                    onMouseUp={() => { leftPressedRef.current = false; }}
                    onTouchStart={() => { rightPressedRef.current = false; leftPressedRef.current = true; }}
                    onTouchEnd={() => { leftPressedRef.current = false; }}>
                    ←
                </button>
                <button
                    className="keypad-button start-button"
                    onClick={() => !gameStarted && setGameStarted(true)}>
                    START
                </button>
                <button
                    className="keypad-button"
                    onMouseDown={() => { leftPressedRef.current = false; rightPressedRef.current = true; }}
                    onMouseUp={() => { rightPressedRef.current = false; }}
                    onTouchStart={() => { leftPressedRef.current = false; rightPressedRef.current = true; }}
                    onTouchEnd={() => { rightPressedRef.current = false; }}>
                    →
                </button>
            </div>
        </div>
    );
};

export default BreakoutGame;