import React, { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { MdArrowDropDown, MdKeyboardArrowDown, MdKeyboardArrowUp, MdLens } from 'react-icons/md';
import BarChart from '../../../components/BarChart';
import PieChart from '../../../components/PieChart';
import Popup from 'reactjs-popup';
import Loading from '../../../components/Loading'
import BasicDatePicker from '../../../components/BasicDatePicker';
import api_crud from "../../../services/api_crud"
import api_server from "../../../services/api_server"
import api_notifications from "../../../services/api_notifications"
import api_analytics from "../../../services/api_analytics"

import {
  Container, ShowAll, ShowAllModal, ConsumptionTable, ConsumptionCards,
  DashboardHighlights, DashboardCharts, DashboardNotifications,
  Server, UsageChart, Groups, Devices, CardsLoading, ServerLoading, GroupsLoading, 
  DevicesLoading, NotificationsLoading, CardsMessage, ServerMessage, GroupsMessage, 
  DevicesMessage, NotificationsMessage, DetailsLoading, DetailsMessage
} from './styles';
import { toast } from 'react-toastify';

const ConsumptionTab = () => {

  const [yearDate, setYearDate] = useState(new Date())
  const [dropdown, setDropdown] = useState([])


  const [detailsLoading, setDetailsLoading] = useState(true)
  const [detailsMessage, setDetailsMessage] = useState('')
  const [detailsData, setDetailsData] = useState({})

  const [cardsLoading, setCardsLoading] = useState(false)
  const [cardsMessage, setCardsMessage] = useState('')
  const [cardsData, setCardsData] = useState([])

  const [serverLoading, setServerLoading] = useState(false)
  const [serverMessage, setServerMessage] = useState('')
  const [serverData, setServerData] = useState()
  const [serverChart, setServerChart] = useState([])

  const [groupsLoading, setGroupsLoading] = useState(false)
  const [groupsMessage, setGroupsMessage] = useState('')
  const [groupsData, setGroupsData] = useState()

  const [notificationsLoading, setNotificationsLoading] = useState(false)
  const [notificationsMessage, setNotificationsMessage] = useState('')
  const [notificationsData, setNotificationsData] = useState([])

  const [devicesLoading, setDevicesLoading] = useState(false)
  const [devicesMessage, setDevicesMessage] = useState('')
  const [devicesData, setDevicesData] = useState([])
  const [devicesChart, setDevicesChart] = useState([])





  async function getCards() {
    setCardsLoading(true)
    setCardsMessage('')

    try {

      const response = await api_analytics.get('/dashboard/consumption/resume')

      if (response.data) {
        handleCards(response.data)

      } else {
        toast.error('Error trying to get consumption')
        setCardsMessage('Error trying to get consumption')
      }

    } catch (e) {
      toast.error('Error trying to get consumption')

      setCardsMessage('Error trying to get consumption 2')
    }

    setCardsLoading(false)
  }

  async function getServer() {
    setServerLoading(true)
    setServerMessage('')

    try {

      const response = await api_server.get('/disk')

      if (response.data) {
        handleServer(response.data)
        setServerData(response.data)
      } else {
        toast.error('Error trying to get consumption')
        setServerMessage('Error trying to get consumption')
      }

    } catch (e) {
      toast.error('Error trying to get consumption')

      setServerMessage('Error trying to get consumption 2')
    }

    setServerLoading(false)
  }


  async function getGroups() {
    setGroupsLoading(true)
    setGroupsMessage('')

    try {

      const [response, response_devices] = await Promise.all([api_crud.get('/groups'), api_crud.get('groups/devices')])

      if (response.data && response_devices.data) {
        handleGroups(response.data, response_devices.data)
      } else {
        toast.error('Error trying to get consumption')
        setGroupsMessage('Error trying to get consumption')
      }

    } catch (e) {
      toast.error('Error trying to get consumption')

      setGroupsMessage('Error trying to get consumption 2')
    }

    setGroupsLoading(false)
  }

  async function getNotifications() {
    setNotificationsLoading(true)
    setNotificationsMessage('')

    try {

      const response = await api_notifications.get('?skip=0&take=10')

      if (response.data) {
        setNotificationsData(response.data)

      } else {
        toast.error('Error trying to get consumption')
        setNotificationsMessage('Error trying to get consumption')
      }

    } catch (e) {
      toast.error('Error trying to get consumption')

      setNotificationsMessage('Error trying to get consumption 2')
    }

    setNotificationsLoading(false)
  }

  async function getDetails(query) {
    setDetailsLoading(true)
    setDetailsMessage('')

    try {

      const response = await api_analytics.get(`/dashboard/consumption/details?${query}`)

      if (response.data) {
        setDetailsData(response.data)

      } else {
        toast.error('Error trying to get details')
        setDetailsMessage('Error trying to get details')
      }

    } catch (e) {
      toast.error('Error trying to get details')
      setDetailsMessage('Error trying to get consumption 2')
    }

    setDetailsLoading(false)
  }

  async function getDevices() {
    setDevicesLoading(true)
    setDevicesMessage('')

    try {

      const response = await api_crud.get(`/dashboard/devices`)

      if (response.data) {
        setDevicesData(response.data)
        handleDevices(response.data)

      } else {
        toast.error('Error trying to get devices')
        setDevicesMessage('Error trying to get devices')
      }

    } catch (e) {
      toast.error('Error trying to get details')
      setDevicesMessage('Error trying to get consumption 2')
    }

    setDevicesLoading(false)
  }

  const handleCards = (data) => {

    const consumptionCards = [
      {
        date: 'Today',
        since: '00:00 AM',
        kWh: '32.526 kWh',
        cost: 'R$ 35.492',
        foreign: 'today'
      },
      {
        date: 'Week',
        since: 'Monday',
        kWh: '83.139 kWh',
        cost: 'R$ 97.13',
        foreign: 'weekly'
      },
      {
        date: 'Month',
        since: '01/12',
        kWh: '559.584 kWh',
        cost: 'R$ 640.816',
        foreign: 'monthly',
      },
      {
        date: 'Year',
        since: '01/01',
        kWh: '1.1802.04 kWh',
        cost: 'R$ 13.401.133',
        foreign: 'yearly'
      },
    ]


    const newCards = consumptionCards.map(card => {
      const item = data[card.foreign]
      const value = item[0]?.total
      card.kWh = value
      card.cost = (value * 1.06).toFixed(2)
      return card
    })

    setCardsData(newCards)
  }

  const handleServer = (data) => {

    const used = data?.used?.slice(0, -3) || 0
    const free = data?.free?.slice(0, -3) || 0

    const chartData = [
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

    setServerChart(chartData)
  }

  const handleDevices = (data) => {

    const barData = [
      {
        id: 1,
        value: data.online,
        date: 'Online',
      },
      {
        id: 2,
        value: data.offline,
        date: 'Offline',
      },
      {
        id: 3,
        value: data.registeredIdLora,
        date: 'Registered',
      },
      {
        id: 4,
        value: data.unregisteredIdLora,
        date: 'Not registered',
      },
      // {
      //   id: 5,
      //   value: '88',
      //   date: 'Setted',
      // },
      // {
      //   id: 6,
      //   value: '12',
      //   date: 'Manually setted',
      // },
      {
        id: 5,
        value: data.unconfigured,
        date: 'Unconfigured',
      },
    ]
    
    setDevicesChart(barData)

  }

  const handleGroups = (data, data_devices) => {
    let subgroups = 0
    let devices = 0
    let groups = 0

    data.map(group => {
      groups = groups + 1
      subgroups = subgroups + group.totalSubgroups
    })

    data_devices.map(group => {
      devices = devices + group.devices.length
    })
    

    const newData = {
      groups,
      devices,
      subgroups
    }

    setGroupsData(newData)
  }


  const handleDropdown = (monthName) => {

    if (dropdown.includes(monthName)) {
      const newDropdown = dropdown.filter(month => month !== monthName)
      setDropdown(newDropdown)
    } else {
      setDropdown([...dropdown, monthName])
    }

  }

  const handleDetails = () => {
    const year = yearDate.getFullYear()

    const query = `startDate=01/${year}&endDate=12/${year}`

    getDetails(query)
  }

  useEffect(() => {
    getCards()
    getServer()
    getGroups()
    getNotifications()
    getDevices()
  }, [])

  useEffect(() => {
    handleDetails()

  }, [yearDate])

  return (
    <Container>
      <ShowAll>
        <Popup
          onOpen={() => {
            // setSelectedsDevices(devices)
          }}
          contentStyle={{ width: '120rem', height: '55.1rem', borderRadius: '1rem', backgroundColor: '#F8F8F8' }}
          trigger={
            <button>
              Show All
            </button>
          }
          modal
        >
          {
            close => {

              const yearTotal = detailsData?.total || '-'

              return (
                <ShowAllModal>
                  <div className='select-options'>
                    <div className='total'>
                      <p>Total</p>
                      <h3>{`${yearTotal} kWh`}</h3>
                    </div>
                    <p>Year</p>
                    <div className='date'>
                      <BasicDatePicker value={yearDate} handleChange={setYearDate} format='yyyy' views={['year']} />
                    </div>
                    <button>
                      SEARCH
                    </button>
                  </div>

                  {
                    detailsLoading ?
                      <DetailsLoading>
                        <Loading />
                      </DetailsLoading>
                      :
                      detailsMessage ?
                        <DetailsMessage>
                          {detailsMessage}
                        </DetailsMessage>
                        :
                        <ConsumptionTable>
                          <div className='table-header'>
                            <p>Date</p>
                            <p>kWh</p>
                            <p>Cost</p>
                            <div></div>
                          </div>
                          <div className='table-body'>
                            {
                              detailsData?.data?.map(month => {

                                const days = month.days
                                const monthName = month.monthname
                                const total = month.total
                                const cost = (month.total * 1.06).toFixed(2)
                                const drop = dropdown.includes(monthName)

                                return (
                                  <div>
                                    <div className='month' onClick={() => handleDropdown(monthName)}>
                                      <p>{monthName}</p>
                                      <p>{total}</p>
                                      <p>{cost}</p>
                                      <div>
                                        {
                                          drop ?
                                            <MdKeyboardArrowUp />
                                            :
                                            <MdKeyboardArrowDown />
                                        }
                                      </div>
                                    </div>
                                    {
                                      drop ?
                                        <div className='month-details'>
                                          {
                                            days.map(day => {
                                              const date = day.date
                                              const total = day.value
                                              const cost = (total * 1.06).toFixed(2)

                                              return (
                                                <div className='day'>
                                                  <p>{date}</p>
                                                  <p>{total}</p>
                                                  <p>{cost}</p>
                                                  <div></div>
                                                </div>
                                              )
                                            })
                                          }
                                        </div>
                                        :
                                        <></>
                                    }
                                  </div>
                                )
                              })
                            }
                          </div>
                        </ConsumptionTable>
                  }
                </ShowAllModal>
              )
            }
          }
        </Popup>

      </ShowAll>
      {
        cardsLoading ?
          <CardsLoading>
            <Loading />
          </CardsLoading>
          :
          cardsMessage ?
            <CardsMessage>
              {cardsMessage}
            </CardsMessage>
            :
            <ConsumptionCards>
              {
                cardsData.map(data => {

                  const date = data.date
                  const since = data.since
                  const consumption = data.kWh
                  const cost = data.cost

                  return (
                    <div>
                      <div className='header'>
                        <p>{date}</p>
                        <span>{since}</span>
                      </div>
                      <div className='values'>
                        <h3>{`${consumption} kWh`}</h3>
                        <h4>{`R$ ${cost}`}</h4>
                      </div>
                    </div>
                  )
                })
              }
            </ConsumptionCards>
      }
      <DashboardHighlights>
        <DashboardCharts>
          <div>
            {
              serverLoading ?
                <ServerLoading>
                  <Loading />
                </ServerLoading>
                :
                serverMessage ?
                  <ServerMessage>
                    {serverMessage}
                  </ServerMessage>
                  :
                  <Server>
                    <h4>Server</h4>
                    <h3>DISK USAGE</h3>
                    <div className='data'>
                      <div className='legend'>
                        <div>
                          <MdLens style={{ color: '#E1E1E1' }} />
                          <p>Free</p>
                        </div>
                        <div>
                          <MdLens style={{ color: '#C5004F' }} />
                          <p>Used space</p>
                        </div>
                      </div>
                      <UsageChart>
                        <div className='used-info'>
                          <p>{`${serverData?.percentageUsed || '-'}%`}</p>
                          <span>Used Space</span>
                        </div>
                        <div className='chart'>
                          <PieChart data={serverChart} />
                        </div>
                      </UsageChart>
                    </div>
                    <div className='info'>
                      <p>{`Available: ${serverData?.free || '-'}`}</p>
                      <p>{`Used Space: ${serverData?.used || '-'}`}</p>
                    </div>
                  </Server>
            }
            {
              groupsLoading ?
                <GroupsLoading>
                  <Loading />
                </GroupsLoading>
                :
                groupsMessage ?
                  <GroupsMessage>
                    {groupsMessage}
                  </GroupsMessage>
                  :
                  <Groups>
                    <h4>Groups</h4>
                    <h3>Total of devices registered</h3>
                    <h2>{groupsData?.devices}</h2>
                    <div>
                      <div className='groups'>
                        <p>{groupsData?.groups}</p>
                        <span>Groups</span>
                      </div>
                      <div className='subgroups'>
                        <p>{groupsData?.subgroups}</p>
                        <span>Subgroups</span>
                      </div>
                    </div>
                  </Groups>
            }
          </div>
          {
            devicesLoading ?
              <DevicesLoading>
                <Loading />
              </DevicesLoading>
              :
              devicesMessage ?
                <DevicesMessage>
                  {devicesMessage}
                </DevicesMessage>
                :
                <Devices>
                  <h4>Devices</h4>
                  <div>
                    <BarChart
                      data={devicesChart}
                      keys={'value'}
                      indexBy='date'
                      xLegend=''
                      yLegend=''
                      minValue={0}
                      dashboard={true}
                    />
                  </div>
                </Devices>
          }
        </DashboardCharts>
        {
          notificationsLoading ?
            <NotificationsLoading>
              <Loading />
            </NotificationsLoading>
            :
            notificationsMessage ?
              <NotificationsMessage>
                {notificationsMessage}
              </NotificationsMessage>
              :
              <DashboardNotifications>
                <div className='notifications-header'>
                  <h3>Notifications</h3>
                  <p>{`${notificationsData.total} notifications`}</p>
                </div>
                <div className='notifications'>
                  {
                    notificationsData?.result?.map(notification => {

                      return (
                        <div className='notification'>
                          <h4>{notification.title}</h4>
                          <p>{notification.description}</p>
                        </div>
                      )
                    })
                  }
                </div>
              </DashboardNotifications>
        }
      </DashboardHighlights>
    </Container>
  );
}

export default ConsumptionTab;