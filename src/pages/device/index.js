import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
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
import api_crud from '../../services/api_crud';
import { useDispatch, useSelector } from 'react-redux';
import { setDevice } from '../../store/modules/device/actions';
import { toast } from 'react-toastify';
import translation from './transl';

const Device = () => {

  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt

  const dispatch = useDispatch()

  const tabs = useMemo(() => [transl.Search, transl.Readings, transl.Info, transl.Settings, transl.Relay], [transl.Info, transl.Readings, transl.Relay, transl.Search, transl.Settings])
  const [tab, setTab] = useState(0)

  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')

  const { id } = useParams()

  // const { device } = useSelector(state => state.device)

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

  // FUNÇÕES

  async function getDevice() {
    setBodyLoading(true)
    setBodyMessage('')

    try {

      const response = await api_crud.get(`/devices/${id}`)

      if(response.data) {
        console.log(response.data)
        dispatch(setDevice(response.data))
      } else {
        setBodyMessage(transl.errorDevice)
      }

    } catch (e) {
      toast.error(transl.errorDevice)
      setBodyMessage(transl.errorDevice)
    }

    setBodyLoading(false)
  }

  // USE EFFECT

  useEffect(() => {
    getDevice()

        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout title={transl.title}>
      <Container>

        <Header>
          <NavBack>
            <Link to='/devices'>
              <FiArrowLeft />
            </Link>
          </NavBack>
          <NavTabs>
            <TabsComponent tabs={tabs} onTabChange={setTab} initial={tab}/>
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

export default Device;