import React, { useReducer } from 'react';
import { CharNames } from '../../Character';
import { ROWS, COLUMNS } from '../../../../constants';

export enum ActionType {
	MOVE_CHARACTER,
}

export type Action = {
	type: ActionType.MOVE_CHARACTER;
	payload: {
		fromX: number;
		fromY: number;
		toX: number;
		toY: number;
	};
};

export type Dispatch = (value: Action) => void;
export type State = {
	board: ({ name: CharNames; level: 1 | 2 | 3 } | undefined)[][];
};

const MOCK_BOARD = [...new Array(COLUMNS)].map(() =>
	[...new Array(ROWS)].map(
		(): { name: CharNames; level: 1 | 2 | 3 } | undefined => undefined
	)
);

MOCK_BOARD[5][6] = {
	name: CharNames.DRUID,
	level: 1,
};

MOCK_BOARD[6][6] = {
	name: CharNames.SORCERER,
	level: 1,
};

const initialState = {
	board: MOCK_BOARD,
};

function reducer(state: State, action: Action) {
	switch (action.type) {
		case ActionType.MOVE_CHARACTER: {
			const board = [...state.board];
			const originalPos = board[action.payload.fromY][action.payload.fromX];
			const nextPos = board[action.payload.toY][action.payload.toX];

			if (
				action.payload.toX === action.payload.fromX &&
				action.payload.toY === action.payload.fromY
			) {
				return {
					...state,
				};
			}

			board[action.payload.toY][action.payload.toX] = originalPos;
			board[action.payload.fromY][action.payload.fromX] = nextPos;

			return {
				...state,
				board,
			};
		}
	}
}

export const BoardContext = React.createContext({
	state: initialState,
	dispatch: () => {},
} as {
	state: State;
	dispatch: Dispatch;
});

export function BoardProvider(props: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<BoardContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{props.children}
		</BoardContext.Provider>
	);
}
