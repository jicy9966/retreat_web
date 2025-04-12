import React, { useState } from "react"
import "./FAQ.scss"

const FAQ = ({ onClose }) => {
    const [isMinimized, setIsMinimized] = useState(false);

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const windowStyle = {
        ...(isMinimized ? { height: '30px', overflow: 'hidden' } : {})
    };

    return (
        <div class="window" style={windowStyle}>
            <div class="title-bar">
                <div class="title-bar-text">System Message - FAQ</div>
                <div class="title-bar-controls">
                    <button onClick={handleMinimize}>-</button>
                    <button>□</button>
                    <button onClick={onClose}>×</button>
                </div>
            </div>
            <div class="window-content">
                <div class="system-alert">
                    <div class="alert-header">
                        <div class="alert-icon">❓</div>
                        <strong>FAQ - 자주 묻는 질문들</strong>
                    </div>
                    <p><strong>Q: 수양회 장소는 어디인가요?</strong><br />
                        A: 베델 갈릴리 수양관<br />&nbsp;&nbsp;&nbsp;&nbsp;
                        31640 El Cariso Trail, <br />&nbsp;&nbsp;&nbsp;&nbsp;
                        Lake Elsinore, CA 92530</p>

                    <hr style={{ margin: "10px 0", borderTop: "1px dotted #999" }} />

                    <p><strong>Q: 무엇을 준비해야 하나요?</strong><br />
                        A: 준비물은 성경책, 침낭, 세면도구, 수건, <br />&nbsp;&nbsp;&nbsp;&nbsp;
                        필기도구, 운동화, 슬리퍼, 따뜻한 옷!</p>

                    <hr style={{ margin: "10px 0", borderTop: "1px dotted #999" }} />

                    <p><strong>Q: 참가비는 얼마인가요?</strong><br />
                        A: 얼리버드 $90 / 레귤러 $130 입니다.<br />&nbsp;&nbsp;&nbsp;
                        얼리버드 마감은 4월 13일!
                    </p>

                    <hr style={{ margin: "10px 0", borderTop: "1px dotted #999" }} />

                    <p><strong>Q: 추가 문의사항이 있다면?</strong><br />
                        A: 셀목자나 김지인 형제 <br />&nbsp;&nbsp;&nbsp;
                        (☎️ 626-354-8309)으로<br />&nbsp;&nbsp;&nbsp;
                        연락해주세요!</p>
                </div>
            </div>
        </div>
    )
}

export default FAQ