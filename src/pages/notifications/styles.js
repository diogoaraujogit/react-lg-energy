import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  padding: 0rem 0rem 2rem 0rem;
`;

export const LoadingArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;
`;

export const MessageArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5rem;

  color: #707070;
  font-size: 2rem;
  font-weight: 600;
`;


export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  padding: 0rem 6rem;
  margin-bottom: 5rem;
  display: flex;
  align-items: center;

  .MuiTypography-body1 {
      font-size: 1.6rem;
      color: #222222;
  }

  .delete-all {
    display: flex;
    cursor: pointer;
    margin-left: 2rem;

    svg {
      font-size: 2rem;
      color: red;
      margin-right: 1rem;
    }

    p {
      font-size: 1.6rem;
      color: #222222;
    }
  }
`;

export const Body = styled.div`
  padding: 0rem 6rem;
  flex: 1;
  overflow-y: auto;
`;

export const SingleNotification = styled.div`
  display: flex;
  width: 100%;

  .delete {
    margin-right: 4rem;

    svg {
      color: #FF0000;
      font-size: 2rem;
      margin-top: 5px;
      cursor: pointer;
    }
  }
`;

export const Notification = styled.div`
  margin-bottom: 2rem;
  flex: 1;  
  margin-top: 5px;

  .header {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;

    h4 {
      color: #222222;
      font-size: 1.8rem;
      font-weight: 500;
    }

    p {
      color: #707070;
      font-size: 1.8rem;
    }

    > div {
      display: flex;
      flex-direction: row;
      margin-left: auto;
      margin-right: 2rem;
    }
  }

  .body {
    p {
      color: #707070;
      font-size: 1.6rem;
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  margin-top: auto;
  justify-content: center;
`;
