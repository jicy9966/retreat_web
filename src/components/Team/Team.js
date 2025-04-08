import React, { useState } from 'react';
import "./Team.scss";
import { team_data } from "../../config/team_data"
import TeamPopup from './TeamPopup';

const Team = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Calculate how many are online
  const onlineCount = team_data.filter(buddy => !buddy.isAway).length;
  const totalCount = team_data.length;

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const closePopup = () => {
    setSelectedTeam(null);
  };

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Messenger - Teams ({onlineCount}/{totalCount} Online)</div>
        <div className="title-bar-controls">
          <button>-</button>
          <button>□</button>
          <button>×</button>
        </div>
      </div>
      <div className="window-content">
        <div className="chat-ui">
          <ul className="buddy-list">
            {team_data.map(buddy => (
              <li
                key={buddy.id}
                className="buddy-list-item"
                onClick={() => handleTeamClick(buddy)}
              >
                <div className={`status-icon ${buddy.isAway ? 'status-away' : ''}`}></div>
                <div>{buddy.name} ({buddy.leader})</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedTeam && <TeamPopup team={selectedTeam} onClose={closePopup} />}
    </div>
  );
};

export default Team;