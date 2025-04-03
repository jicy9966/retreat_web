import "./Title.scss";

const Title = () => {
    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">수양회.exe - System Process</div>
                <div className="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button>×</button>
                </div>
            </div>
            <div className="window-content">
                <div className="main-title">수양회.exe<span className="blinking-cursor"></span></div>
            </div>
            <div className="popup main">
                2025 청1 수양회 안내 서비스 웹페이지
            </div>
        </div>
    );
}

export default Title;
