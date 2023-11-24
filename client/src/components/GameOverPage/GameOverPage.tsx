import { useNavigate } from 'react-router-dom';
import './GameOverPage.css';
// import { useState } from 'react';
import Winner from '../Winner/Winner.tsx';
import GameList from '../GameList/GameList.js';
import { useAppDispatch } from '../../store/hooks.ts';
import { resetGame } from '../../store/slices/gameSlice.ts';

export default function GameOverPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handlePlayAgain() {
    dispatch(resetGame());
    navigate('/gamemode');
  }


  return (
    <div className='overpage-container'>
      <div className='gamelist'>
        <GameList />
      </div>
      <div className='game-info'>
        <Winner />

        <button className='again-button' onClick={handlePlayAgain}>
          Go Home
        </button>
      </div>
    </div>
  );
}
