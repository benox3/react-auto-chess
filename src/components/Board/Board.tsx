import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import BoardCell from './components/BoardCell';
import { BoardContext, CellArea } from './components/BoardContext';
import Shop from './components/Shop';

const S = {
  Game: styled.div`
    width: 50%
    max-width: 1024px;
    margin: 0 auto;
    overflow: hidden;
    ::after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
  `,
  Board: styled.div`
    width: 100%;
  `,
  Row: styled.div`
    display: flex;
    width: 100%;
    height: 100%;
  `,
  Deck: styled.div`
    border: 5px solid black;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    overflow: hidden;
  `,
  Space: styled.div`
    height: 20px;
  `,
};

export default function Board() {
  const { state } = useContext(BoardContext);

  return (
    <S.Game>
      <S.Board>
        {state.board.map((rows, rowIndex) => (
          <S.Row key={rowIndex}>
            {rows.map((_, colIndex) => (
              <BoardCell
                key={colIndex}
                character={state.board[rowIndex][colIndex]}
                x={colIndex}
                y={rowIndex}
                area={CellArea.BOARD}
              />
            ))}
          </S.Row>
        ))}
      </S.Board>
      <S.Space />
      <S.Deck>
        {state.deck.map((rows, rowIndex) => (
          <S.Row key={rowIndex}>
            {rows.map((_, colIndex) => (
              <BoardCell
                key={colIndex}
                character={state.deck[rowIndex][colIndex]}
                x={colIndex}
                y={rowIndex}
                area={CellArea.DECK}
              />
            ))}
          </S.Row>
        ))}
      </S.Deck>
      {state.isShopOpen && <Shop />}
    </S.Game>
  );
}
