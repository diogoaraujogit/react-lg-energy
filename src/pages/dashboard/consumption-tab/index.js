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
  Server, UsageChart, Groups, Devices, CardsLoading, ServerLoading, GroupsLoading, DevicesLoading, NotificationsLoading, CardsMessage, ServerMessage, GroupsMessage, DevicesMessage, NotificationsMessage,
} from './styles';
import { toast } from 'react-toastify';

const ConsumptionTab = () => {

  const [yearDate, setYearDate] = useState(new Date())
  const [dropdown, setDropdown] = useState([])

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


  const barData = [
    {
      id: 1,
      color: '#2222AA',
      value: '64',
      date: 'Online',
    },
    {
      id: 2,
      color: '#630028',
      value: '240',
      date: 'Offline',
    },
    {
      id: 3,
      value: '32',
      date: 'Registered',
    },
    {
      id: 4,
      value: '47',
      date: 'Not registered',
    },
    {
      id: 5,
      value: '88',
      date: 'Setted',
    },
    {
      id: 6,
      value: '12',
      date: 'Manually setted',
    },
    {
      id: 7,
      value: '210',
      date: 'Unconfigured',
    },
  ]

  const details = {
    "data": [
      {
        "total": "165.94",
        "date": "23/09/2020",
        "monthname": "September",
        "year": 2020,
        "days": [
          {
            "value": "82.40",
            "date": "23/09/2020"
          },
          {
            "value": "0.38",
            "date": "24/09/2020"
          },
          {
            "value": "0.38",
            "date": "25/09/2020"
          },
          {
            "value": "0.38",
            "date": "26/09/2020"
          },
          {
            "value": "0.38",
            "date": "27/09/2020"
          },
          {
            "value": "10.67",
            "date": "28/09/2020"
          },
          {
            "value": "36.57",
            "date": "29/09/2020"
          },
          {
            "value": "34.80",
            "date": "30/09/2020"
          }
        ]
      },
      {
        "total": "342.41",
        "date": "01/10/2020",
        "monthname": "October",
        "year": 2020,
        "days": [
          {
            "value": "112.35",
            "date": "01/10/2020"
          },
          {
            "value": "35.18",
            "date": "02/10/2020"
          },
          {
            "value": "35.96",
            "date": "03/10/2020"
          },
          {
            "value": "36.15",
            "date": "04/10/2020"
          },
          {
            "value": "34.20",
            "date": "05/10/2020"
          },
          {
            "value": "35.57",
            "date": "06/10/2020"
          },
          {
            "value": "36.14",
            "date": "07/10/2020"
          },
          {
            "value": "8.63",
            "date": "08/10/2020"
          },
          {
            "value": "0.37",
            "date": "09/10/2020"
          },
          {
            "value": "0.37",
            "date": "10/10/2020"
          },
          {
            "value": "0.37",
            "date": "11/10/2020"
          },
          {
            "value": "0.36",
            "date": "12/10/2020"
          },
          {
            "value": "0.38",
            "date": "13/10/2020"
          },
          {
            "value": "0.37",
            "date": "14/10/2020"
          },
          {
            "value": "0.36",
            "date": "15/10/2020"
          },
          {
            "value": "0.38",
            "date": "16/10/2020"
          },
          {
            "value": "0.38",
            "date": "17/10/2020"
          },
          {
            "value": "0.38",
            "date": "19/10/2020"
          },
          {
            "value": "0.38",
            "date": "20/10/2020"
          },
          {
            "value": "0.37",
            "date": "21/10/2020"
          },
          {
            "value": "0.37",
            "date": "22/10/2020"
          },
          {
            "value": "0.38",
            "date": "23/10/2020"
          },
          {
            "value": "0.36",
            "date": "24/10/2020"
          },
          {
            "value": "0.38",
            "date": "25/10/2020"
          },
          {
            "value": "0.38",
            "date": "26/10/2020"
          },
          {
            "value": "0.39",
            "date": "27/10/2020"
          },
          {
            "value": "0.37",
            "date": "28/10/2020"
          },
          {
            "value": "0.38",
            "date": "29/10/2020"
          },
          {
            "value": "0.38",
            "date": "30/10/2020"
          },
          {
            "value": "0.38",
            "date": "31/10/2020"
          }
        ]
      },
      {
        "total": "11.67",
        "date": "01/11/2020",
        "monthname": "November",
        "year": 2020,
        "days": [
          {
            "value": "0.76",
            "date": "01/11/2020"
          },
          {
            "value": "0.39",
            "date": "02/11/2020"
          },
          {
            "value": "0.38",
            "date": "03/11/2020"
          },
          {
            "value": "0.37",
            "date": "04/11/2020"
          },
          {
            "value": "0.37",
            "date": "05/11/2020"
          },
          {
            "value": "0.38",
            "date": "06/11/2020"
          },
          {
            "value": "0.38",
            "date": "07/11/2020"
          },
          {
            "value": "0.37",
            "date": "08/11/2020"
          },
          {
            "value": "0.38",
            "date": "09/11/2020"
          },
          {
            "value": "0.39",
            "date": "10/11/2020"
          },
          {
            "value": "0.38",
            "date": "11/11/2020"
          },
          {
            "value": "0.38",
            "date": "12/11/2020"
          },
          {
            "value": "0.37",
            "date": "13/11/2020"
          },
          {
            "value": "0.37",
            "date": "14/11/2020"
          },
          {
            "value": "0.38",
            "date": "15/11/2020"
          },
          {
            "value": "0.37",
            "date": "16/11/2020"
          },
          {
            "value": "0.36",
            "date": "17/11/2020"
          },
          {
            "value": "0.37",
            "date": "18/11/2020"
          },
          {
            "value": "0.38",
            "date": "19/11/2020"
          },
          {
            "value": "0.38",
            "date": "20/11/2020"
          },
          {
            "value": "0.38",
            "date": "21/11/2020"
          },
          {
            "value": "0.39",
            "date": "22/11/2020"
          },
          {
            "value": "0.37",
            "date": "23/11/2020"
          },
          {
            "value": "0.37",
            "date": "24/11/2020"
          },
          {
            "value": "0.39",
            "date": "25/11/2020"
          },
          {
            "value": "0.38",
            "date": "26/11/2020"
          },
          {
            "value": "0.36",
            "date": "27/11/2020"
          },
          {
            "value": "0.37",
            "date": "28/11/2020"
          },
          {
            "value": "0.37",
            "date": "29/11/2020"
          },
          {
            "value": "0.38",
            "date": "30/11/2020"
          }
        ]
      },
      {
        "total": "11.99",
        "date": "01/12/2020",
        "monthname": "December",
        "year": 2020,
        "days": [
          {
            "value": "0.76",
            "date": "01/12/2020"
          },
          {
            "value": "0.37",
            "date": "02/12/2020"
          },
          {
            "value": "0.37",
            "date": "03/12/2020"
          },
          {
            "value": "0.38",
            "date": "04/12/2020"
          },
          {
            "value": "0.37",
            "date": "05/12/2020"
          },
          {
            "value": "0.38",
            "date": "06/12/2020"
          },
          {
            "value": "0.37",
            "date": "07/12/2020"
          },
          {
            "value": "0.38",
            "date": "08/12/2020"
          },
          {
            "value": "0.38",
            "date": "09/12/2020"
          },
          {
            "value": "0.37",
            "date": "10/12/2020"
          },
          {
            "value": "0.39",
            "date": "11/12/2020"
          },
          {
            "value": "0.38",
            "date": "12/12/2020"
          },
          {
            "value": "0.38",
            "date": "13/12/2020"
          },
          {
            "value": "0.38",
            "date": "14/12/2020"
          },
          {
            "value": "0.37",
            "date": "15/12/2020"
          },
          {
            "value": "0.38",
            "date": "16/12/2020"
          },
          {
            "value": "0.38",
            "date": "17/12/2020"
          },
          {
            "value": "0.38",
            "date": "18/12/2020"
          },
          {
            "value": "0.37",
            "date": "19/12/2020"
          },
          {
            "value": "0.37",
            "date": "20/12/2020"
          },
          {
            "value": "0.37",
            "date": "21/12/2020"
          },
          {
            "value": "0.38",
            "date": "22/12/2020"
          },
          {
            "value": "0.37",
            "date": "23/12/2020"
          },
          {
            "value": "0.37",
            "date": "24/12/2020"
          },
          {
            "value": "0.39",
            "date": "25/12/2020"
          },
          {
            "value": "0.36",
            "date": "26/12/2020"
          },
          {
            "value": "0.36",
            "date": "27/12/2020"
          },
          {
            "value": "0.36",
            "date": "28/12/2020"
          },
          {
            "value": "1.11",
            "date": "30/12/2020"
          }
        ]
      }
    ],
    "total": "532.01"
  }

  async function getCards() {
    setCardsLoading(true)
    setCardsMessage('')

    try {

      const response = await api_analytics.get('/dashboard/consumption/resume')
      console.log(response)
      if (response.data) {
        handleCards(response.data)

      } else {
        toast.error('Error trying to get consumption')
        setCardsMessage('Error trying to get consumption')
      }

    } catch (e) {
      toast.error('Error trying to get consumption')
      console.log(e.response)
      setCardsMessage('Error trying to get consumption 2')
    }

    setCardsLoading(false)
  }

  async function getServer() {
    setServerLoading(true)
    setServerMessage('')

    try {

      const response = await api_server.get('/disk')
      console.log(response)
      if (response.data) {
        handleServer(response.data)
        setServerData(response.data)
      } else {
        toast.error('Error trying to get consumption')
        setServerMessage('Error trying to get consumption')
      }

    } catch (e) {
      toast.error('Error trying to get consumption')
      console.log(e.response)
      setServerMessage('Error trying to get consumption 2')
    }

    setServerLoading(false)
  }


  async function getGroups() {
    setGroupsLoading(true)
    setGroupsMessage('')

    try {

      const response = await api_crud.get('/groups')
      
      if (response.data) {
        handleGroups(response.data)
      } else {
        toast.error('Error trying to get consumption')
        setGroupsMessage('Error trying to get consumption')
      }

    } catch (e) {
      toast.error('Error trying to get consumption')
      console.log(e.response)
      setGroupsMessage('Error trying to get consumption 2')
    }

    setGroupsLoading(false)
  }

  async function getNotifications() {
    setNotificationsLoading(true)
    setNotificationsMessage('')

    try {

      const response = await api_notifications.get('?skip=0&take=10')
      console.log(response)
      if (response.data) {
        setNotificationsData(response.data)
        
      } else {
        toast.error('Error trying to get consumption')
        setNotificationsMessage('Error trying to get consumption')
      }

    } catch (e) {
      toast.error('Error trying to get consumption')
      console.log(e.response)
      setNotificationsMessage('Error trying to get consumption 2')
    }

    setNotificationsLoading(false)
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
      card.cost = (value*1.06).toFixed(2)
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

  const handleGroups = (data) => {
    let subgroups = 0
    let devices = 0
    let groups = 0

    data.map(group => {
      groups = groups + 1
      devices = devices + group.totalDevices
      subgroups = subgroups + group.totalSubgroups
    })

    const newData = {
      groups,
      devices,
      subgroups
    }

    console.log('------------>>>')
    console.log(newData)
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

  useEffect(() => {
    getCards()
    getServer()
    getGroups()
    getNotifications()
  }, [])

  console.log('=======>>')
  console.log(groupsData)

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

              const yearTotal = details?.total || '-'

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
                  <ConsumptionTable>
                    <div className='table-header'>
                      <p>Date</p>
                      <p>kWh</p>
                      <p>Cost</p>
                      <div></div>
                    </div>
                    <div className='table-body'>
                      {
                        details.data.map(month => {

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
                      data={barData}
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