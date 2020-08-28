import React, { useEffect, useState, useMemo } from 'react';
import Layout from '../../components/Layout'

import {
  Container, Header, Info, Features, AddDevice, AddFilter,
  Body, LoadingArea, BodyMessage, Groups, Group, GroupHeader, Cards, Card
} from './styles';

import { MdLens } from 'react-icons/md'
import { RiFilterFill } from 'react-icons/ri'
import arrow_icon from '../../assets/chevron-forward-outline.svg'
import Loading from '../../components/Loading'
import Popup from 'reactjs-popup'

import api_crud from '../../services/api_crud';
import SwitchLabels from '../../components/Switch';
import { Link } from 'react-router-dom';

const Devices = () => {

  // ESTADOS INTERNOS

  const [bodyLoading, setBodyLoading] = useState(true)
  const [bodyMessage, setBodyMessage] = useState('')
  const [groups, setGroups] = useState([])

  const [switchDisabled, setSwitchDisabled] = useState(false)
  const [devicesLength, setDevicesLength] = useState(0)

  const [deviceName, setDeviceName] = useState('')
  const [formError, setFormError] = useState(false)

  const [disableSchedules, setDisableSchedules] = useState(false)

  // VARIÁVEIS

  // FUNÇÕES

  const handleSubmit = (e) => {
    e.preventDefault()

    if (deviceName) {

    } else {
      setFormError('Device name is required')
    }
  }


  function handlePowerDevice(checked, setChecked) {
    //setSwitchDisabled(true)
    setChecked(!checked)
    // setDevicePower(!devicePower)
  }

  async function getGroups() {

    setBodyLoading(true)
    setBodyMessage('')

    try {

      const response = await api_crud.get('/groups')

      if (response.data) {
        setGroups(response.data)
      }

    } catch (e) {

      setBodyMessage('Houve um erro ao carregar os dispositivos')

    }

    setBodyLoading(false)
  }

  // USE EFFECTS

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {

    let count = 0

    groups && Array.isArray(groups) && groups.map(group => {
      const devices = group.devices.length
      count = count + devices
      return count
    })

    setDevicesLength(count)

  }, [groups])

  return (
    <Layout title='Devices'>
      <Container>
        <Header>
          <Info>
            <div>
              <h2>Devices</h2>
              <span>{`${devicesLength} Devices`}</span>
            </div>
            <div>
              <span>Status:&emsp;</span>
              <MdLens />
              <p>&nbsp;Active&emsp;</p>
              <MdLens />
              <p>&nbsp;Inactive</p>
            </div>
          </Info>
          <Features disableSchedules={disableSchedules}>
            <div>
              <button className='disable-schedules' onClick={() => setDisableSchedules(!disableSchedules)}>
                {disableSchedules ? 'Schedules disabled' : 'Disable Schedules'}
              </button>

              {/* FILTRAR */}

              <Popup
                onOpen={() => {
                  setDeviceName('')
                  setFormError(false)
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
                          <select>
                            <option>Option</option>
                          </select>
                          <img src={arrow_icon} alt='' />
                        </div>

                        <div className='filter-options'>
                          <button>
                            ALL
                          </button>
                          <button>
                            ON
                          </button>
                          <button>
                            OFF
                          </button>
                        </div>
                        <button>
                          REMOVE FILTER
                        </button>
                        <div className='filter-buttons'>
                          <button>
                            Cancel
                          </button>
                          <button>
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
                    New Device
                  </button>
                }
                modal
              >
                {
                  close => {
                    return (
                      <AddDevice formError={formError}>
                        <p>New Device</p>
                        <div>
                          <span>{formError}</span>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                            <button>
                              Cancel
                            </button>
                            <button type='submit'>
                              Register
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
              <span>Relay:&emsp;</span>
              <MdLens />
              <p>&nbsp;ON&emsp;</p>
              <MdLens />
              <p>&nbsp;OFF</p>
            </div>
          </Features>
        </Header>
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
                  groups && Array.isArray(groups) && groups.map(group => {

                    const devices = group.devices || []
                    const name = group.name || '-'
                    const group_id = group.id || ''

                    return (
                      <Group>
                        <GroupHeader>
                          <h2>{name}</h2>
                          <div>
                            <Link to='/groups'>
                              See Group
                            </Link>
                          </div>
                        </GroupHeader>
                        <Cards>
                          {
                            devices && Array.isArray(devices) && devices.map(device => {

                              const status = true
                              const name = device.name || '-'
                              const relay_status = false


                              return (
                                <Card status={status}>
                                  <div>
                                    <div>
                                      <MdLens />
                                    </div>
                                    <p>{name}</p>
                                  </div>
                                  <SwitchLabels label='' func={(checked, setChecked) => handlePowerDevice(checked, setChecked)} variable={relay_status}
                                    fontSize={'2.4rem'} font480={'1.6rem'} disabled={switchDisabled} size='normal'
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