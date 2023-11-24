import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../PopUp/PopUp";
import logo1 from "/logos-and-icons/logo-1.png";
import logo2 from "/logos-and-icons/logo-2.png";
import { login } from "../../services/userService";
import { login as loginReducer } from "../../store/slices/userSlice";
import { show, hide } from "../../store/slices/popupSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export type User = {
  username: string;
  password: string;
};

function Login() {

  const dispatch = useAppDispatch();
  const showPopUp = useAppSelector((state) => state.popup.showPopup);
  const popUpMessage = useAppSelector((state) => state.popup.popupMessage);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleChange(event: FormEvent<HTMLInputElement>) {
    if (event.currentTarget.id === "username") {
      setUsername(event.currentTarget.value);
    } else if (event.currentTarget.id === "password") {
      setPassword(event.currentTarget.value);
    }
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user: User = {
      username,
      password
    }

    const res = await login(user);
    if (res?.status === 200) {
      const userData = await res?.json();
      dispatch(loginReducer({id: userData.id, username}))
      setUsername("");
      setPassword("");
      navigate("/gamemode");
    } else {
      const resJson = await res?.json();
      setUsername("");
      setPassword("");
      dispatch(show({ message: resJson.message }));
    }
  }

  return (
    <>
    <PopUp
    showPopUp={showPopUp}
    setShowPopUp={() => dispatch(hide())}
    popUpMessage={ popUpMessage }
  />
    <div className="user-page">
      <div className="img-container">
        <img className="logo1" src={logo1} alt="img1" />
        <img className="logo2" src={logo2} alt="img2" />
      </div>
      <div className="form-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="fields">
            <div className="input-field">
              <label htmlFor="username" className="input-label">Username:</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleChange}
                className="username-input"
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password" className="input-label">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
                className="password-input"
                required
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className="orange-button">
              Login
            </button>
          </div>
        </form>
        <div className="button-container">
          <button
            className="distinct-button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
