import "./ProgramWindow.scss"
import { Schedule, Team } from "../../components/components";

const ProgramWindow = ({ item, onClose }) => {
    return (
        <div>
            {item.component === "Schedule" && <Schedule onClose={onClose} />}
            {item.component === "Team" && <Team onClose={onClose} />}
        </div>


    );
};

export default ProgramWindow