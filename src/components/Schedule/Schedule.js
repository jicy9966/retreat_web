import "./Schedule.scss"
import Content from "./content";

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
                    📁 베델 {">"} 예삶 {">"} 청1 {">"} 수양회 2025 {">"} 일정표
                </div>
                <div class="notepad">
                    <Content />
                </div>
            </div>
        </div>
    );
}

export default Schedule