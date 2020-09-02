import styled from 'styled-components'

import { darken } from 'polished'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;
`;

export const LoginContent = styled.div`
  margin: 0rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 29.4rem;
`;

export const LogoArea = styled.div`
  margin-bottom: 4.5rem;
  
  img {
    width: 17.25rem;
    height: 7.59rem;
  }
`;

export const FormArea = styled.div`

width: 100%;

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 100%;
    margin-bottom: 3rem;
    height: 4rem;

    p {
      color: red;
      margin-top: 0.5rem;
    }

    &:first-child {
      margin-bottom: 4.54rem;
    }
  }
}

input {
  width: 100%;
  height: 3.71rem;
  border: none;
  border-radius: 7px;
  color: #222222;
  padding: 1.1rem 1.3rem;
  box-shadow: 0px 5px 20px #0000001A;

  &::placeholder {
    opacity: 0.6;
  }
}

.input-error {
  border: 1px solid red;
}

button {
  border: none;
  border-radius: 7px;
  background-color: #333333;
  font-size: 1.4rem;
  color: #FFFFFF;
  width: 11rem;
  height: 3.71rem;

  &:hover {
      background-color: ${darken(0.2, '#333333')};
    }
}
 
`;

export const Language = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 10rem;

  button {
    width: 4rem;
    height: 3rem;
    background-color: #ffffff;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 5px 20px #0000001A;

    &:first-child {
      border: ${props => props.language === 'en'? '2px solid #C1C1C1' : ''}
    }

    &:last-child {
      border: ${props => props.language === 'pt'? '2px solid #C1C1C1' : ''}
    }


    &:hover {
      border: 2px solid #C1C1C1;
    }

  }

  img {
    width: 2rem;
    height: 1.5rem;
  }
`;