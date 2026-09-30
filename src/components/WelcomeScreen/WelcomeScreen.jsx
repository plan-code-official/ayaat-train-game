import React from 'react';
import GameWelcomeScreen from '../GameWelcomeScreen/GameWelcomeScreen';

import QuestionCoin from '../../assets/QuestionCoin.png';
import QuestionNumber from '../../assets/QuestionNumber.png';
import description from '../../assets/description.png';
import startButtonBg from '../../assets/start_transparent.png';
import exitButtonBg from '../../assets/Exit1.png';
import daddcoin from '../../assets/daddcoin.webp';

const WelcomeScreen = ({ 
  questionsCount, 
  onStart, 
  isLoading = false, 
  error = null 
}) => {
  const daddPoints = questionsCount * 1;
  const isReady = questionsCount > 0 && !error;

  return (
    <GameWelcomeScreen
      statsBgImage={QuestionNumber}
      statLeftIcon={QuestionCoin}
      statLeftAlt="Questions"
      statLeftValue={questionsCount}
      statRightValue={daddPoints}
      statRightIcon={daddcoin}
      statRightAlt="Points"
      heroImage={description}
      heroAlt="How to Play"
      startButtonImage={startButtonBg}
      exitButtonImage={exitButtonBg}
      onStart={onStart}
      isLoading={isLoading}
      isReady={isReady}
    />
  );
};

export default WelcomeScreen;
