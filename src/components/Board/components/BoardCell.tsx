import React, { useContext } from 'react';
import Cell from './Cell';
import { CharNames } from '../Character';
import { useDrop } from 'react-dnd';
import { DraggableTypes } from '../../../types';
import { BoardContext, ActionType, CellArea } from './BoardContext';
import getCanDrop from '../lib/getCanDrop';

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

export default function BoardSquare({
  x,
  y,
  characterId,
  area,
}: BoardSquareProps) {
  const { dispatch } = useContext(BoardContext);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DraggableTypes.CHARACTER,
    canDrop: () => getCanDrop(x, area),
    drop(item: DragItem) {
      dispatch({
        type: ActionType.MOVE_CHARACTER,
        payload: {
          fromX: item.x,
          fromY: item.y,
          fromArea: item.area,
          toX: x,
          toY: y,
          toArea: area,
        },
      });

      return undefined;
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <Cell
      area={area}
      canDrop={canDrop}
      isOver={isOver}
      dropRef={drop}
      x={x}
      y={y}
      characterId={characterId}
    />
  );
}
