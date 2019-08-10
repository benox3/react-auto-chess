import React, { useEffect } from 'react';
import styled from 'styled-components';
import characters, { CharNames } from './characters';
import { useDrag } from 'react-dnd';
import { DraggableTypes } from '../../../types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { CellArea } from '../components/BoardContext';

export const S = {
  Character: styled.div<{ src: string; isDragging: boolean }>`
    width: 100%;
    height: 100%;
    ${props =>
      !props.isDragging &&
      `
      background-image: url(${props.src})`};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    opacity: ${props => (props.isDragging ? '0' : '1')};
    cursor: move;
  `,
};

export default function Character(props: {
  name: CharNames;
  level: 1 | 2 | 3;
  x: number;
  y: number;
  area: CellArea
}) {
  const character = characters[props.name].levels[props.level];
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: DraggableTypes.CHARACTER,
      character,
      x: props.x,
      y: props.y,
      area: props.area,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(
    () => {
      preview(getEmptyImage(), {
        captureDraggingState: true,
      });
    },
    [preview]
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div />
      <S.Character ref={drag} isDragging={isDragging} src={character.image} />
    </div>
  );
}
