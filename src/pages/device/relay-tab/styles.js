import styled from 'styled-components'
import { lighten } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0rem 6rem 0rem 5rem;
  margin-bottom: 5.7rem;
`;

export const Info = styled.div`

  div {

    &:first-child {
      height: 3.5rem;

      h2 {
        font-size: 2.2rem;
        color: #222222;
        font-weight: 500;
      }

      input {
        height: 100%;
        border: none;
        border-bottom: 1px solid #222222;
        background-color: transparent;
        padding-bottom: 0rem;
        color: #222222;
        font-weight: 500;
        font-size: 2.2rem;
      }
    }

    &:last-child {
      display: flex;
      flex-direction: row;
      color: #707070;
      font-size: 1.6rem;
      align-items: center;

      svg {
        color: #00D624;
      }
    }
  }
`;

export const Features = styled.div`
  
`;

export const Body = styled.div`
  width: 100%;
`;

export const Schedules = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
  padding: 0rem 6.5rem 0rem 5rem;
`;
export const Schedule = styled.div`
  width: 100%;
  height: 22rem;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 5px #0000000D;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;
