import React, { useState } from "react";
import "./Sudoku.scss";

// Helper functions for generating a valid Sudoku puzzle
const isValid = (board, row, col, num) => {
    // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[boxRow + i][boxCol + j] === num) return false;
        }
    }

    return true;
};

const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === '') {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;

                        if (solveSudoku(board)) {
                            return true;
                        }

                        board[row][col] = '';
                    }
                }
                return false;
            }
        }
    }
    return true;
};

const generateSudoku = (difficulty = 'medium') => {
    // Create empty board
    const board = Array(9).fill().map(() => Array(9).fill(''));

    // Fill diagonal boxes first (which are independent of each other)
    for (let box = 0; box < 3; box++) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Shuffle numbers
        for (let i = nums.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }

        let index = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[box * 3 + i][box * 3 + j] = nums[index++];
            }
        }
    }

    // Solve the rest of the board
    solveSudoku(board);

    // Create a copy of the solved board
    const solvedBoard = board.map(row => [...row]);

    // Remove numbers to create the puzzle based on difficulty
    let cellsToRemove;
    switch (difficulty) {
        case 'easy':
            cellsToRemove = 35;
            break;
        case 'medium':
            cellsToRemove = 45;
            break;
        case 'hard':
            cellsToRemove = 55;
            break;
        default:
            cellsToRemove = 45;
    }

    let removed = 0;

    while (removed < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (board[row][col] !== '') {
            board[row][col] = '';
            removed++;
        }
    }

    return { puzzle: board, solution: solvedBoard };
};

const Sudoku = () => {
    const [gameData, setGameData] = useState(null);
    const [board, setBoard] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    const [message, setMessage] = useState(null);
    const [difficulty, setDifficulty] = useState(null); // initially null

    const startNewGame = (chosenDifficulty) => {
        const data = generateSudoku(chosenDifficulty);
        setGameData(data);
        setBoard(data.puzzle.map(row => [...row]));
        setSelectedCell(null);
        setIsComplete(false);
        setMessage(null);
        setDifficulty(chosenDifficulty);
    };

    const handleCellClick = (row, col) => {
        if (isComplete) return;
        if (gameData && gameData.puzzle[row][col] !== '') return;
        setSelectedCell([row, col]);
        if (message) setMessage(null);
    };

    const handleDigitClick = (digit) => {
        if (!selectedCell || isComplete) return;
        const [row, col] = selectedCell;
        if (gameData && gameData.puzzle[row][col] === '') {
            const newBoard = board.map((r, i) =>
                r.map((cell, j) => (i === row && j === col ? digit : cell))
            );
            setBoard(newBoard);
            checkCompletion(newBoard);
        }
    };

    const clearCell = () => {
        if (!selectedCell || isComplete) return;
        const [row, col] = selectedCell;
        if (gameData && gameData.puzzle[row][col] === '') {
            const newBoard = board.map((r, i) =>
                r.map((cell, j) => (i === row && j === col ? '' : cell))
            );
            setBoard(newBoard);
        }
    };

    const checkCompletion = (currentBoard) => {
        const isFilled = currentBoard.every(row => row.every(cell => cell !== ''));
        if (isFilled) {
            const isCorrect = currentBoard.every((row, i) =>
                row.every((cell, j) => cell === gameData.solution[i][j])
            );
            if (isCorrect) {
                setIsComplete(true);
                setMessage({ text: "You solved it!", type: "success" });
            } else {
                setMessage({ text: "There are some mistakes", type: "error" });
            }
        }
    };

    // If difficulty hasn't been chosen yet
    if (!difficulty) {
        return (
            <div className="sudoku-container">
                <div className="sudoku-difficulty-window">
                    <div className="sudoku-title-bar">
                        <div className="sudoku-title-bar-text">Choose Difficulty</div>
                    </div>
                    <div className="difficulty-buttons">
                        <button onClick={() => startNewGame("easy")} className="difficulty-button">Easy</button>
                        <button onClick={() => startNewGame("medium")} className="difficulty-button">Medium</button>
                        <button onClick={() => startNewGame("hard")} className="difficulty-button">Hard</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!board) return <div>Loading game...</div>;

    return (
        <div className="sudoku-container">
            <div className="sudoku-window">
                <div className="sudoku-title-bar">
                    <div className="sudoku-title-bar-text">Sudoku - {difficulty.toUpperCase()}</div>
                </div>
                <div className="sudoku-game-area">
                    <div className="sudoku-board">
                        {board.map((row, i) => (
                            <div key={i} className="sudoku-row">
                                {row.map((cell, j) => {
                                    const isInitial = gameData.puzzle[i][j] !== '';
                                    const isSelected = selectedCell && selectedCell[0] === i && selectedCell[1] === j;
                                    const rowBlock = Math.floor(i / 3);
                                    const colBlock = Math.floor(j / 3);
                                    const blockColor = (rowBlock + colBlock) % 2 === 0 ? 'light-block' : 'dark-block';

                                    return (
                                        <div
                                            key={`${i}-${j}`}
                                            className={`sudoku-cell ${blockColor} ${isInitial ? 'initial' : ''} ${isSelected ? 'selected' : ''}`}
                                            onClick={() => handleCellClick(i, j)}
                                        >
                                            {cell !== '' ? cell : ''}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="game-controls">
                        <div className="digit-buttons">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => (
                                <button
                                    key={digit}
                                    className="digit-button retro-button"
                                    onClick={() => handleDigitClick(digit)}
                                >
                                    {digit}
                                </button>
                            ))}
                            <button className="digit-button retro-button clear-button" onClick={clearCell}>✕</button>
                        </div>

                        {message && (
                            <div className={`message ${message.type}`}>{message.text}</div>
                        )}
                        {isComplete && (
                            <div className="completion-message">
                                🎉 Congratulations! 🎉
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sudoku;