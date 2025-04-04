import React from "react";
import "./RSVP.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const RSVP = ({ onClose }) => {
    return (
        <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">File Explorer - Important Links</div>
                <div className="title-bar-controls">
                    <button onClick={onClose}>×</button>
                </div>
            </div>
            <div className="window-content">
                <div className="explorer-header">
                    <span>📁 베델 {">"} 예삶 {">"} 청1 {">"} 수양회 {">"} 신청서</span>
                </div>
                <div className="file-explorer">
                    <div className="file-tree">
                        <div className="file-entry">
                            <a href="https://forms.gle/ST565pySangFq1o47"
                                target="_blank"
                                rel="noopener noreferrer">수양회_참가_신청서</a>
                        </div>
                        <div className="file-entry">
                            <a href="https://forms.gle/Sb3BUoqEeLFDgYkd9"
                                target="_blank"
                                rel="noopener noreferrer">도우미_신청서</a>
                        </div>
                        <div className="file-entry">
                            <FontAwesomeIcon icon={faInstagram} style={{ marginLeft: '4px' }}/>
                            <a href="https://www.instagram.com/yesalm_chung1/"
                                target="_blank"
                                rel="noopener noreferrer">
                                 청1_인스타그램</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RSVP;