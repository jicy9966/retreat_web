import React, { useState } from "react";
import "./Menu.scss";

const Menu = ({ onClose }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [activeDay, setActiveDay] = useState(1);
    const [activeTab, setActiveTab] = useState("menu"); // "menu" or "photo"

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleDayChange = (day) => {
        setActiveDay(day);
        setActiveTab("menu");
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const menuData = {
        1: {
            title: "1일차",
            meals: [
                { time: "저녁", items: "떡볶이, 만두, 컵라면" }
            ]
        },
        2: {
            title: "2일차",
            meals: [
                { time: "아침", items: "아보카도 토스트, \n스크램블 에그, \n커피, 쥬스" },
                { time: "점심", items: "돼지국밥, 오징어초무침" },
                { time: "저녁", items: "삼겹살, 상추샐러드, \n된장찌개" }
            ]
        },
        3: {
            title: "3일차",
            meals: [
                { time: "아침", items: "베이글, 씨리얼/그래놀라, 요거트" },
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
                        <div className="main-tabs">
                            <button
                                className={`main-tab ${activeTab === "menu" ? 'active' : ''}`}
                                onClick={() => handleTabChange("menu")}
                            >
                                메뉴
                            </button>
                            <button
                                className={`main-tab ${activeTab === "photo" ? 'active' : ''}`}
                                onClick={() => handleTabChange("photo")}
                            >
                                사진
                            </button>
                        </div>

                        {activeTab === "menu" ? (
                            <>
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
                                            <strong>{meal.time}:</strong>
                                            <span className="food-items">{meal.items}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="photo-tab-content">
                                <h2>🍽️🥯🥑 수양회 음식 사진 🍖🍲🍜</h2>
                                <div className="menu-photo">
                                    <img
                                        src="/assets/식단표.jpg"
                                        alt="청1 수양회 메뉴 사진"
                                        className="menu-image"
                                    />
                                    <div className="photo-caption">
                                        청1 수양회 메뉴 사진!
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Menu;