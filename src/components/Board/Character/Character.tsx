import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import characters, { CharNames, CharLevel } from './characters';
import { useDrag } from 'react-dnd';
import { DraggableTypes } from '../../../types';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { CellArea, BoardContext } from '../components/BoardContext';

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
  CharacterWrapper: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,
};

const defaultProps = {
  isDraggable: true,
};

function Character(props: {
  id: string;
  x: number;
  y: number;
  area: CellArea;
  isDraggable: boolean;
}) {
  const { state } = useContext(BoardContext);
  const character =
    characters[state.ownedCharacters.byId[props.id].name].levels[
      state.ownedCharacters.byId[props.id].level
    ];
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: DraggableTypes.CHARACTER,
      id: props.id,
      x: props.x,
      y: props.y,
      area: props.area,
      level: 2,
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
    <S.CharacterWrapper>
      <S.Character ref={drag} isDragging={isDragging} src={character.image} />
    </S.CharacterWrapper>
  );
}

Character.defaultProps = defaultProps;

export default Character;
