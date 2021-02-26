/* eslint-disable react-hooks/exhaustive-deps */

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
import { FaWeebly } from 'react-icons/fa';
import translation from '../transl';

const SearchTab = () => {

  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt

  const { group } = useSelector(state => state.group)
  const id = group.id
  const dispatch = useDispatch()
  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')
  const [chartLoading, setChartLoading] = useState(false)
  const [chartMessage, setChartMessage] = useState('')


  const [searchType, setSearchType] = useState('simple')
  const [param, setParam] = useState('powerConsumption')
  const [selectedSub, setSelectedSub] = useState()
  const [subOptions, setSubOptions] = useState([])

  const [un, setUn] = useState('A')
  const [period, setPeriod] = useState('weekly')
  const [phase, setPhase] = useState('Phase A')

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startFormatted, setStartFormatted] = useState()
  const [endFormatted, setEndFormatted] = useState()

  const [analytics, setAnalytics] = useState({})
  const [logs, setLogs] = useState({})
  const [totalConsumption, setTotalConsumption] = useState()

  const param_options = [
    {
      title: transl.Consumption,
      value: 'powerConsumption',
      un: 'kWh'
    }
  ]

  const period_options = [
    {
      title: transl.Day,
      value: 'daily'
    },
    {
      title: transl.Week,
      value: 'weekly'
    },
    {
      title: transl.Month,
      value: 'monthly'
    },
    {
      title: transl.Year,
      value: 'yearly'
    }
  ]

  const phases = useMemo(() => {

    const lastOption = param === 'current' ?
      {
        title: transl.Average,
        value: 'Average'
      } :
      {
        title: transl.Total,
        value: 'Total'
      }

    if (param === 'current' && phase === 'Total') {
      setPhase('Average')
    } else if (param !== 'current' && phase === 'Average') {
      setPhase('Total')
    }

    if (param === 'demand') {
      setPhase('Total')
      return [
        {
          title: 'Total',
          value: 'Total'
        }
      ]
    }

    return [
      {
        title: transl.PhaseA,
        value: 'Phase A'
      },
      {
        title: transl.PhaseB,
        value: 'Phase B'
      },
      {
        title: transl.PhaseC,
        value: 'Phase C'
      },
      lastOption
    ]
  }, [param])

  // API`S CALLS

  async function getAnalytics(type, query, subID) {
    setChartLoading(true)
    setAnalytics({})
    setLogs({})

    try {

      const response = await api_analytics.get(`/search/groups/${id}/subgroup/${subID}/${type}?${query}`)

      if (response.data) {
        setChartMessage('')
        setAnalytics(response.data)
      }

    } catch (e) {
      toast.error(transl.errorOcurred)
      setChartMessage(transl.errorConnect)
      const error = e.response?.data

      if (error) {
        if (error.statusCode === 400) {
          setChartMessage(transl.invalidSearch)
        }
        else if (error.statusCode === 500) {
          setChartMessage(transl.errorUnexpected)
        }

      }
    }

    setChartLoading(false)
  }

  async function getLogs(type, query, subID, toAnalytics) {
    setChartLoading(true)

    setAnalytics({})
    setLogs({})

    try {

      const response = await api_logs.get(`/captures/groups/${id}/subgroup/${subID}/${type}?${query}`)

      if (response.data) {
        setChartMessage('')
        if (toAnalytics) {
          if (period === 'weekly') {
            setLogs(response.data.byHours)
            setAnalytics(response.data.byDays)
          } else {
            setAnalytics(response.data)
          }
        } else {
          setLogs(response.data)
        }
      }

    } catch (e) {
      toast.error(transl.errorOcurred)
      const error = e.response?.data

      setChartMessage(transl.errorConnect)

      if (error) {
        if (error.statusCode === 400) {
          setChartMessage(transl.invalidSearch)
        }
        else if (error.statusCode === 500) {
          setChartMessage(transl.errorUnexpected)
        }
      }
    }

    setChartLoading(false)
  }

  // HANDLE FUNCTIONS

  const handleSearch = () => {

    const subID = selectedSub
    console.log(selectedSub)

    if (id && subID) {
      const search_type = searchType === 'advanced' ? 'advanced' : period
      const log_search = period === 'daily' ? 'today' : period
      const query = searchType === 'advanced' ?
        `greatness=${param}&start=${startFormatted}&end=${endFormatted}` :
        `greatness=${param}`

      if (period !== 'daily' || searchType === 'advanced') {

        if (param === 'demand') {
          getLogs(log_search, query, subID, true)
        } else {
          getAnalytics(search_type, query, subID)

          if (period === 'weekly') {
            getLogs(log_search, query, subID)
          }
        }
      } else {
        getLogs(log_search, query, subID)
      }

      dispatch(setBarSelection({}))
      dispatch(setLineSelection({}))
    } else {
      subID ? setChartMessage(transl.invalidId) : setChartMessage(transl.invalidSubgroup)
    }

  }

  // USE EFFECTS

  useEffect(() => {
    let sub_options = group.subgroups && group.subgroups.map(sub => {
      let obj = {}
      obj.title = sub.name
      obj.value = sub.id


      return obj
    })

    setSelectedSub(sub_options && sub_options[0]?.value)

    setSubOptions(sub_options)

  }, [group])

  useEffect(() => {
    handleSearch()
  }, [selectedSub, param, period, startFormatted, endFormatted, searchType])

  useEffect(() => {

    setTotalConsumption(analytics?.total || logs?.total)

    if (period === 'weekly') {
      if (id && selectedSub && (!(logs && logs.data && logs.data.length) || !(analytics && analytics.data && analytics.data.length))) {
        setChartMessage(transl.noData)
      }
    }

    if (id && selectedSub && !(logs && logs.data && logs.data.length) && !(analytics && analytics.data && analytics.data.length)) {
      setChartMessage(transl.noData)
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

      const date = `${start} ${transl.to} ${end}`

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
            <h2>{group.name}</h2>
          </div>
          <div>
          </div>
        </Info>
      </Header>

      <SearchInfo>
        <div className='search-info'>
          <div>
            <p>{transl.Parameter}:&nbsp;</p>
            <span>{show_param}</span>
          </div>
          <div>
            <p>{transl.Period}:&nbsp;</p>
            <span>{show_period}</span>
          </div>
        </div>

        <div className='values'>
          {
            <div>
              <p>{transl.TotalConsumption}:&nbsp;</p>
              <span>{totalConsumption && `${totalConsumption} kWh`}</span>
            </div>
          }
        </div>

        <div className='phases'>
          {
            phases.map(phase_option => {

              return (
                <CheckboxLabels value={phase_option.value} variable={phase} label={phase_option.title} func={setPhase} />
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
                  <p>{transl.Parameter}:</p>

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

                  <p>{transl.Subgroup}:</p>

                  <select value={selectedSub} onChange={(e) => setSelectedSub(e.target.value)}>
                    {
                      subOptions && subOptions.map(sub_option => {

                        return (
                          <option key={subOptions.indexOf(sub_option) + 1} value={sub_option.value}>
                            {sub_option.title}
                          </option>
                        )
                      })
                    }
                  </select>

                </div>
                <div className='search-radio'>
                  <RadioButton label={transl.Period} value='simple' variable={searchType} func={setSearchType} />
                  <RadioButton label={transl.Date} value='advanced' variable={searchType} func={setSearchType} />
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
                        <p>{transl.Start}</p>
                        <div>
                          <BasicDatePicker value={startDate} handleChange={setStartDate} />
                        </div>
                      </div>
                      <div>
                        <p>{transl.Final}</p>
                        <div>
                          <BasicDatePicker value={endDate} handleChange={setEndDate} />
                        </div>
                      </div>
                    </div>
                }
                <div className='search-button'>
                  <button onClick={() => handleSearch()}>
                    {transl.SearchButton}
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