import React, { useState } from 'react';
import { MdEqualizer, MdShowChart } from 'react-icons/md';
import BarChart from '../../../../components/BarChart';
import LineChart from '../../../../components/LineChart';

import { Container, Cards, Card, ChartArea, ChartHeader, ChartBody } from './styles';

const BodyData = () => {

  const [chartType, setChartType] = useState(true)

  const cards = [
    {
      title: 'High',
      date: '02 SET 2020',
      un: 'A',
      value: 206
    },
    {
      title: 'High',
      date: '02 SET 2020',
      un: 'A',
      value: 206
    },
    {
      title: 'High',
      date: '02 SET 2020',
      un: 'A',
      value: 206
    },
    {
      title: 'High',
      date: '02 SET 2020',
      un: 'A',
      value: 206
    },
  ]

  

  const barData = [
    {
      x: 1,
      y: 1,
    }
  ]
  
  return (
    <Container>
      <Cards>
        {
          cards.map(card => {

            return (
              <Card>
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
          <button onClick={() => setChartType(true)} className={chartType? 'selected' : ''}>
              <MdEqualizer />
          </button>
          <button onClick={() => setChartType(false)} className={!chartType? 'selected' : ''}>
            <MdShowChart />
          </button>
        </ChartHeader>
        <ChartBody>
          {
            chartType?
            <BarChart />
            :
            <LineChart />
          }
        </ChartBody>
      </ChartArea>
    </Container>
  );
}

export default BodyData;