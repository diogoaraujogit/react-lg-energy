import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { MdLens } from 'react-icons/md';
import PieChart from '../../../components/PieChart';

import { Container, ShowAll, ConsumptionCards, DashboardHighlights, DashboardCharts, DashboardNotifications, 
         Server, UsageChart, Groups, Devices
       } from './styles';

const ConsumptionTab = () => {

  const consumptionCards = [
    {
      date: 'Today',
      since: '00:00 AM',
      kWh: '32.526 kWh',
      cost: 'R$ 35.492'
    },
    {
      date: 'Week',
      since: 'Monday',
      kWh: '83.139 kWh',
      cost: 'R$ 97.13'
    },
    {
      date: 'Month',
      since: '01/12',
      kWh: '559.584 kWh',
      cost: 'R$ 640.816'
    },
    {
      date: 'Year',
      since: '01/01',
      kWh: '1.1802.04 kWh',
      cost: 'R$ 13.401.133'
    },
  ]

  const data = [
    {
      "id": "used",
      "label": "used",
      "value": 50,
    },
    {
      "id": "free",
      "label": "free",
      "value": 50,
    }
  ]
 

  return (
    <Container>
      <ShowAll>
        <button>
          Show All
        </button>
      </ShowAll>
      <ConsumptionCards>
        {
          consumptionCards.map(data => {

            const date = data.date
            const since = data.since
            const consumption = data.kWh
            const cost = data.cost

            return (
              <div>
                <div className='header'>
                  <p>{date}</p>
                  <span>{since}</span>
                </div>
                <div className='values'>
                  <h3>{consumption}</h3>
                  <h4>{cost}</h4>
                </div>
              </div>
            )
          })
        }
      </ConsumptionCards>
      <DashboardHighlights>
        <DashboardCharts>
          <div>
            <Server>
              <h4>Server</h4>
              <h3>DISK USAGE</h3>
              <div className='data'>
                <div className='legend'>
                  <div>
                    <MdLens style={{color: '#E1E1E1'}} />
                    <p>Free</p>
                  </div>
                  <div>
                    <MdLens style={{color: '#C5004F'}} />
                    <p>Used space</p>
                  </div>
                </div>
                <UsageChart>
                  <div className='used-info'>
                    <p>50%</p>
                    <span>Used Space</span>
                  </div>
                  <div className='chart'>
                    <PieChart data={data} />
                  </div>
                </UsageChart>
              </div>
              <div className='info'>
                <p>Available: 500GB</p>
                <p>Used Space: 250GB</p>
              </div>
            </Server>
            <Groups>
              <h4>Groups</h4>
              <h3>Total of devices registered</h3>
              <h2>588</h2>
              <div>
                <div className='groups'>
                  <p>038</p>
                  <span>Groups</span>
                </div>
                <div className='subgroups'>
                  <p>012</p>
                  <span>Subgroups</span>
                </div>
              </div>
            </Groups>
          </div>
          <div>
            <Devices>

            </Devices>
          </div>
        </DashboardCharts>
        <DashboardNotifications>

        </DashboardNotifications>
      </DashboardHighlights>
    </Container>
  );
}

export default ConsumptionTab;