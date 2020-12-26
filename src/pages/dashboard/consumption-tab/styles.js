import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0rem 6rem;
`;

export const ShowAll = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;

  button {
    height: 4.5rem;
    width: 15rem;
    border: 1px solid #222222;
    border-radius: 5px;
    background-color: transparent;
  }
`;

export const ConsumptionCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2.8rem;
  margin-bottom: 3.2rem;

  > div {
    width: 100%;
    height: 10rem;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 10px #0000000D;
    border-radius: 5px;
    padding: 1rem;
  }

  .header {
    display: flex;
    justify-content: space-between;

    p {
      color: #707070;
      font-size: 1.2rem;
    }

    span {
      color: #B3B3B3;
      font-size: 0.8rem;
    }
  }

  .values {
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      color: #C5004F;
      font-size: 2.3rem;
      font-weight: 500;
    }

    h4 {
      color: #707070;
      font-size: 1.6rem;
      font-weight: 500;
    }
  }
`;

export const DashboardHighlights = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  
`;

export const DashboardCharts = styled.div`
  margin-right: 0.8rem;

  > div {
    display: flex;
  }
`;

export const DashboardNotifications = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 15px #0000000D;
  border-radius: 10px;
  margin-left: 2rem;
`;

export const Server = styled.div`
  width: 37.5rem;
  height: 37.9rem;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 15px #0000000D;
  border-radius: 10px;
  margin-right: 3rem;
  padding: 1.5rem 2.7rem;

  h4 {
    color: #222222;
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 1.3rem;
  }

  h3 {
    color: #B3B3B3;
    font-size: 1.8rem;
    margin-bottom: 3rem;
    text-align: center;
  }

  .data {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .legend {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    padding-left: 1.3rem;
    margin-right: 3rem;

    > div {
      display: flex;

      p {
        font-size: 1.6rem;
        color: #B3B3B3;
      }

      svg {
        font-size: 1.6rem;
        margin-right: 1rem;
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      font-size: 1.6rem;

      :first-child {
        color: #222222;
        margin-bottom: 1.7rem;
      }

      :last-child {
        color: #C5004F;
        font-weight: 500;
      }
    }
  }
`;

export const UsageChart = styled.div`
  
  flex: 1;
  height: 17rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;


  .used-info {
    z-index: 99;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      color: #222222;
      font-size: 4rem;
    }

    p {
      color: #222222;
      font-size: 2.4rem;
    }
  }

  .chart {
    position: relative;
    flex: 1;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

`;

export const Groups = styled.div`
  flex: 1;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 15px #0000000D;
  border-radius: 10px;
  padding: 1.5rem 2.7rem;

  h4 {
    color: #222222;
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 5.4rem;
  }

  h3 {
    color: #707070;
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 500;
  }

  h2 {
    color: #C5004F;
    font-size: 4.8rem;
    margin-bottom: 5.8rem;
    text-align: center;
    font-weight: 500;
  }

  > div {
    display: flex;
    justify-content: space-between;
    padding: 0rem 10rem;

    > div {
      display: flex;
      flex-direction: column;

      p {
        color: #222222;
        font-size: 2.4rem;
        font-weight: 500;
      }

      span {
        color: #707070;
        font-size: 1.6rem;
      }
    }
  }

`;

export const Devices = styled.div`

`;