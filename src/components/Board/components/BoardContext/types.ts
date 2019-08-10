export enum ActionType {
	MOVE_CHARACTER
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
import { CharNames } from '../../Character';
