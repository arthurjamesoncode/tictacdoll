import { useAppSelector } from '../../store/hooks';
import "./Winner.css";

export default function Winner() {
  let duration = useAppSelector((state ) => state.game.duration);

  const winner = useAppSelector((state) => state.game.winner);

  duration = Math.floor(duration / 1000);

  const player1 = sessionStorage.getItem('player1');
  const player2 = sessionStorage.getItem('player2');

  let winString = ''
    if(winner) winString = winner === 1 ? `${player1} has beaten ${player2}` : `${player2} has beaten ${player1}`;

  return (
    <div className="winner-info">
      <strong>Congratulations! </strong>
      <span className="username-highlight">
        <strong>{winner != null && winner > 0 ? winString : 'You have tied'}</strong>
      </span>
      after a time of
      <strong>{duration} seconds! </strong>
      <em>What will the results be if you try again?</em>
    </div>
  );
}
