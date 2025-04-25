import React, { useRef, useState, useEffect } from 'react';
import './TeamPopup.scss';

const TeamPopup = ({ team, onClose }) => {
  const popupRef = useRef(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Mouse drag
  const handleMouseDown = (e) => {
    const rect = popupRef.current.getBoundingClientRect();
    setIsDragging(true);
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  // Touch drag
  const handleTouchStart = (e) => {
    const rect = popupRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
  };

  useEffect(() => {
    if (popupRef.current) {
      const popup = popupRef.current;
      const { width, height } = popup.getBoundingClientRect();
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;
      popup.style.left = `${left}px`;
      popup.style.top = `${top}px`;
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      popupRef.current.style.left = `${e.clientX - dragOffset.x}px`;
      popupRef.current.style.top = `${e.clientY - dragOffset.y}px`;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      popupRef.current.style.left = `${touch.clientX - dragOffset.x}px`;
      popupRef.current.style.top = `${touch.clientY - dragOffset.y}px`;
    };

    const stopDragging = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopDragging);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', stopDragging);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging, dragOffset]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="team-popup retro-border"
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'absolute' }}
      >
        <div
          className="popup-title-bar"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="popup-title-text">🧑‍🤝‍🧑 {team.name}</div>
        </div>
        <div className="popup-content">
          <ul className="team-members">
            {team.members.map((member, index) => (
              <li key={index} className="team-member">
                <span className="member-icon">👤</span>
                <span className={`member-name ${member === team.leader ? 'leader' : ''}`}>
                  {member === team.leader ? `${member} (조장)` : member}
                </span>
              </li>
            ))}
          </ul>
          <div className="popup-buttons">
            <button className="popup-button retro-btn" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPopup;
