import {
  MutableRefObject,
  Suspense,
  useState,
  Dispatch as ReactDispatch,
  SetStateAction,
} from 'react';
import { Piece } from '../Piece/Piece';
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Plane,
} from '@react-three/drei';
import { useLoader, useFrame, Vector3 } from '@react-three/fiber';
import * as THREE from 'three';
import Board from '../Board/Board';
import { TextureLoader } from 'three';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  placePiece,
  selectPiece,
  unselectPiece,
} from '../../store/slices/gameSlice';

//@ts-ignore
import TWEEN from '@tweenjs/tween.js'; //doesn't resolve type definitions but they're there and it works

import errorAudio from '../../assets/sound/error.mp3';
import { Group } from 'three';
import { GamePiece, movePieceData } from '../../utils/types';
import { placePieceAnimation } from '../../animations/placePieceAnimation';
import {
  checkWinner,
  checkDraw,
  handleWin,
} from '../../services/checkWinService';

type GameEnvironmentProps = {
  setShowPopUp: ReactDispatch<SetStateAction<boolean>>;
  setPopUpMessage: ReactDispatch<SetStateAction<string>>;
  online?: {
    [player: number]: string;
    triggerMovePiece: (data: movePieceData) => void;
    sendRef: Function;
  };
};

const GameEnvironment = (props: GameEnvironmentProps) => {
  const dispatch = useAppDispatch();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = useLoader(TextureLoader, '/texture.png');

  const pieces = useAppSelector((state) => state.game.allPieces);
  const activePiece = useAppSelector((state) => state.game.activePiece);
  const currentPlayer = useAppSelector((state) => state.game.currentPlayer);
  const cells = useAppSelector((state) => state.game.cells);

  const isInGame = useAppSelector((state) => state.game.isInGame);

  const username = useAppSelector((state) => state.user.username);

  const { setShowPopUp, setPopUpMessage, online } = props;

  const [pieceRefs, setPieceRefs] = useState<
    Record<number, MutableRefObject<Group>>
  >({});

  const errorSound = new Audio(errorAudio);

  const onPieceClicked = (piece: GamePiece) => {
    if (!isInGame) return;

    
    for (const row of cells) if (row.includes(piece.id)) return;
    
    if (online && online[piece.player] !== username) {
      showErrorPopUp('Not your piece');
      return;
    }
    
    dispatch(selectPiece({ piece }));
    return;
  };

  const addPieceRef = (ref: MutableRefObject<Group>, id: number) => {
    setPieceRefs((prev) => ({ ...prev, [id]: ref }));
    if(online) {
      online.sendRef(id, ref);
    }
  };

  const showErrorPopUp = (message: string) => {
    errorSound.play();
    setTimeout(() => {
      setShowPopUp(true);
      setPopUpMessage(message);
    }, 500);

    dispatch(unselectPiece());
  };

  const handlePiecePlaced = (newPosition: Vector3, cell: number[]) => {
    if (activePiece === undefined) return;

    if (activePiece.player !== currentPlayer) {
      showErrorPopUp('Not Your Turn!');
      return;
    }

    const [cellX, cellY] = cell;
    const targetPieceId = cells[cellX][cellY];

    let targetPiece: GamePiece | undefined;
    if (targetPieceId != null) targetPiece = pieces[targetPieceId];

    if (targetPiece && targetPiece.size >= activePiece.size) {
      showErrorPopUp('Invalid Move!');
      return;
    }

    const pieceRef = pieceRefs[activePiece.id];
    
    placePieceAnimation(newPosition, pieceRef);
    
    dispatch(placePiece({ cell }));
    dispatch(unselectPiece());

    if (online) {
      console.log(
        `Place Piece ${activePiece.id} on cell ${cell} on the other side`
      );
      const movePieceData: movePieceData = {
        pieceId: activePiece.id,
        cell,
        newPosition,
      };
      online.triggerMovePiece(movePieceData);
    }

    if (checkWinner(cell, activePiece.player)) {
      handleWin(activePiece.player);
    } else if (checkDraw(activePiece.player)) {
      handleWin(0);
    }

    return;
  };

  useFrame(() => TWEEN.update());
  return (
    <Suspense fallback={null}>
      <Board onPiecePlaced={handlePiecePlaced} />
      {pieces.map((piece) => (
        <Piece
          piece={piece}
          key={piece.id}
          pieceSize={piece.size}
          position={piece.position}
          piecePlayer={piece.player}
          floorPlane={floorPlane}
          onPieceClicked={onPieceClicked}
          addPieceRef={addPieceRef}
        />
      ))}
      <PerspectiveCamera makeDefault fov={35} position={[0, 24, 24]} />
      <Environment preset='city' />
      <ambientLight intensity={1} />
      <Plane
        position={[0, 0, -10]}
        rotation={[-Math.PI / 2, 0, 0]}
        args={[100, 100]}
      >
        {/* <OrbitControls /> */}
        <meshBasicMaterial attach='material' map={texture} />
      </Plane>
      <OrbitControls
        enableZoom={false}
        minAzimuthAngle={-Math.PI / 8}
        maxAzimuthAngle={Math.PI / 8}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI - Math.PI / 1.4}
      />
    </Suspense>
  );
};

export default GameEnvironment;
