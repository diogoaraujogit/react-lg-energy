import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarChart = ({/* data  see data tab */ }) => {

  const data = [
    {
      "country": "AD",
      "hot dog": 115,
      "hot dogColor": "hsl(217, 70%, 50%)",
      "burger": 173,
      "burgerColor": "hsl(197, 70%, 50%)",
      "sandwich": 13,
      "sandwichColor": "hsl(172, 70%, 50%)",
      "kebab": 12,
      "kebabColor": "hsl(263, 70%, 50%)",
      "fries": 89,
      "friesColor": "hsl(13, 70%, 50%)",
      "donut": 171,
      "donutColor": "hsl(323, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 18,
      "hot dogColor": "hsl(234, 70%, 50%)",
      "burger": 46,
      "burgerColor": "hsl(94, 70%, 50%)",
      "sandwich": 173,
      "sandwichColor": "hsl(319, 70%, 50%)",
      "kebab": 97,
      "kebabColor": "hsl(217, 70%, 50%)",
      "fries": 30,
      "friesColor": "hsl(299, 70%, 50%)",
      "donut": 14,
      "donutColor": "hsl(171, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 178,
      "hot dogColor": "hsl(164, 70%, 50%)",
      "burger": 173,
      "burgerColor": "hsl(309, 70%, 50%)",
      "sandwich": 20,
      "sandwichColor": "hsl(43, 70%, 50%)",
      "kebab": 0,
      "kebabColor": "hsl(345, 70%, 50%)",
      "fries": 62,
      "friesColor": "hsl(355, 70%, 50%)",
      "donut": 49,
      "donutColor": "hsl(15, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 1,
      "hot dogColor": "hsl(306, 70%, 50%)",
      "burger": 49,
      "burgerColor": "hsl(271, 70%, 50%)",
      "sandwich": 63,
      "sandwichColor": "hsl(146, 70%, 50%)",
      "kebab": 154,
      "kebabColor": "hsl(268, 70%, 50%)",
      "fries": 23,
      "friesColor": "hsl(349, 70%, 50%)",
      "donut": 75,
      "donutColor": "hsl(304, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 25,
      "hot dogColor": "hsl(340, 70%, 50%)",
      "burger": 18,
      "burgerColor": "hsl(324, 70%, 50%)",
      "sandwich": 97,
      "sandwichColor": "hsl(238, 70%, 50%)",
      "kebab": 28,
      "kebabColor": "hsl(15, 70%, 50%)",
      "fries": 154,
      "friesColor": "hsl(359, 70%, 50%)",
      "donut": 4,
      "donutColor": "hsl(212, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 133,
      "hot dogColor": "hsl(163, 70%, 50%)",
      "burger": 84,
      "burgerColor": "hsl(131, 70%, 50%)",
      "sandwich": 3,
      "sandwichColor": "hsl(146, 70%, 50%)",
      "kebab": 84,
      "kebabColor": "hsl(240, 70%, 50%)",
      "fries": 114,
      "friesColor": "hsl(319, 70%, 50%)",
      "donut": 108,
      "donutColor": "hsl(175, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 143,
      "hot dogColor": "hsl(107, 70%, 50%)",
      "burger": 85,
      "burgerColor": "hsl(113, 70%, 50%)",
      "sandwich": 128,
      "sandwichColor": "hsl(347, 70%, 50%)",
      "kebab": 101,
      "kebabColor": "hsl(14, 70%, 50%)",
      "fries": 121,
      "friesColor": "hsl(242, 70%, 50%)",
      "donut": 129,
      "donutColor": "hsl(255, 70%, 50%)"
    }
  ]


  return (
    <ResponsiveBar
        data={data}
        keys={['burger']}
        indexBy="country"
        margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        defs={[

          {
              id: 'gradient',
              type: 'linearGradient',
              colors: [
                  { offset: 0, color: '#7d0a39' },
                  { offset: 100, color: '#C5004F' },
              ],
          },
          
      ]}
      fill={[
          
          { match: d => d, id: 'gradient' },
      ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
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
    />
)
}

export default BarChart