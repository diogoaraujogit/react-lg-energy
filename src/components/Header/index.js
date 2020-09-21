import React from 'react';

import { Container, ContentArea, Icons } from './styles';

import { Link } from 'react-router-dom'
import WrapperButton from './wrapper'

import { MdPowerSettingsNew, MdNotifications } from 'react-icons/md'


const Header = (props) => {


  const title = props.title

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