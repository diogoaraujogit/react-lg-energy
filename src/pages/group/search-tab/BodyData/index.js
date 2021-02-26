/* eslint-disable react-hooks/exhaustive-deps */

import { format, parse, parseISO } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { MdEqualizer, MdShowChart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { date } from 'yup';
import BarChart from '../../../../components/BarChart';
import LineChart from '../../../../components/LineChart';
import { hours } from '../../../../config';
import { setBarSelection, setLineSelection } from '../../../../store/modules/analytics/actions';
import translation from '../../transl';
import { BodyMessage } from '../styles';
import { Container, Cards, Card, ChartArea, ChartHeader, ChartBody, GroupDetails } from './styles';

const BodyData = ({ analytics, logs, phase, searchType, period, param, un }) => {

  const { english } = useSelector(props => props.intl)
  const transl = english? translation.en : translation.pt

  const { barSelection, lineSelection } = useSelector(state => state.analytics)

  const [chartType, setChartType] = useState(true)
  const [groupDetails, setGroupDetails] = useState(false)
  const [selected, setSelected] = useState(false)
  const [selectedValue, setSelectedValue] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const isAnalytics = period === 'monthly' || period === 'yearly' || (period === 'weekly' && chartType) || searchType === 'advanced'
  const devicesDetails = analytics?.devicesDetails || logs?.devicesDetails

  const relPhases = {
    'Phase A': 'a',
    'Phase B': 'b',
    'Phase C': 'c',
    'Average': 'average',
    'Total': 'total'
  }

  const relMonths = {
    '01': transl.January,
    '02': transl.February,
    '03': transl.March,
    '04': transl.April,
    '05': transl.May,
    '06': transl.June,
    '07': transl.July,
    '08': transl.August,
    '09': transl.September,
    '10': transl.October,
    '11': transl.November,
    '12': transl.December,
  }

  console.log('----> Analytics e Logs')
  console.log(analytics)
  console.log(logs)

  const formatDate = (date, chartLegend, average) => {

    if (searchType === 'simple' && period === 'yearly') {
      return relMonths[date.slice(3, 5)]
    }
    else if (!isAnalytics) {
      return date.slice(-5)
    }
    else {
      if (chartLegend) {
        return date.slice(0, 5)
      } else {
        return date.slice(0, 10)
      }
    }
  }

  const cards = useMemo(() => {

    let data_type

    if (isAnalytics) {
      data_type = analytics
    } else {
      data_type = logs
    }

    const biggest = data_type && data_type.biggest && data_type.biggest[relPhases[phase]] ?
      data_type.biggest[relPhases[phase]] : false

    const smallest = data_type && data_type.smallest && data_type.smallest[relPhases[phase]] ?
      data_type.smallest[relPhases[phase]] : false

    const average = data_type && data_type.average && data_type.average[relPhases[phase]] ?
      data_type.average[relPhases[phase]] : false


    const b_value = biggest ? biggest.value : ''
    const b_date = biggest && biggest.date ? formatDate(biggest.date) : ''

    const l_value = smallest ? smallest.value : ''
    const l_date = smallest && smallest.date ? formatDate(smallest.date) : ''

    const a_value = average ? average.value : ''
    const a_date = '-'  //average && average.date ? formatDate(average.date, false, true) : ''

    const s_value = selectedValue
    const s_date = selectedDate

    return (
      [
        {
          title: transl.Highest,
          date: b_date || '02 SET 2020',
          un: un || 'A',
          value: b_value || 206
        },
        {
          title: transl.Lowest,
          date: l_date || '02 SET 2020',
          un: un || 'A',
          value: l_value || 206
        },
        {
          title: transl.Average,
          date: a_date || '02 SET 2020',
          un: un || 'A',
          value: a_value || 206
        },
        {
          title: transl.Selected,
          date: s_date || '-',
          un: un || 'A',
          value: s_value || '-'
        },
      ]
    )

  }, [analytics, logs, phase, selectedValue, selectedDate, chartType])


  // DADOS DOS GRÁFICOS DE BARRA

  const barData = !isAnalytics ?
    logs && logs.data && logs.data.length ?
      logs.data.map(data => {

        let point = {}

        point[phase] = data[relPhases[phase]]
        point.date = formatDate(data.date, true)
        point.full = formatDate(data.date)

        return point
      })
      :
      [

      ]
    :
    analytics && analytics.data && analytics.data.length ?
      analytics.data.map(data => {
        const date = data.createdAt || data.date
        let point = {}

        point[phase] = data[relPhases[phase]]
        point.date = formatDate(date, true)
        point.full = formatDate(date)

        return point
      })
      :
      [

      ]


  const lineData = !isAnalytics ?
    period === 'weekly' ?
      logs && logs.data && logs.data.length ?
        logs.data.map(day => {
          let line = {}

          line.id = day.date
          line.data = day && day.data && day.data.length ?
            hours.map(hour => {

              let point = {}
              point.x = hour
              point.y = null

              day.data.map((data, idx) => {
                let x = formatDate(data.date, true)

                if (x === hour) {
                  point.y = data[relPhases[phase]]
                  point.full = formatDate(data.date)
                }
              })

              return point
            })
            :
            []

          return line
        })
        :
        []
      :
      [
        {
          id: phase,
          data: logs && logs.data && logs.data.length ?
            logs.data.map(data => {

              let point = {}

              point.y = data[relPhases[phase]]
              point.x = formatDate(data.date, true)
              point.full = formatDate(data.date)

              return point
            })
            :
            [

            ]
        }
      ]
    :
    [
      {
        id: phase,
        data: analytics && analytics.data && analytics.data.length ?
          analytics.data.map(data => {
            const date = data.createdAt || data.date
            let point = {}

            point.y = data[relPhases[phase]]
            point.x = formatDate(date, true)
            point.full = formatDate(date)

            return point
          })
          :
          [

          ]
      }
    ]


  // MAX AND MIN VALUES FUNCTIONS

  const maxBar = useMemo(() => {

    let max = 0

    barData && Array.isArray(barData) && barData.map(point => {
      max = Math.max(max, point[phase])
    })

    return max
  }, [barData])

  const minBar = useMemo(() => {

    let min = 0

    barData && Array.isArray(barData) && barData.map(point => {
      min = Math.min(min, point[phase])
    })

    return min
  }, [barData])



  // USE EFFECT FUNCTIONS

  useEffect(() => {

    if (barSelection.data) {
      setSelected(true)
      setSelectedValue(barSelection.data[phase])
      setSelectedDate(barSelection.data.full)
      setTimeout(() => setSelected(false), 1000)
    }

  }, [barSelection])

  useEffect(() => {

    if (lineSelection.data) {
      setSelected(true)
      setSelectedValue(lineSelection.data.y)
      setSelectedDate(lineSelection.data.full)
      setTimeout(() => setSelected(false), 1000)
    }

  }, [lineSelection])


  return (
    <Container>
{
     !groupDetails && <Cards>
        {
          cards.map(card => {

            return (
              <Card selected={selected}>
                <div>
                  <p>{card.title}</p>
                  <h3>{card.date}</h3>
                </div>
                <div>
                  <span>{card.un}</span>
                  <h2>{card.value}</h2>
                </div>
              </Card>
            )
          })
        }
      </Cards>
      }
      <ChartArea>
        <ChartHeader>
          <button onClick={() => {
            setChartType(true)
            setGroupDetails(false)
          }} 
          className={!groupDetails && chartType ? 'selected' : ''}>
            <MdEqualizer />
          </button>
          <button onClick={() => {
            setChartType(false)
            setGroupDetails(false)
          }} 
          className={!groupDetails && !chartType ? 'selected' : ''}>
            <MdShowChart />
          </button>
          <div>
            <button 
            onClick={() => {
              setGroupDetails(true)
            }}
            className={groupDetails ? 'selected' : ''}>
                {transl.Details}
            </button>
          </div>
        </ChartHeader>
        
        {groupDetails?
        <GroupDetails>
          <div className='table'>
            <div className='table-header'>
              <p>{transl.Device}</p>
              <p>Total (kWh)</p>
            </div>
            {
              devicesDetails && devicesDetails.map(device => {

                return (
                  <div className='table-row'>
                    <p>{device.name}</p>
                    <p>{device.total}</p>
                  </div>
                )
              })
            }
          </div>
        </GroupDetails>
        :
        <ChartBody>
          {
            chartType ?
              <BarChart
                data={barData}
                keys={phase}
                indexBy='date'
                xLegend={transl.Date}
                yLegend={`${param} (${un})`}
                maxValue={maxBar}
                minValue={minBar}
                setSelection={setBarSelection}
              />
              :
              <LineChart
                data={lineData}
                xLegend={isAnalytics ? transl.Date : transl.Time}
                yLegend={`${param} (${un})`}
                setSelection={setLineSelection}
              />
          }
        </ChartBody>
}        
      </ChartArea>
    </Container>
  );
}

export default BodyData;