/* eslint-disable react-hooks/exhaustive-deps */
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
import translation from '../transl';

const ReadTab = () => {

  
  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt

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
      title: transl.Current,
      value: 'current',
      un: 'A'
    },
    {
      title: transl.Consumption,
      value: 'powerConsumption',
      un: 'kWh'
    },
    {
      title: transl.Power,
      value: 'activePower',
      un: 'kW'
    },
    {
      title: transl.Demand,
      value: 'demand',
      un: 'kWh'
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

  async function getLogs(type, query) {
    setChartLoading(true)
    setLogs({})

    try {

      const response = await api_logs.get(`/captures/devices/${id}/${type}?${query}`)

      if (response.data) {

        setChartMessage('')
        setLogs(response.data)
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
    if (id) {
      const search_type = 'advanced'
      const query = `greatness=${param}&date=${startFormatted}`

      getLogs(search_type, query)

      dispatch(setLogSelection({}))
    } else {
      setChartMessage(transl.invalidId)
    }

  }

  // USE EFFECTS

  useEffect(() => {
    handleSearch()
  }, [param, startFormatted])

  useEffect(() => {

    if (id && !(logs && logs.data && logs.data.length)) {
      setChartMessage(transl.noData)
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
            <span>&nbsp;{transl.OnlineTime}:&nbsp;</span>
            <span>00:00:00</span>
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

                </div>
                <div className='search-radio'>

                </div>

                <div className='search-date'>
                  <div>
                    <p>{transl.Date}</p>
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