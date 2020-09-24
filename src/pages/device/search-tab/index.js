import React, { useMemo, useState } from 'react';
import { MdLens } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading';

import {
  Container, Header, Info, SearchInfo, LoadingArea, BodyMessage, Body,
  SearchBox, BodyContent
} from './styles';

import arrow_icon from '../../../assets/chevron-forward-outline.svg'
import RadioButton from '../../../components/Radio';
import CheckboxLabels from '../../../components/Checkbox';
import BasicDatePicker from '../../../components/BasicDatePicker';
import BodyData from './BodyData';

const SearchTab = () => {

  const { device } = useSelector(state => state.device)
  const dispatch = useDispatch()
  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')
  const [searchType, setSearchType] = useState('simple')

  const [param, setParam] = useState('current')
  const [period, setPeriod] = useState('day')
  const [periodAdvanced, setPeriodAdvanced] = useState('')
  const [phase, setPhase] = useState('Phase A')

  const param_options = [
    {
      title: 'Current',
      value: 'current'
    },
    {
      title: 'Consumption',
      value: 'consumption'
    },
    {
      title: 'Active Power',
      value: 'activePower'
    },
    {
      title: 'Demand',
      value: 'demand'
    }
  ]

  const period_options = [
    {
      title: 'Day',
      value: 'day'
    },
    {
      title: 'Week',
      value: 'week'
    },
    {
      title: 'Month',
      value: 'month'
    },
    {
      title: 'Year',
      value: 'year'
    }
  ]

  const phases = ['Phase A', 'Phase B', 'Phase C', 'Total']

  // API`S CALLS

  // async function getAnalytics() {

  //   try {

  //     const response = await 

  //   } catch(e) {

  //   }
  // }


  const show_period = useMemo(() => {

    if (searchType === 'simple') {
      const selected = period_options.filter(option => option.value === period)

      return selected[0].title
    } else {
      const date = `01/01/2020 to 01/10/2020`

      return date
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchType, period, periodAdvanced])

  const show_param = useMemo(() => {

    const selected = param_options.filter(option => option.value === param)

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
                          <BasicDatePicker />
                        </div>
                      </div>
                      <div>
                        <p>Final</p>
                        <div>
                          <BasicDatePicker />
                        </div>
                      </div>
                    </div>
                }
                <div className='search-button'>
                  <button>
                    SEARCH
                  </button>
                </div>
              </SearchBox>

              <BodyContent>
                <BodyData>

                </BodyData>
              </BodyContent>
            </Body>

      }
    </Container>
  );
}

export default SearchTab;