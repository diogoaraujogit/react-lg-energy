import { lighten } from 'polished';
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

export const FeaturesBox = styled.div`
  width: 27rem;
  height: 57.5rem;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  border-radius: 10px; 
  margin-right: 3.2rem;
  padding: 2rem;
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
  margin-bottom: 2rem;

  button {
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

export const CurrentDevices = styled.div`

  > p {
    margin-bottom: 2rem;
    font-size: 1.6rem;
    color: #222222;
  }

  > div {

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      p {
        font-size: 1.8rem;
        font-weight: 500;
      }

      svg {
        color: #B3B3B3;
        font-size: 2rem;
        margin-right: 2rem;
        transition: color 0.2s;
        cursor: pointer;

        &:hover {
          color: #ff0000;
        }
      }
    }
  }
`;

export const Scroll = styled(PerfectScrollbar)`

  overflow-y: auto;
  overflow-x: hidden;
  max-height: 29rem;
`;

export const DataBox = styled.div`
  flex: 1;
  height: 57.5rem;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  border-radius: 10px;

  .tabs {

  }

  .body {

    .header {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));

      > div {
        text-align: center;

        &:first-child {
          text-align: left;
        }
      }
    }

    .table {
      > div {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10px, 1fr));

        > div {
          text-align: center;

          &:first-child {
            text-align: left;
          }
        }
      }
    }

  }
`;