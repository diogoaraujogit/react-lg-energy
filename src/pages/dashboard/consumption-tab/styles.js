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

  > button {
    height: 4.5rem;
    width: 15rem;
    border: 1px solid #222222;
    border-radius: 5px;
    background-color: transparent;
    transition: all 0.2s;
    transition-property: background color;


    &:hover {
      background-color: #222222;
      color: #ffffff
    }
  }
`;

export const ShowAllModal = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .select-options {
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 5px #0000000D;
    height: 100%;
    width: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .total {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: solid 1px #F1F1F1; 
      padding: 3.7rem 0rem;
      width: 90%;

      p {
        color: #B3B3B3;
        font-size: 2.2rem;
        margin-bottom: 2.9rem;
      }

      h3 {
        color: #222222;
        font-size: 2.5rem;
        font-weight: 600;
      }
    }

    > p {
      color: #B3B3B3;
      font-size: 1.6rem;
      margin-top: 4rem;
      text-align: center;
      margin-bottom: 1rem;
    }

    .date {
      border: 0.5px solid #B3B3B3;
      border-radius: 5px;
      width: 23rem;
      height: 4rem;
      display: flex;
      align-items: center;
    }

    > button {
      background: #222222 0% 0% no-repeat padding-box;
      border: 0.5px solid #A1A1A1;
      border-radius: 5px;
      width: 22.9rem;
      height: 5rem;
      color: #FFFFFF;
      margin-top: auto;
      margin-bottom: 2.1rem;  
    }

    .MuiInputBase-input {
      font-size: 1.6rem;
      text-align: center;
      font-weight: 500;
      color: #222222;
      width: 23rem;
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
`;


export const DetailsMessage = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  height: 100%;
  width: 86.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;


export const DetailsLoading = styled.div`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 5px #0000000D;
    height: 100%;
    width: 86.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;


export const ConsumptionTable = styled.div`
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 2px 5px #0000000D;
    height: 100%;
    width: 86.8rem;
    display: flex;
    flex-direction: column;

    .table-header {
      display: grid;
      grid-template-columns: 6fr 2fr 2fr 1fr;
      padding: 3.1rem 4.3rem 2rem 2rem;
      border-bottom: 1px solid #F8F8F8;

      p {
        color: #B3B3B3;
        font-size: 1.6rem;
      }
    }

    .table-body {
      overflow-y: auto;
      flex: 1;
      max-height: 100%;
    }

    .month {
      
      display: grid;
      grid-template-columns: 6fr 2fr 2fr 1fr;
      padding: 0.5rem 4.3rem 0.5rem 2rem;
      border-bottom: 1px solid #F8F8F8;
      align-items: center;

      p {
        color: #222222;
        font-size: 1.6rem;
        font-weight: 500;
      }
      
      svg {
        font-size: 3rem;
      }
    }

    .day {   
      display: grid;
      grid-template-columns: 6fr 2fr 2fr 1fr;
      padding: 0.5rem 4.3rem 0.5rem 2rem;
      align-items: center;

      p {
        color: #222222;
        font-size: 1.4rem;
        font-weight: 400;
      }
    }
`;

export const CardsMessage = styled.div`
  width: 100%;
  height: 10rem;
  margin-bottom: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;  
  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;

export const CardsLoading = styled.div`
  width: 100%;
  height: 10rem;
  margin-bottom: 3.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding-bottom: 4rem;
  height: 83.6rem;
`;

export const DashboardCharts = styled.div`
  margin-right: 0.8rem;

  > div {
    display: flex;
  }
`;


export const NotificationsMessage = styled.div`
  margin-left: 2rem;
  padding: 1.5rem 2.7rem;
  height: 79.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;


export const NotificationsLoading = styled.div`
  margin-left: 2rem;
  padding: 1.5rem 2.7rem;
  height: 79.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const DashboardNotifications = styled.div`
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 15px #0000000D;
  border-radius: 10px;
  margin-left: 2rem;
  padding: 1.5rem 2.7rem;
  height: 79.6rem;

  .notifications-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3.2rem;

    h3 {
      color: #222222;
      font-size: 1.6rem;
      font-weight: 500;
    }

    p {
      color: #707070;
      font-size: 1.2rem;
    }
  }

  .notifications {
    max-height: 90%;
    overflow-y: auto;
  }

  .notification {
    margin-bottom: 2rem;

    h4 {
      color: #222222;
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }

    p {
      color: #707070;
      font-size: 1.2rem;
    }
  }
`;


export const ServerMessage = styled.div`
  width: 37.5rem;
  height: 37.9rem;
  margin-right: 3rem;
  padding: 1.5rem 2.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;


export const ServerLoading = styled.div`
  width: 37.5rem;
  height: 37.9rem;
  margin-right: 3rem;
  padding: 1.5rem 2.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: relative;

  .used-info {
    z-index: 99;
    display: flex;
    position: absolute;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      color: #222222;
      font-size: 3rem;
      font-weight: 500;
    }

    span {
      color: #222222;
      font-size: 1.8rem;
      font-weight: 400;
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

export const GroupsMessage = styled.div`
  flex: 1;
  padding: 1.5rem 2.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;


export const GroupsLoading = styled.div`
  flex: 1;
  padding: 1.5rem 2.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
        text-align: center;
      }

      span {
        color: #707070;
        font-size: 1.6rem;
      }
    }
  }

`;


export const DevicesMessage = styled.div`
  height: 38.5rem;
  width: 100%;
  margin-top: 3.2rem;
  padding: 3rem 3.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;


export const DevicesLoading = styled.div`
  height: 38.5rem;
  width: 100%;
  margin-top: 3.2rem;
  padding: 3rem 3.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const Devices = styled.div`
  height: 38.5rem;
  width: 100%;
  margin-top: 3.2rem;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 15px #0000000D;
  border-radius: 10px;
  padding: 3rem 3.7rem;
  display: flex;
  flex-direction: column;

  > h4 {
    color: #222222;
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  > div {
    flex: 1;
    max-height: 100%;
    width: 100%;
  }
`;