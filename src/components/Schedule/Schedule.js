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
                    File {">"} Edit {">"} Format {">"} View {">"} Help
                </div>
                <div class="notepad">
                    <Content />
                </div>
            </div>
        </div>
    );
}

export default Schedule