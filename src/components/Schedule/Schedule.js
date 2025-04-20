import React, { useState } from "react";
import "./Schedule.scss";
import Content from "./content";

const Schedule = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("day1");
    const [viewMode, setViewMode] = useState("list");
    const [isMinimized, setIsMinimized] = useState(false);
    const [windowTab, setWindowTab] = useState("schedule"); // "schedule" or "download"

    // Path to the schedule PNG in the public folder
    const schedulePngPath = process.env.PUBLIC_URL + "/assets/timetable.png";

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const handleDownload = () => {
        // Create an anchor element
        const downloadLink = document.createElement("a");
        // Set the href to the image path in the public folder
        downloadLink.href = schedulePngPath;
        // Set the download attribute with the filename
        downloadLink.download = "2025_청1_수양회_일정표.png";
        // Append to the body
        document.body.appendChild(downloadLink);
        // Trigger the download
        downloadLink.click();
        // Clean up
        document.body.removeChild(downloadLink);
    };

    const windowStyle = {
        ...(isMinimized ? { height: '30px', overflow: 'hidden' } : {})
    };

    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">Notepad - 일정표.txt</div>
                <div className="title-bar-controls">
                    <button onClick={handleMinimize}>-</button>
                    <button>□</button>
                    <button onClick={onClose}>×</button>
                </div>
            </div>
            {!isMinimized && (
                <div className="window-content">
                    <div className="explorer-header">
                        📁 베델 {">"} 예삶 {">"} 청1 {">"} 수양회 {">"} 일정표
                    </div>

                    {/* Window Tabs */}
                    <div className="window-tabs">
                        <div
                            className={`window-tab ${windowTab === "schedule" ? "active" : ""}`}
                            onClick={() => setWindowTab("schedule")}
                        >
                            일정표 보기
                        </div>
                        <div
                            className={`window-tab ${windowTab === "download" ? "active" : ""}`}
                            onClick={() => setWindowTab("download")}
                        >
                            일정표 다운로드
                        </div>
                    </div>

                    {/* Schedule View */}
                    {windowTab === "schedule" && (
                        <>
                            <div className="view-options">
                                <div className="view-option">
                                    <input
                                        type="radio"
                                        id="list-view"
                                        name="view"
                                        checked={viewMode === "list"}
                                        onChange={() => setViewMode("list")}
                                    />
                                    <label htmlFor="list-view">리스트로 보기</label>
                                </div>
                                <div className="view-option">
                                    <input
                                        type="radio"
                                        id="compact-view"
                                        name="view"
                                        checked={viewMode === "compact"}
                                        onChange={() => setViewMode("compact")}
                                    />
                                    <label htmlFor="compact-view">컴팩트하게 보기</label>
                                </div>
                            </div>

                            <div className="schedule-tabs">
                                <div
                                    className={`schedule-tab ${activeTab === "day1" ? "active" : ""}`}
                                    onClick={() => setActiveTab("day1")}
                                >
                                    첫째날
                                </div>
                                <div
                                    className={`schedule-tab ${activeTab === "day2" ? "active" : ""}`}
                                    onClick={() => setActiveTab("day2")}
                                >
                                    둘째날
                                </div>
                                <div
                                    className={`schedule-tab ${activeTab === "day3" ? "active" : ""}`}
                                    onClick={() => setActiveTab("day3")}
                                >
                                    셋째날
                                </div>
                            </div>

                            <div className="notepad">
                                <div className="schedule-content">
                                    {activeTab === "day1" && <Content day="day1" viewMode={viewMode} />}
                                    {activeTab === "day2" && <Content day="day2" viewMode={viewMode} />}
                                    {activeTab === "day3" && <Content day="day3" viewMode={viewMode} />}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Download View */}
                    {windowTab === "download" && (
                        <div className="download-section">
                            <div className="preview-container">
                                <img
                                    src={schedulePngPath}
                                    alt="일정표 이미지"
                                    className="schedule-preview"
                                />
                            </div>
                            <div className="download-info">
                                <p>이미지를 다운로드하여 일정표를 저장 할 수 있습니다!</p>
                                <p>파일명: <span className="file-name">2025_청1_수양회_일정표.png</span></p>
                            </div>
                            <div className="download-buttons">
                                <button className="download-button" onClick={handleDownload}>
                                    다운로드
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Schedule;