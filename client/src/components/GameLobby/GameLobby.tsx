import { useEffect } from 'react';

import './GameLobby.css';

type GameLobbyProps = {
  name: string;
  players: string[];
  getRoomPlayers: (room: string) => void;
  triggerStartGame: (room: string, player1: string, player2: string) => void;
};

export default function GameLobby(props: GameLobbyProps) {
  const { name, players, getRoomPlayers, triggerStartGame } = props;

  useEffect(() => {
    getRoomPlayers(name);
  }, []);

  function handleStartGame() {
    if (players.length < 2) return;

    triggerStartGame(name, players[0], players[1])
  }

  return (
    <div className='game-lobby'>
      <h2>{name}</h2>
      <div className='players'>
        <div className='player1'>
          <h3>Player 1:</h3>
          <div className='player-name first'>{players[0]}</div>
        </div>
        <div className='player2'>
          <h3>Player 2:</h3>
          <div className='player-name second'>
            {players[1] != null ? players[1] : 'Waiting...'}
          </div>
        </div>
      </div>
      <button className='start-button' onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
}
