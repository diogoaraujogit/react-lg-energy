import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Content = styled.div`
  padding: 2rem 6rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6rem;

  .peak {
    display: flex;
    align-items: center;
    gap: 2rem;

    > p {
      font-size: 1.6rem;
      color: #222222;
      font-weight: 600;
    }

    > div {
      display: flex;
      align-items: center;
      gap: 1.3rem;

      p {
        color: #788195;
        font-size: 1.6rem;
      }

      div {
        color: #C5004F;
        font-weight: 600;
        font-size: 1.6rem;
      }
    }
  }

  .edit {

    > div {
      display: flex;
      gap: 3rem;
    }

    .cancel {
      background-color: transparent;
      color: #222222;
      border: none;
      font-size: 1.6rem;
      font-weight: 500;
    }

    .save, > button {
      height: 4.2rem;
      width: 11rem;
      background-color: #222222;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.6rem;

      svg {
        font-size: 1.6rem;
      }
    }
  }
`;

export const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 6.4rem;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    h4 {
      font-size: 1.8rem;
      color: #222222;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    > div {
      height: 8rem;
      width: 27.5rem;
      background: #FFFFFF 0% 0% no-repeat padding-box;
      box-shadow: 0px 2px 5px #0000000D;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      > div {
        p, input {
          font-size: 1.8rem;
          font-weight: bold;
          color: #C5004F;
          border: none;
          text-align: center;
        }

        input {
          border-bottom: 1px solid #222222;
          width: 12rem;
        }
      }
    }
  }
`;

export const Previous = styled.div`
  h3 {
    color: #707070;
    font-weight: 500;
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  > div {
    width: 90rem;

    > div {
      display: flex;
      justify-content: space-between;
      height: 6rem;
      align-items: center;
      border-bottom: 1px solid #B3B3B3;
      padding: 0rem 2rem;

      > div {
        display: flex;
        gap: 2rem;

        p {
          color: #707070;
          font-size: 1.4rem;
          font-weight: 400;
        }

        span {
          color: #222222;
          font-size: 1.4rem;
          font-weight: 500;
        }
      }
    }
  }
`;
