import React from 'react';
import Cell from './components/Cell';
import styled from 'styled-components';
import {ROWS, COLUMNS} from '../../constants';
import {CharNames} from './Character';

const S = {
  Game: styled.div`
    width: 500px;
  `,
  Board: styled.div`
    height: 500px;
    width: 100%;
  `,
  Column: styled.div`
    display: flex;
    width: 100%;
  `,
  Deck: styled.div`
    border: 5px solid black;
    margin-top: 20px;
    display: flex;
    width: 100%;
    overflow: hidden;
  `,
  Row: styled.div`
    width: 100%;
  `,
};

export default function Board() {
  const MOCK_PLACED_CHARACTERS = [...new Array(COLUMNS)].map(() =>
    [...new Array(ROWS)].map(
      (): {name: CharNames, level: 1 | 2 | 3} | undefined => undefined,
    ),
  );

  MOCK_PLACED_CHARACTERS[5][6] = {
    name: CharNames.DRUID,
    level: 1,
  };

  MOCK_PLACED_CHARACTERS[6][6] = {
    name: CharNames.SORCERER,
    level: 1,
  };

  return (
    <S.Game>
      <S.Board>
        {[...new Array(COLUMNS)].map((_, colIndex) => (
          <S.Column key={colIndex}>
            {[...new Array(ROWS)].map((_, rowIndex) => (
              <Cell
                key={rowIndex}
                character={MOCK_PLACED_CHARACTERS[rowIndex][colIndex]}
                x={rowIndex}
                y={colIndex}
              />
            ))}
          </S.Column>
        ))}
      </S.Board>
      <div>
        <S.Deck>
          {[...new Array(ROWS)].map((_, rowIndex) => (
            <Cell key={rowIndex} x={rowIndex} y={-2} />
          ))}
        </S.Deck>
      </div>
    </S.Game>
  );
}
