import React, { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { MdArrowDropDown, MdArrowDropUp, MdClear, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import BasicDatePicker from '../../../components/BasicDatePicker';
import CheckboxLabels from '../../../components/Checkbox';
import Loading from '../../../components/Loading'
import PieChart from '../../../components/PieChart';
import RadioButton from '../../../components/Radio';
import api_analytics from '../../../services/api_analytics';
import api_crud from '../../../services/api_crud';

import {
  Container,
  Content,
  RankingChart,
  AddDevice,
  AddDeviceModal,
  Search,
  ConsumptionChart,
  RankingList,
  RankingSearch,
  LoadingArea,
  MessageArea,
} from './styles';

const RankingTab = () => {

  const [chartData, setChartData] = useState([])

  const [pageLoading, setPageLoading] = useState(false)
  const [pageMessage, setPageMessage] = useState('')

  const [rakingLoading, setRankingLoading] = useState(false)
  const [rankingMessage, setRankingMessage] = useState('')
  const [showRanking, setShowRanking] = useState(true)


  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startFormatted, setStartFormatted] = useState()
  const [endFormatted, setEndFormatted] = useState()
  const [searchType, setSearchType] = useState('simple')

  const [searchDevice, setSearchDevice] = useState('')
  const [devicesArray, setDevicesArray] = useState([])
  const [allDevices, setAllDevices] = useState([])
  const [saving, setSaving] = useState(false)
  const [selectedsDevices, setSelectedsDevices] = useState([])
  const [currentDevices, setCurrentDevices] = useState([])


  const rankingBase = [
    {
      name: 'Dispositivo',
      percentage: '50%',
      kWh: 415.29,
      cost: 471.26
    },
    {
      name: 'Dispositivo',
      percentage: '50%',
      kWh: 415.29,
      cost: 471.26
    },
    {
      name: 'Dispositivo',
      percentage: '50%',
      kWh: 415.29,
      cost: 471.26
    },
    {
      name: 'Dispositivo',
      percentage: '50%',
      kWh: 415.29,
      cost: 471.26
    },
    {
      name: 'Dispositivo',
      percentage: '50%',
      kWh: 415.29,
      cost: 471.26
    },
    {
      name: 'Dispositivo',
      percentage: '50%',
      kWh: 415.29,
      cost: 471.26
    },
    {
      name: 'Dispositivo',
      percentage: '50%',
      kWh: 415.29,
      cost: 471.26
    },
    {
      name: 'Dispositivo',
      percentage: '50%',
      kWh: 415.29,
      cost: 471.26
    },
    {
      name: 'Dispositivo',
      percentage: '50%',
      kWh: 415.29,
      cost: 471.26
    },
  ]

  const [ranking, setRanking] = useState(rankingBase)


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
      toast.error('Error loading devices')
      setPageMessage('Error loading devices')
    }

    setPageLoading(false)
  }

  async function getRanking() {

    setRankingLoading(true)
    setRankingMessage('')

    try {

      const response = await api_analytics.get(`/ranking/devices`)

      if (response.data) {
        setRanking(response.data.devices)
      }

    } catch (e) {
      toast.error('Error loading devices')
      setPageMessage('Error loading devices')
    }

    setRankingLoading(false)
  }


  // HANDLE FUNCTIONS

  const handleSearch = () => {


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


  // USE EFFECTS

  useEffect(() => {
    handleSearch()
  }, [startFormatted, endFormatted, searchType])

  useEffect(() => {
    getDevices()
  }, [])

  useEffect(() => {

    showOnlyDevicesThatMatches()

  }, [searchDevice, allDevices])


  useEffect(() => {

    const used = 50
    const free = 50

    const data = [
      {
        "id": "used",
        "label": "used",
        "value": used,
      },
      {
        "id": "free",
        "label": "free",
        "value": free,
      }
    ]

    setChartData(data)

  }, [])


  return (
    <Container>
      {
        pageLoading ?
          <LoadingArea>
            <Loading />
          </LoadingArea>
          :
          pageMessage ?
            <MessageArea>
              {pageMessage}
            </MessageArea>
            :

            <Content>
              <div></div>
              <div>
                {
                  showRanking ?
                    <RankingChart>
                      <div>
                        <p>1°&nbsp;</p>
                        <span>Solda L2</span>
                      </div>
                      <ConsumptionChart>
                        <div className='info'>
                          <h2>{`${50 || '-'}%`}</h2>
                          <p>General Consumption</p>
                        </div>
                        <div className='chart'>
                          <PieChart data={chartData} />
                        </div>
                      </ConsumptionChart>
                      <div>
                        <p>R$ 471.26</p>
                        <p>415.29 kWh</p>
                      </div>
                      <div>
                        <button onClick={() => setShowRanking(false)}>
                          SEARCH RANKING <MdKeyboardArrowUp />
                        </button>
                      </div>
                    </RankingChart>
                    :
                    <RankingSearch>
                      <div className='header'>
                        <button onClick={() => setShowRanking(true)}>
                          RANKING GRAPH <MdKeyboardArrowDown />
                        </button>
                      </div>

                      <div className='search-select'>
                        <p>Devices:</p>

                        <AddDevice>
                          <Popup
                            onOpen={() => {
                              // setSelectedsDevices(devices)
                            }}
                            contentStyle={{ width: '37rem', height: '54rem', borderRadius: '1rem' }}
                            trigger={
                              <button>
                                Add Device
                        </button>
                            }
                            modal
                          >
                            {
                              close => {

                                return (
                                  <AddDeviceModal>
                                    <h3>Add Devices</h3>

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
                                        Cancel
                                      </button>
                                      <button
                                        disabled={saving}
                                        onClick={() => {
                                          setCurrentDevices(selectedsDevices)
                                          close()
                                        }}
                                      >
                                        Add {saving && <Loading />}
                                      </button>
                                    </div>
                                  </AddDeviceModal>
                                )
                              }
                            }
                          </Popup>

                        </AddDevice>

                      </div>
                      {/* <div className='search-radio'>
                  <RadioButton label='Period' value='simple' variable={searchType} func={setSearchType} />
                  <RadioButton label='Date' value='advanced' variable={searchType} func={setSearchType} />
                </div> */}

                      <div className='search-date'>
                        <div>
                          <p>Date</p>
                          <div>
                            <BasicDatePicker format="MM/yyyy" views={['year', 'month']} value={startDate} handleChange={setStartDate} />
                          </div>
                        </div>
                        {/* <div>
                    <p>Final</p>
                    <div>
                      <BasicDatePicker value={endDate} handleChange={setEndDate} />
                    </div>
                  </div> */}
                      </div>

                      <div className='search-button'>
                        <button onClick={() => handleSearch()}>
                          SEARCH
                  </button>
                      </div>
                    </RankingSearch>
                }
                {
                  rakingLoading ?
                    <LoadingArea>
                      <Loading />
                    </LoadingArea>
                    :
                    rankingMessage ?
                      <MessageArea>
                        {rankingMessage}
                      </MessageArea>
                      :
                      <RankingList>
                        <div className='table-line'>
                          <span>Position</span>
                          <span>Device</span>
                          <span>General Consumption</span>
                          <span>kWh</span>
                          <span>Price</span>
                        </div>
                        <div className='table-body'>
                          {
                            ranking.map((item, i) => {

                              const idx = i + 1 + '°'

                              return (
                                <div className='table-line'>
                                  <p>{idx}</p>
                                  <p>{item.name}</p>
                                  <p>{item.percentage}</p>
                                  <p>{item.kWh}</p>
                                  <p>{item.cost}</p>
                                </div>
                              )
                            })
                          }
                        </div>
                      </RankingList>
                }
              </div>
            </Content>
      }
    </Container>
  );
}

export default RankingTab;