import React from 'react';
import styled from 'styled-components';
import Character, {CharNames} from '../../Character';

const S = {
  Cell:
    styled.div <{ isEven: boolean }>`
    width: 100%;
    background-color: ${props => (props.isEven ? '#1e5a1e' : '#1b771b')};
    ::after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }
  `,
};

export default function Cell(props: {
  x: number,
  y: number,
  character?: {
    name: CharNames,
    level: 1 | 2 | 3,
  },
}) {
  return (
    <S.Cell isEven={(props.x + props.y) % 2 === 0}>
      {props.character && (
        <Character level={props.character.level} name={props.character.name} />
      )}
    </S.Cell>
  );
}
