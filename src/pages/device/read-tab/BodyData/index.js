import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import LineChart from '../../../../components/LineChart';
import { setLogSelection } from '../../../../store/modules/logs/actions';
import { Container, Cards, Card, ChartArea, ChartHeader, ChartBody } from './styles';

const BodyData = ({ logs, phase, param, un }) => {

  const { logSelection } = useSelector(state => state.logs)

  const [selected, setSelected] = useState(false)
  const [selectedValue, setSelectedValue] = useState()
  const [selectedDate, setSelectedDate] = useState()

  const relPhases = {
    'Phase A': 'a',
    'Phase B': 'b',
    'Phase C': 'c',
    'Average': 'average',
    'Total': 'total'
  }


  const formatDate = (date, chartLegend, average) => {

      return date.slice(-8,-3)
  }

  const cards = useMemo(() => {

    let data_type = logs

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

  }, [logs, phase, selectedValue, selectedDate])


  // DADOS DOS GRÁFICOS DE BARRA

  
  const lineData = 
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
    

  // USE EFFECT FUNCTIONS

  useEffect(() => {

    if (logSelection.data) {
      setSelected(true)
      setSelectedValue(logSelection.data.y)
      setSelectedDate(logSelection.data.full)
      setTimeout(() => setSelected(false), 1000)
    }

  }, [logSelection])


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
          {/* <button onClick={() => setChartType(true)} className={chartType ? 'selected' : ''}>
            <MdEqualizer />
          </button>
          <button onClick={() => setChartType(false)} className={!chartType ? 'selected' : ''}>
            <MdShowChart />
          </button> */}
        </ChartHeader>
        <ChartBody>
          {
            
              <LineChart
                data={lineData}
                xLegend={'Time'}
                yLegend={`${param} (${un})`}
                setSelection={setLogSelection}
                readings={true}
              />
          }
        </ChartBody>
      </ChartArea>
    </Container>
  );
}

export default BodyData;