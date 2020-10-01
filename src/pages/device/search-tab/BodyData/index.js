import { format, parse, parseISO } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { MdEqualizer, MdShowChart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { date } from 'yup';
import BarChart from '../../../../components/BarChart';
import LineChart from '../../../../components/LineChart';

import { Container, Cards, Card, ChartArea, ChartHeader, ChartBody } from './styles';

const BodyData = ({ analytics, phase, searchType, period, param }) => {

  const { barSelection, lineSelection } = useSelector(state => state.analytics)
  console.log(lineSelection)

  const [chartType, setChartType] = useState(true)
  const [selected, setSelected] = useState(false)
  const [selectedValue, setSelectedValue] = useState()
  const [selectedDate, setSelectedDate] = useState()

  const relPhases = {
    'Phase A': 'a',
    'Phase B': 'b',
    'Phase C': 'c',
    'Total': 'total'
  }

  const relMonths = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }

  const formatDate = (date, chartLegend) => {

    if (searchType === 'simple' && period === 'yearly') {
      return relMonths[date.slice(3, 5)]
    } else {
      if (chartLegend) {
        return date.slice(0, 5)
      } else {
        return date.slice(0, 10)
      }
    }
  }

  const cards = useMemo(() => {

    const biggest = analytics && analytics.biggest && analytics.biggest[relPhases[phase]] ?
      analytics.biggest[relPhases[phase]] : false

    const smallest = analytics && analytics.smallest && analytics.smallest[relPhases[phase]] ?
      analytics.smallest[relPhases[phase]] : false

    const average = analytics && analytics.average && analytics.average[relPhases[phase]] ?
      analytics.average[relPhases[phase]] : false


    const b_value = biggest ? biggest.value : ''
    const b_date = biggest && biggest.date ? formatDate(biggest.date) : ''

    const l_value = smallest ? smallest.value : ''
    const l_date = smallest && smallest.date ? formatDate(smallest.date) : ''

    const a_value = average ? average.value : ''
    const a_date = average && average.date ? formatDate(average.date) : ''

    const s_value = selectedValue
    const s_date = selectedDate

    return (
      [
        {
          title: 'Highest',
          date: b_date || '02 SET 2020',
          un: 'A',
          value: b_value || 206
        },
        {
          title: 'Lowest',
          date: l_date || '02 SET 2020',
          un: 'A',
          value: l_value || 206
        },
        {
          title: 'Average',
          date: a_date || '02 SET 2020',
          un: 'A',
          value: a_value || 206
        },
        {
          title: 'Selected',
          date: s_date || '-',
          un: 'A',
          value: s_value || '-'
        },
      ]
    )
  }, [analytics, phase, selectedValue, selectedDate])



  const barData =
    analytics && analytics.data && analytics.data.length ?
      analytics.data.map(data => {

        let point = {}

        point[phase] = data[relPhases[phase]]
        point.date = formatDate(data.createdAt, true)
        point.full = formatDate(data.createdAt)

        return point
      })
      :
      [

      ]

  const baseLine = [
    {
      "id": "japan",
      "color": "hsl(68, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 292
        },
        {
          "x": "helicopter",
          "y": 258
        },
        {
          "x": "boat",
          "y": 174
        },
        
      ]
    },
    {
      "id": "france",
      "color": "hsl(35, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 55
        },
        {
          "x": "helicopter",
          "y": 63
        },
        {
          "x": "boat",
          "y": 190
        },
        
      ]
    },
    {
      "id": "us",
      "color": "hsl(32, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 202
        },
        {
          "x": "helicopter",
          "y": 212
        },
        {
          "x": "boat",
          "y": 58
        },
      ]
    },
    {
      "id": "germany",
      "color": "hsl(168, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 172
        },
        {
          "x": "helicopter",
          "y": 277
        },
        {
          "x": "boat",
          "y": 291
        },
      ]
    },
    {
      "id": "norway",
      "color": "hsl(113, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 55
        },
        {
          "x": "helicopter",
          "y": 34
        },
        {
          "x": "boat",
          "y": 6
        },
        
      ]
    }
  ]

  const lineData = period === 'daily' || period === 'weekly' ?
  baseLine
  :
  [
    {
      id: phase,
      data: analytics && analytics.data && analytics.data.length ?
      analytics.data.map(data => {

        let point = {}

        point.y = data[relPhases[phase]]
        point.x = formatDate(data.createdAt, true)
        point.full = formatDate(data.createdAt)

        return point
      })
      :
      [

      ]
    }
  ]

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
      <Cards>
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
      <ChartArea>
        <ChartHeader>
          <button onClick={() => setChartType(true)} className={chartType ? 'selected' : ''}>
            <MdEqualizer />
          </button>
          <button onClick={() => setChartType(false)} className={!chartType ? 'selected' : ''}>
            <MdShowChart />
          </button>
        </ChartHeader>
        <ChartBody>
          {
            chartType ?
              <BarChart
                data={barData}
                keys={phase}
                indexBy='date'
                xLegend='Date'
                yLegend={param}
                maxValue={maxBar}
                minValue={minBar}
              />
              :
              <LineChart 
                data={lineData}
                xLegend='Date'
                yLegend={param}
              />
          }
        </ChartBody>
      </ChartArea>
    </Container>
  );
}

export default BodyData;