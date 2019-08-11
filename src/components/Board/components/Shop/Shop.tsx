import React, { useContext } from 'react';
import { Portal } from 'react-portal';
import styled from 'styled-components';
import { BoardContext, CellArea } from '../BoardContext';
import ShopSlot from './components/ShopSlot';

const S = {
  Shop: styled.div`
    position: fixed;
    top: 50%;
    width: 100%;
    justify-content: center;
    display: flex;
  `,
  Row: styled.div`
    position: relative;
    display: flex;
    width: 100%;
    flex: 1;
    background-color: #263238;
    margin: 0 10%;
  `,
};

export default function Shop() {
  const { state } = useContext(BoardContext);

  return (
    <Portal>
      <S.Shop>
        {state.shop.map((rows, rowIndex) => (
          <S.Row key={rowIndex}>
            {rows.map((_, colIndex) => (
              <ShopSlot
                key={colIndex}
                character={state.shop[rowIndex][colIndex]}
                x={rowIndex}
                y={colIndex}
                area={CellArea.SHOP}
              />
            ))}
          </S.Row>
        ))}
      </S.Shop>
    </Portal>
  );
}
