import React from 'react';
import styled from 'styled-components';
import characters, {CharNames} from './characters';
import {useDrag} from 'react-dnd';
import {DraggableTypes} from '../../../types';

const S = {
  Character:
    styled.div <{src: string, isDragging: boolean} >`
    width: 100%;
    height: 100%;
    ${props =>
      !props.isDragging &&
      `
      background-image: url(${props.src})`};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    cursor: move;
  `,
};

export default function Character(props: {name: CharNames, level: 1 | 2 | 3}) {
  const [{isDragging}, drag] = useDrag({
    item: {type: DraggableTypes.CHARACTER},
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const character = characters[props.name].levels[props.level];
  return (
    <S.Character ref={drag} isDragging={isDragging} src={character.image} />
  );
}
