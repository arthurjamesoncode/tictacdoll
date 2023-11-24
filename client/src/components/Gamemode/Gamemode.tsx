import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/userService';
import { logout as logoutReducer } from '../../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect } from 'react';

function Gamemode() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, []);

  const handleLogout = async () => {
    await logout();
    dispatch(logoutReducer());
    navigate('/');
  };

  return (
    <div className='user-page'>
      <div className='prompt-container'>
        <div className='prompt'>
          <h2>Choose gamemode</h2>
        </div>
      </div>
      <div className='form-container'>
        <div className='button-container'>
          <button className='orange-button' onClick={() => navigate('/local')}>
            Local play
          </button>
          <button className='orange-button' onClick={() => navigate('/online')}>
            Online play
          </button>
        </div>
        <div className='button-container'>
          <button className='distinct-button' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gamemode;
