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

const SearchTab = () => {

  // const { group } = useSelector(state => state.group)
  // const id = group.id
  // const dispatch = useDispatch()
  // const [bodyLoading, setBodyLoading] = useState(false)
  // const [bodyMessage, setBodyMessage] = useState('')
  // const [chartLoading, setChartLoading] = useState(false)
  // const [chartMessage, setChartMessage] = useState('')


  // const [searchType, setSearchType] = useState('simple')
  // const [param, setParam] = useState('powerConsumption')
  // const [selectedSub, setSelectedSub] = useState()
  // const [subOptions, setSubOptions] = useState([])

  // const [un, setUn] = useState('A')
  // const [period, setPeriod] = useState('weekly')
  // const [phase, setPhase] = useState('Phase A')

  // const [startDate, setStartDate] = useState(new Date())
  // const [endDate, setEndDate] = useState(new Date())
  // const [startFormatted, setStartFormatted] = useState()
  // const [endFormatted, setEndFormatted] = useState()

  // const [analytics, setAnalytics] = useState({})
  // const [logs, setLogs] = useState({})

  // const param_options = [
  //   {
  //     title: 'Consumption',
  //     value: 'powerConsumption',
  //     un: 'kWh'
  //   }
  // ]


  // const period_options = [
  //   {
  //     title: 'Day',
  //     value: 'daily'
  //   },
  //   {
  //     title: 'Week',
  //     value: 'weekly'
  //   },
  //   {
  //     title: 'Month',
  //     value: 'monthly'
  //   },
  //   {
  //     title: 'Year',
  //     value: 'yearly'
  //   }
  // ]

  // const phases = useMemo(() => {

  //   const lastOption = param === 'current' ?
  //     {
  //       title: 'Average',
  //       value: 'Average'
  //     } :
  //     {
  //       title: 'Total',
  //       value: 'Total'
  //     }

  //   if (param === 'current' && phase === 'Total') {
  //     setPhase('Average')
  //   } else if (param !== 'current' && phase === 'Average') {
  //     setPhase('Total')
  //   }

  //   if (param === 'demand') {
  //     setPhase('Total')
  //     return [
  //       {
  //         title: 'Total',
  //         value: 'Total'
  //       }
  //     ]
  //   }

  //   return [
  //     {
  //       title: 'Phase A',
  //       value: 'Phase A'
  //     },
  //     {
  //       title: 'Phase B',
  //       value: 'Phase B'
  //     },
  //     {
  //       title: 'Phase C',
  //       value: 'Phase C'
  //     },
  //     lastOption
  //   ]
  // }, [param])

  // // API`S CALLS

  // async function getAnalytics(type, query, subID) {
  //   setChartLoading(true)
  //   setAnalytics({})
  //   setLogs({})

  //   try {

  //     const response = await api_analytics.get(`/search/groups/${id}/subgroup/${subID}/${type}?${query}`)

  //     if (response.data) {
  //       setChartMessage('')
  //       setAnalytics(response.data)
  //     }

  //   } catch (e) {
  //     toast.error('An error occurred')
  //     setChartMessage('Unable to connect to server')
  //     const error = e.response?.data

  //     if (error) {
  //       if (error.statusCode === 400) {
  //         setChartMessage('Invalid search')
  //       }
  //       else if (error.statusCode === 500) {
  //         setChartMessage('An unexpected error occurred')
  //       }

  //     }
  //   }

  //   setChartLoading(false)
  // }

  // async function getLogs(type, query, subID, toAnalytics) {
  //   setChartLoading(true)

  //   setAnalytics({})
  //   setLogs({})

  //   try {

  //     const response = await api_logs.get(`/captures/groups/${id}/subgroup/${subID}/${type}?${query}`)

  //     if (response.data) {
  //       setChartMessage('')
  //       if (toAnalytics) {
  //         if (period === 'weekly') {
  //           setLogs(response.data.byHours)
  //           setAnalytics(response.data.byDays)
  //         } else {
  //           setAnalytics(response.data)
  //         }
  //       } else {
  //         setLogs(response.data)
  //       }
  //     }

  //   } catch (e) {
  //     toast.error('An error occurred')
  //     const error = e.response?.data

  //     setChartMessage('Unable to connect to server')

  //     if (error) {
  //       if (error.statusCode === 400) {
  //         setChartMessage('Invalid search')
  //       }
  //       else if (error.statusCode === 500) {
  //         setChartMessage('An unexpected error occurred')
  //       }
  //     }
  //   }

  //   setChartLoading(false)
  // }

  // // HANDLE FUNCTIONS

  // const handleSearch = () => {
    
  //   const subID = selectedSub
  //   console.log(selectedSub)

  //   if (id && subID) {
  //     const search_type = searchType === 'advanced' ? 'advanced' : period
  //     const log_search = period === 'daily' ? 'today' : period
  //     const query = searchType === 'advanced' ?
  //       `greatness=${param}&start=${startFormatted}&end=${endFormatted}` :
  //       `greatness=${param}`

  //     if (period !== 'daily' || searchType === 'advanced') {

  //       if (param === 'demand') {
  //         getLogs(log_search, query, subID, true)
  //       } else {
  //         getAnalytics(search_type, query, subID)

  //         if (period === 'weekly') {
  //           getLogs(log_search, query, subID)
  //         }
  //       }
  //     } else {
  //       getLogs(log_search, query, subID)
  //     }

  //     dispatch(setBarSelection({}))
  //     dispatch(setLineSelection({}))
  //   } else {
  //     subID? setChartMessage('Invalid ID') : setChartMessage('Invalid subgroup')
  //   }

  // }

  // // USE EFFECTS

  // useEffect(() => {
  //   let sub_options = group.subgroups && group.subgroups.map(sub => {
  //     let obj = {}
  //     obj.title = sub.name
  //     obj.value = sub.id


  //     return obj
  //   })

  //   setSelectedSub(sub_options && sub_options[0]?.value)
    
  //   setSubOptions(sub_options)

  // }, [group])

  // useEffect(() => {
  //   handleSearch()
  // }, [selectedSub, param, period, startFormatted, endFormatted, searchType])

  // useEffect(() => {

  //   if(period === 'weekly') {
  //     if (id && selectedSub && (!(logs && logs.data && logs.data.length) || !(analytics && analytics.data && analytics.data.length))) {
  //       setChartMessage('There is no data for this search')
  //     }  
  //   }

  //   if (id && selectedSub && !(logs && logs.data && logs.data.length) && !(analytics && analytics.data && analytics.data.length)) {
  //     setChartMessage('There is no data for this search')
  //   }
  // }, [analytics, logs, period, searchType])


  // // FUNCTIONS TO FORMAT INFOS TO BE SHOWED

  // const show_period = useMemo(() => {

  //   if (searchType === 'simple') {
  //     const selected = period_options.filter(option => option.value === period)

  //     return selected[0].title
  //   } else {
  //     const start = format(startDate, 'dd/MM/yyyy')
  //     const end = format(endDate, 'dd/MM/yyyy')
  //     setStartFormatted(start)
  //     setEndFormatted(end)

  //     const date = `${start} to ${end}`

  //     return date
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchType, period, startDate, endDate])

  // const show_param = useMemo(() => {

  //   const selected = param_options.filter(option => option.value === param)
  //   setUn(selected[0].un)

  //   return selected[0].title

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [param])

  return (
    <Container>
      {/* <Header>
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

                  <p>Subgroup:</p>

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

      } */}
    </Container>
  );
}

export default SearchTab;