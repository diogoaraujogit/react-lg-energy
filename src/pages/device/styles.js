import styled from 'styled-components'

import { lighten } from 'polished'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 4rem;

  padding: 0rem 5rem;
  margin-bottom: 2rem;
`;

export const NavBack = styled.div`
  margin-right: 5rem;

  svg {
    font-size: 3rem;
    cursor: pointer;
    color: #222222;
    transition: color 0.3s;

    &:hover {
      color: ${() => lighten(0.2, '#222222')}
    }
  }
`;

export const NavTabs = styled.div`
  height: 100%;

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
`;