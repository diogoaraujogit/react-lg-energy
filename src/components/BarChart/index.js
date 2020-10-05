import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useDispatch } from 'react-redux'
import { setBarSelection } from '../../store/modules/analytics/actions';
const BarChart = ({ data, keys, indexBy, xLegend, yLegend, maxValue, minValue }) => {

  const dispatch = useDispatch()
  const padding = (data.length <= 10 ? 29 / 30 - data.length / 15 : 0.25)

  return (
    <ResponsiveBar
      data={data}
      onClick={(data) => dispatch(setBarSelection(data))}
      keys={[keys]}
      indexBy={indexBy}
      margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
      maxValue={maxValue || 'auto'}
      minValue={minValue > 0 ? 'auto' : minValue}
      padding={padding}
      colors='#C5004F'
      defs={[

        {
          id: 'gradient',
          type: 'linearGradient',
          colors: [
            { offset: 0, color: '#7D0A39' },
            { offset: 100, color: '#C5004F' },
          ],
        },

      ]}
      fill={[
        { match: d => d, id: 'gradient' },
      ]}
      onMouseEnter={(_data, event) => {
        event.target.style.cursor = 'pointer'
        event.target.style.fill = '#7D0A39'
      }}

      onMouseLeave={(_data, event) => {
        event.target.style.fill = ''
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: xLegend || '',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: yLegend || '',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelTextColor={'#C1C1C1'}
      gridYValues={5}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      theme={{
        axis: {
          ticks: {

            text: {
              fill: "#788195"
            }
          },
          legend: {
            text: {
              fill: "#788195",
              fontWeight: '600',
            }
          },
        },
        grid: {
          line: {
            opacity: '0.5'
          }
        },

        legends: {
          text: {
            fill: "#788195 !important",
          }
        }
      }}
    />
  )
}

export default BarChart