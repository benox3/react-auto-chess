import React, { useContext } from 'react';
import styled from 'styled-components';
import { ROWS } from '../../constants';
import BoardCell from './components/BoardCell';
import { BoardContext } from './components/BoardContext';

const S = {
	Game: styled.div`
    width: 50%
    max-width: 1024px;
    margin: 0 auto;
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
				{state.board.map((rows, colIndex) => (
					<S.Row key={colIndex}>
						{rows.map((_, rowIndex) => (
							<BoardCell
								key={rowIndex}
								character={state.board[colIndex][rowIndex]}
								x={rowIndex}
								y={colIndex}
							/>
						))}
					</S.Row>
				))}
			</S.Board>
			<S.Space />
			<S.Deck>
				{[...new Array(ROWS)].map((_, rowIndex) => (
					<BoardCell key={rowIndex} x={rowIndex} y={-2} />
				))}
			</S.Deck>
		</S.Game>
	);
}
