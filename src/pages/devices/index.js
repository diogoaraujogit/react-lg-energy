import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout'
import { useHistory } from 'react-router-dom'

import {
  Container, Header, Info, Features, AddDevice, AddFilter, Search, SearchInfo,
  Body, LoadingArea, BodyMessage, Groups, Group, GroupHeader, Cards, Card
} from './styles';

import { MdLens } from 'react-icons/md'
import { RiFilterFill } from 'react-icons/ri'
import arrow_icon from '../../assets/chevron-forward-outline.svg'
import Loading from '../../components/Loading'
import Popup from 'reactjs-popup'
import { toast } from 'react-toastify'

import api_crud from '../../services/api_crud';
import api_notifications from '../../services/api_notifications';
import SwitchLabels from '../../components/Switch';
import { Link } from 'react-router-dom';
import { base_device } from './base_device';

import { MdSearch, MdClear } from 'react-icons/md'
import { useSelector } from 'react-redux';
import translation from './transl';


const Devices = () => {

  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt


  // ESTADOS INTERNOS

  const [bodyLoading, setBodyLoading] = useState(true)
  const [bodyMessage, setBodyMessage] = useState('')
  const [groups, setGroups] = useState([])

  const [switchDisabled, setSwitchDisabled] = useState(false)
  const [devicesLength, setDevicesLength] = useState(0)

  const [deviceName, setDeviceName] = useState('')
  const [formError, setFormError] = useState(false)

  const [disableSchedules, setDisableSchedules] = useState(false)
  const [filterSelect, setFilterSelect] = useState('all')
  const [filterOption, setFilterOption] = useState('')
  const [isFiltered, setIsFiltered] = useState(false)

  const [groupsArray, setGroupsArray] = useState([])
  const [groupsFiltered, setGroupsFiltered] = useState([])

  const [registering, setRegistering] = useState(false)

  const [showSearchBar, setShowSearchBar] = useState(false)
  const [search, setSearch] = useState('')


  // VARIÁVEIS

  const history = useHistory()

  // FUNÇÕES

  const handleFilter = (close) => {

    if (!filterOption && filterSelect === 'all') {
      removeFilter()
    }

    if (filterOption) {
      setIsFiltered(true)
      const filteredGroups = groups.filter(group => group.name === filterOption)
      setGroupsArray(filteredGroups)
      setGroupsFiltered(filteredGroups)
    }

    close()
  }

  const removeFilter = () => {
    setFilterOption('')
    setFilterSelect('all')
    setIsFiltered(false)
    setGroupsArray(groups)
    setGroupsFiltered(groups)
  }

  function handlePowerDevice(checked, setChecked) {
    //setSwitchDisabled(true)
    setChecked(!checked)
    // setDevicePower(!devicePower)
  }


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

  async function notifyCreation(deviceName) {

    try {

      const response = await api_notifications.post('/users', {
        action: "created_device",
        userName: "teste",
        userId: 0,
        notification: {
          title: "New device registration",
          description: `Device '${deviceName}' has been registered`
        }
      })

    } catch(e) {
      toast.error(transl.notificationError)
    }
  }

  async function handleSubmit(e, close) {
    e.preventDefault()
    setRegistering(true)

    if (deviceName) {

      try {

        const response = await api_crud.post('/devices', {
            ...base_device, name: deviceName
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
        toast.error(transl.errorCreate)
        const error = e.response?.data

        setFormError(transl.errorConnect)

        if (error) {
          if (error.statusCode === 409) {
            setFormError(transl.errorName)
          }
          else if (error.statusCode === 500 || error.statusCode === 400) {
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
    removeFilter()
    setSearch('')
    setShowSearchBar(false)

    try {

      const response = await api_crud.get('/groups/devices')

      if (response.data) {
        setGroups(response.data)
        setGroupsArray(response.data)
        setGroupsFiltered(response.data)

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

    let count = 0

    groupsArray && Array.isArray(groupsArray) && groupsArray.map(group => {
      const devices = group.devices.length
      count = count + devices
      return count
    })

    setDevicesLength(count)

    if (count < 1) {
      setBodyMessage(transl.noDevices)
    } else {
      setBodyMessage('')
    }

  }, [groupsArray, transl.noDevices])



  // FUZZY SEARCH


  useEffect(() => {

    const groupsArray_copy = [...groupsFiltered]

    const searched = groupsArray_copy.map(group => {

      let obj = Object.assign({}, group)

      const result_devices = obj.devices.filter(device =>
        device.name.toLowerCase().includes(search.toLowerCase()) ||
        device.idLora?.toLowerCase().includes(search.toLowerCase())
      )

    obj.devices = result_devices

      return obj
    })

    const newGroups = searched.filter(group => group.devices.length > 0)

    setGroupsArray(newGroups)
  }, [search, groupsFiltered])




  return (
    <Layout title={transl.title}>
      <Container>
        <Header>
          <Info>
            <div>
              <h2>{transl.Devices}</h2>
              <span>{`${devicesLength} ${transl.Devices}`}</span>
            </div>
            <div>
              <span>Status:&emsp;</span>
              <MdLens />
              <p>&nbsp;{transl.Active}&emsp;</p>
              <MdLens />
              <p>&nbsp;{transl.Inactive}</p>
            </div>
          </Info>
          <Features disableSchedules={disableSchedules} filtered={isFiltered}>
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



              {/* FILTRAR */}

              <Popup
                onOpen={() => {
                }}

                contentStyle={{ width: '37rem', height: '36rem', borderRadius: '1rem' }}
                trigger={
                  <button className='filter-button'>
                    <RiFilterFill />
                    <span>{transl.filter}</span>
                  </button>
                }
                modal
              >
                {
                  close => {
                    return (
                      <AddFilter>
                        <h2>{transl.Filter}</h2>
                        <div className='filter-select'>
                          <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                            <option key={0} value=''>
                              {transl.SelectGroup}
                            </option>
                            {
                              groups && Array.isArray(groups) && groups.map(group => {

                                return (
                                  <option key={groups.indexOf(group) + 1} value={group.name}>
                                    {group.name}
                                  </option>
                                )
                              })
                            }
                          </select>
                        </div>

                        <div className='filter-options'>
                          <button className={filterSelect === 'all' && 'filter-selected'} onClick={() => setFilterSelect('all')}>
                            {transl.All}
                          </button>
                          <button className={filterSelect === 'on' && 'filter-selected'} onClick={() => setFilterSelect('on')}>
                            {transl.On}
                          </button>
                          <button className={filterSelect === 'off' && 'filter-selected'} onClick={() => setFilterSelect('off')}>
                            {transl.Off}
                          </button>
                        </div>
                        <button onClick={() => removeFilter()}>
                          {transl.RemoveFilter}
                        </button>
                        <div className='filter-buttons'>
                          <button onClick={() => close()}>
                            {transl.Cancel}
                          </button>
                          <button onClick={() => handleFilter(close)}>
                            {transl.Filter}
                          </button>
                        </div>
                      </AddFilter>
                    )
                  }
                }

              </Popup>

              <button className='disable-schedules' onClick={() => setDisableSchedules(!disableSchedules)}>
                {disableSchedules ? transl.SchedulesDisabled : transl.DisableSchedules}
              </button>


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
            <div>
              <span>{transl.Relay}:&emsp;</span>
              <MdLens />
              <p>&nbsp;ON&emsp;</p>
              <MdLens />
              <p>&nbsp;OFF</p>
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
              <Groups>
                {
                  groupsArray && Array.isArray(groupsArray) && groupsArray.map(group => {

                    const devices = group.devices || []
                    const name = group.name || '-'
                    const group_id = group.id || ''

                    return (
                      <Group>
                        <GroupHeader>
                          <h2>{name}</h2>
                          <div>
                            <Link to={`/groups/${group_id}`}>
                              {transl.SeeGroup}
                            </Link>
                          </div>
                        </GroupHeader>
                        <Cards>
                          {
                            devices && Array.isArray(devices) && devices.map(device => {

                              const status = true
                              const name = device.name || '-'
                              const relay_status = false
                              const id = device.id
                              const idLora = device.idLora

                              return (
                                <Card status={status}>
                                  <div onClick={() => history.push(`/devices/${id}`)}>
                                    <div>
                                      <MdLens />
                                    </div>
                                    <div className='card-names'>
                                      <p>{name}</p>
                                      <span>{idLora && `id: ${idLora}`}</span>
                                    </div>
                                  </div>
                                  <SwitchLabels label='' func={(checked, setChecked) => handlePowerDevice(checked, setChecked)} variable={relay_status}
                                    fontSize={'2.4rem'} font480={'1.6rem'} disabled={switchDisabled} size='medium'
                                  />
                                </Card>
                              )
                            })
                          }
                        </Cards>
                      </Group>
                    )
                  })
                }
              </Groups>
          }
        </Body>
      </Container>
    </Layout>

  );
}

export default Devices;