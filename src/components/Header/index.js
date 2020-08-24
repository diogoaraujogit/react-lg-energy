import React, { useState } from 'react';

import { Container, ContentArea, Icons } from './styles';

import { Link } from 'react-router-dom'
import WrapperButton from './wrapper'

import { MdSearch, MdPowerSettingsNew, MdNotifications, MdClear } from 'react-icons/md'


const Header = (props) => {


  const [showSearchBar, setShowSearchBar] = useState(false)
  const title = props.title
  const search = props.search
  const setSearch = props.setSearch
  const enableElasticSearch = props.enableElasticSearch

  // FUNÇÕES

  function clearSearch() {
    setSearch('')
    console.log(showSearchBar)
    setShowSearchBar(!showSearchBar)
  }

  function handleKeyPress(event) {
    if (event.keyCode === 27) {
      clearSearch()
    }
  }

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
          {
            showSearchBar && enableElasticSearch &&
            <div>
              <input
                type='text'
                maxlength='20'
                autoFocus
                value={search}
                onKeyDown={handleKeyPress}
                onChange={event => setSearch(event.target.value)}
              />
              <button onClick={() => setSearch('')} >
                <MdClear />
              </button>
            </div>
          }

          {
            enableElasticSearch &&
            <WrapperButton tip='Buscar'>
              <MdSearch onClick={() => clearSearch()} />
            </WrapperButton>
          }

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