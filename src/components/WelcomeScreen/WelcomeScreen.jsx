import React from 'react';
import './WelcomeScreen.css';

import QuestionCoin from '../../assets/QuestionCoin.png';
import QuestionNumber from '../../assets/QuestionNumber.png';
import description from '../../assets/description.png';
import startButton from '../../assets/startButton.png';
import daddcoin from '../../assets/daddcoin.webp';

const WelcomeScreen = ({ 
  questionsCount, 
  onStart, 
  isLoading = false, 
  error = null 
}) => {
  const daddPoints = questionsCount * 1;

  return (
    <div className="welcome-screen-new">
      <div className="welcome-stats-header">
        <div className="welcome-stats-bg">
          <img src={QuestionCoin} alt="Question" className="stats-icon left-icon" />
          <span className="stats-text">{questionsCount}</span>
          <span className="stats-separator">{'>'}</span>
          <span className="stats-text text-yellow">{daddPoints}</span>
          <img src={daddcoin} alt="Daddcoin" className="stats-icon right-icon" />
        </div>
      </div>

      <div className="welcome-body">
        <img src={description} alt="How to Play" className="welcome-description-img" />
      </div>

      <div className="welcome-footer">
        {error ? (
          <div className="welcome-error">{error}</div>
        ) : (
          <button 
            className="welcome-start-button" 
            onClick={onStart} 
            disabled={isLoading || questionsCount === 0}
          >
            {isLoading ? 'جاري تحميل الأسئلة...' : 'ابدَأ!'}
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
