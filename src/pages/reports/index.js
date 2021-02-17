/* eslint-disable react-hooks/exhaustive-deps */
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
import { useSelector } from 'react-redux';
import translation from './transl';

const Reports = () => {

  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt


  const tabs = useMemo(() => [transl.Devices, transl.Groups], [])

  const [tab, setTab] = useState(0)



  const [reports, setReports] = useState([])

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
    { title: transl.Current, value: 'current' },
    { title: transl.Power, value: 'activePower' },
    { title: transl.Consumption, value: 'powerConsumption' },
    { title: transl.Demand, value: 'demand' }
  ]



  // FUNCTIONS 

  const handleCreateReport = () => {
    
    const selectedsItems = tab ? selectedsGroups : selectedsDevices
    const hasSelectedsItems = selectedsItems && Array.isArray(selectedsItems) && selectedsItems.length > 0
    const hasSelectedsParams = selectedsParams && Array.isArray(selectedsParams) && selectedsParams.length > 0
    console.log(selectedsParams)
    const date = periodType === 'day' ? format(dayDate, 'dd/MM/yyyy') : format(monthDate, 'MM/yyyy')

    const greatness = selectedsParams.map(param => param.id)

    const reportBody = 
    {
      userId: 1,
      userName: 'teste',
      devices: selectedsItems,
      greatness: greatness,
      period: date,
      title: reportName
    }

    !hasSelectedsItems?
    toast.error(english? `No ${tab? 'group' : 'device'} selected` : `Nenhum ${tab? 'grupo' : 'dispositivo'} selecionado`) :
    !reportName?
    toast.error(transl.nameRequired) :
    !hasSelectedsParams?
    toast.error(transl.paramRequired) :
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
        toast.error(transl.errorDevices)
        setPageMessage(transl.errorDevices)
      }

    } catch (e) {
      toast.error(transl.errorDevices)
      setPageMessage(transl.errorDevices)
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

        message ? toast.info(message) : toast.info(transl.creating)

      } else {
        toast.error(transl.reportFail)
      }

    } catch(e) {
      toast.error(transl.reportFail)
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
          setBodyMessage(transl.noReports)
        }

        setReports(response.data)

      } else {
        setBodyMessage(transl.errorReports)
        toast.error(transl.errorReports)
      }

    } catch(e) {
      toast.error(transl.errorReports)
      setBodyMessage(transl.errorReports)
    }

    setBodyLoading(false)
  }

  async function handleDeleteReport(reportId) {

    setDeleting(true)
    
    try {

      const response = await api_reports.delete(`/${reportId}`)
      

      if(response) {
        console.log(response)
        toast.info(transl.reportDeleted)
        getReports()
      } 

    } catch(e) {
      toast.error(transl.errorDelete)
    }

    setDeleting(false)
  }

  async function handleDownloadReport(reportId) {

    
    try {

      const response = await api_reports.get(`/download/${reportId}`)
      

      if(response) {
        console.log(response)
        // toast.info('Report deleted')
        

        const link = document.createElement('a');
				console.log(response.config.url)
				link.href = `https://lg.grupoicts.com.br/reports${response.config.url}`;
				link.target = "_blank" // ou _self 
				link.rel = 'noopener noreferrer'
				document.body.appendChild(link);
				link.click();
      } 

    } catch(e) {
      toast.error(transl.errorDownload)
    }
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
                          {transl.Select}
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
                                  {transl.Cancel}
                                </button>
                                <button
                                  onClick={() => {
                                    setCurrentDevices(selectedsDevices)
                                    close()
                                  }}
                                >
                                  {transl.Add}
                                </button>
                              </div>
                            </AddDeviceModal>
                          )
                        }
                      }
                    </Popup>

                    <input
                      placeholder={transl.reportName}
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                    />

                  </AddDevice>
                  <CurrentDevices>
                    <p>{transl.selectParameter}</p>

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
                      {transl.createReport} {creating && <Loading />}
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
                                status = transl.Ready
                                break;
                              case 'PENDING':
                                status = transl.Pending
                                break;
                              case 'PROCESSING':
                                status = transl.Processing
                                break;
                              case 'ERROR':
                                status = transl.Error
                                break;
                              default:
                                status = transl.Undefined
                                break;
                            }

                            return (
                              <Report>
                                <div>
                                  <h3>{report.title}</h3>
                                  <div>
                                    {processingStatus === 'FINISHED' && <MdFileDownload onClick={() => handleDownloadReport(reportId)} />}
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