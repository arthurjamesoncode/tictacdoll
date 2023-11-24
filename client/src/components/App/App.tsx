import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import GameCanvas from "../GameCanvas/GameCanvas";
import Navbar from "../Navbar/Navbar";

import Local from "../Local/Local";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Gamemode from "../Gamemode/Gamemode";
import Online from "../Online/Online";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register"
        element={<Register />} />
        <Route path="/gamemode" element={<Gamemode />} />
        <Route path="/local" element={<Local />} />
        <Route path='online' element={<Online />} />
        <Route
          path="/game"
          element={<GameCanvas key={Date.now()} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App ;
