import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useDispatch } from 'react-redux'


const BarChart = ({ data, keys, indexBy, xLegend, yLegend, maxValue, minValue, setSelection, dashboard }) => {

  const dispatch = useDispatch()
  const padding = (data.length <= 10 ? 29 / 30 - data.length / 15 : 0.25)
  const margin = dashboard? {top: 10, right: 10, bottom: 50, left: 0} : { top: 10, right: 130, bottom: 50, left: 70 }
  const colors = {1: '#222222', 2: '#630028', 3: '#C5004F', 4: '#707070', 5: '#B3B3B3', 6: '#E6E6E6', 7: '#F8F8F8'}
  const getColor = bar => {

    console.log(bar)
    return colors[bar.data.id]
  }

  return (
    <ResponsiveBar
      data={data}
      onClick={(data) => dashboard? 0 : dispatch(setSelection(data))}
      keys={[keys]}
      indexBy={indexBy}
      margin={margin}
      maxValue={maxValue || 'auto'}
      minValue={minValue > 0 ? 'auto' : minValue}
      padding={padding}
      colors={dashboard? getColor : ['#C5004F']}
      defs={dashboard ? [
        
      ] :[
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
        event.target.style.fill = dashboard? '' : '#7D0A39'
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
      axisLeft={ dashboard ? {} :{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: yLegend || '',
        legendPosition: 'middle',
        legendOffset: -50
      }}
      labelSkipWidth={12}
      labelTextColor={'#C1C1C1'}
      gridYValues={dashboard? 0 : 5}
      legends={dashboard ? [] :[
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