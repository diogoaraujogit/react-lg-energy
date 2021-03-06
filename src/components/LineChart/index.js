import React from 'react'

import { ResponsiveLine } from '@nivo/line'
import { useDispatch } from 'react-redux'

const LineChart = ({ data, xLegend, yLegend, setSelection, readings }) => {

  const dispatch = useDispatch()
  

  const days = data && data[0] && data[0].data ? data[0].data.length : 0
  const ticks = 5
  const arr = [...Array(ticks).keys()]
  const ticketValues = readings? days ? arr.map(n => {
    let actualPos = parseInt(days * n / (ticks - 1)) - 1
    let actualIdx = actualPos >= 0 ? actualPos : 0
    let actualItem = data[0].data[actualIdx] && data[0].data[actualIdx].x
    let actualValue = actualItem ? actualItem : ''

    return actualValue
  }) : []
  :
  ''

  console.log('Array de tick values')
    console.log(data)
    console.log(ticketValues)
    console.log(days)
    console.log(arr)

  return (
    <ResponsiveLine
      data={data}
      onClick={(data) => dispatch(setSelection(data))}
      margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 0, max: 'auto' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickValues: ticketValues,
        tickPadding: 5,
        tickRotation: 0,
        legend: xLegend,
        legendOffset: 36,
        legendPosition: 'middle'
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: yLegend,
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      colors={['#C5004F', '#A72773', '#7B3F85', '#4F4A83', '#304C71', '#2F4858', '#574144']}
      pointSize={2}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
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

export default LineChart