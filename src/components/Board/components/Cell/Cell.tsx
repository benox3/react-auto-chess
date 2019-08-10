import React from 'react';
import styled from 'styled-components';
import Character, { CharNames } from '../../Character';

const S = {
	Cell: styled.div<{ isEven: boolean; isOver?: boolean }>`
		width: 100%;
		border: 1px solid #0b650a6b;
		box-sizing: border-box;
		background: ${props => {
			if (props.isOver) return '#014400;';
			return props.isEven ? '#028000' : '#028600';
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
	dropRef: any;
}) {
	return (
		<S.Cell
			isOver={props.isOver}
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
