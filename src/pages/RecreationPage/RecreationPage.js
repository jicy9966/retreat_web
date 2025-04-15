import { useState } from 'react';
import game_stations from '../../config/game_stations';
import { useNavigate, useParams } from 'react-router-dom';
import './RecreationPage.scss';

const RecreationPage = () => {
    const navigate = useNavigate();
    const [expandedStationId, setExpandedStationId] = useState(null);

    // Toggle function to expand/collapse rules
    const toggleRules = (stationId) => {
        if (expandedStationId === stationId) {
            setExpandedStationId(null);
        } else {
            setExpandedStationId(stationId);
        }
    };

    return (
        <div className='window'>
            <div className="title-bar">
                <div className="title-bar-text">레크레이션.bat - 지락실</div>
                <div className="title-bar-controls">
                    <button>-</button>
                    <button>□</button>
                    <button onClick={() => navigate("/home")}>×</button>
                </div>
            </div>
            <div className='window-content'>
                <div className="explorer-header">
                    <span>📁 베델 {">"} 예삶 {">"} 청1 {">"} 수양회</span>
                </div>
                <div className="retro-container">
                    {/* Main Window */}
                    <div className="retro-window">
                        {/* Content Area */}
                        <div className="retro-content">

                            <h2>지락실 - 활동 메뉴얼</h2>
                            
                            {/* Game Stations List */}
                            <div className="stations-list">
                                {game_stations.map((station) => (
                                    <div key={station.id} className="station-item">
                                        {/* Station Header - Clickable */}
                                        <div
                                            className="station-header"
                                            onClick={() => toggleRules(station.id)}
                                        >
                                            <div>
                                                <span className="station-title">&gt; {station.name}</span>
                                                <span className="station-location">[{station.location}]</span>
                                            </div>
                                            <div className="toggle-indicator">
                                                {expandedStationId === station.id ? "[-]" : "[+]"}
                                            </div>
                                        </div>

                                        {/* Rules Section - Expandable */}
                                        {expandedStationId === station.id && (
                                            <div className="rules-content">
                                                <div className="rules-title">RULES:</div>
                                                <ul className="rules-list">
                                                    {station.rules.map((rule, index) => (
                                                        <li key={index}>
                                                            <span className="bullet">*</span>
                                                            <span>{rule}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* System Status */}
                            <div className="system-status">
                                <div className="status-bar">
                                    <span>SYSTEM: ONLINE</span>
                                    <span>MEMORY: 640K</span>
                                    <span>STATUS: OK</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecreationPage;