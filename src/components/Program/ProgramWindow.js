import "./ProgramWindow.scss"

const ProgramWindow = ({ item, onClose }) => {
    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">File Explorer - {item.name}</div>
                <div className="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button onClick={onClose}>×</button>
                </div>
            </div>
            <div className="window-content">
                <div className="explorer-header">
                    <span>베델 {">"} ... {">"} 홈 {">"} {item.name}</span>
                </div>
                <div className="program-container">
                    
                </div>

            </div>
        </div>
    );
};

export default ProgramWindow