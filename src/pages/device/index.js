import React, { useState, useMemo } from 'react';
import Layout from '../../components/Layout'

import { Container, Header, NavBack, NavTabs, LoadingArea, BodyMessage, Body } from './styles';
import SearchTab from './search-tab';
import ReadTab from './read-tab';
import InfoTab from './info-tab';
import ConfigTab from './config-tab';
import RelayTab from './relay-tab';
import TabsComponent from '../../components/Tabs';
import Loading from '../../components/Loading'

import { FiArrowLeft } from 'react-icons/fi'

const Device = () => {


  const tabs = useMemo(() => ['Search', 'Readings', 'Info', 'Settings', 'Relay'], [])
  const [tab, setTab] = useState(0)

  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')

  const renderTab = () => {
    switch (tab) {
      case 0:
        return <SearchTab />
      case 1:
        return <ReadTab />
      case 2:
        return <InfoTab />
      case 3:
        return <ConfigTab />
      case 4:
        return <RelayTab />
      default:
        return <h1> 404 </h1>
    }

  }


  return (
    <Layout title='Device'>
      <Container>

        <Header>
          <NavBack>
            <FiArrowLeft />
          </NavBack>
          <NavTabs>
            <TabsComponent tabs={tabs} onTabChange={setTab} />
          </NavTabs>

        </Header>

        <Body>
          {
            bodyLoading?
            <LoadingArea>
              <Loading />
            </LoadingArea>
            :
            bodyMessage?
            <BodyMessage>
              {bodyMessage}
            </BodyMessage>
            :
            renderTab()
          }
        </Body>

      </Container>
    </Layout>

  );
}

export default Device;