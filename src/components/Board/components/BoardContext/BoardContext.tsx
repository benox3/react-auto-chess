import React, { useReducer } from 'react';
import { CharNames } from '../../Character';
import { ROWS, COLUMNS } from '../../../../constants';

export enum ActionType {
  MOVE_CHARACTER,
}

export enum CellArea {
  BOARD = 'board',
  DECK = 'deck',
}

export type Action = {
  type: ActionType.MOVE_CHARACTER;
  payload: {
    fromX: number;
    fromY: number;
    fromArea: CellArea;
    toX: number;
    toY: number;
    toArea: CellArea;
  };
};

export type Dispatch = (value: Action) => void;
export type State = {
  [CellArea.BOARD]: ({ name: CharNames; level: 1 | 2 | 3 } | undefined)[][];
  [CellArea.DECK]: ({ name: CharNames; level: 1 | 2 | 3 } | undefined)[][];
};

const MOCK_BOARD = [...new Array(COLUMNS)].map(() =>
  [...new Array(ROWS)].map(
    (): { name: CharNames; level: 1 | 2 | 3 } | undefined => undefined
  )
);

const MOCK_DECK = [...new Array(ROWS)].map(() =>
  [...new Array(1)].map(
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
  deck: MOCK_DECK,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.MOVE_CHARACTER: {
      const nextState = { ...state };

      const originalPos =
        nextState[action.payload.fromArea][action.payload.fromY][
          action.payload.fromX
        ];
      const nextPos =
        nextState[action.payload.toArea][action.payload.toY][
          action.payload.toX
        ];

      if (
        action.payload.toArea === action.payload.fromArea &&
        action.payload.toX === action.payload.fromX &&
        action.payload.toY === action.payload.fromY
      ) {
        return {
          ...state,
        };
      }

      nextState[action.payload.toArea][action.payload.toY][
        action.payload.toX
      ] = originalPos;
      nextState[action.payload.fromArea][action.payload.fromY][
        action.payload.fromX
      ] = nextPos;

      return {
        ...state,
        ...nextState,
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
