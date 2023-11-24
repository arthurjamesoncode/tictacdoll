import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  endGame,
  placePiece,
  selectPiece,
  startGame as startGameReducer,
  unselectPiece,
} from '../../store/slices/gameSlice';
import { useState, useEffect } from 'react';
import OnlinePage from '../OnlinePage/OnlinePage';
import GameLobby from '../GameLobby/GameLobby';
import GameCanvas from '../GameCanvas/GameCanvas';
import { movePieceData } from '../../utils/types';
import { placePieceAnimation } from '../../animations/placePieceAnimation';
import { MutableRefObject } from 'react';
import { Group } from 'three';
import { checkDraw, checkWinner } from '../../services/checkWinService';

import { Socket, io } from 'socket.io-client';
import Cookie from 'js-cookie';

const URL = 'http://localhost:3002/players';

let socket : Socket;

export default function Online() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const username = useAppSelector((state) => state.user.username);
  const isInGame = useAppSelector((state) => state.game.isInGame);
  const gameEnded = useAppSelector((state) => state.game.gameEnded);
  const pieces = useAppSelector((state) => state.game.allPieces);

  const [games, setGames] = useState<{ name: string; members: number }[]>([]);
  const [gameLobby, setGameLobby] = useState<string>();
  const [playersInRoom, setPlayersInRoom] = useState<string[]>([]);

  // @ts-ignore
  const [pieceRefs, setPieceRefs] = useState<
    Record<number, MutableRefObject<Group>>
  >({});

  useEffect(() => {
    if (!isAuthenticated) navigate('/');

    socket = io(URL, {
      autoConnect: false,
      auth: {
        token: Cookie.get('accessToken'),
      },
    });

    socket.on('connect', refreshPage);
    socket.on('currentGames', setGames);
    socket.on('roomPlayers', setPlayersInRoom);
    socket.on('leaveGame', leaveGame);
    socket.on('startGame', startGame);
    socket.on('movePiece', movePiece);

    socket.connect();
    refreshPage();

    return () => {
      socket.off('currentGames', setGames);
      socket.off('roomPlayers', setPlayersInRoom);
      socket.off('leaveGame', leaveGame);
      socket.off('startGame', startGame);
      socket.off('movePiece', movePiece);
      socket.disconnect();
    };
  }, []);

  function refreshPage() {
    socket.emit('refresh');
  }

  function createGame() {
    socket.emit('createGame');
    setGameLobby(username + "'s game");
  }

  function joinGame(gameName: string) {
    socket.emit('joinGame', gameName);
    setGameLobby(gameName);
  }

  function recieveRef(id: number, ref: MutableRefObject<Group>) {
    pieceRefs[id] = ref; //this is not the "correct" way to do this but it works
    // setPieceRefs((prev) => ({ ...prev, [id]: ref };) this is what you should do but it doesn't
  }

  function leaveGame(gameName: string) {
    socket.emit('leaveRoom', gameName);
    setGameLobby(undefined);
    dispatch(endGame({ gameWinner: 0 }));
    refreshPage();
  }

  function getRoomPlayers(room: string) {
    socket.emit('getRoomPlayers', room);
  }

  function triggerStartGame(room: string, player1: string, player2: string) {
    socket.emit('triggerStartGame', room, player1, player2);
  }

  function startGame(player1: string, player2: string) {
    dispatch(startGameReducer());
    sessionStorage.setItem('player1', player1);
    sessionStorage.setItem('player2', player2);
  }

  function triggerMovePiece(data: movePieceData) {;
    socket.emit('movePiece', gameLobby, data);
  }

  function movePiece(data: movePieceData, sentby: string) {
    if(sentby === username) return;
    const piece = pieces[data.pieceId]

    placePieceAnimation(data.newPosition, pieceRefs[data.pieceId]);
    
    dispatch(selectPiece({ piece: piece}));
    dispatch(placePiece({ cell: data.cell }));
    dispatch(unselectPiece());

    if(checkWinner(data.cell, piece.player)){
      dispatch(endGame({gameWinner: piece.player}))
    } else if (checkDraw(piece.player)) {
      dispatch(endGame({gameWinner: 0}))
    }
  }



  return (
    <>
      {isInGame || gameEnded ? (
        <GameCanvas
          online={{
            [1]: playersInRoom[0],
            [2]: playersInRoom[1],
            triggerMovePiece,
            sendRef: recieveRef,
          }}
        />
      ) : gameLobby != null ? (
        <GameLobby
          players={playersInRoom}
          name={gameLobby}
          getRoomPlayers={getRoomPlayers}
          triggerStartGame={triggerStartGame}
        />
      ) : (
        <OnlinePage
          games={games}
          createGame={createGame}
          joinGame={joinGame}
          refreshPage={refreshPage}
        />
      )}
    </>
  );
}
