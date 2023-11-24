import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../store/hooks';
import { useAppDispatch } from '../../store/hooks';
import { updateDuration } from '../../store/slices/gameSlice';

import './timer.css';

const Timer = () => {
  const dispatch = useAppDispatch();
  const startTime = useAppSelector((state) => state.game.startTime);
  const duration = useAppSelector((state) => state.game.duration);

  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const id = setInterval(() => {
      const d = Date.now() - startTime!;
      dispatch(updateDuration({ duration: d }));
    }, 1000);
    timerRef.current = id;

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (totalSeconds: number) => {
    totalSeconds = Math.floor(totalSeconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='timer'>
      <div>{formatTime(duration)}</div>
    </div>
  );
};

export default Timer;
