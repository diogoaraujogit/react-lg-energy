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
  margin-bottom: 5rem;
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
        padding-bottom: 0.5rem;
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
  display: flex;
  flex-direction: row;
  align-items: center;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4.2rem;
    border-radius: 5px;
    box-shadow: 0px 2px 5px #0000000D;
    font-size: 1.8rem;
    font-weight: 500;

    &:first-child {
      width: 12rem;
      margin-right: 4rem;
      color: #ffffff;
      background-color: #222222;
      transition: background-color 0.2s;

      svg {
        margin-right: 1rem;
        font-size: 1.8rem;
      }

      &:hover {
      background-color: ${() => lighten(0.1, '#222222')};
      }
    }

    &:nth-child(2) {
      width: 16rem;
      color: #f00;
      background-color: transparent;
      transition: all 0.2s;
      transition-property: color background-color;
      border: 2px solid red;

      &:hover {
        color: #ffffff;
        background-color: #f00;
      }

    }
  }

  > div:first-child {
    display: flex;
    margin-right: 4rem;

      button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 12rem;
        height: 4.2rem;
        border: none;
        border-radius: 5px;
        color: #222222;
        font-size: 1.8rem;
        font-weight: 500;

        &:first-child {
          margin-right: 2rem;
          background-color: transparent;
        }

        &:last-child {
          color: #ffffff;
          background-color: #222222;
          transition: background-color 0.2s;

          &:hover {
            background-color: ${() => lighten(0.1, '#222222')}
          }
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .MuiCircularProgress-root {
          width: 1.4rem !important;
          height: 1.4rem !important;
          margin-left: 1rem;
        }

        .MuiCircularProgress-svg {
          color: #ffffff;
          opacity: 1;
          width: 1.4rem;
          height: 1.4rem;
        }
      }
  }
`;

export const Boards = styled.div`
  width: 100%;
`;

export const Values = styled.div`
  width: 100%;
  margin: 0rem 6rem 3rem 5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;

  > div {
    width: 100%;

    h4 {
      margin-bottom: 1rem;
      font-size: 1.6rem;
      color: #707070;
      font-weight: 500;
    }

    div {
      
      height: 2rem;
    }

    input {
      height: 100%;
      border: none;
      border-bottom: 1px solid #222222;
      background-color: transparent;
      padding-bottom: 0.5rem;
      color: #222222;
      font-weight: 400;
      font-size: 1.6rem;
    }

    p {
      color: #222222;
      font-weight: 400;
      font-size: 1.6rem;
    }
  }
`;

export const Config = styled.div`
  width: 100%;
`;