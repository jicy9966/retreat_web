import "./Pong.scss";
import React, { useEffect, useRef, useState, useCallback } from "react";

const Pong = () => {
    const canvasRef = useRef(null);
    const leftPressedRef = useRef(false);
    const rightPressedRef = useRef(false);
    const gameLoopRef = useRef(null);

    const [gameOver, setGameOver] = useState(false);
    const [playerWon, setPlayerWon] = useState(false);

    const playerXRef = useRef(0);
    const aiXRef = useRef(0);
    const dxRef = useRef(0);
    const dyRef = useRef(0);
    const speedRef = useRef(3);
    const ballXRef = useRef(0);
    const ballYRef = useRef(0);

    const paddleWidthRef = useRef(0);
    const paddleHeightRef = useRef(0);
    const playerYRef = useRef(0);
    const ballRadiusRef = useRef(6);

    const applyBounceAngle = (hitX, paddleX) => {
        const hitRatio = (hitX - paddleX) / paddleWidthRef.current;
        const angleOffset = hitRatio * 0.5 - 0.25;
        const speed = Math.sqrt(dxRef.current ** 2 + dyRef.current ** 2);
        const angle = Math.atan2(dyRef.current, dxRef.current) + angleOffset;
        dxRef.current = Math.cos(angle) * speed;
        dyRef.current = Math.sin(angle) * speed;

        const minYRatio = 0.25;
        if (Math.abs(dyRef.current / speed) < minYRatio) {
            dyRef.current = -Math.sign(dyRef.current) * speed * minYRatio;
            dxRef.current = Math.sign(dxRef.current) * Math.sqrt(speed ** 2 - dyRef.current ** 2);
        }
    };

    const increaseSpeed = () => {
        const speed = Math.sqrt(dxRef.current ** 2 + dyRef.current ** 2) * 1.05;
        const angle = Math.atan2(dyRef.current, dxRef.current);
        dxRef.current = Math.cos(angle) * speed;
        dyRef.current = Math.sin(angle) * speed;
    };

    const resetGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Reset paddle and ball positions
        paddleWidthRef.current = canvas.width * 0.3;
        paddleHeightRef.current = 10;
        playerXRef.current = (canvas.width - paddleWidthRef.current) / 2;
        aiXRef.current = (canvas.width - paddleWidthRef.current) / 2;
        playerYRef.current = canvas.height - paddleHeightRef.current;

        ballXRef.current = canvas.width / 2;
        ballYRef.current = canvas.height / 2;
        ballRadiusRef.current = 6;

        speedRef.current = 3;
        const angle = Math.random() * Math.PI / 2 + Math.PI / 4;
        dxRef.current = Math.cos(angle) * speedRef.current;
        dyRef.current = Math.sin(angle) * speedRef.current;

        setGameOver(false);
        setPlayerWon(false);

        const loop = () => {
            const ctx = canvas.getContext("2d");

            const update = () => {
                ballXRef.current += dxRef.current;
                ballYRef.current += dyRef.current;

                if (
                    ballXRef.current - ballRadiusRef.current < 0 ||
                    ballXRef.current + ballRadiusRef.current > canvas.width
                ) {
                    dxRef.current = -dxRef.current;
                }

                if (ballYRef.current - ballRadiusRef.current < 0) {
                    setPlayerWon(true);
                    cancelAnimationFrame(gameLoopRef.current);
                    return;
                }

                const aiY = 0;
                if (
                    ballYRef.current - ballRadiusRef.current <= aiY + paddleHeightRef.current &&
                    ballYRef.current + ballRadiusRef.current >= aiY &&
                    ballXRef.current >= aiXRef.current &&
                    ballXRef.current <= aiXRef.current + paddleWidthRef.current
                ) {
                    dyRef.current = Math.abs(dyRef.current);
                    increaseSpeed();
                    applyBounceAngle(ballXRef.current, aiXRef.current);
                }

                if (
                    ballYRef.current + ballRadiusRef.current >= playerYRef.current &&
                    ballYRef.current - ballRadiusRef.current <= playerYRef.current + paddleHeightRef.current &&
                    ballXRef.current >= playerXRef.current &&
                    ballXRef.current <= playerXRef.current + paddleWidthRef.current
                ) {
                    dyRef.current = -Math.abs(dyRef.current);
                    increaseSpeed();
                    applyBounceAngle(ballXRef.current, playerXRef.current);
                }

                if (ballYRef.current + ballRadiusRef.current > canvas.height) {
                    setGameOver(true);
                    cancelAnimationFrame(gameLoopRef.current);
                    return;
                }

                const paddleSpeed = 4;
                if (leftPressedRef.current) playerXRef.current -= paddleSpeed;
                if (rightPressedRef.current) playerXRef.current += paddleSpeed;
                playerXRef.current = Math.max(0, Math.min(canvas.width - paddleWidthRef.current, playerXRef.current));

                const aiCenter = aiXRef.current + paddleWidthRef.current / 2;
                const aiSpeed = 2.5;
                if (ballXRef.current < aiCenter - 10) aiXRef.current -= aiSpeed;
                else if (ballXRef.current > aiCenter + 10) aiXRef.current += aiSpeed;
                aiXRef.current = Math.max(0, Math.min(canvas.width - paddleWidthRef.current, aiXRef.current));
            };

            const draw = () => {
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = "#33ff33";
                ctx.beginPath();
                ctx.arc(ballXRef.current, ballYRef.current, ballRadiusRef.current, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillRect(playerXRef.current, playerYRef.current, paddleWidthRef.current, paddleHeightRef.current);
                ctx.fillRect(aiXRef.current, 0, paddleWidthRef.current, paddleHeightRef.current);
            };

            update();
            draw();
            gameLoopRef.current = requestAnimationFrame(loop);
        };

        gameLoopRef.current = requestAnimationFrame(loop);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 300;
        canvas.height = 400;

        resetGame();

        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") leftPressedRef.current = true;
            if (e.key === "ArrowRight") rightPressedRef.current = true;
        };

        const handleKeyUp = (e) => {
            if (e.key === "ArrowLeft") leftPressedRef.current = false;
            if (e.key === "ArrowRight") rightPressedRef.current = false;
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            cancelAnimationFrame(gameLoopRef.current);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, [resetGame]);

    return (
        <div className="pong-game">
            <canvas ref={canvasRef}></canvas>

            {(gameOver || playerWon) && (
                <div className="pong-end-message">
                    {playerWon ? "YOU WIN!" : "GAME OVER"}
                    <button className="pong-replay-button" onClick={() => {
                        cancelAnimationFrame(gameLoopRef.current);
                        resetGame();
                    }}>
                        PLAY AGAIN
                    </button>
                </div>
            )}

            <div className="pong-controls">
                <button
                    className="pong-button"
                    onMouseDown={() => { rightPressedRef.current = false; leftPressedRef.current = true; }}
                    onMouseUp={() => { leftPressedRef.current = false; }}
                    onTouchStart={() => { rightPressedRef.current = false; leftPressedRef.current = true; }}
                    onTouchEnd={() => { leftPressedRef.current = false; }}
                >
                    ←
                </button>
                <button
                    className="pong-button"
                    onMouseDown={() => { leftPressedRef.current = false; rightPressedRef.current = true; }}
                    onMouseUp={() => { rightPressedRef.current = false; }}
                    onTouchStart={() => { leftPressedRef.current = false; rightPressedRef.current = true; }}
                    onTouchEnd={() => { rightPressedRef.current = false; }}
                >
                    →
                </button>
            </div>

        </div>
    );
};

export default Pong;
