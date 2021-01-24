import styled from 'styled-components'

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
    margin-bottom: 2rem;

    span, p {
      &:first-child, &:nth-child(3) {
        text-align: center;
      }
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