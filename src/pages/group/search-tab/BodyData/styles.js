import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.2rem;
  width: 100%;
  margin-bottom: 1.5rem;
`;

export const Card = styled.div`
  height: 8.5rem;
  background-color: #ffffff;
  box-shadow: 0px 2px 5px #0000000D;
  border-radius: 5px;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #707070;

    &:last-child {
      align-items: center;
    }
  }

  p {
    font-size: 1.4rem;
    font-weight: 400;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 500;
  }

  span {
    font-size: 1.2rem;
    color: #B3B3B3;
  }

  h2 {
    font-size: 2.8rem;
    font-weight: 500;
    color: #373354;
  }

  &:nth-child(1) {
    h2 {
      color: #00D624;
    }
  }

  &:nth-child(2) {
    h2 {
      color: #FF0000;
    }
  }

  &:last-child {
    transition: box-shadow 1s;
    box-shadow: ${props => props.selected? '0px 0px 10px 2px #C5004F': '' }
  }
`;

export const ChartArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  background-color: #ffffff;
  box-shadow: 0px 2px 5px #0000000D;
  border-radius: 5px;
  padding: 1rem;
`;

export const ChartHeader = styled.div`
  height: 3rem;
  display: flex;
  flex-direction: row;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 3rem;
    border: 1px solid #F1F1F1;
    border-radius: 2px;
    background-color: #ffffff;
    margin-left: 2.2rem;
    color: #B3B3B3;
    box-shadow: 0px 2px 5px #00000026;

    &.selected {
      color: #222222;
      border: 2px solid #222222;
    }
  }

  svg {
    font-size: 2rem;
  }
`;

export const ChartBody = styled.div`
  width: 100%;
  height: 31rem;
`;

