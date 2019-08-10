import React from 'react';
import styled from 'styled-components';

const S = {
	Character: styled.div<{ src: string }>`
		width: 100px;
		height: 100px;
		${props =>
			`
      background-image: url(${props.src})`};
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		position: absolute;
		cursor: move;
	`,
};

export default function DraggableCharacter(props: { src: string }) {
	return <S.Character src={props.src} />;
}
