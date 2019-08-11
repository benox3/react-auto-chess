import React, { useReducer } from 'react';
import { CharNames, CharLevel } from '../../Character/characters';
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
        characterId: string;
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
export type Slot =
  | {
      characterId: string;
    }
  | undefined;

export type State = {
  ownedCharacters: {
    byId: {
      [key: string]: {
        name: CharNames;
        level: CharLevel;
      };
    };
  };
  [CellArea.BOARD]: (Slot)[][];
  [CellArea.DECK]: (Slot)[][];
  [CellArea.SHOP]: (Slot)[][];
  isShopOpen: boolean;
};

const MOCK_BOARD = [...new Array(ROWS)].map(() =>
  [...new Array(COLUMNS)].map(
    (): Slot => undefined
  )
);

const MOCK_DECK = [...new Array(1)].map(() =>
  [...new Array(COLUMNS)].map(
    (): Slot => undefined
  )
);

const MOCK_SHOP = [...new Array(1)].map(() =>
  [...new Array(COLUMNS)].map(
    (): Slot => undefined
  )
);

MOCK_BOARD[5][6] = {
  characterId: '2',
} as Slot;

MOCK_BOARD[6][6] = {
  characterId: '1',
} as Slot;
MOCK_SHOP[0][0] = {
  characterId: '1',
} as Slot;

MOCK_SHOP[0][2] = {
  characterId: '1',
} as Slot;


MOCK_SHOP[0][3] = {
  characterId: '1',
} as Slot;


MOCK_SHOP[0][4] = {
  characterId: '1',
} as Slot;


const initialState = {
  ownedCharacters: {
    byId: {
      '1': {
        name: CharNames.DRUID,
        level: 2 as CharLevel,
      },
      '2': {
        name: CharNames.DRUID,
        level: 2 as CharLevel,
      },
    },
    allCharIds: [1, 2],
  },
  board: MOCK_BOARD,
  deck: MOCK_DECK,
  shop: MOCK_SHOP,
  isShopOpen: false,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.MOVE_CHARACTER: {
      const nextState = { ...state };

      const originalPos =
        nextState[action.payload.fromArea][action.payload.fromX][
          action.payload.fromY
        ];
      const nextPos =
        nextState[action.payload.toArea][action.payload.toX][
          action.payload.toY
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

      nextState[action.payload.toArea][action.payload.toX][
        action.payload.toY
      ] = originalPos;
      nextState[action.payload.fromArea][action.payload.fromX][
        action.payload.fromY
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
      nextState[CellArea.DECK][0][nextAvailableSlot] = action.payload;
      nextState[action.payload.fromArea][action.payload.fromX][
        action.payload.fromY
      ] = undefined;

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
