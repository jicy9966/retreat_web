import React, { useState } from "react";
import "./Program.scss";
import { fileItems } from "../../config/fileItems";

const Program = ({ onFileClick }) => {
    const [hoveredItem, setHoveredItem] = useState(null);

    const getHoverStyle = (index) => ({
        ...(hoveredItem === index
            ? { backgroundColor: '#e8e8e8', border: '1px dotted #000' }
            : { border: '1px solid transparent' })
    });

    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">File Explorer - Program Files (C:)</div>
                <div className="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button>×</button>
                </div>
            </div>
            <div className="window-content">
                <div className="explorer-header">
                    <span>📁 베델 {">"} 예삶 {">"} 청1 {">"} 수양회 {">"} 홈</span>
                </div>
                <div className="file-explorer">
                    <div className="file-grid">
                        {fileItems.map((item, index) => (
                            <button
                                key={index}
                                className="file-item"
                                style={getHoverStyle(index)}
                                onMouseOver={() => setHoveredItem(index)}
                                onMouseOut={() => setHoveredItem(null)}
                                onClick={() => onFileClick(item)}
                            >
                                <div className="file-icon">{item.icon}</div>
                                <div>{item.name}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Program;
