import React, { useState } from "react"
import "./FAQ.scss"

const FAQ = ({ onClose }) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    const windowStyle = {
        ...(isMinimized ? { height: '30px', overflow: 'hidden' } : {})
    };

    return (
        <div className="window" style={windowStyle}>
            <div className="title-bar">
                <div className="title-bar-text">System Message - FAQ</div>
                <div className="title-bar-controls">
                    <button onClick={handleMinimize}>-</button>
                    <button>□</button>
                    <button onClick={onClose}>×</button>
                </div>
            </div>
            <div className="window-content">
                <div className="system-alert">
                    <div className="alert-header">
                        <div className="alert-icon">❓</div>
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
                        A: 새가족 $90 / 레귤러 $130 입니다.
                    </p>

                    <hr style={{ margin: "10px 0", borderTop: "1px dotted #999" }} />

                    <p><strong>Q: 추가 문의사항이 있다면?</strong><br />
                        A: 셀목자나 김지인 형제 <br />&nbsp;&nbsp;&nbsp;
                        (☎️ 626-354-8309)으로<br />&nbsp;&nbsp;&nbsp;
                        연락해주세요!</p>

                    {/* <hr style={{ margin: "10px 0", borderTop: "1px dotted #999" }} /> */}

                    {/* <div className="secret-answer">
                        <p><strong>Q: 세번째 문제의 정답은 무엇인가요?</strong><br />
                            <span 
                                className="reveal-button" 
                                onClick={toggleAnswer}
                            >
                                {showAnswer ? "숨기기" : "A: 이 텍스트를 눌러 확인하십시오"}
                            </span>
                            {showAnswer && (
                                <span className="binary-answer">
                                    <br />A: 01100111 01110010 01100001 01100011<br />&nbsp;&nbsp;&nbsp;
                                    01100101 01100001 01101110 01100100<br />&nbsp;&nbsp;&nbsp;
                                    01110010 01100101 01110011 01110100<br />&nbsp;&nbsp;&nbsp;
                                    <br />
                                    * 힌트: 위 암호를 해독해야 합니다 *
                                </span>
                            )}
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default FAQ