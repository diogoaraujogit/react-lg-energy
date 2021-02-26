/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'
import { useHistory } from 'react-router-dom'

import {
  Container, Header, Info, Features, AddDevice, AddFilter, Search, SearchInfo,
  Body, LoadingArea, BodyMessage, GroupGrid, Group,
} from './styles';

import { MdLens } from 'react-icons/md'
import { RiFilterFill } from 'react-icons/ri'
import arrow_icon from '../../assets/chevron-forward-outline.svg'
import Loading from '../../components/Loading'
import Popup from 'reactjs-popup'
import { toast } from 'react-toastify'

import api_crud from '../../services/api_crud';
import SwitchLabels from '../../components/Switch';
import { Link } from 'react-router-dom';
import { base_device } from '../devices/base_device';

import { MdSearch, MdClear } from 'react-icons/md'
import api_notifications from '../../services/api_notifications';
import { useSelector } from 'react-redux';
import translation from './transl';


const Groups = () => {
  
  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt


  // ESTADOS INTERNOS

  const [bodyLoading, setBodyLoading] = useState(true)
  const [bodyMessage, setBodyMessage] = useState('')
  const [groups, setGroups] = useState([])

  const [devicesLength, setDevicesLength] = useState(0)

  const [deviceName, setDeviceName] = useState('')
  const [formError, setFormError] = useState(false)

  const [groupsArray, setGroupsArray] = useState([])

  const [registering, setRegistering] = useState(false)

  const [showSearchBar, setShowSearchBar] = useState(false)
  const [search, setSearch] = useState('')


  // VARIÁVEIS

  const history = useHistory()

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


  // API SEARCHES

  async function notifyCreation(title) {

    try {

      const response = await api_notifications.post('/users', {
        action: "created_group",
        userName: "teste",
        userId: 0,
        notification: {
          title: "New group registration",
          description: `Group '${title}' has been registered`
        }
      })

    } catch (e) {
      toast.error(transl.notificationError)
    }
  }

  async function handleSubmit(e, close) {
    e.preventDefault()
    setRegistering(true)

    if (deviceName) {

      try {

        const response = await api_crud.post('/groups', {
            name: deviceName,
            subgroups: []
          })

        if (response.data) {
          toast.info(transl.deviceSuccess)
          notifyCreation(deviceName)
          getGroups()
          close()
        } else {
          toast.error(transl.errorCreate)
        }

      } catch (e) {
        toast.error(transl.errorOcurred)
        const error = e.response?.data

        setFormError(transl.errorConnect)

        if (error) {
          if (error.statusCode === 409) {
            setFormError(transl.errorName)
          }
          else if (error.statusCode === 500) {
            setFormError(transl.errorUnexpected)
          }
        }
      }

    } else {
      setFormError(transl.nameRequired)
    }

    setRegistering(false)
  }

  async function getGroups() {

    setBodyLoading(true)
    setBodyMessage('')

    setSearch('')
    setShowSearchBar(false)

    try {

      const response = await api_crud.get('/groups')

      if (response.data) {
        console.log(response.data)
        setGroups(response.data)
        setGroupsArray(response.data)
      }

    } catch (e) {

      setBodyMessage(transl.errorDevices)

    }

    setBodyLoading(false)
  }

  // USE EFFECTS

  useEffect(() => {
    getGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    let count = groupsArray?.length

    setDevicesLength(count)

    if (!count || count < 1) {
      setBodyMessage(transl.noDevices)
    } else {
      setBodyMessage('')
    }

  }, [groupsArray])



  // FUZZY SEARCH


  useEffect(() => {

    const newGroups = groups.filter(group => group.name.toLowerCase().includes(search.toLowerCase()))

    setGroupsArray(newGroups)
  }, [groups, search])



  return (
    <Layout title={transl.title}>
      <Container>
        <Header>
          <Info>
            <div>
              <h2>{transl.Groups}</h2>
              <span>{`${devicesLength} ${transl.Groups}`}</span>
            </div>

          </Info>
          <Features>
            <div>
              <Search>
                {
                  showSearchBar &&
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

                <MdSearch onClick={() => clearSearch()} />

              </Search>

              {/* ADICIONAR DEVICE */}
              <Popup
                onOpen={() => {
                  setDeviceName('')
                  setFormError(false)
                }}

                contentStyle={{ width: '53rem', height: '27rem', borderRadius: '1rem' }}
                trigger={
                  <button className='add-device-button'>
                    {transl.NewDevice}
                  </button>
                }
                modal
              >
                {
                  close => {
                    return (
                      <AddDevice formError={formError} registering={registering}>
                        <p>{transl.NewDevice}</p>
                        <div>
                          <span>{formError}</span>
                        </div>
                        <form onSubmit={(e) => handleSubmit(e, close)}>
                          <input
                            maxLength='20'
                            value={deviceName}
                            onChange={event => {
                              setFormError('')
                              setDeviceName(event.target.value);
                            }}
                            placeholder={transl.DeviceName}
                          />
                          <div>
                            <button disabled={registering} onClick={() => close()}>
                              {transl.Cancel}
                            </button>
                            <button disabled={registering} type='submit'>
                              {transl.Register} {registering && <Loading />}
                            </button>
                          </div>
                        </form>
                      </AddDevice>
                    )
                  }
                }

              </Popup>
            </div>
          </Features>
        </Header>

        <SearchInfo>
          {
            search && <><h3>{transl.ShowResults}:&nbsp;</h3>
              <p>{search}</p></>
          }
        </SearchInfo>

        {/* BODY */}
        <Body>
          {bodyLoading ?
            <LoadingArea>
              <Loading />
            </LoadingArea>
            :
            bodyMessage ?
              <BodyMessage>
                {bodyMessage}
              </BodyMessage>
              :
              <GroupGrid>
                {
                  groupsArray && Array.isArray(groupsArray) && groupsArray.map(group => {
                    const id = group.id

                    return (
                      <Group onClick={() => history.push(`/groups/${id}`)}>
                        <h2>{group.name}</h2>
                        <div>
                          <div>
                            <h4>{group.totalDevices}</h4>
                            <p>&nbsp;{transl.Devices}</p>
                          </div>
                          <div>
                            <h4>{group.totalSubgroups}</h4>
                            <p>&nbsp;{transl.Subgroups}</p>
                          </div>
                        </div>
                      </Group>
                    )
                  })
                }
              </GroupGrid>
          }
        </Body>
      </Container>
    </Layout>

  );
}

export default Groups;