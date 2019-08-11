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
  characterId?: string;
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
  characterId,
  x,
  y,
  area,
}: {
  dispatch: Dispatch;
  characterId?: string;
  x: number;
  y: number;
  area: CellArea;
}) {
  return function() {
    if (!characterId) return;

    dispatch({
      type: ActionType.BUY_CHARACTER,
      payload: {
        characterId,
        fromX: x,
        fromY: y,
        fromArea: area,
      },
    });
  };
}
export default function ShopSlot(props: BoardSquareProps) {
  const { state, dispatch } = useContext(BoardContext);
  function renderCharacter() {
    if (!props.characterId) return null;
    const character =
      characters[state.ownedCharacters.byId[props.characterId].name].levels[
        state.ownedCharacters.byId[props.characterId].level
      ];

      return <DraggableCharacter src={character.image} />;
  }

  return (
    <S.ShopSlot
      isCharacterAvailable={Boolean(props.characterId)}
      onClick={handlePurchase({
        dispatch,
        characterId: props.characterId,
        x: props.x,
        y: props.y,
        area: props.area,
      })}
    >
     {renderCharacter()}
    </S.ShopSlot>
  );
}
