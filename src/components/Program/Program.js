import React, { useState } from "react";
import "./Program.scss";
import { fileItems } from "../../config/fileItems";

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
                        {fileItems.map((item, index) => (
                            <div
                                key={index}
                                className="file-item"
                                style={getHoverStyle(index)}
                                onMouseOver={() => setHoveredItem(index)}
                                onMouseOut={() => setHoveredItem(null)}
                            >
                                <div className="file-icon">{item.icon}</div>
                                <div>{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Program;