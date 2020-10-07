import { format, parse, parseISO } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { MdEqualizer, MdShowChart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { date } from 'yup';
import BarChart from '../../../../components/BarChart';
import LineChart from '../../../../components/LineChart';
import { setBarSelection, setLineSelection } from '../../../../store/modules/analytics/actions';
import { Container, Cards, Card, ChartArea, ChartHeader, ChartBody } from './styles';

const BodyData = ({ analytics, logs, phase, searchType, period, param, un }) => {

  const { barSelection, lineSelection } = useSelector(state => state.analytics)

  const [chartType, setChartType] = useState(true)
  const [selected, setSelected] = useState(false)
  const [selectedValue, setSelectedValue] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const isAnalytics = period === 'monthly' || period === 'yearly' || (period === 'weekly' && chartType) || searchType === 'advanced'

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
          title: 'Highest',
          date: b_date || '02 SET 2020',
          un: un || 'A',
          value: b_value || 206
        },
        {
          title: 'Lowest',
          date: l_date || '02 SET 2020',
          un: un || 'A',
          value: l_value || 206
        },
        {
          title: 'Average',
          date: a_date || '02 SET 2020',
          un: un || 'A',
          value: a_value || 206
        },
        {
          title: 'Selected',
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

        let point = {}

        point[phase] = data[relPhases[phase]]
        point.date = formatDate(data.createdAt, true)
        point.full = formatDate(data.createdAt)

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
      day.data.map(data => {

        let point = {}

        point.y = data[relPhases[phase]]
        point.x = formatDate(data.date, true)
        point.full = formatDate(data.date)

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
                yLegend={`${param} (${un})`}
                maxValue={maxBar}
                minValue={minBar}
                setSelection={setBarSelection}
              />
              :
              <LineChart
                data={lineData}
                xLegend={isAnalytics? 'Date' : 'Time'}
                yLegend={`${param} (${un})`}
                setSelection={setLineSelection}
              />
          }
        </ChartBody>
      </ChartArea>
    </Container>
  );
}

export default BodyData;