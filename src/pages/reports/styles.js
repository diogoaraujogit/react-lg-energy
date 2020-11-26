import { darken, lighten } from 'polished';
import styled from 'styled-components'
import PerfectScrollbar from 'react-perfect-scrollbar';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 2rem 4rem 0rem 5.6rem;
  margin-bottom: 5rem;
`;

export const LoadingArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;

export const PageMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;

  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;


export const FeaturesBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 27rem;
  height: 57.5rem;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  border-radius: 10px; 
  margin-right: 3.2rem;
  padding: 2rem;

  .create-report-btn {
    display: flex;
    margin-top: auto;

    > button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
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

    .MuiCircularProgress-root {
      width: 2rem !important;
      height: 2rem !important;
      margin-left: 1rem;
    }

    .MuiCircularProgress-svg {
      color: #ffffff;
      opacity: 1;
      width: 2rem;
      height: 2rem;
    }
  }
`;

export const Period = styled.div`

  margin-bottom: 3rem;

    p {
      color: #B3B3B3;
      font-size: 1.4rem;
    }

    .radio-buttons {
      margin-bottom: 1.5rem;
    }
    
    .MuiTypography-body1 {
      font-size: 1.6rem;
      color: #222222;
    }

    .MuiRadio-colorSecondary.Mui-checked {
      color: #222222;
    }
    
    .date-input {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      border: 0.5px solid #B3B3B3;
      border-radius: 5px;
      height: 4rem;
    }

    .MuiInputBase-input {
      font-size: 1.6rem;
      text-align: center;
      font-weight: 500;
      color: #222222;
      width: 100%;
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
`;

export const AddDevice = styled.div`
  margin-bottom: 3rem;

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

  > input {
    border: none;
    border-bottom: 1px solid #B3B3B3;
    margin-top: 3rem;
    
    font-size: 1.8rem;
    padding: 0.5rem 0rem;

    ::placeholder {
      color: #B3B3B3;
      font-weight: 300;
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
          background-color: ${() => darken(0.05, '#F8F8F8')}
        }
      }
      
      &:last-child {
        background-color: #C5004F;
        color: #ffffff;

        &:hover {
          background-color: ${() => darken(0.05, '#C5004F')}
        }
      }
    }
  }
`;

export const AddItemTabs = styled.div`

margin-bottom: 2rem;

.MuiTabs-root {
    max-height: 4rem;
    min-height: 4rem;
  }

  .MuiTabs-flexContainer {
    max-height: 4rem;
    min-height: 4rem;
  }

  .MuiButtonBase-root {
    max-height: 4rem;
    min-height: 4rem;
    max-width: 14rem;
    min-width: 14rem;

    > span {
      color: #818181;
      font-size: 1.4rem;
    }
  }

  .Mui-selected {
    > span {
      color: #222222;
      font-weight: 500;
    }
  }

  .MuiTabs-indicator {
    background-color: #222222;
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


export const CurrentDevices = styled.div`

  > p {
    margin-bottom: 1rem;
    font-size: 1.4rem;
    color: #B3B3B3;
  }

  .MuiTypography-body1 {
      font-size: 1.6rem;
      color: #222222;
  }

  .MuiCheckbox-colorSecondary.Mui-checked {
      color: #222222;
  }
`;


export const BodyLoading = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

export const BodyMessage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-top: 5rem;

  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;

export const DataBox = styled.div`
  flex: 1;
  max-height: 57.5rem;
  
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.5rem 3rem;
  }
`;

export const Report = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 15px #0000000D;
  border-radius: 10px;
  height: 14rem;
  padding: 2.3rem 2.3rem 2.3rem 3rem;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1.2rem;

    > div {
      display: flex;
      flex-direction: row;

      > svg {
        font-size: 3rem;
        transition: color 0.3s; 
        cursor: pointer;
        margin-left: 1rem;

        &:hover {
          color: red;
        }

        &:first-child {
          &:hover {
          color: green;
          }
        }
      }
    }
  }


  h3 {
    color: #C5004F;
    font-size: 2rem;
    font-weight: 500;
  }

  

  .deleting {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    
    .MuiCircularProgress-root {
      width: 2rem !important;
      height: 2rem !important;
      
    }

    .MuiCircularProgress-svg {
      color: red;
      opacity: 1;
      width: 2rem;
      height: 2rem;
    }
    
  }

  p {
    color: #707070;
    font-size: 1.6rem;
    font-weight: 400;
    margin-bottom: 1.3rem;
  }
`;