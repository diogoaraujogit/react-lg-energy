import { createGlobalStyle } from 'styled-components';

// Reset CSS básico
export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,300&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  *:focus {
    outline: 0;
  }
  html, body, #root {
    height: 100%;
  }
  
  html {
    /*font-size: 62.5%; */ /* Para facilitar a conversão px -> rem */ 
    font-size: ${props => props.rate}%; /* Outra forma de fazer a resposividade para desktops */
  }
  body {
    font: 14px 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    background: #FFFFFF;
  }
  textarea, body, input, button, select {
    font: 14px 'Roboto', sans-serif;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
  .input {
    width: 100%;
  }
`;