import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0rem 7.7rem 0rem 6rem;
  margin-bottom: 3rem;
`;

export const Info = styled.div`

  div {

    &:first-child {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 4.5rem;
      margin-bottom: 2rem;

      h2 {
        font-size: 2rem;
        color: #222222;
      }

      span {
        color: #707070;
        font-size: 1.6rem;
      }

    }

    &:last-child {
      display: flex;
      flex-direction: row;
      color: #707070;
      font-size: 1.4rem;
      align-items: center;

      p {
        font-weight: 500;
      }

      svg {
        color: #00D624;

        &:last-of-type {
          color: #FF0000;
        }
      }

    }

  }
`;

export const Features = styled.div`
  > div {

&:first-child {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 4.5rem;
  margin-bottom: 2rem;
  color: #222222;

  > button {
    width: 15rem;
    height: 4.5rem;
    background-color: #ffffff;
    border: none;
    font-size: 1.6rem;
    font-weight: 500;
    box-shadow: 0rem 0.3rem 0.6rem #00000029;
    border-radius: 10px;
    transition: all 0.2s;
    transition-property: color background-color;

    &:hover {
      background-color: #222222;
      color: #ffffff;
    }
  }

}

&:last-child {
  display: flex;
  flex-direction: row;
  color: #707070;
  font-size: 1.4rem;
  align-items: center;

  p {
    font-weight: 500;
  }

  svg {
    color: #222222;

    &:last-of-type {
      color: #C1C1C1;
    }
  }

}

}
`;

export const AddDevice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 4.1rem 2.6rem 3.4rem 2.6rem; 
  color: #222222;

  p {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    height: 12rem;
    justify-content: space-between;
    flex-direction: column;

    div {
      display: flex;
      justify-content: flex-end;

      button {
        width: 12rem;
        height: 4.2rem;
        border: none;
        border-radius: 5px;
        color: #222222;
        font-size: 1.8rem;
        font-weight: 500;

        &:first-child {
          margin-right: 2rem;
          background-color: transparent;
        }

        &:last-child {
          color: #ffffff;
          background-color: #222222;
        }
      }
    }
  }

  input {
    border: none;
    border-bottom: 2px solid #C1C1C1;
    padding: 1rem 0rem;
    font-size: 1.8rem;

    &::placeholder {
      color: #B3B3B3;

    }
  }
`;


// BODY

export const Body = styled.div`
  width: 100%;
  padding: 0rem 5.8rem 0rem 3.8rem;
`;

export const LoadingArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
`;

export const BodyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
  
  color: #788195;
  font-weight: 600;
  font-size: 1.8rem;
`;

export const Groups = styled.div`
  display: flex;
  flex-direction: column;

`;

export const Group = styled.div`
  margin-bottom: 3rem;
  width: 100%;
  border: solid 0.5px #707070;
  border-radius: 10px;
  padding: 2rem 2rem 4rem 2rem;
`;

export const GroupHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 3rem;
  align-items: flex-start;


  h2 {
    font-size: 2rem;

  }

  

  a {
    color: #C5004F;
    font-size: 1.6rem;
    font-weight: 600;
    &:hover {
      border-bottom: 1.5px solid #C5004F;
    }
  }
`;

export const Cards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 2rem;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 8rem;
  padding: 2rem;
  background-color: #ffffff;
  box-shadow: 0rem 0.3rem 0.6rem #00000029;
  border-radius: 10px;
  transition: box-shadow 0.2s ease-in-out;
  cursor: pointer;
  
  overflow-wrap: break-word;

  &:hover {
    box-shadow: 0rem 0.5rem 3rem #78819566;
  }

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-wrap: break-word;
    
    word-break: break-word;

    p {
      font-size: 1.8rem;
      font-weight: 500;
    }

    svg {
      margin-right: 1.5rem;
      font-size: 1.5rem;
      color: ${props => props.status? '#00D624' : '#ff0000'}
    }
  }
`;