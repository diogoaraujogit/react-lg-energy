import React, { useEffect, useMemo, useState } from 'react';
import { MdClear, MdDelete, MdDevices } from 'react-icons/md';
import Popup from 'reactjs-popup';
import BasicDatePicker from '../../components/BasicDatePicker';
import CheckboxLabels from '../../components/Checkbox';
import Layout from '../../components/Layout'
import Loading from '../../components/Loading';
import RadioButton from '../../components/Radio';
import TabsComponent from '../../components/Tabs';

import {
  Container, Content, LoadingArea, PageMessage, FeaturesBox, Period,
  AddDevice, AddDeviceModal, Search, CurrentDevices, Scroll, BodyLoading,
  BodyMessage, DataBox
} from './styles';

import api_analytics from '../../services/api_analytics'
import api_crud from '../../services/api_crud'
import api_logs from '../../services/api_logs'
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import translation from './transl';

const Comparatives = () => {

  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt

  const tabs = useMemo(() => [
    transl.Consumption, 
    transl.Current, 
    transl.Demand,
    transl.Power
  ], [transl])

  const [tab, setTab] = useState(0)

  const [pageLoading, setPageLoading] = useState(false)
  const [pageMessage, setPageMessage] = useState('')
  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')

  const [periodType, setPeriodType] = useState('day')
  const [dayDate, setDayDate] = useState(new Date())
  const [monthDate, setMonthDate] = useState(new Date())
  const [param, setParam] = useState('powerConsumption')

  const [searchDevice, setSearchDevice] = useState('')
  const [devicesArray, setDevicesArray] = useState([])
  const [allDevices, setAllDevices] = useState([])
  const [saving, setSaving] = useState(false)
  const [selectedsDevices, setSelectedsDevices] = useState([])
  const [currentDevices, setCurrentDevices] = useState([])


  const tableLabels = tab === 2 ?  [{ title: transl.Devices, value: 'name' }, {title: transl.Total, value: 'total'}] :
  [{ title: transl.Devices, value: 'name' }, { title: transl.PhaseA, value: 'a' }, { title: transl.PhaseB, value: 'b' }, { title: transl.PhaseC, value: 'c' }, { title: transl.Average, value: 'average' }, { title: transl.Total, value: 'total' }]

  const [devices, setDevices] = useState([])

  useEffect(() => {
    switch (tab) {
      case 0:
        setParam('powerConsumption')
        return;
      case 1:
        setParam('current')
        return;
      case 2:
        setParam('demand')
        return;
      case 3:
        setParam('activePower')
        return;
      default:
        return;
    }
  }, [tab])

  // FUNCTIONS 

  const handleSearch = (devices) => {

    const devicesParsedToString = devices.map(device => device.id)
    const date = periodType === 'day' ? format(dayDate, 'dd/MM/yyyy') : format(monthDate, 'MM/yyyy')

    console.log(dayDate)
    console.log(devices)

    const query = `date=${date}&idLoraDevices=${devicesParsedToString}`

    getComparatives(query)

  }

  const showOnlyDevicesThatMatches = () => {

    if (searchDevice) {
      const devicesThatMatch = allDevices.filter(device =>
        device.name.toLowerCase().includes(searchDevice.toLowerCase())
      )

      setDevicesArray(devicesThatMatch)
    } else {
      setDevicesArray(allDevices)
    }


  }

  const switchLoraToId = (currentDevices) => {

    const devices_id = currentDevices.map(device => {
      let obj = {}

      obj.id = device.idLora
      obj.name = device.name

      return obj
    })

    return devices_id

  }

  // API CALLS

  async function getDevices() {

    setPageLoading(true)
    setPageMessage('')

    try {

      const response = await api_crud.get(`/devices`)

      if (response.data) {
        setAllDevices(response.data)
      }

    } catch (e) {
      toast.error(transl.errorDevices)
      setPageMessage(transl.errorDevices)
    }

    setPageLoading(false)
  }


  async function getComparatives(query) {

    setBodyLoading(true)
    setBodyMessage('')

    try {

      const response = await api_analytics.get(`/comparatives/${periodType}?${query}`) 
      const response_logs = await api_logs.get(`/comparatives/${periodType}?${query}`) 


      if (response.data && response_logs.data) {

        const devicesDataWithDemand = response.data.map(data => {

          const demandDataForThisDevice = response_logs.data.filter(data_demand => data_demand.idLora === data.idLora)

          return {...data, ...demandDataForThisDevice[0]}

        })

        setDevices(devicesDataWithDemand)

      } else {
        toast.error(transl.errorComparatives)
        setBodyMessage(transl.errorComparatives)
      }

    } catch (e) {
      toast.error(transl.errorComparatives)
      setBodyMessage(transl.errorComparatives)
    }

    setBodyLoading(false)
  }

  // USE EFFECTS

  useEffect(() => {
    getDevices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    currentDevices && Array.isArray(currentDevices) && currentDevices.length && handleSearch(currentDevices)
            // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayDate, monthDate, periodType, currentDevices]) 


  useEffect(() => {

    showOnlyDevicesThatMatches()
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDevice, allDevices])


  // useEffect(() => {

  //   const devices_id = switchLoraToId(currentDevices)

  //   setSelectedsDevices(devices_id)


  // }, [currentDevices])

  return (
    <Layout title={transl.title}>
      <Container>
        {
          pageLoading ?
            <LoadingArea>
              <Loading />
            </LoadingArea>
            :
            pageMessage ?
              <PageMessage>
                {pageMessage}
              </PageMessage>
              :
              <Content>

                <FeaturesBox>
                  <Period>
                    <p>{transl.Period}:</p>
                    <div className='radio-buttons'>
                      <RadioButton label={transl.Day} value='day' variable={periodType} func={setPeriodType} />
                      <RadioButton label={transl.Month} value='month' variable={periodType} func={setPeriodType} />
                    </div>
                    <div className='date-input'>
                      {
                        periodType === 'day' ?
                          <BasicDatePicker value={dayDate} handleChange={setDayDate} />
                          :
                          <BasicDatePicker value={monthDate} handleChange={setMonthDate} format='MM/yyyy' views={['year', 'month']} />
                      }
                    </div>
                  </Period>
                  <AddDevice>
                    <Popup
                      onOpen={() => {
                        // setSelectedsDevices(devices)
                      }}
                      contentStyle={{ width: '37rem', height: '54rem', borderRadius: '1rem' }}
                      trigger={
                        <button>
                          {transl.AddDevice}
                        </button>
                      }
                      modal
                    >
                      {
                        close => {

                          return (
                            <AddDeviceModal>
                              <h3>{transl.AddDevices}</h3>

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
                                          value={device.idLora}
                                          func={setSelectedsDevices}
                                          disabled={!device.idLora}
                                          multiple
                                          notRemove
                                        />

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
                                  onClick={() => {
                                    setCurrentDevices(selectedsDevices)
                                    close()
                                  }}
                                >
                                  {transl.Add} {saving && <Loading />}
                                </button>
                              </div>
                            </AddDeviceModal>
                          )
                        }
                      }
                    </Popup>

                  </AddDevice>
                  <CurrentDevices>
                    <p>{transl.CurrentDevices}</p>
                    <Scroll options={{ suppressScrollX: true, useBothWheelAxes: false }}>
                      {
                        currentDevices.map(device => {

                          return (
                            <div>
                              <p>{device.name}</p>
                              <MdDelete onClick={() => {
                                const remainingDevices = currentDevices.filter(dev => dev.id !== device.id)
                                setCurrentDevices(remainingDevices)
                                setSelectedsDevices(remainingDevices)
                              }} />
                            </div>
                          )
                        })
                      }
                    </Scroll>
                  </CurrentDevices>
                </FeaturesBox>

                {
                  bodyLoading ?
                    <BodyLoading>
                      <Loading />
                    </BodyLoading>
                    :
                    bodyMessage ?
                      <BodyMessage>
                        {
                          bodyMessage
                        }
                      </BodyMessage>
                      :


                      <DataBox>
                        <div className='tabs'>
                          <TabsComponent tabs={tabs} onTabChange={setTab} initial={tab} />
                        </div>
                        <div className='body'>
                          <div className='header'>
                            {
                              tableLabels.map(item => (
                                <div>
                                  {item.title}
                                </div>
                              ))
                            }
                          </div>
                          <div className='table'>
                            {
                              currentDevices.map(selected => {

                                const device = devices.find(device => device.idLora === selected.id)


                                return (
                                  <div>
                                    {
                                      tableLabels.map(label => {

                                        let value

                                        if (label.value === 'name') {
                                          value = selected.name
                                        } else {
                                          value = device && device[`${param}_${label.value}`]
                                        }

                                        return (
                                          <div>{value}</div>
                                        )
                                      })
                                    }
                                  </div>
                                )
                              })
                            }
                          </div>
                        </div>
                      </DataBox>
                }
              </Content>
        }
      </Container>
    </Layout>

  );
}

export default Comparatives;