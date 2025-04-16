import React from 'react';
import TreasureHunt from './TreasureHunt';
import './TreasureHunt.scss';
import './TreasureHuntPage.scss';

const TreasureHuntPage = () => {
  return (
    <div className="treasure-hunt-page">
      <main className="page-content">
        <div className="terminal-container">
          <TreasureHunt />
        </div>
      </main>
    </div>
  );
};

export default TreasureHuntPage;