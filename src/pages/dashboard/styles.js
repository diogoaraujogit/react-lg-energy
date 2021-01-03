import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Tabs = styled.div`
  padding: 0rem 10rem;

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

export const PageContent = styled.div`

`;