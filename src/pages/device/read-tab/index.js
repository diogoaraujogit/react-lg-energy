import React, { useMemo, useState, useEffect } from 'react';
import { MdLens } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading';

import {
  Container, Header, Info, SearchInfo, LoadingArea, BodyMessage, Body,
  SearchBox, BodyContent
} from './styles';

import CheckboxLabels from '../../../components/Checkbox';
import BasicDatePicker from '../../../components/BasicDatePicker';
import BodyData from './BodyData';
import api_logs from '../../../services/api_logs';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { setLogSelection } from '../../../store/modules/logs/actions';

const ReadTab = () => {

  const { device } = useSelector(state => state.device)
  const id = device.idLora
  const dispatch = useDispatch()
  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')
  const [chartLoading, setChartLoading] = useState(false)
  const [chartMessage, setChartMessage] = useState('')


  const [param, setParam] = useState('current')
  const [un, setUn] = useState('A')
  const [phase, setPhase] = useState('Phase A')

  const [startDate, setStartDate] = useState(new Date())
  const [startFormatted, setStartFormatted] = useState()
  const [logs, setLogs] = useState({})

  const param_options = [
    {
      title: 'Current',
      value: 'current',
      un: 'A'
    },
    {
      title: 'Consumption',
      value: 'powerConsumption',
      un: 'kWh'
    },
    {
      title: 'Active Power',
      value: 'activePower',
      un: 'kW'
    },
    {
      title: 'Demand',
      value: 'demand',
      un: 'kWh'
    }
  ]


  const phases = ['Phase A', 'Phase B', 'Phase C', 'Total']

  // API`S CALLS

  async function getLogs(type, query) {
    setChartLoading(true)
    setChartMessage('')
    setLogs({})

    try {

      const response = await api_logs.get(`/captures/devices/${id}/${type}?${query}`)

      if (response.data) {
        setLogs(response.data)
      }

    } catch (e) {
      toast.error('An error occurred')
      const error = e.response?.data

      setChartMessage('Unable to connect to server')

      if (error) {
        if (error.statusCode === 400) {
          setChartMessage('Invalid search')
        }
        else if (error.statusCode === 500) {
          setChartMessage('An unexpected error occurred')
        }
      }
    }

    setChartLoading(false)
  }

  // HANDLE FUNCTIONS

  const handleSearch = () => {
    const search_type = 'advanced'
    const query = `greatness=${param}&date=${startFormatted}`

    getLogs(search_type, query)

    dispatch(setLogSelection({}))

  }

  // USE EFFECTS

  useEffect(() => {
    id && handleSearch()
  }, [param, startFormatted])

  useEffect(() => {

    if ((logs && logs.data && !logs.data.length)) {
      setChartMessage('There is no data for this search')
    }
  }, [logs])


  // FUNCTIONS TO FORMAT INFOS TO BE SHOWED

  const show_period = useMemo(() => {

      const start = format(startDate, 'dd/MM/yyyy')
      setStartFormatted(start)

      const date = `${start}`

      return date

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate])

  const show_param = useMemo(() => {

    const selected = param_options.filter(option => option.value === param)
    setUn(selected[0].un)

    return selected[0].title

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return (
    <Container>
      <Header>
        <Info>
          <div>
            <h2>{device.name}</h2>
          </div>
          <div>
            <MdLens />
            <span>&nbsp;Online time:&nbsp;</span>
            <span>00:00:00</span>
          </div>
        </Info>
      </Header>

      <SearchInfo>
        <div className='search-info'>
          <div>
            <p>Parameter:&nbsp;</p>
            <span>{show_param}</span>
          </div>
          <div>
            <p>Period:&nbsp;</p>
            <span>{show_period}</span>
          </div>
        </div>
        <div className='value'>

        </div>
        <div className='phases'>
          {
            phases.map(phase_option => {

              return (
                <CheckboxLabels value={phase_option} variable={phase} label={phase_option} func={setPhase} />
              )
            })
          }
        </div>
      </SearchInfo>

      {
        bodyLoading ?
          <LoadingArea>
            <Loading />
          </LoadingArea>
          :
          bodyMessage ?
            <BodyMessage>
              {bodyMessage}
            </BodyMessage>
            :
            <Body>
              <SearchBox>
                <div className='search-select'>
                  <p>Parameter:</p>

                  <select value={param} onChange={(e) => setParam(e.target.value)}>
                    {
                      param_options.map(param_option => {

                        return (
                          <option key={param_options.indexOf(param_option) + 1} value={param_option.value}>
                            {param_option.title}
                          </option>
                        )
                      })
                    }
                  </select>

                </div>
                <div className='search-radio'>

                </div>
                
                    <div className='search-date'>
                      <div>
                        <p>Date</p>
                        <div>
                          <BasicDatePicker value={startDate} handleChange={setStartDate} />
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
              </SearchBox>

              <BodyContent>
                {
                  chartLoading ?
                    <LoadingArea>
                      <Loading />
                    </LoadingArea>
                    :
                    chartMessage ?
                      <BodyMessage>
                        {chartMessage}
                      </BodyMessage>
                      :
                      <BodyData
                        logs={logs}
                        phase={phase}
                        param={show_param}
                        un={un}
                      />
                }
              </BodyContent>
            </Body>

      }
    </Container>
  );
}

export default ReadTab;