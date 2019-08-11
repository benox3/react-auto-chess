import React, { useContext } from 'react';
import { useDragLayer } from 'react-dnd';
import styled from 'styled-components';
import { DraggableTypes } from '../../types';
import DraggableCharacter from '../Board/Character/components/DraggableCharacter';
import { BoardContext } from '../Board/components/BoardContext';
import characters from '../Board/Character/characters';

type StyledItemStyles = {
  initialOffset: null | { x: number; y: number };
  currentOffset: null | { x: number; y: number };
};
const S = {
  CustomDragLayer: styled.div`
    position: 'fixed';
    pointerevents: 'none';
    zindex: 100;
    left: 0;
    top: 0;
    width: '100%';
    height: '100%';
  `,
  ItemStyles:
    // use attrs for performance
    styled.div.attrs<StyledItemStyles>(props => {
      if (!props.currentOffset || !props.initialOffset) return;

      let { x, y } = props.currentOffset;
      x -= props.initialOffset.x;
      y -= props.initialOffset.y;
      x += props.initialOffset.x;
      y += props.initialOffset.y;
      const transform = `translate(${x}px, ${y}px)`;

      return {
        style: {
          display: !props.initialOffset || !props.currentOffset ? 'none' : '',
          transform: transform,
        },
      };
    })<StyledItemStyles>``,
};

export default function CustomDragLayer() {
  const { state } = useContext(BoardContext);
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  function renderItem() {
    switch (itemType) {
      case DraggableTypes.CHARACTER: {
        const character =
          characters[state.ownedCharacters.byId[item.id].name].levels[
            state.ownedCharacters.byId[item.id].level
          ];

        return <DraggableCharacter src={character.image} />;
      }
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <S.CustomDragLayer>
      <S.ItemStyles initialOffset={initialOffset} currentOffset={currentOffset}>
        {renderItem()}
      </S.ItemStyles>
    </S.CustomDragLayer>
  );
}
