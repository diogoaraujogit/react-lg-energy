import React from 'react';

import { Container, ContentArea, Icons } from './styles';

import { Link } from 'react-router-dom'
import WrapperButton from './wrapper'

import { MdPowerSettingsNew, MdNotifications } from 'react-icons/md'
import { Language } from '../../pages/login/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../store/modules/intl/actions'
import Flag from 'react-flagkit' ;

const Header = (props) => {

  const dispatch = useDispatch()
  const title = props.title
  const { language } = useSelector(props => props.intl)

  function handleLogout() {
    // api.api_notifications_post(`Logout de usuário`, 'Usuários', `O usuário '${username}' realizou um logout do sistema`)
    // localStorage.removeItem('authenticated')
  }


  return (
    <Container>
      <ContentArea>

        <h1>
          {title.toUpperCase()}
        </h1>

        <Icons>

        <Language style={{marginTop: '0rem'}} language={language}>
          <button onClick={() => dispatch(setLanguage('en'))}>
            <Flag country="US" />
          </button>
          <button onClick={() => dispatch(setLanguage('pt'))}>
            <Flag country="BR" />
          </button>
        </Language>

          <WrapperButton tip='Notifications'>
            <Link to='/notifications'>
              <MdNotifications />
            </Link>
          </WrapperButton>

          <WrapperButton tip='Logout'>
            <Link to='/' onClick={() => handleLogout()}>
              <MdPowerSettingsNew />
            </Link>
          </WrapperButton>
        </Icons>
      </ContentArea>
    </Container>
  );
}

export default Header;