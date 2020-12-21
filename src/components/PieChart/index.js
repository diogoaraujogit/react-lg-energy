// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/pie
import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const PieChart = ({ data }) => {

  return (
    <ResponsivePie
      data={data}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      innerRadius={0.8}
      padAngle={0.7}
      cornerRadius={3}
      colors={['#C5004F', '#E1E1E1']}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      enableRadialLabels={false}
      enableSliceLabels={false}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="#333333"
      radialLabelsLinkColor={{ from: 'color' }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
      defs={[
        
      ]}
      fill={[
        
      ]}
      legends={[
        
      ]}
    />
  )

}

export default PieChart;
