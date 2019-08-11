import React, { useReducer } from 'react';
import { CharNames, CharLevel } from '../../Character';
import { ROWS, COLUMNS } from '../../../../constants';

export enum ActionType {
  MOVE_CHARACTER,
  BUY_CHARACTER,
  HIDE_SHOP,
  SHOW_SHOP,
}

export enum CellArea {
  BOARD = 'board',
  DECK = 'deck',
  SHOP = 'shop',
}

export type Action =
  | {
      type: ActionType.MOVE_CHARACTER;
      payload: {
        fromX: number;
        fromY: number;
        fromArea: CellArea;
        toX: number;
        toY: number;
        toArea: CellArea;
      };
    }
  | {
      type: ActionType.BUY_CHARACTER;
      payload: {
        character: {
          name: CharNames;
          level: CharLevel;
        };
        fromX: number;
        fromY: number;
        fromArea: CellArea;
      };
    }
  | {
      type: ActionType.HIDE_SHOP;
    }
  | {
      type: ActionType.SHOW_SHOP;
    };

export type Dispatch = (value: Action) => void;
export type State = {
  [CellArea.BOARD]: ({ name: CharNames; level: CharLevel } | undefined)[][];
  [CellArea.DECK]: ({ name: CharNames; level: CharLevel } | undefined)[][];
  [CellArea.SHOP]: ({ name: CharNames; level: CharLevel } | undefined)[][];
  isShopOpen: boolean;
};

const MOCK_BOARD = [...new Array(ROWS)].map(() =>
  [...new Array(COLUMNS)].map(
    (): { name: CharNames; level: 1 | 2 | 3 } | undefined => undefined
  )
);

const MOCK_DECK = [...new Array(1)].map(() =>
  [...new Array(COLUMNS)].map(
    (): { name: CharNames; level: 1 | 2 | 3 } | undefined => undefined
  )
);

const MOCK_SHOP = [...new Array(1)].map(() =>
  [...new Array(COLUMNS)].map(
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
console.log(MOCK_SHOP);

MOCK_SHOP[0][0] = {
  name: CharNames.SORCERER,
  level: 1,
};

MOCK_SHOP[0][2] = {
  name: CharNames.SORCERER,
  level: 1,
};

MOCK_SHOP[0][3] = {
  name: CharNames.SORCERER,
  level: 1,
};

MOCK_SHOP[0][4] = {
  name: CharNames.SORCERER,
  level: 1,
};

const initialState = {
  board: MOCK_BOARD,
  deck: MOCK_DECK,
  shop: MOCK_SHOP,
  isShopOpen: true,
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

    case ActionType.BUY_CHARACTER: {
      const nextAvailableSlot = state.deck[0].findIndex(
        val => val === undefined
      );
      const nextState = state;
      nextState[CellArea.DECK][0][nextAvailableSlot] = action.payload.character;
      console.log(action.payload);
      console.log(nextState[action.payload.fromArea]);
      nextState[action.payload.fromArea][action.payload.fromX][
        action.payload.fromY
      ] = undefined;
      console.log(nextState[action.payload.fromArea]);

      return {
        ...state,
        ...nextState,
      };
    }

    case ActionType.HIDE_SHOP: {
      return {
        ...state,
        isShopOpen: false,
      };
    }

    case ActionType.SHOW_SHOP: {
      return {
        ...state,
        isShopOpen: true,
      };
    }

    default: {
      return state;
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
