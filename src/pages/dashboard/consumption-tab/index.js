import React from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { MdLens } from 'react-icons/md';
import BarChart from '../../../components/BarChart';
import PieChart from '../../../components/PieChart';

import {
  Container, ShowAll, ConsumptionCards, DashboardHighlights, DashboardCharts, DashboardNotifications,
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


  const notifications = [
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
    {
      title: 'Notification',
      message: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis 
      enim auctor, gravida sapien et, pulvinar dolor. Morbi nulla augue.`,

    },
  ]

  const barData = [
    {
      id: 1,
      color: '#2222AA',
      value: '64',
      date: 'Online',
    },
    {
      id: 2,
      color: '#630028',
      value: '240',
      date: 'Offline',
    },
    {
      id: 3,
      value: '32',
      date: 'Registered',
    },
    {
      id: 4,
      value: '47',
      date: 'Not registered',
    },
    {
      id: 5,
      value: '88',
      date: 'Setted',
    },
    {
      id: 6,
      value: '12',
      date: 'Manually setted',
    },
    {
      id: 7,
      value: '210',
      date: 'Unconfigured',
    },
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
                    <MdLens style={{ color: '#E1E1E1' }} />
                    <p>Free</p>
                  </div>
                  <div>
                    <MdLens style={{ color: '#C5004F' }} />
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
          <Devices>
            <h4>Devices</h4>
            <div>
            <BarChart
                data={barData}
                keys={'value'}
                indexBy='date'
                xLegend=''
                yLegend=''
                minValue={0}
                dashboard={true}
              />
            </div>
          </Devices>

        </DashboardCharts>
        <DashboardNotifications>
          <div className='notifications-header'>
            <h3>Notifications</h3>
            <p>97 notifications</p>
          </div>
          <div className='notifications'>
            {
              notifications.map(notification => {

                return (
                  <div className='notification'>
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                  </div>
                )
              })
            }
          </div>
        </DashboardNotifications>
      </DashboardHighlights>
    </Container>
  );
}

export default ConsumptionTab;