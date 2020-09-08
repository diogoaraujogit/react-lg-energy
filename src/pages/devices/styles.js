import styled from 'styled-components'

import { shade, lighten, darken } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0rem 7.7rem 0rem 6rem;
  margin-bottom: 1rem;
`;

export const Info = styled.div`

  div {

    &:first-child {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 4.5rem;
      margin-bottom: 2rem;

      h2 {
        font-size: 2rem;
        color: #222222;
        font-weight: 500;
      }

      span {
        color: #707070;
        font-size: 1.6rem;
      }

    }

    &:last-child {
      display: flex;
      flex-direction: row;
      color: #707070;
      font-size: 1.4rem;
      align-items: center;

      p {
        font-weight: 500;
      }

      svg {
        color: #00D624;

        &:last-of-type {
          color: #FF0000;
        }
      }

    }

  }
`;

export const Features = styled.div`
  > div {

&:first-child {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 4.5rem;
  margin-bottom: 2rem;
  color: #222222;

  > button {
    width: 16rem;
    height: 4.5rem;
    background-color: #ffffff;
    border: none;
    font-size: 1.6rem;
    font-weight: 500;
    box-shadow: 0rem 0.3rem 0.6rem #00000029;
    border-radius: 10px;
    transition: all 0.2s;
    transition-property: color background-color;
    margin-right: 2rem;

    &:hover {
      background-color: #222222;
      color: #ffffff;
    }

  }

  .disable-schedules {
    background-color: ${props => props.disableSchedules ? '#C5004F' : '#FFFFFF'};
    color: ${props => props.disableSchedules ? '#FFFFFF' : '#222222'};
    
    &:hover {
      background-color: ${props => props.disableSchedules ? shade(0.2, '#C5004F') : '#C5004F'};
    }
  }

  .filter-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem 0rem;
    font-size: 1.2rem;
    width: 4.5rem;

    background-color: ${props => props.filtered ? '#C5004F' : '#FFFFFF'};
    color: ${props => props.filtered ? '#FFFFFF' : '#222222'};

    &:hover {
      background-color: ${props => props.filtered ? shade(0.2, '#C5004F') : ''};
    }

    svg {
      font-size: 2rem;
    }
  }

  .add-device-button {
    margin: 0rem;
  }

}

&:last-child {
  display: flex;
  flex-direction: row;
  color: #707070;
  font-size: 1.4rem;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2rem;

  p {
    font-weight: 500;
  }

  svg {
    color: #222222;

    &:last-of-type {
      color: #C1C1C1;
    }
  }

}

}
`;

export const AddDevice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 4.1rem 2.6rem 3.4rem 2.6rem; 
  color: #222222;

  p {
    font-size: 2rem;
    font-weight: 500;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2rem;

    span {
      color: red;
    }
  }

  form {
    display: flex;
    height: 12rem;
    justify-content: space-between;
    flex-direction: column;

    div {
      display: flex;
      justify-content: flex-end;

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
  }

  input {
    border: none;
    border-bottom: 2px solid #C1C1C1;
    border-color: ${props => props.formError ? '#FF0000' : '#C1C1C1'};
    padding: 1rem 0rem;
    font-size: 1.8rem;

    &::placeholder {
      color: #B3B3B3;

    }
    &:focus {
      border-color: ${props => props.formError ? '#FF0000' : '#222222'};
    }
  }
`;

export const AddFilter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 3rem 0rem; 
  color: #222222;

  h2 {
    font-size: 2rem;
    font-weight: 500;
  }

  select {
    width: 100%;
    height: 4.5rem;
    padding: 0rem 0rem 0rem 2rem;
    font-size: 1.6rem;
    border: 2px solid #B3B3B3;
    border-radius: 5px;
    color: #222222;
    font-weight: 500;

    -moz-appearance: none;
    -webkit-appearance: none;
  }

  .filter-select {
    display: flex;
    flex-direction: row;
    width: 25rem;

    img {
      margin-left: -3rem;
    }

    select::-ms-expand {
      display: none;
    }
  }

  .filter-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: 4.5rem;
    width: 25rem;
    border-radius: 5px;


    button {
      width: 100%;
      border: none;
      border: 1.5px solid #B3B3B3;
      background-color: #ffffff;
      transition: all 0.2s;
      transition-property: color background-color;

      &:hover {
        background-color: #222222;
        color: #ffffff;
        border-color: #222222;
      }

      &:first-of-type {
        border-right: none;
        border-radius: 5px 0px 0px 5px;
      }

      &:last-of-type {
        border-left: none;
        border-radius: 0px 5px 5px 0px;
      }
    }

    .filter-selected {
      background-color: #222222;
        color: #ffffff;
        border-color: #222222;
    }
  }

  > button {
    color: red;
    font-size: 1.4rem;
    font-weight: 500;
    background-color: #ffffff;
    border: none;
  }

  .filter-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    width: 25rem;

    button {
      width: 12rem;
      height: 4.2rem;
      border: none;
      border-radius: 5px;
      font-size: 1.8rem;
      font-weight: 500;

      &:first-child {
        background-color: #F8F8F8;
        color: #222222;
      }

      &:last-child {
        background-color: #222222;
        color: #ffffff;
      }
    }
  }

`;

export const Search = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  margin-right: 2rem;

  > div {
    display: flex;
    height: 100%;
    align-items: center;
  }

  button {
    background-color: transparent;
    border: none;

    svg {
      margin-left: -4rem;
    }
  }

  input {
    border: none;
    border-radius: 5px;
    height: 100%;
    padding: 0rem 2rem;
    box-shadow: 0rem 0.3rem 0.6rem #00000029;
  }

  svg {
    color: #707070;
    font-size: 2.5rem;
    margin-left: 1rem;
    cursor: pointer;

    &:hover {
      color: ${darken(0.2, '#707070')}
    }
  }
`;

export const SearchInfo = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  align-items: center;
  justify-content: center;

  h3 {
    font-size: 1.4rem;
    color: #707070;
  }

  p {
    color: #222222;
    font-weight: bold;
  }
`;


// BODY

export const Body = styled.div`
  width: 100%;
  padding: 0rem 5.8rem 0rem 3.8rem;
`;

export const LoadingArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
`;

export const BodyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  
  color: #707070;
  font-weight: 600;
  font-size: 1.8rem;
`;

export const Groups = styled.div`
  display: flex;
  flex-direction: column;

`;

export const Group = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  border: solid 0.5px #707070;
  border-radius: 10px;
  padding: 2rem 2rem 4rem 2rem;
`;

export const GroupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3rem;
  align-items: flex-start;
  color: #222222;

  h2 {
    font-size: 2rem;
    font-weight: 500;
  }

  

  a {
    color: #C5004F;
    font-size: 1.6rem;
    font-weight: 600;
    &:hover {
      border-bottom: 1.5px solid #C5004F;
    }
  }
`;

export const Cards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  padding: 0rem 1rem 0rem 2rem;
  background-color: #ffffff;
  box-shadow: 0rem 0.3rem 0.6rem #00000029;
  border-radius: 10px;
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
  
  overflow-wrap: break-word;

  &:hover {
    box-shadow: 0rem 0.5rem 3rem #78819566;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-wrap: break-word;
    height: 100%;
    word-break: break-word;

    &:first-child {
      width: 100%;
    }

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    p {
      font-size: 1.8rem;
      font-weight: 500;
    }

    svg {
      margin-right: 1.5rem;
      font-size: 1.5rem;
      color: ${props => props.status ? '#00D624' : '#ff0000'}
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