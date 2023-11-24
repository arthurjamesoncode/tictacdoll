import { MutableRefObject } from 'react';
//@ts-ignore
import TWEEN from '@tweenjs/tween.js'; //doesn't resolve type definitions but they're there and it works

import { Vector3 } from '@react-three/fiber';
import { Group } from 'three';

import jumpAudio from '../assets/sound/music-jump.mp3';

export function placePieceAnimation(
  newPosition: Vector3,
  pieceRef: MutableRefObject<Group>
) {
  //should be able to deconstruct with vector3 but it won't accept so have to cast
  //it does work
  const { x, y, z } = newPosition as { x: number; y: number; z: number };

  const jumpSound = new Audio(jumpAudio);
  const peakPos = {
    x: (pieceRef.current.position.x + x) / 2,
    y: Math.max(pieceRef.current.position.y, y) + 7,
    z: (pieceRef.current.position.z + z) / 2,
  };

  const horizontalTween = new TWEEN.Tween(pieceRef.current.position)
    .to({ x, z }, 500)
    .onUpdate(() => {})
    .onStart(() => {
      jumpSound.play();
    });

  const upTween = new TWEEN.Tween(pieceRef.current.position)
    .to({ y: peakPos.y }, 250)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() => {});

  const downTween = new TWEEN.Tween(pieceRef.current.position)
    .to({ y: y + pieceRef.current.position.y }, 250)
    .easing(TWEEN.Easing.Quadratic.In)
    .onUpdate(() => {});

  upTween.chain(downTween);
  horizontalTween.start();
  upTween.start();
}
