import React, { useState } from "react";
import "./Menu.scss";

const Menu = ({ onClose }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [activeDay, setActiveDay] = useState(1);

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleDayChange = (day) => {
        setActiveDay(day);
    };

    const menuData = {
        1: {
            title: "1일차",
            meals: [
                { time: "저녁", items: "제육, 돈까스, 국밥" }
            ]
        },
        2: {
            title: "2일차",
            meals: [
                { time: "아침", items: "시리얼" },
                { time: "점심", items: "마라탕, 떡복이, 로제 파스타" },
                { time: "저녁", items: "소고기, 돼지고기, 갈비" }
            ]
        },
        3: {
            title: "3일차",
            meals: [
                { time: "아침", items: "컵라면" },
            ]
        }
    };

    const windowStyle = {
        ...(isMinimized ? { height: '30px', overflow: 'hidden' } : {})
    };

    return (
        <div className="window" style={windowStyle}>
            <div className="title-bar">
                <div className="title-bar-text">File Explorer - 음식.menu</div>
                <div className="title-bar-controls">
                    <button onClick={handleMinimize}>-</button>
                    <button>□</button>
                    <button onClick={onClose}>×</button>
                </div>
            </div>
            {!isMinimized && (
                <div className="window-content">
                    <div className="explorer-header">
                        <span>📁 베델 {">"} 청1 {">"} 수양회 {">"} 음식.menu</span>
                    </div>
                    <div className="dinner-menu">
                        <div className="menu-tabs">
                            {[1, 2, 3].map(day => (
                                <button
                                    key={day}
                                    className={`menu-tab ${activeDay === day ? 'active' : ''}`}
                                    onClick={() => handleDayChange(day)}
                                >
                                    {day}일차
                                </button>
                            ))}
                        </div>

                        <h2>🍽️ {menuData[activeDay].title} 식단표</h2>

                        <div className="menu-content">
                            {menuData[activeDay].meals.map((meal, index) => (
                                <div className="meal-item" key={index}>
                                    <strong>{meal.time}:</strong> {meal.items}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;