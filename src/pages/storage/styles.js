import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 2rem 5.6rem;
`;

export const DiskUsage = styled.div`
  width: 30rem;
  height: 55.1rem;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  border-radius: 10px;
  margin-right: 5rem;
  padding: 1.7rem 2.6rem;
`;

export const UsageHeader = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 2rem;
    color: #B3B3B3;
    font-size: 1.8rem;
  }
  
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;

    svg {
      margin-right: 1rem;
      color: #E1E1E1;
      font-size: 1.6rem;

      &#used {
        color: #C5004F;
      }
    }

    p {
      color: #B3B3B3;
      font-size: 1.6rem;
    }

    div {
      display: flex;
      align-items: center;
    }
  }
`;

export const UsageChart = styled.div`
  
  flex: 1;
  height: 24rem;;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6rem;
  margin-bottom: 5.2rem;

  .info {
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

export const UsageInfo = styled.div`

  div {
    display: flex;
    justify-content: center;  
    font-size: 1.6rem;
    font-weight: 500;
  }
  
 .available {
  color: #222222;
  margin-bottom: 1.5rem;
 }

 .used {
  color: #C5004F;
 }

`;

export const StorageList = styled.div`
  height: 55.1rem;
  flex: 1;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 2px 5px #0000000D;
  border-radius: 10px;
  padding: 1rem 3.8rem;

  .tabs {
    margin-bottom: 3rem;
  }

  .table-header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 2.5rem;

    p {
      color: #B3B3B3;
      font-size: 1.6rem;

    }
  }

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

export const ListItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 1.9rem;
  
  p {
    color: #222222;
    font-size: 1.6rem;
    font-weight: 500;
  }
`;






