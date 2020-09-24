import React from 'react'

import { ResponsiveLine } from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineChart = ({ /* data  see data tab */ }) => {

  const data = [
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
        {
          "x": "train",
          "y": 93
        },
        {
          "x": "subway",
          "y": 16
        },
        {
          "x": "bus",
          "y": 195
        },
        {
          "x": "car",
          "y": 65
        },
        {
          "x": "moto",
          "y": 186
        },
        {
          "x": "bicycle",
          "y": 86
        },
        {
          "x": "horse",
          "y": 1
        },
        {
          "x": "skateboard",
          "y": 162
        },
        {
          "x": "others",
          "y": 195
        }
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
        {
          "x": "train",
          "y": 81
        },
        {
          "x": "subway",
          "y": 63
        },
        {
          "x": "bus",
          "y": 226
        },
        {
          "x": "car",
          "y": 228
        },
        {
          "x": "moto",
          "y": 203
        },
        {
          "x": "bicycle",
          "y": 289
        },
        {
          "x": "horse",
          "y": 277
        },
        {
          "x": "skateboard",
          "y": 263
        },
        {
          "x": "others",
          "y": 48
        }
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
        {
          "x": "train",
          "y": 36
        },
        {
          "x": "subway",
          "y": 106
        },
        {
          "x": "bus",
          "y": 244
        },
        {
          "x": "car",
          "y": 156
        },
        {
          "x": "moto",
          "y": 83
        },
        {
          "x": "bicycle",
          "y": 45
        },
        {
          "x": "horse",
          "y": 206
        },
        {
          "x": "skateboard",
          "y": 248
        },
        {
          "x": "others",
          "y": 95
        }
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
        {
          "x": "train",
          "y": 37
        },
        {
          "x": "subway",
          "y": 18
        },
        {
          "x": "bus",
          "y": 172
        },
        {
          "x": "car",
          "y": 60
        },
        {
          "x": "moto",
          "y": 279
        },
        {
          "x": "bicycle",
          "y": 90
        },
        {
          "x": "horse",
          "y": 90
        },
        {
          "x": "skateboard",
          "y": 99
        },
        {
          "x": "others",
          "y": 235
        }
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
        {
          "x": "train",
          "y": 211
        },
        {
          "x": "subway",
          "y": 273
        },
        {
          "x": "bus",
          "y": 30
        },
        {
          "x": "car",
          "y": 123
        },
        {
          "x": "moto",
          "y": 150
        },
        {
          "x": "bicycle",
          "y": 192
        },
        {
          "x": "horse",
          "y": 126
        },
        {
          "x": "skateboard",
          "y": 274
        },
        {
          "x": "others",
          "y": 244
        }
      ]
    }
  ]

  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
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
    />
)
      }

export default LineChart