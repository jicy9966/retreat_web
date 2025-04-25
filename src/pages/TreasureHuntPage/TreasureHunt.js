import React, { useState } from 'react';
import './TreasureHunt.scss';
import { useNavigate } from 'react-router-dom';
import { treasureFiles } from "../../config/treasureFiles"

const TreasureHunt = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setPasscodeInput('');
    setIsAuthorized(false);
    setError('');
  };

  const handlePasscodeSubmit = () => {
    if (passcodeInput === selectedFile.passcode) {
      setIsAuthorized(true);
    } else {
      setError('❌ 패스코드가 틀렸습니다. 다시 입력해주세요.');
    }
  };

  const closePopup = () => {
    setSelectedFile(null);
    setPasscodeInput('');
    setIsAuthorized(false);
    setError('');
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-title">File Explorer - Treasure Hunt</div>
        <div className="terminal-controls">
          <button className="control" onClick={() => navigate("/home")}>×</button>
        </div>
      </div>

      <div className="terminal-body">
        <div className="terminal-file-grid">
          {treasureFiles.map((file, index) => (
            <div
              key={index}
              className="terminal-file-item"
              onClick={() => handleFileClick(file)}
            >
              <div className="terminal-file-icon">{file.icon}</div>
              <div className="terminal-file-name">{file.name}</div>
            </div>
          ))}
        </div>

        {selectedFile && (
          <div className="popup-overlay">
            <div className="terminal-popup">
              <div className="popup-header">
                <span>{selectedFile.icon} {selectedFile.name}</span>
                <button onClick={closePopup}>×</button>
              </div>
              <div className="popup-body">
                {(selectedFile.passcode === null || isAuthorized) ? (
                  <pre>
                    {selectedFile.passcode === null
                      ? `${selectedFile.hint}`
                      : `✅ 단서를 풀었습니다!\n\n${selectedFile.hint}`
                    }
                  </pre>
                ) : (
                  <>
                    <p>🔒 패스코드를 입력하세요:</p>
                    <input
                      type="password"
                      value={passcodeInput}
                      onChange={(e) => setPasscodeInput(e.target.value)}
                      placeholder="패스코드"
                    />
                    <button onClick={handlePasscodeSubmit}>암호 해제</button>
                    {error && <div className="error-message">{error}</div>}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="terminal-footer">
        <span>{treasureFiles.length-1}개의 단서가 있습니다, 다 풀어서 보물을 찾아주세요!</span>
      </div>
    </div>
  );
};

export default TreasureHunt;
