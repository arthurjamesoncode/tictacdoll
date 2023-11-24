
import './Local.css';
import { FormEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startGame } from '../../store/slices/gameSlice';
import { useNavigate } from 'react-router-dom';
import logo1 from '/logos-and-icons/logo-1.png';
import logo2 from '/logos-and-icons/logo-2.png';

export default function Local() {
  const dispatch = useDispatch();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setShowButton(true);
  }, []);

  const handlePlayer1Change = (event: FormEvent<HTMLInputElement>) => {
    setPlayer1(event.currentTarget.value);
  };

  const handlePlayer2Change = (event: FormEvent<HTMLInputElement>) => {
    setPlayer2(event.currentTarget.value);
  };

  const handleStartGame = () => {
    sessionStorage.setItem('player1', player1);
    sessionStorage.setItem('player2', player2);

    navigate('/game');
    dispatch(startGame());
  };

  return (
    <div className='home-page'>
      <div className='img-container'>
        <img className='logo1' src={logo1} alt='img1' />
        <img className='logo2' src={logo2} alt='img2' />
      </div>
      {showButton && (
        <form onSubmit={handleStartGame} className='startgame'>
          <div className='fields'>
            <div className='input-field'>
              <label className='input-label player1'>Player 1:</label>
              <input
                id='player1'
                type='text'
                placeholder='Enter your username'
                value={player1}
                onChange={handlePlayer1Change}
                className='username-input player1'
                required
              />
            </div>
            <div className='input-field'>
              <label className='input-label player2'>Player 2:</label>
              <input
                id='player2'
                type='text'
                placeholder='Enter your username'
                value={player2}
                onChange={handlePlayer2Change}
                className='username-input player2'
                required
              />
            </div>
          </div>
          <button type='submit' className='start-button'>
            Start Game
          </button>
        </form>
      )}
    </div>
  );
}
