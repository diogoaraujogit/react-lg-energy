import React, { useEffect, useMemo, useState } from 'react';
import { MdClear, MdDelete, MdDevices, MdFileDownload } from 'react-icons/md';
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
  BodyMessage, DataBox, Report, AddItemTabs
} from './styles';

import api_analytics from '../../services/api_analytics'
import api_crud from '../../services/api_crud'
import api_logs from '../../services/api_logs'
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Reports = () => {

  const tabs = useMemo(() => ['Devices', 'Groups'], [])

  const [tab, setTab] = useState(0)

  const [pageLoading, setPageLoading] = useState(false)
  const [pageMessage, setPageMessage] = useState('')
  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')

  const [periodType, setPeriodType] = useState('day')
  const [dayDate, setDayDate] = useState(new Date())
  const [monthDate, setMonthDate] = useState(new Date())
  const [reportName, setReportName] = useState('')

  const [searchDevice, setSearchDevice] = useState('')
  const [devicesArray, setDevicesArray] = useState([])
  const [allDevices, setAllDevices] = useState([])
  const [saving, setSaving] = useState(false)
  const [selectedsDevices, setSelectedsDevices] = useState([])
  const [selectedsParams, setSelectedsParams] = useState([])
  const [currentDevices, setCurrentDevices] = useState([])

  const [searchGroup, setSearchGroup] = useState('')
  const [groupsArray, setGroupsArray] = useState([])
  const [allGroups, setAllGroups] = useState([])
  const [selectedsGroups, setSelectedsGroups] = useState([])

  const parameters = [
    { title: 'Current', value: 'current' },
    { title: 'Active Power', value: 'activePower' },
    { title: 'Consumption', value: 'powerConsumption' },
    { title: 'Demand', value: 'demand' }
  ]

  const reports = [
    {
      name: 'Name Report',
      period: '02/02/2020',
    },
    {
      name: 'Name Report',
      period: '02/02/2020',
    },
    {
      name: 'Name Report',
      period: '02/02/2020',
    },
    {
      name: 'Name Report',
      period: '02/02/2020',
    },
  ]


  // FUNCTIONS 

  const handleCreatReport = () => {
    
    const selectedsItems = tab ? selectedsGroups : selectedsDevices
    const hasSelectedsItems = selectedsItems && Array.isArray(selectedsItems) && selectedsItems.length > 0
    const hasSelectedsParams = selectedsParams && Array.isArray(selectedsParams) && selectedsParams.length > 0
    
    const date = periodType === 'day' ? format(dayDate, 'dd/MM/yyyy') : format(monthDate, 'MM/yyyy')

    !hasSelectedsItems?
    toast.error(`No ${tab? 'groups' : 'devices'} selecteds`) :
    !reportName?
    toast.error('Report name required') :
    !hasSelectedsParams?
    toast.error('No parameters selecteds') :
    createReport(date)

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

  const showOnlyGroupsThatMatches = () => {

    if (searchGroup) {
      
      const groupsThatMatch = allGroups.filter(group =>
        group.name.toLowerCase().includes(searchGroup.toLowerCase())
      )

      setGroupsArray(groupsThatMatch)

    } else {
      setGroupsArray(allGroups)
    }

  }


  // API CALLS

  async function getDevices() {

    setPageLoading(true)
    setPageMessage('')

    try {

      const response_devices = await api_crud.get(`/devices`)
      const response_groups = await api_crud.get(`/groups`)

      if (response_devices.data && response_groups.data) {
        setAllDevices(response_devices.data)
        setAllGroups(response_groups.data)
      } else {
        toast.error('Error loading devices')
        setPageMessage('Error loading devices')
      }

    } catch (e) {
      toast.error('Error loading devices')
      setPageMessage('Error loading devices')
    }

    setPageLoading(false)
  }

  const createReport = () => {

  }


  // USE EFFECTS

  useEffect(() => {
    getDevices()
  }, [])


  useEffect(() => {

    showOnlyDevicesThatMatches()

  }, [searchDevice, allDevices])

  useEffect(() => {

    showOnlyGroupsThatMatches()

  }, [searchGroup, allGroups])



  return (
    <Layout title='Reports'>
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
                    <p>Period:</p>
                    <div className='radio-buttons'>
                      <RadioButton label='Day' value='day' variable={periodType} func={setPeriodType} />
                      <RadioButton label='Month' value='month' variable={periodType} func={setPeriodType} />
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
                          Select device or group
                        </button>
                      }
                      modal
                    >
                      {
                        close => {

                          const itemsArray = tab ? groupsArray : devicesArray
                          const selectedsItems = tab ? selectedsGroups : selectedsDevices
                          const setSelectedsItems = tab ? setSelectedsGroups : setSelectedsDevices

                          const searchItem = tab ? searchGroup : searchDevice
                          const setSearchItem = tab ? setSearchGroup : setSearchDevice

                          return (
                            <AddDeviceModal>
                              <AddItemTabs>
                                <TabsComponent tabs={tabs} onTabChange={setTab} initial={tab}/>
                              </AddItemTabs>

                              <div className='search'>
                                <Search>
                                  <div>
                                    <input
                                      type='text'
                                      maxlength='20'
                                      autoFocus
                                      value={searchItem}
                                      onChange={event => setSearchItem(event.target.value)}
                                    />
                                    <button onClick={() => setSearchItem('')} >
                                      <MdClear />
                                    </button>
                                  </div>

                                </Search>
                              </div>
                              <div className='devices'>
                                {
                                  
                                  itemsArray && itemsArray.map(item => {

                                    const itemId = tab ? item.id : item.idLora

                                    return (
                                      <div>
                                        <CheckboxLabels
                                          label={item.name}
                                          variable={selectedsItems}
                                          value={itemId}
                                          func={setSelectedsItems}
                                          disabled={!itemId}
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

                    <input
                      placeholder='Report Name'
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                    />

                  </AddDevice>
                  <CurrentDevices>
                    <p>Select Parameter</p>

                    <div>
                      {
                        parameters.map(parameter => {

                          return (
                            <div>
                              <CheckboxLabels
                                label={parameter.title}
                                variable={selectedsParams}
                                value={parameter.value}
                                func={setSelectedsParams}
                                multiple
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                  </CurrentDevices>

                  <div className='create-report-btn'>
                    <button onClick={() => handleCreatReport()}>
                      Create Report
                    </button>
                  </div>
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
                        <div>
                        {
                          reports.map(report => {

                            return (
                              <Report>
                                <div>
                                  <h3>{report.name}</h3>
                                  <div>
                                    <MdFileDownload />
                                    <MdDelete />
                                  </div>
                                </div>
                                <p>{`Period: ${report.period}`}</p>
                              </Report>
                            )
                          })
                        }
                        </div>
                      </DataBox>
                }
              </Content>
        }
      </Container>
    </Layout>

  );
}

export default Reports;