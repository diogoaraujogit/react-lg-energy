import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0rem 0rem 3rem 0rem;
`;

export const Header = styled.div`
  width: 100%;
  padding: 0rem 6rem;
  margin-bottom: 5rem;

  .MuiTypography-body1 {
      font-size: 1.6rem;
      color: #222222;
    }
`;

export const Body = styled.div`
  padding: 0rem 6rem;
`;

export const SingleNotification = styled.div`
  display: flex;


  .delete {
    margin-right: 4rem;

    svg {
      color: #FF0000;
      font-size: 2rem;
      margin-top: 5px;
    }
  }
`;

export const Notification = styled.div`
  margin-bottom: 2rem;
  
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
