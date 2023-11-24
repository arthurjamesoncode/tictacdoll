import logo1 from '../../assets/logos-and-icons/logo-1.png';
import logo2 from '../../assets/logos-and-icons/logo-2.png';
import './Navbar.css';
import GameOverPage from '../GameOverPage/GameOverPage';
import Timer from '../Timer/Timer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { checkAuth, logout } from '../../services/userService';
import { logout as logoutReducer } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const gameEnded = useAppSelector((state) => state.game.gameEnded);
  const shouldShowTimer = useAppSelector((state) => state.game.isInGame);
  const username = useAppSelector((state) => state.user.username);

  useEffect(() => {
    (async function () {
      if (!(await checkAuth())) {
        navigate('/');
      } else {
        navigate('/gamemode');
      }
    })();
  }, []);

  async function handleLogout() {
    await logout();
    dispatch(logoutReducer());
    navigate('/');
  }

  return (
    <div className='invisibal-container'>
      <div className='navinfo'>
        <div className='game-name'>Tic Tac Doll</div>
        {shouldShowTimer && <Timer />}
        <div className='logo_container'>
          <img className='logo-doll-2' src={logo2} alt='logo-2' />
          <img className='logo-doll-1' src={logo1} alt='logo-doll' />
        </div>
      </div>
      {username != null && (
        <div className='logged-user'>
          <div className='logged-in-text'>
            Logged user: <br />
            {username}
          </div>
          <button className='logout-button' onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      {gameEnded && <GameOverPage />}
    </div>
  )
}
