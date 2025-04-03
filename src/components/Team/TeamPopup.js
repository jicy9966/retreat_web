import React from 'react';
import './TeamPopup.scss';

const TeamPopup = ({ team, onClose }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="team-popup" onClick={(e) => e.stopPropagation()}>
        <div className="popup-title-bar">
          <div className="popup-title-text">{team.name} - 조원 목록</div>
          <div className="popup-title-controls">
            <button onClick={onClose}>×</button>
          </div>
        </div>
        <div className="popup-content">
          <ul className="team-members">
            {team.members.map((member, index) => (
              <li key={index} className="team-member">
                <div className="member-icon">👤</div>
                <div className="member-name">{member}</div>
              </li>
            ))}
          </ul>
          <div className="popup-buttons">
            <button className="popup-button" onClick={onClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPopup;