import "./MsgBox.scss";

const MsgBox = ({ onClose }) => {
    const handleConfirmClick = () => {
        // Call the onClose function passed from the parent to hide the MsgBox
        if (onClose) {
            onClose();
        }
    };

    return (
        <div className="popup">
            <div className="popup-title">
                <span className="popup-icon">⚠️</span> System Alert
            </div>
            <p>파일을 잃어버리지 마세요 – 지금, 마음에 저장하세요!</p>
            <div style={{ textAlign: "right", marginTop: 10 }}>
                <button
                    style={{
                        padding: "3px 8px",
                        backgroundColor: "#D4D0C8",
                        border: "1px solid #888"
                    }}
                    onClick={handleConfirmClick}  // Add onClick event handler
                >
                    확인
                </button>
            </div>
        </div>
    );
};

export default MsgBox;
