import "./FAQ.scss"

const FAQ = () => {
    return (
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">System Message - FAQ</div>
                <div class="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button>×</button>
                </div>
            </div>
            <div class="window-content">
                <div class="system-alert">
                    <div class="alert-header">
                        <div class="alert-icon">❓</div>
                        <strong>자주 묻는 질문</strong>
                    </div>
                    <p><strong>Q: 수양회 장소는 어디인가요?</strong><br />
                        A: 양평 수양관 (서울에서 차로 약 1시간 거리)</p>
                    <hr style={{ margin: "10px 0", borderTop: "1px dotted #999" }} />
                    <p><strong>Q: 무엇을 준비해야 하나요?</strong><br />
                        A: 세면도구, 성경, 필기구, 개인 약, 편한 옷</p>
                    <hr style={{ margin: "10px 0", borderTop: "1px dotted #999" }} />
                    <p><strong>Q: 참가비는 얼마인가요?</strong><br />
                        A: 학생 30,000원 / 일반 40,000원 (숙식 포함)</p>
                </div>
            </div>
        </div>
    )
}

export default FAQ