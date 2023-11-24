import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import GameEnvironment from '../GameEnvironment/GameEnvironment';
import { useDispatch } from 'react-redux';
import { startGame } from '../../store/slices/gameSlice';
import './GameCanvas.css';
import { useAppSelector } from '../../store/hooks';
import PopUp from '../PopUp/PopUp';
import { movePieceData } from '../../utils/types';

type GameCanvasProp = {
  online?: {
    [1]: string;
    [2]: string;
    triggerMovePiece: (data: movePieceData) => void;
    sendRef: Function;
  };
};

const GameCanvas = (props: GameCanvasProp) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInGame = useAppSelector((state) => state.game.isInGame);

  const { online } = props;

  useEffect(() => {
    const gameStarted = isInGame;
    if (gameStarted) {
      dispatch(startGame());
    } else {
      navigate('/');
    }
  }, [navigate]);

  const [showPopUp, setShowPopup] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState('');

  return (
    <>
      <PopUp
        showPopUp={showPopUp}
        setShowPopUp={setShowPopup}
        popUpMessage={popUpMessage}
      />
      <Canvas className='GameCanvas'>
        <GameEnvironment
          online={online}
          setShowPopUp={setShowPopup}
          setPopUpMessage={setPopUpMessage}
        ></GameEnvironment>
      </Canvas>
    </>
  );
};

export default GameCanvas;
