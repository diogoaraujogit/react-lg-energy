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
import api_notifications from '../../../services/api_notifications';
import translation from '../transl';


const ConfigTab = () => {

  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt

  const { group } = useSelector(state => state.group)
  const { id } = group
  // ESTADOS INTERNOS

  const groupName = group.name || '-'
  const [actualSub, setActualSub] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)


  const [bodyLoading, setBodyLoading] = useState(true)
  const [bodyMessage, setBodyMessage] = useState('')
  const [groups, setGroups] = useState([])

  const [allDevices, setAllDevices] = useState([])
  const [selectedsDevices, setSelectedsDevices] = useState([])
  const [devicesArray, setDevicesArray] = useState([])
  const [searchDevice, setSearchDevice] = useState('')

  // const [devicesLength, setDevicesLength] = useState(0)

  const [subName, setSubName] = useState('')
  const [formError, setFormError] = useState(false)

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

  async function handleEditSub(sub) {
    setSaving(true)

    try {

      const response = await api_crud.patch(`groups/${id}/subgroups/${sub.id}`, {
        name: actualSub, devices: selectedsDevices
      })

      if (response.data) {
        toast.success(transl.updateSuccess)
        getGroups()
        getDevices()
      }

    } catch (e) {
      toast.error(transl.updateError)
    }

    setSaving(false)
  }

  async function notifyRemoveDevice(title) {

    try {

      const response = await api_notifications.post('/users', {
        action: "device_removed_from_group",
        userName: "teste",
        userId: 0,
        notification: {
          title: "Device removed from group",
          description: `Device '${title}' has been removed from group '${groupName}'`
        }
      })

    } catch(e) {
      toast.error(transl.notificationError)
    }
  }

  async function handleRemoveDevice(device) {
    setDeleting(true)

    try {

      const response = await api_crud.patch(`devices/${device.id}`, {
        idSubgroup: null
      })

      if (response.data) {
        toast.info(transl.deviceRemovedSuccess)
        notifyRemoveDevice(device.name)
        getGroups()
        getDevices()
      }

    } catch (e) {
      toast.error(transl.deviceRemovedError)
    }

    setDeleting(false)
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

    if (subName) {

      try {

        const response = await api_crud.post(`/groups/${id}/subgroups`, {
          devices: [], name: subName
        })

        if (response.data) {
          toast.info('Sucess')
          getGroups()
          close()
        } else {
          toast.error('Error trying to create subgroup')
        }

      } catch (e) {
        toast.error(transl.errorOcurred)
        const error = e.response?.data

        setFormError(transl.errorConnect)

        if (error) {
          if (error.statusCode === 409) {
            setFormError('Subgroup name already exists')
          }
          else if (error.statusCode === 500) {
            setFormError(transl.errorUnexpected)
          }
        }
      }

    } else {
      setFormError('Subgroup name is required')
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

    // let count = 0

    // groupsArray && Array.isArray(groupsArray) && groupsArray.map(group => {
    //   const devices = group.devices.length
    //   count = count + devices
    //   return count
    // })

    // setDevicesLength(count)

    if (groupsArray && Array.isArray(groupsArray) && groupsArray.length < 1) {
      setBodyMessage('No subgroups found')
    } else {
      setBodyMessage('')
    }

  }, [groupsArray])



  // FUZZY SEARCH


  useEffect(() => {

    if (search) {
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

    } else {
      setGroupsArray(groupsFiltered)
    }


  }, [search, groupsFiltered])

  useEffect(() => {

    const devicesArray_copy = [...allDevices]

    const result_devices = devicesArray_copy.filter(device =>
      device.name.toLowerCase().includes(searchDevice.toLowerCase())
    )

    setDevicesArray(result_devices)

  }, [allDevices, searchDevice])



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
            <p>&nbsp;{transl.Active}&emsp;</p>
            <MdLens />
            <p>&nbsp;{transl.Inactive}</p>
          </div>
        </Info>
        <Features filtered={isFiltered}>
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

              contentStyle={{ width: '37rem', height: '30rem', borderRadius: '1rem' }}
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
                      <h2>Filter</h2>
                      <div className='filter-select'>
                        <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                          <option key={0} value=''>
                            Select a subgroup
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

            {/* ADICIONAR DEVICE */}
            <Popup
              onOpen={() => {
                setSubName('')
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
                          value={subName}
                          onChange={event => {
                            setFormError('')
                            setSubName(event.target.value);
                          }}
                          placeholder='Subgroup name'
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
                  const subID = group.id
                  // const group_id = group.id || ''

                  return (
                    <Group>
                      <GroupHeader>
                        <h2>{name}</h2>
                        <div>
                          <Popup
                            onOpen={() => {
                              setActualSub(name)
                              setSelectedsDevices(devices)
                            }}
                            contentStyle={{ width: '37rem', height: '54rem', borderRadius: '1rem' }}
                            trigger={
                              <p>
                                Edit Subgroup
                              </p>
                            }
                            modal
                          >
                            {
                              close => {
                                return (
                                  <EditSub>
                                    <h3>Edit Subgroup</h3>
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
                                                disabled={devices.filter(dev => dev.name === device.name).length}
                                                multiple
                                                notRemove
                                              />
                                              <p>
                                                {
                                                  device.idSubgroup?.name
                                                }
                                              </p>
                                            </div>
                                          )
                                        })
                                      }
                                    </div>
                                    <div className='buttons'>
                                      <button onClick={() => close()}>
                                        {transl.Cancel}
                                      </button>
                                      <button
                                        disabled={saving}
                                        onClick={() => handleEditSub(group, close)}
                                      >
                                        {transl.Save} {saving && <Loading />}
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
                            const id = device.id

                            return (
                              <Card status={status}>
                                <div onClick={() => history.push(`/devices/${id}`)}>
                                  <div>
                                    <MdLens />
                                  </div>
                                  <p>{name}</p>

                                </div>
                                <section>
                                  {
                                    deleting ?
                                      <Loading />
                                      :
                                      <MdDelete onClick={() => handleRemoveDevice(device)} />
                                  }
                                </section>
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