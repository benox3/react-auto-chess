import React, { useContext } from 'react';
import {
  CellArea,
  BoardContext,
  ActionType,
  Dispatch,
} from '../../../BoardContext';
import Character, { CharNames } from '../../../../Character';
import styled from 'styled-components';
import DraggableCharacter from '../../../../Character/components/DraggableCharacter';
import characters, { CharLevel } from '../../../../Character/characters';

export interface DragItem {
  id: string;
  type: string;
  x: number;
  y: number;
  area: CellArea;
}

export interface BoardSquareProps {
  x: number;
  y: number;
  character?: {
    name: CharNames;
    level: CharLevel;
  };
  area: CellArea;
}

const S = {
  ShopSlot: styled.div<{ isCharacterAvailable: boolean }>`
  ${props => props.isCharacterAvailable && 'border-bottom: 11px solid #673AB7'};
    position: relative;
    height: 100%;
    width: 100%;
    margin: 0 2%;
    box-sizing: border-box;
    ::after {
      content: '';
      display: block;
      padding-bottom: 100%;
  `,
};

function handlePurchase({
  dispatch,
  character,
  x,
  y,
  area,
}: {
  dispatch: Dispatch;
  character: BoardSquareProps['character'];
  x: number;
  y: number;
  area: CellArea;
}) {
  return function() {
    if (!character) return;

    dispatch({
      type: ActionType.BUY_CHARACTER,
      payload: {
        character,
        fromX: x,
        fromY: y,
        fromArea: area,
      },
    });
  };
}
export default function ShopSlot(props: BoardSquareProps) {
  const { dispatch } = useContext(BoardContext);
  const character = props.character
    ? characters[props.character.name].levels[props.character.level]
    : undefined;

  return (
    <S.ShopSlot
      isCharacterAvailable={Boolean(character)}
      onClick={handlePurchase({
        dispatch,
        character: props.character,
        x: props.x,
        y: props.y,
        area: props.area,
      })}
    >
      {character && <DraggableCharacter src={character.image} />}
    </S.ShopSlot>
  );
}
