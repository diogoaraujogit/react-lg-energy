import { lighten } from 'polished';
import styled from 'styled-components'

import arrow_icon from '../../../assets/chevron-forward-outline.svg'

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
  margin-bottom: 1rem;
`;

export const Info = styled.div`

  > div {

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
      align-items: center;

      span {
        font-size: 1.6rem;
      }

      svg {
        color: #00D624;
        font-size: 1.6rem;
      }
    }
  }
`;

export const SearchInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0rem 6rem 0rem 10rem;
  margin-bottom: 1rem;

  .search-info {
    display: flex;

    > div {
      display: flex;
      margin-left: 2rem;
      
    }

    p, span {
      font-size: 1.6rem;
      color: #707070;
      font-weight: 400;
    }

    span {
      color: #222222;
      font-weight: 500;
    }
  }

  .values {

  }

  .phases {
    .MuiTypography-body1 {
      font-size: 1.4rem;
      color: #222222;
    }

    .MuiCheckbox-colorSecondary.Mui-checked {
      color: #222222;
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
  padding: 0rem 6rem 5rem 5rem;
  display: flex;
  flex-direction: row;
`;

export const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 27rem;
  height: 46.9rem;
  background-color: #ffffff;
  box-shadow: 0px 2px 5px #0000000D;
  border-radius: 10px;
  padding-bottom: 3rem;
  margin-right: 2rem;

  .search-select {
    padding: 1.6rem 2rem;
    border-bottom: 0.5px solid #F1F1F1;
    height:18rem;
    margin-bottom: 0.5rem;

    p {
      color: #B3B3B3;
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }

    select {
      height: 4rem;
      width: 100%;
      border: 2px solid #E6E6E6;
      border-radius: 5px;
      color: #707070;
      font-size: 1.6rem;
      padding: 0rem 1rem;
      margin-bottom: 1.2rem;
      background: url(${arrow_icon}) no-repeat right;
      -moz-appearance: none;
      -webkit-appearance: none;
      background-position-x: 95%;
    }

    option {  
      color: #707070;
      font-size: 1.6rem;
    }
  }

  .search-radio {
    display: flex;
    justify-content: space-between;
    padding: 0rem 5rem;
    margin-bottom: 1rem;

    .MuiTypography-body1 {
      font-size: 1.6rem;
      color: #222222;
    }

    .MuiRadio-colorSecondary.Mui-checked {
      color: #222222;
    }
  }

  .search-period {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    padding: 0rem 2rem;

    button {
      margin-bottom: 0.5rem;
      height: 4rem;
      background-color: #ffffff;
      color: #707070;
      font-size: 1.6rem;
      border: 1px solid #B3B3B3;
      border-radius: 5px;
      transition: all 0.2s;
      transition-property: color border-color;
    }

    .selected, button:hover {
      color: #222222;
      font-weight: 600;
      border: 2px solid #222222;
    }
  }

  .search-date {
    padding: 0rem 2rem;
    
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem;

      > div {
        display: flex;
        justify-content: center;
        border: 1px solid #B3B3B3;
        padding: 0.5rem 0rem;
        border-radius: 5px;
        width: 100%;
      }
    }

    p {
      color: #B3B3B3;
      font-size: 1.6rem;
      margin-bottom: 0.5rem;
    }

    .MuiInputBase-input {
      font-size: 1.6rem;
      text-align: center;
      font-weight: 500;
      /* border: 1px solid red;
      border-radius: 5px; */
    }

    .MuiInput-underline:hover:not(.Mui-disabled):before {
      border: none;
    }

    .MuiInput-underline:before {
      border: none;
      transition: none;
    }

    .MuiInput-underline:after {
      border: none;
    }
    
  }

  .search-button {
    padding: 0rem 2rem;
    margin-top: auto;

    button {
      width: 100%;
      height: 5rem;
      background-color: #222222;
      color: #ffffff;
      font-size: 1.8rem;
      transition: background-color 0.2s;
      border: none;
      border-radius: 5px;

      &:hover {
      background-color: ${() => lighten(0.1, '#222222')}
      }
    }
  }
`;

export const BodyContent = styled.div`
  flex: 1;
`;





