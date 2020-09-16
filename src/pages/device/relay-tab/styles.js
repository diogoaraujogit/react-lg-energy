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
  margin-bottom: 2.7rem;
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
    margin-right: 2rem;

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

export const ManualRelay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding: 0rem 6.5rem;
  margin-bottom: 2rem;

  p {
    margin-right: 2rem;
    color: #707070;
  }

  .MuiFormControlLabel-root {
    margin-right: 0rem;
  }

  .MuiSwitch-colorPrimary {
    color: #C1C1C1;

    &.Mui-checked {
      color: #222222;
    }

    &.Mui-checked + .MuiSwitch-track {
      background-color: #222222;
      opacity: 0.8;
    }
  }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27rem;
  height: 22rem;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 2px 5px #0000000D;
  display: flex;
  flex-direction: column;
  padding: 2rem 5rem;

  h4 {
    margin-bottom: 2rem;
    color: #788195;
    font-size: 1.6rem;
    font-weight: 500;
  }

  p {
    font-size: 1.4rem;
    color: #788195;

  }

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;

      &:first-child {
        .MuiInputBase-input {
          color: #00D624;
        }
      }

      &:last-child {
        .MuiInputBase-input {
          color: #FF0000;
        }
      }
    }
  }

  .MuiFormControlLabel-root {
    margin-right: 0rem;
  }

  .MuiInputBase-input {
    width: 5rem;
    font-size: 1.6rem;
    text-align: center;
  }

  .MuiInput-root {
    margin-bottom: 2rem;
  }
`;
