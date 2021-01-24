import React, { useEffect } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { MdArrowDropDown, MdArrowDropUp, MdKeyboardArrowUp } from 'react-icons/md';
import Loading from '../../../components/Loading'
import PieChart from '../../../components/PieChart';

import {
  Container,
  Content,
  RankingChart,
  ConsumptionChart,
  RankingList,
  RankingSearch,
  LoadingArea,
  MessageArea,
} from './styles';

const RankingTab = () => {

  const [chartData, setChartData] = useState([])


  const [rakingLoading, setRankingLoading] = useState(false)
  const [rankingMessage, setRankingMessage] = useState('')
  const [showRanking, setShowRanking] = useState(true)

  const rankingBase = [
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
    {
      device: 'Dispositivo',
      general: '50%',
      kWh: 415.29,
      price: 471.26
    },
  ]

  const [ranking, setRanking] = useState(rankingBase)

  useEffect(() => {

    const used = 50
    const free = 50

    const data = [
      {
        "id": "used",
        "label": "used",
        "value": used,
      },
      {
        "id": "free",
        "label": "free",
        "value": free,
      }
    ]

    setChartData(data)

  }, [])

  return (
    <Container>
      <Content>
        <div></div>
        <div>
          {
            showRanking ?
              <RankingChart>
                <div>
                  <p>1°&nbsp;</p>
                  <span>Solda L2</span>
                </div>
                <ConsumptionChart>
                  <div className='info'>
                    <h2>{`${50 || '-'}%`}</h2>
                    <p>General Consumption</p>
                  </div>
                  <div className='chart'>
                    <PieChart data={chartData} />
                  </div>
                </ConsumptionChart>
                <div>
                  <p>R$ 471.26</p>
                  <p>415.29 kWh</p>
                </div>
                <div>
                  <button>
                    SEARCH RANKING <MdKeyboardArrowUp />
                  </button>
                </div>
              </RankingChart>
              :
              <RankingSearch>
                <div className='header'>

                </div>
                <div>
                  <div>
                    <p>Parameter:</p>
                    <div className='filter-select'>
                      {/* <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                        <option key={0} value=''>
                          Devices
                        </option>
                        {
                          groups && Array.isArray(groups) && groups.map(group => {

                            return (
                              <option key={groups.indexOf(group) + 1} value={group.name}>
                                {group.name}
                              </option>
                            )
                          })
                        }
                      </select> */}
                    </div>
                  </div>
                </div>
              </RankingSearch>
          }
          {
            rakingLoading ?
              <LoadingArea>
                <Loading />
              </LoadingArea>
              :
              rankingMessage ?
                <MessageArea>
                  {rankingMessage}
                </MessageArea>
                :
                <RankingList>
                  <div className='table-line'>
                    <span>Position</span>
                    <span>Device</span>
                    <span>General Consumption</span>
                    <span>kWh</span>
                    <span>Price</span>
                  </div>
                  <div className='table-body'>
                    {
                      ranking.map((item, i) => {

                        const idx = i + 1 + '°'

                        return (
                          <div className='table-line'>
                            <p>{idx}</p>
                            <p>{item.device}</p>
                            <p>{item.general}</p>
                            <p>{item.kWh}</p>
                            <p>{item.price}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </RankingList>
          }
        </div>
      </Content>
    </Container>
  );
}

export default RankingTab;