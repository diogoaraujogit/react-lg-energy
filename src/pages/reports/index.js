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
import api_reports from '../../services/api_reports'
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const Reports = () => {

  const tabs = useMemo(() => ['Devices', 'Groups'], [])

  const [tab, setTab] = useState(0)

  const reports_base = [
    {
      title: 'Name Report',
      period: '02/02/2020',
    },
    {
      title: 'Name Report',
      period: '02/02/2020',
    },
    {
      title: 'Name Report',
      period: '02/02/2020',
    },
    {
      title: 'Name Report',
      period: '02/02/2020',
    },
  ]


  const [reports, setReports] = useState(reports_base)

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
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(false)
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



  // FUNCTIONS 

  const handleCreateReport = () => {
    
    const selectedsItems = tab ? selectedsGroups : selectedsDevices
    const hasSelectedsItems = selectedsItems && Array.isArray(selectedsItems) && selectedsItems.length > 0
    const hasSelectedsParams = selectedsParams && Array.isArray(selectedsParams) && selectedsParams.length > 0
    
    const date = periodType === 'day' ? format(dayDate, 'dd/MM/yyyy') : format(monthDate, 'MM/yyyy')

    const reportBody = 
    {
      userId: 1,
      userName: 'teste',
      devices: selectedsItems,
      greatness: selectedsParams,
      period: date,
      title: reportName
    }

    !hasSelectedsItems?
    toast.error(`No ${tab? 'groups' : 'devices'} selecteds`) :
    !reportName?
    toast.error('Report name required') :
    !hasSelectedsParams?
    toast.error('No parameters selecteds') :
    createReport(reportBody)

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

  async function createReport(reportBody) {
    setCreating(true)

    try {

      const response = await api_reports.post('', reportBody)
      console.log(response)

      if(response.data) {
        
        const message = response.data.message
        // const processingStatus = response.data.processingStatus
        getReports()

        message ? toast.info(message) : toast.info('Generating report...')

      } else {
        toast.error('Failed to create report')
      }

    } catch(e) {
      toast.error('Failed to create report')
    }

    setCreating(false)
  }

  async function getReports() {

    setBodyLoading(true)
    

    try {

      const response = await api_reports.get('/')

      if(response.data) {


        if(Array.isArray(response.data) && response.data.length) {
          setBodyMessage('')
        } else {
          setBodyMessage('No reports')
        }

        setReports(response.data)

      } else {
        setBodyMessage('Error loading reports')
        toast.error('Error loading reports')
      }

    } catch(e) {
      toast.error('Error loading reports')
      setBodyMessage('Error loading reports')
    }

    setBodyLoading(false)
  }

  async function handleDeleteReport(reportId) {

    setDeleting(true)
    
    try {

      const response = await api_reports.delete(`/${reportId}`)
      

      if(response) {
        console.log(response)
        toast.info('Report deleted')
        getReports()
      } 

    } catch(e) {
      toast.error('Error deleting report')
    }

    setDeleting(false)
  }

  // USE EFFECTS

  useEffect(() => {
    getDevices()
    getReports()
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
                                  onClick={() => {
                                    setCurrentDevices(selectedsDevices)
                                    close()
                                  }}
                                >
                                  Add 
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
                    <button 
                      onClick={() => handleCreateReport()}
                      disabled={creating}
                    >
                      Create Report {creating && <Loading />}
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

                            const reportId = report.id
                            const processingStatus = report.processingStatus
                            const message = report.message
                            var status = ''

                            switch(processingStatus) {
                              case 'FINISHED':
                                status = 'Ready'
                                break;
                              case 'PENDING':
                                status = 'Pending'
                                break;
                              case 'PROCESSING':
                                status = 'Processing'
                                break;
                              case 'ERROR':
                                status = 'Error'
                                break;
                              default:
                                status = 'Undefined'
                                break;
                            }

                            return (
                              <Report>
                                <div>
                                  <h3>{report.title}</h3>
                                  <div>
                                    {processingStatus === 'FINISHED' && <MdFileDownload />}
                                    {(processingStatus === 'FINISHED' || processingStatus === 'ERROR') && 
                                    (deleting? <div className='deleting'><Loading /></div> : <MdDelete onClick={() => handleDeleteReport(reportId)} />) }
                                  </div>
                                </div>
                                <p>{`Period: ${report.period}`}</p>
                                <p>{`Status: ${status} ${message? ` - ${message}`  : ''}`}</p>
                                
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