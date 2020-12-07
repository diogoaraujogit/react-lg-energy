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
  padding: 0rem 7.6rem;
`;

export const Body = styled.div`
  padding: 0rem 7.6rem;
`;

export const SingleNotification = styled.div`
  display: flex;

`;

export const Notification = styled.div`
  margin-bottom: 2rem;


  .header {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;

    > div {
      display: flex;
      flex-direction: row;
      margin-left: auto;
      margin-right: 2rem;
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  margin-top: auto;
  justify-content: center;
`;
