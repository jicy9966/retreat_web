import "./ProgramWindow.scss"
import { Schedule, Team, Menu, RSVP, FAQ } from "../../components/components";

const ProgramWindow = ({ item, onClose }) => {
    return (
        <div>
            {item.component === "Schedule" && <Schedule onClose={onClose} />}
            {item.component === "Team" && <Team onClose={onClose} />}
            {item.component === "Menu" && <Menu onClose={onClose} />}
            {item.component === "RSVP" && <RSVP onClose={onClose} />}
            {item.component === "FAQ" && <FAQ onClose={onClose} />}
        </div>


    );
};

export default ProgramWindow