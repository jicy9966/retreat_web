import "./Schedule.scss"

const Schedule = () => {
    return (
        <div class="window">
            <div class="title-bar">
                <div class="title-bar-text">Notepad - 일정표.txt</div>
                <div class="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button>×</button>
                </div>
            </div>
            <div class="window-content">
                <div class="notepad-header">
                    File {">"} Edit {">"} Format {">"} View {">"} Help
                </div>
                <div class="notepad">
                    -- 수양회 일정표 --<br /><br />
                    Day 1: 금요일<br />
                    TBD ...<br />
                    <br />
                    Day 2: 토요일<br />
                    TBD ...<br />
                    <br />
                    Day 3: 일요일<br />
                    TBD ...<br />
                </div>
            </div>
        </div>
    );
}

export default Schedule