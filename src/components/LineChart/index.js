import React from 'react'

import { ResponsiveLine } from '@nivo/line'
import { useDispatch } from 'react-redux'
import { setLineSelection } from '../../store/modules/analytics/actions'

const LineChart = ({ data, xLegend, yLegend }) => {

  const dispatch = useDispatch()

  return (
    <ResponsiveLine
      data={data}
      onClick={(data) => dispatch(setLineSelection(data))}
      margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 0, max: 'auto' }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
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
      colors={['#C5004F', '#94DCFE', '#1F2431', '#E9E9E9', '#008F2F', '#5BFF77', '#C2C2C2']}
      pointSize={10}
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