import "./Team.scss"

const Team = () => {
    return (
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">Messenger - Teams (5/12 Online)</div>
                <div class="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button>×</button>
                </div>
            </div>
            <div class="window-content">
                <div class="chat-ui">
                    <ul class="buddy-list">
                        <li class="buddy-list-item">
                            <div class="status-icon"></div>
                            <div>팀 1: 비전 (온라인)</div>
                        </li>
                        <li class="buddy-list-item">
                            <div class="status-icon"></div>
                            <div>팀 2: 믿음 (온라인)</div>
                        </li>
                        <li class="buddy-list-item">
                            <div class="status-icon status-away"></div>
                            <div>팀 3: 소망 (자리비움)</div>
                        </li>
                        <li class="buddy-list-item">
                            <div class="status-icon"></div>
                            <div>팀 4: 사랑 (온라인)</div>
                        </li>
                        <li class="buddy-list-item">
                            <div class="status-icon"></div>
                            <div>스텝 (온라인)</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Team