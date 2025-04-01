import React, { useState } from "react";
import "./Program.scss";

const Program = () => {
    // Create a state to track which file item is being hovered
    const [hoveredItem, setHoveredItem] = useState(null);
    
    // Style object for hovered items
    const getHoverStyle = (index) => {
        return hoveredItem === index ? {
            backgroundColor: '#e8e8e8',
            border: '1px dotted #000'
        } : {
            border: '1px solid transparent'
        };
    };
    
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
                    <span>File {">"} Edit {">"} View {">"} Favorites {">"} Tools {">"} Help</span>
                </div>
                <div className="file-explorer">
                    <div className="file-grid">
                        <div 
                            className="file-item" 
                            style={getHoverStyle(0)}
                            onMouseOver={() => setHoveredItem(0)}
                            onMouseOut={() => setHoveredItem(null)}
                        >
                            <div className="file-icon">📄</div>
                            <div>예배.log</div>
                        </div>
                        <div 
                            className="file-item"
                            style={getHoverStyle(1)}
                            onMouseOver={() => setHoveredItem(1)}
                            onMouseOut={() => setHoveredItem(null)}
                        >
                            <div className="file-icon">⚙️</div>
                            <div>활동.bat</div>
                        </div>
                        <div 
                            className="file-item"
                            style={getHoverStyle(2)}
                            onMouseOver={() => setHoveredItem(2)}
                            onMouseOut={() => setHoveredItem(null)}
                        >
                            <div className="file-icon">🗂️</div>
                            <div>팀미션_final.zip</div>
                        </div>
                        <div 
                            className="file-item"
                            style={getHoverStyle(3)}
                            onMouseOver={() => setHoveredItem(3)}
                            onMouseOut={() => setHoveredItem(null)}
                        >
                            <div className="file-icon">💾</div>
                            <div>data.ini</div>
                        </div>
                        <div 
                            className="file-item"
                            style={getHoverStyle(4)}
                            onMouseOver={() => setHoveredItem(4)}
                            onMouseOut={() => setHoveredItem(null)}
                        >
                            <div className="file-icon">🔒</div>
                            <div>config.sys</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Program;