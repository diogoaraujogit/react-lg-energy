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
  margin-bottom: 3rem;
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

      span, svg {  
        font-size: 1.6rem;  
      }

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

export const DelDevice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 4.1rem 2.6rem 3.4rem 2.6rem; 
  color: #222222;

  > p {
    font-size: 2rem;
    font-weight: 500;
  }

  div {
    p {
      font-size: 1.6rem;
      font-weight: 500;
    }
  }

    span {
      color: red;
    }
    
    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 2rem;
    }

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
          background-color: #FF0000;
          transition: background-color 0.2s;

          &:hover {
            background-color: ${() => lighten(0.1, '#FF0000')}
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
    
  
`;

export const LoadingArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;

export const BodyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;

  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;


export const Body = styled.div`
  width: 100%;
`;

export const Boards = styled.div`
  width: 100%;
  height: 28.4rem;
  padding: 0rem 6rem 3rem 5rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 3rem;

  > div {
    background-color: #ffffff;
    width: 100%;
    border-radius: 15px;
    box-shadow: 0px 2px 5px #0000000D;
    

    &:first-child {
      padding: 2.5rem;
      h4 {
        color: #707070;
        font-size: 1.6rem;
        font-weight: 500;
        margin-bottom: 2rem;
      }

      p {
        color: #222222;
        font-size: 1.6rem;
        font-weight: 500;
      }

      textarea {
        resize: none;
        width: 100%;
        height: 100%;
        color: #222222;
        font-size: 1.6rem;
        font-weight: 500;
        height: 15rem;
        border: none;
        background-color: #F8F8F8;
        border-radius: 10px;
        padding: 1rem;
      }
    }

    &:last-child {
      display: flex;
      flex-direction: column;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 50%;

        div {
          margin-bottom: 0.2rem;
          margin-top: 1rem;
        }

        &:first-child {
          border-bottom: 1px solid #f8f8f8;
          padding: 2.5rem;
        }
      }

      h4 {
        color: #707070;
        font-size: 1.6rem;
        font-weight: 500;
        margin-bottom: 2rem;
      }

      h2 {
        color: #222222;
        font-size: 3.2rem;
        font-weight: 500;
        margin-bottom: 2rem; 
      }

      p {
        color: #707070;
        font-size: 1.6rem;
        text-align: center;
      }
    }
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

export const Values = styled.div`
  width: 100%;
  margin: 0rem 6rem 6rem 5rem;
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
      font-weight: 500;
      font-size: 1.6rem;
    }

    p {
      color: #222222;
      font-weight: 500;
      font-size: 1.6rem;
    }
  }
`;

export const Config = styled.div`
  width: 100%;
`;