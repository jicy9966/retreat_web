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
                    <div className="police-line-top"></div>

                    <div className="construction-content">
                        <div className="construction-icon">⚠️</div>
                        <h2 className="construction-title">공사 중 (스포방지)</h2>
                        <p className="construction-message">현재 업데이트 중입니다.</p>
                        <p className="construction-submessage">나중에 다시 확인해 주세요.</p>
                    </div>

                    <div className="police-line-bottom"></div>
                </div>

            </div>
        </div>
    );
};

export default ProgramWindow