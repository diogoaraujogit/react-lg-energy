import React, { useMemo, useState, useEffect } from 'react';
import { MdLens } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading';

import {
  Container, Header, Info, SearchInfo, LoadingArea, BodyMessage, Body,
  SearchBox, BodyContent
} from './styles';

import RadioButton from '../../../components/Radio';
import CheckboxLabels from '../../../components/Checkbox';
import BasicDatePicker from '../../../components/BasicDatePicker';
import BodyData from './BodyData';
import api_analytics from '../../../services/api_analytics';
import api_logs from '../../../services/api_logs';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { setBarSelection, setLineSelection } from '../../../store/modules/analytics/actions';

const SearchTab = () => {

  const { device } = useSelector(state => state.device)
  const id = device.idLora
  const dispatch = useDispatch()
  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')
  const [chartLoading, setChartLoading] = useState(false)
  const [chartMessage, setChartMessage] = useState('')


  const [searchType, setSearchType] = useState('simple')
  const [param, setParam] = useState('current')
  const [un, setUn] = useState('A')
  const [period, setPeriod] = useState('weekly')
  const [phase, setPhase] = useState('Phase A')

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startFormatted, setStartFormatted] = useState()
  const [endFormatted, setEndFormatted] = useState()

  const [analytics, setAnalytics] = useState({})
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

  const period_options = [
    {
      title: 'Day',
      value: 'daily'
    },
    {
      title: 'Week',
      value: 'weekly'
    },
    {
      title: 'Month',
      value: 'monthly'
    },
    {
      title: 'Year',
      value: 'yearly'
    }
  ]

  const phases = ['Phase A', 'Phase B', 'Phase C', 'Total']

  // API`S CALLS

  async function getAnalytics(type, query) {
    setChartLoading(true)
    setChartMessage('')
    setAnalytics({})
    setLogs({})

    try {

      const response = await api_analytics.get(`/search/devices/${id}/${type}?${query}`)

      if (response.data) {
        setAnalytics(response.data)
      }

    } catch (e) {
      toast.error('An error occurred')
      const error = e.response?.data
      if(error) {
        if(error.statusCode === 400) {
          setChartMessage('Invalid search')
        }
        else if(error.statusCode === 500) {
          setChartMessage('An unexpected error occurred')
        }
        else {
          setChartMessage('Unable to connect to server')
        }
      }
    }

    setChartLoading(false)
  }

  async function getLogs(type, query) {
    setChartLoading(true)
    setChartMessage('')
    setAnalytics({})
    setLogs({})

    try {

      const response = await api_logs.get(`/captures/devices/${id}/${type}?${query}`)

      if (response.data) {
        setLogs(response.data)
      }

    } catch (e) {
      toast.error('An error occurred')
      const error = e.response?.data
      if(error) {
        if(error.statusCode === 400) {
          setChartMessage('Invalid search')
        }
        else if(error.statusCode === 500) {
          setChartMessage('An unexpected error occurred')
        }
        else {
          setChartMessage('Unable to connect to server')
        }
      }
    }

    setChartLoading(false)
  }

  // HANDLE FUNCTIONS

  const handleSearch = () => {
    const search_type = searchType === 'advanced' ? 'advanced' : period
    const log_search = period === 'daily'? 'today' : period
    const query = searchType === 'advanced' ?
      `greatness=${param}&start=${startFormatted}&end=${endFormatted}` :
      `greatness=${param}`

    if (period !== 'daily' || searchType === 'advanced') {
      getAnalytics(search_type, query)

      // if (period === 'weekly') {
      //   getLogs(log_search, query)
      // }
    }  else {
      getLogs(log_search, query)
    }

    dispatch(setBarSelection({}))
    dispatch(setLineSelection({}))

  }

  // USE EFFECTS

  useEffect(() => {
    id && handleSearch()
  }, [param, period, startFormatted, endFormatted, searchType])

  useEffect(() => {

    

    if((logs && logs.data && !logs.data.length) && (analytics && analytics.data && !analytics.data.length)) {
      setChartMessage('There is no data for this search')
    }
  }, [analytics, logs, period, searchType])


  // FUNCTIONS TO FORMAT INFOS TO BE SHOWED

  const show_period = useMemo(() => {

    if (searchType === 'simple') {
      const selected = period_options.filter(option => option.value === period)

      return selected[0].title
    } else {
      const start = format(startDate, 'dd/MM/yyyy')
      const end = format(endDate, 'dd/MM/yyyy')
      setStartFormatted(start)
      setEndFormatted(end)

      const date = `${start} to ${end}`

      return date
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchType, period, startDate, endDate])

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
                  <RadioButton label='Period' value='simple' variable={searchType} func={setSearchType} />
                  <RadioButton label='Date' value='advanced' variable={searchType} func={setSearchType} />
                </div>
                {
                  searchType === 'simple' ?
                    <div className='search-period'>
                      {
                        period_options.map(period_option => {


                          return (
                            <button onClick={() => setPeriod(period_option.value)}
                              className={period === period_option.value ? 'selected' : ''}
                            >
                              {period_option.title}
                            </button>
                          )
                        })
                      }
                    </div>
                    :
                    <div className='search-date'>
                      <div>
                        <p>Start</p>
                        <div>
                          <BasicDatePicker value={startDate} handleChange={setStartDate} />
                        </div>
                      </div>
                      <div>
                        <p>Final</p>
                        <div>
                          <BasicDatePicker value={endDate} handleChange={setEndDate} />
                        </div>
                      </div>
                    </div>
                }
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
                        analytics={analytics} 
                        logs={logs}
                        phase={phase} 
                        searchType={searchType}
                        period={period}
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

export default SearchTab;