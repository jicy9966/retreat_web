import React, { useState } from 'react';
import "./Team.scss";
import { team_data } from "../../config/team_data"
import TeamPopup from './TeamPopup';

const Team = ({ onClose }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);

  // Calculate how many are online
  const onlineCount = team_data.filter(buddy => !buddy.isAway).length;
  const totalCount = team_data.length;

  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  const closePopup = () => {
    setSelectedTeam(null);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const windowStyle = {
    ...(isMinimized ? { height: '30px', overflow: 'hidden' } : {})
  };

  return (
    <div className="window" style={windowStyle}>
      <div className="title-bar">
        <div className="title-bar-text">Messenger - Teams ({onlineCount}/{totalCount} Online)</div>
        <div className="title-bar-controls">
          <button onClick={handleMinimize}>-</button>
          <button>□</button>
          <button onClick={onClose}>×</button>
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