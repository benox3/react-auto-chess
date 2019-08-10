import React from 'react';
import styled from 'styled-components';
import Character, { CharNames } from '../../Character';

const S = {
	Cell: styled.div<{ isEven: boolean; isOver?: boolean; canDrop: boolean }>`
		width: 100%;
    box-sizing: border-box;
		border: 1px solid #0b650a6b;

		${props => {
			if (props.isOver && !props.canDrop) {
				return `box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0) inset, inset 0px 0px 8px 3px #e91e63;`;
			}
			if (props.isOver) {
				return `box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0) inset, inset 0px 0px 8px 3px #26c6da;`;
			}
    }}
    background: ${props => {
		return props.isEven ? '#43A047;' : '#4CAF50;';
	}};
		::after {
			opacity: 0.2;
			content: '';
			display: block;
			padding-bottom: 100%;
		}
	`,
};

export default function Cell(props: {
	x: number;
	y: number;
	character?: {
		name: CharNames;
		level: 1 | 2 | 3;
	};
	isOver?: boolean;
	canDrop: boolean;
	dropRef: any;
}) {
	return (
		<S.Cell
			isOver={props.isOver}
			canDrop={props.canDrop}
			ref={props.dropRef}
			isEven={(props.x + props.y) % 2 === 0}
		>
			{props.character && (
				<Character
					level={props.character.level}
					name={props.character.name}
					x={props.x}
					y={props.y}
				/>
			)}
		</S.Cell>
	);
}
