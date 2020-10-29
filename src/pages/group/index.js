import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import Layout from '../../components/Layout'

import { Container, Header, NavBack, NavTabs, LoadingArea, BodyMessage, Body } from './styles';
import SearchTab from './search-tab';
import ConfigTab from './config-tab';
import InfoTab from './info-tab';
import TabsComponent from '../../components/Tabs';
import Loading from '../../components/Loading'

import { FiArrowLeft } from 'react-icons/fi'
import api_crud from '../../services/api_crud';
import { useDispatch } from 'react-redux';
import { setGroup } from '../../store/modules/group/actions';
import { toast } from 'react-toastify';

const Group = () => {

  const dispatch = useDispatch()

  const tabs = useMemo(() => ['Search', 'Settings', 'Info'], [])
  const [tab, setTab] = useState(0)

  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')

  const { id } = useParams()

  const renderTab = () => {
    switch (tab) {
      case 0:
        return <SearchTab />
      case 1:
        return <ConfigTab />
      case 2:
        return <InfoTab />
      default:
        return <h1> 404 </h1>
    }

  }

  // FUNÇÕES

  async function getGroup() {
    setBodyLoading(true)
    setBodyMessage('')

    try {

      const response = await api_crud.get(`/groups/${id}`)

      if (response.data) {
        console.log(response.data)
        dispatch(setGroup(response.data))
      } else {
        setBodyMessage('Unable to get device')
      }

    } catch (e) {
      toast.error('Unable to get device')
      setBodyMessage('Unable to get device')
    }

    setBodyLoading(false)
  }

  // USE EFFECT

  useEffect(() => {
    getGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout title='Group'>
      <Container>

        <Header>
          <NavBack>
            <Link to='/groups'>
              <FiArrowLeft />
            </Link>
          </NavBack>
          <NavTabs>
            <TabsComponent tabs={tabs} onTabChange={setTab} initial={tab} />
          </NavTabs>

        </Header>

        <Body>
          {
            bodyLoading ?
              <LoadingArea>
                <Loading />
              </LoadingArea>
              :
              bodyMessage ?
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

export default Group;