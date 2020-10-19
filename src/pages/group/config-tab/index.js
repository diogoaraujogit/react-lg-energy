import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout'
import { useHistory } from 'react-router-dom'

import {
  Container, Header, Info, Features, AddDevice, AddFilter, Search, SearchInfo,
  Body, LoadingArea, BodyMessage, Groups, Group, GroupHeader, Cards, Card,
  DelDevice, EditSave, EditSub
} from './styles';

import { MdDelete, MdEdit, MdLens } from 'react-icons/md'
import { RiFilterFill } from 'react-icons/ri'
import arrow_icon from '../../../assets/chevron-forward-outline.svg'
import Loading from '../../../components/Loading'
import Popup from 'reactjs-popup'
import { toast } from 'react-toastify'

import api_crud from '../../../services/api_crud';
import SwitchLabels from '../../../components/Switch';
import { Link } from 'react-router-dom';
import { base_device } from './base_device';

import { MdSearch, MdClear } from 'react-icons/md'
import { useSelector } from 'react-redux';
import CheckboxLabels from '../../../components/Checkbox';


const ConfigTab = () => {

  const { group } = useSelector(state => state.group)
  const { id } = group
  console.log('GRUPO NO REDUX')
  console.log(group)
  // ESTADOS INTERNOS

  const groupName = group.name || '-'
  const [actualSub, setActualSub] = useState('')

  const [bodyLoading, setBodyLoading] = useState(true)
  const [bodyMessage, setBodyMessage] = useState('')
  const [groups, setGroups] = useState([])

  const [allDevices, setAllDevices] = useState([])
  const [selectedsDevices, setSelectedsDevices] = useState([])
  const [devicesArray, setDevicesArray] = useState([])
  const [searchDevice, setSearchDevice] = useState('')

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

  async function handleRemoveDevice(id) {

    try {

      // const response = await 

    } catch (e) {

    }
  }

  async function getDevices() {

    try {

      const response = await api_crud.get('/devices')

      if (response.data) {
        setAllDevices(response.data)
        setDevicesArray(response.data)
      }

    } catch (e) {

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
          toast.info('Sucesso')
          getGroups()
          close()
        } else {
          toast.error('Erro')
        }

      } catch (e) {
        toast.error('An error occurred')
        const error = e.response?.data

        setFormError('Unable to connect to server')

        if (error) {
          if (error.statusCode === 409) {
            setFormError('Device name already exists')
          }
          else if (error.statusCode === 500) {
            setFormError('An unexpected error occurred')
          }
        }
      }

    } else {
      setFormError('Device name is required')
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

      const response = await api_crud.get(`/groups/${id}/subgroups`)

      if (response.data) {
        setGroups(response.data)
        setGroupsArray(response.data)
        setGroupsFiltered(response.data)

      }

    } catch (e) {

      setBodyMessage('Unable to load subgroups')

    }

    setBodyLoading(false)
  }

  // USE EFFECTS

  useEffect(() => {
    getGroups()
    getDevices()
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
      setBodyMessage('Nenhum dispositivo cadastrado')
    } else {
      setBodyMessage('')
    }

  }, [groupsArray])



  // FUZZY SEARCH


  useEffect(() => {

    const groupsArray_copy = [...groupsFiltered]

    const searched = groupsArray_copy.map(group => {

      let obj = Object.assign({}, group)

      const result_devices = obj.devices.filter(device =>
        device.name.toLowerCase().includes(search.toLowerCase())
      )

      obj.devices = result_devices

      return obj
    })

    const newGroups = searched.filter(group => group.devices.length > 0)

    setGroupsArray(newGroups)
  }, [search, groupsFiltered])

  useEffect(() => {

    const devicesArray_copy = [...allDevices]

    const result_devices = devicesArray_copy.filter(device =>
      device.name.toLowerCase().includes(searchDevice.toLowerCase())
    )

    setDevicesArray(result_devices)

  }, [searchDevice])



  return (
    <Container>
      <Header>
        <Info>
          <div>
            <h2>{groupName}</h2>
          </div>
          <div>
            <span>Status:&emsp;</span>
            <MdLens />
            <p>&nbsp;Active&emsp;</p>
            <MdLens />
            <p>&nbsp;Inactive</p>
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
                  <span>filter</span>
                </button>
              }
              modal
            >
              {
                close => {
                  return (
                    <AddFilter>
                      <h2>Filter</h2>
                      <div className='filter-select'>
                        <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                          <option key={0} value=''>
                            Select a group
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
                        <img src={arrow_icon} alt='' />
                      </div>

                      <div className='filter-options'>
                        <button className={filterSelect === 'all' && 'filter-selected'} onClick={() => setFilterSelect('all')}>
                          ALL
                          </button>
                        <button className={filterSelect === 'on' && 'filter-selected'} onClick={() => setFilterSelect('on')}>
                          ON
                          </button>
                        <button className={filterSelect === 'off' && 'filter-selected'} onClick={() => setFilterSelect('off')}>
                          OFF
                          </button>
                      </div>
                      <button onClick={() => removeFilter()}>
                        REMOVE FILTER
                        </button>
                      <div className='filter-buttons'>
                        <button onClick={() => close()}>
                          Cancel
                          </button>
                        <button onClick={() => handleFilter(close)}>
                          Filter
                          </button>
                      </div>
                    </AddFilter>
                  )
                }
              }

            </Popup>

            {/* ADICIONAR DEVICE */}
            <Popup
              onOpen={() => {
                setDeviceName('')
                setFormError(false)
              }}

              contentStyle={{ width: '53rem', height: '27rem', borderRadius: '1rem' }}
              trigger={
                <button className='add-device-button'>
                  New Subgroup
                  </button>
              }
              modal
            >
              {
                close => {
                  return (
                    <AddDevice formError={formError} registering={registering}>
                      <p>New Subgroup</p>
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
                          placeholder='Device name'
                        />
                        <div>
                          <button disabled={registering} onClick={() => close()}>
                            Cancel
                            </button>
                          <button disabled={registering} type='submit'>
                            Register {registering && <Loading />}
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

          </div>
        </Features>
      </Header>

      <SearchInfo>
        {
          search && <><h3>Showing results for:&nbsp;</h3>
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
                  // const group_id = group.id || ''

                  return (
                    <Group>
                      <GroupHeader>
                        <h2>{name}</h2>
                        <div>
                          <Popup
                            onOpen={() => setActualSub(name)}
                            contentStyle={{ width: '37rem', height: '54rem', borderRadius: '1rem' }}
                            trigger={
                              <p>
                                Edit Group
                              </p>
                            }
                            modal
                          >
                            {
                              close => {
                                return (
                                  <EditSub>
                                    <h3>Add Subgroup</h3>
                                    <div className='name'>
                                      <span>Subgroup name</span>
                                      <input
                                        value={actualSub}
                                        onChange={e => setActualSub(e.target.value)}
                                      />
                                    </div>
                                    <div className='search'>
                                      <Search>
                                        <div>
                                          <input
                                            type='text'
                                            maxlength='20'
                                            autoFocus
                                            value={searchDevice}
                                            onChange={event => setSearchDevice(event.target.value)}
                                          />
                                          <button onClick={() => setSearchDevice('')} >
                                            <MdClear />
                                          </button>
                                        </div>

                                      </Search>
                                    </div>
                                    <div className='devices'>
                                      {
                                        devicesArray && devicesArray.map(device => {

                                          return (
                                            <div>
                                              <CheckboxLabels
                                                label={device.name}
                                                variable={selectedsDevices}
                                                value={device.id}
                                                func={setSelectedsDevices}
                                                multiple
                                              />
                                            </div>
                                          )
                                        })
                                      }
                                    </div>
                                    <div className='buttons'>
                                      <button onClick={() => close()}>
                                        Cancel
                                      </button>
                                      <button 
                                      // onClick={() => handleEditSub(close)}
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </EditSub>
                                )
                              }
                            }

                          </Popup>

                        </div>
                      </GroupHeader>
                      <Cards>
                        {
                          devices && Array.isArray(devices) && devices.map(device => {

                            const status = true
                            const name = device.name || '-'
                            const relay_status = false
                            const id = device.id

                            return (
                              <Card status={status}>
                                <div onClick={() => history.push(`/devices/${id}`)}>
                                  <div>
                                    <MdLens />
                                  </div>
                                  <p>{name}</p>
                                </div>
                                {/* <MdDelete onClick={() => handleRemoveDevice(id)} /> */}
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

  );
}

export default ConfigTab;