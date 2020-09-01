import React from 'react';
import { Router } from 'react-router-dom';


// Our modules
import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';
import useWindowSize from "./styles/optional-desktop-responsive"
import { ToastContainer } from 'react-toastify'

const App = props => {
  
    //const rate = 62.5
    const rate = useWindowSize()


  return (
        <Router history={history}>
            <Routes></Routes>
            <GlobalStyle rate={rate} />
            <ToastContainer autoClose={4000} />
        </Router>
)};

export default App;