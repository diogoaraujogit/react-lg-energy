import React from 'react';

import Menu from '../Menu'
import Header from '../Header'

import { Container, MenuArea, ContentArea, HeaderArea, PageArea } from './styles';

const Layout = (props) => {


  return (

    <Container>

      <MenuArea>
        <Menu />
      </MenuArea>

      <ContentArea>
        <HeaderArea>
          <Header title={props.title} />
        </HeaderArea>
        <PageArea>
          {props.children}
        </PageArea>
      </ContentArea>

    </Container>
  );
}

export default Layout;