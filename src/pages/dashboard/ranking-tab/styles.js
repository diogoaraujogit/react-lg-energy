import { darken, lighten } from 'polished';

import styled from 'styled-components'

import arrow_icon from '../../../assets/chevron-forward-outline.svg'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 4rem;

  > div {
    display: flex;
    flex-direction: row;
  }
`;

export const RankingChart = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  height: 55.1rem;
  width: 30rem;
  border-radius: 10px;  
  margin-right: 2.2rem;

  
  > div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3.1rem;

    p {
      color: #222222;
      font-size: 3rem;
      font-weight: 500;
    }

    span {
      color: #B40048;
      font-size: 2.5rem;
      font-weight: 500;
    }
  }

  > div:nth-child(3) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3rem;

    p:first-child{
      color: #222222;
      font-size: 1.6rem;
      margin-bottom: 1.5rem;
    }

    p:last-child {
      color: #C5004F;
      font-size: 1.6rem;
      font-weight: 500;
    }
  }

  > div:last-child {
    display: flex;
    justify-content: center;
    font-size: 1.8rem;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 5rem;
      width: 23rem;
      background-color: #222222;
      color: #FFFFFF;
      font-size: 1.8rem;
      font-weight: 500;
      border: none;
      border-radius: 5px;
    }

    svg {
      width: 3rem;
      height: 3rem;
    }
  }
`;

export const ConsumptionChart = styled.div`
  
  flex: 1;
  height: 24rem;;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4.4rem;
  margin-bottom: 3rem;
  position: relative;

  .info {
    z-index: 99;
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 10rem;

    h2 {
      color: #222222;
      font-size: 4rem;
      font-weight: 500;
    }

    p {
      color: #222222;
      font-size: 2rem;
      text-align: center;
    }
  }

  .chart {
    position: absolute;
    flex: 1;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

`;


export const RankingSearch = styled.div`
  display: flex;
  flex-direction: column;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  height: 55.1rem;
  width: 30rem;
  border-radius: 10px;  
  margin-right: 2.2rem;

  .header {
    padding-top: 3.3rem;
    display: flex;
    justify-content: center;
    font-size: 1.8rem;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 5rem;
      width: 23rem;
      background-color: transparent;
      color: #C5004F;
      font-size: 1.8rem;
      font-weight: 500;
      border: none;
      border-radius: 5px;
    }

    svg {
      width: 3rem;
      height: 3rem;
    }
  }

  .search-select {
    padding: 1.6rem 2rem;
    border-bottom: 0.5px solid #F1F1F1;
    height: 12rem;
    margin-bottom: 1rem;

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
    margin-bottom: 3rem;

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
      margin-bottom: 2rem;

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
    padding-bottom: 3.1rem;
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

export const AddDevice = styled.div`
  margin-bottom: 2rem;

  > button {
    width: 100%;
    height: 5rem;
    background: #222222 0% 0% no-repeat padding-box;
    border: 0.5px solid #A1A1A1;
    border-radius: 5px;
    color: #ffffff;
    font-size: 1.8rem;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${() => lighten(0.1, '#222222')}
    }
  }

`;

export const AddDeviceModal = styled.div`
  padding: 3rem;
  height: 100%;

  h3 {
    color: #707070;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .MuiTypography-body1 {
      font-size: 1.6rem;
      color: #222222;
      font-weight: 500;
    }

    .MuiCheckbox-colorSecondary.Mui-checked {
      color: #222222;
    }

  .devices {
    height: 30rem;
    margin-bottom: 2rem;
    overflow-y: auto;
    padding-left: 1rem;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    align-self: flex-end;

    button {
      width: 12rem;
      height: 4.2rem;
      border: none;
      border-radius: 5px;
      font-size: 1.8rem;
      font-weight: 500;
      transition: background 0.3s;

      &:first-child {
        background-color: #F8F8F8;
        color: #222222;

        &:hover {
          background-color: ${() => darken( 0.05, '#F8F8F8')}
        }
      }
      
      &:last-child {
        background-color: #C5004F;
        color: #ffffff;

        &:hover {
          background-color: ${() => darken( 0.05, '#C5004F')}
        }
      }
    }
  }
`;

export const Search = styled.div`
  display: flex;
  height: 4.5rem;
  align-items: center;
  margin-bottom: 2rem;

  > div {
    display: flex;
    height: 100%;
    width: 100%;
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
    width: 100%;
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


export const LoadingArea = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-top: 5rem;
`;

export const MessageArea = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-top: 5rem;

  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;

export const RankingList = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  height: 55.1rem;
  flex: 1;
  border-radius: 10px;
  padding: 3.1rem 1.6rem;
  overflow-y: auto;

  .table-line {
    display: grid;
    grid-template-columns: 1fr 3fr 2fr 2fr 2fr;
    margin-bottom: 0.5rem;
    transition: background 0.2s;
    height: 4rem;

    p {
      align-self: center;
    }

    span, p {
      &:first-child, &:nth-child(3) {
        text-align: center;
      }
    }
  }

  .highlighted {
    cursor: pointer;

    &:hover {
      background-color: #f2f2f2
    }
  }

  span {
    color: #B3B3B3;
    font-size: 1.6rem;
  }

  p {
    color: #222222;
    font-size: 1.6rem;
    font-weight: 500;
  }

  .table-body{

  }

`;