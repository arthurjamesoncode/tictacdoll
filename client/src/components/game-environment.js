import { Suspense, createRef, useRef, useState } from "react";
import { Chess, ChessSize, ChessType } from "../models/chess";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  Plane,
  useSelect,
} from "@react-three/drei";
import { useLoader, useFrame } from "@react-three/fiber";
import "./game-canvas.css";
import * as THREE from "three";
import Chessboard from "../models/chessboard";
import { TextureLoader } from "three";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectPiece, unselectPiece } from "../store/slices/chessSlice";
import TWEEN from "@tweenjs/tween.js";

const GameEnvironment = (props) => {
  const dispatch = useDispatch();
  const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const texture = useLoader(TextureLoader, "/texture.png");
  const playerLargePieces = useSelector(
    (state) => state.chess.players.human.pieces.large
  );
  const playerMediumPieces = useSelector(
    (state) => state.chess.players.human.pieces.medium
  );
  const playerSmallPieces = useSelector(
    (state) => state.chess.players.human.pieces.small
  );
  const computerLargePieces = useSelector(
    (state) => state.chess.players.computer.pieces.large
  );
  const computerMediumPieces = useSelector(
    (state) => state.chess.players.computer.pieces.medium
  );
  const computerSmallPieces = useSelector(
    (state) => state.chess.players.computer.pieces.small
  );
  const activePiece = useSelector(
    (state) => state.chess.players.human.activePiece
  );

  const [chessRefs, setChessRefs] = useState({});

  const onChessRefObtained = (ref, piece) => {
    console.log(piece);
    chessRefs[piece.id] = ref;
    console.log("zheli");
    console.log(activePiece);
    // if (activePiece && activePiece.useID) {
    //   return;
    // }

    if (activePiece === null || activePiece === undefined) {
      // TODO: Check if the chess is moved. If chess is moved, then do nothing

      dispatch(
        selectPiece({
          pieceId: piece.id,
          position: piece.position,
          isMoved: false,
        })
      );
      return;
    } else {
      const [_, position, isMoved] = activePiece;

      if (isMoved) {
        dispatch(unselectPiece());
        chessRefs[piece.id] = undefined;
        return;
      }
    }

    console.log(
      `Chess ${piece.id} selected. its position is ${piece.position}, and is it moved: ${piece.isMoved}`
    );
    dispatch(
      selectPiece({ id: piece.id, position: piece.position, isMoved: false })
    );
  };

  const handlePiecePlaced = (activePiece, newPosition) => {
    const [id, position] = activePiece;
    console.log(activePiece);

    const chessRef = chessRefs[id];

    if (chessRef && newPosition) {
      const [x, y, z] = newPosition; // 假设 newPosition 是一个包含 x, y, z 的对象

      // 启动动画
      const animation = new TWEEN.Tween(position)
        .to({ x, y, z }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          // 动画中的更新，如果需要
          chessRef.current.position.x = x;
          chessRef.current.position.z = z;
        })
        .onComplete(() => {
          // 动画完成后的状态更新
          // dispatch(
          //   placePiece({ pieceId: props, cell: cell, position: [x, y, z] })
          // ); // 假设棋盘是二维的，z 总是固定的
        });
      animation.start();
      dispatch(unselectPiece());

      // dispatch(selectPiece({ pieceId: 0, position: null, isMoved: null }));
    }
  };

  useFrame(() => TWEEN.update());
  return (
    <Suspense fallback={null}>
      <Chessboard onPiecePlaced={handlePiecePlaced} />

      {/* player's chesses */}
      {playerLargePieces.map((piece) => (
        <Chess
          piece={piece}
          key={piece.id}
          useID={piece.id}
          ref={chessRefs[piece.id]}
          chessSize={ChessSize.LARGE}
          position={piece.position}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
          onRefObtained={onChessRefObtained}
        />
      ))}

      {playerMediumPieces.map((piece) => (
        <Chess
          piece={piece}
          key={piece.id}
          ref={chessRefs[piece.id]}
          chessSize={ChessSize.MEDIUM}
          position={piece.position}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
          onRefObtained={onChessRefObtained}
        />
      ))}

      {playerSmallPieces.map((piece) => (
        <Chess
          piece={piece}
          key={piece.id}
          ref={chessRefs[piece.id]}
          chessSize={ChessSize.SMALL}
          position={piece.position}
          chessType={ChessType.PLAYER}
          floorPlane={floorPlane}
          onRefObtained={onChessRefObtained}
        />
      ))}

      {/* computer's chesses */}

      {computerLargePieces.map((piece) => (
        <Chess
          key={piece.id}
          ref={chessRefs[piece.id]}
          chessSize={ChessSize.LARGE}
          position={piece.position}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
          onRefObtained={onChessRefObtained}
        />
      ))}

      {computerMediumPieces.map((piece) => (
        <Chess
          key={piece.id}
          ref={chessRefs[piece.id]}
          chessSize={ChessSize.MEDIUM}
          position={piece.position}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
          onRefObtained={onChessRefObtained}
        />
      ))}

      {computerSmallPieces.map((piece) => (
        <Chess
          key={piece.id}
          ref={chessRefs[piece.id]}
          chessSize={ChessSize.SMALL}
          position={piece.position}
          chessType={ChessType.COMPUTER}
          floorPlane={floorPlane}
          onRefObtained={onChessRefObtained}
        />
      ))}

      <OrbitControls
        minZoom={10}
        maxZoom={50}
        enableRotate={false}
        enableZoom={false}
        enableDamping={false}
        enableKeys={false}
      />
      <PerspectiveCamera makeDefault fov={35} position={[0, 24, 24]} />
      <Environment preset="city" />
      <ambientLight intensity={1} />
      <Plane position={[0, -5, -9]} args={[100, 100]}>
        <meshBasicMaterial attach="material" map={texture} />
      </Plane>
      <OrbitControls />
    </Suspense>
  );
};

export default GameEnvironment;
