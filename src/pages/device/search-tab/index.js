import React, { useState } from 'react';
import { MdLens } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading';

import {
  Container, Header, Info, SearchInfo, LoadingArea, BodyMessage, Body,
  SearchBox, BodyContent, BodyData
} from './styles';

import arrow_icon from '../../../assets/chevron-forward-outline.svg'
import RadioButton from '../../../components/Radio';

const SearchTab = () => {

  const { device } = useSelector(state => state.device)
  const dispatch = useDispatch()
  const [bodyLoading, setBodyLoading] = useState(false)
  const [bodyMessage, setBodyMessage] = useState('')
  const [searchType, setSearchType] = useState('simple')

  const [param, setParam] = useState('current')
  const [period, setPeriod] = useState('day')

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

  const period_options = ['Day', 'Week', 'Month', 'Year']


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
                            <button onClick={() => setPeriod(period_option.toLowerCase())} className={period === period_option.toLowerCase()? 'selected' : ''}>
                              {period_option}
                            </button>
                          )
                        })
                      }
                    </div>
                    :
                    <div className='search-date'>

                    </div>
                }
                <div className='search-button'>

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