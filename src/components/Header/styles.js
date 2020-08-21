import styled from 'styled-components';

import { darken } from 'polished'


export const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 0rem 4rem 0rem 6rem;
`;

export const ContentArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;

  h1 {
    color: #707070;
    font-size: 1.8rem;
  }
`;


export const Icons = styled.div`
   display: flex;


  button {
    background-color: transparent;
    border: none;
    margin-left: 2rem;
  }

  svg {
    color: #707070;
    font-size: 2.5rem;

    &:hover {
      color: ${darken(0.2, '#707070')}
    }
  }
`;


