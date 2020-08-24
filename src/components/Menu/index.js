import React, { useState } from 'react';

import { NavLink } from 'react-router-dom'
import { MENU_CONFIG } from '../../config'
import MenuToolTip from './tooltip'

import { Container, ContentArea, Logo, Icons } from './styles';

import menu_logo from '../../assets/lg_menu_logo.png'

const Menu = () => {

  const [openMenu, setOpenMenu] = useState(false)

  const userPermissions = ['/dashboard', '/devices', '/groups', '/comparatives', '/reports', '/notifications', '/profiles', '/tariffs', '/storage']

  return (
    <Container openMenu={openMenu}>
      <ContentArea>
        <Logo onClick={() => setOpenMenu(!openMenu)}>

          <MenuToolTip title={'Menu'} placement='right-start'>
            <img src={menu_logo} alt='LG Logo' />
          </MenuToolTip>

        </Logo>
        <Icons>
          {
            Object.keys(MENU_CONFIG).map(item => (
              <>
                {userPermissions && Array.isArray(userPermissions) && userPermissions.includes(item) ?
                  <NavLink
                    onClick={() => setOpenMenu(false)}
                    to={item}
                    key={item}
                    activeClassName='menu-item-selected'>
                    
                      <MenuToolTip title={MENU_CONFIG[item].name} placement='right-start'>
                        <div>
                          {MENU_CONFIG[item].icon}
                          { <p>{MENU_CONFIG[item].name}</p> }
                        </div>
                      </MenuToolTip>
                      
                  </NavLink>
                  : 
                  <></>
                }
              </>
            ))
          }
        </Icons>
      </ContentArea>
    </Container>
  );
}

export default Menu;