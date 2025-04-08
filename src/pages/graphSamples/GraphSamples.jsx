import React from 'react'
import ScatterPlot from './ScatterPlot'
import StackedAreaChart from './StackedAreaChart'
import StackedHorizontalBarChart from './StackedHorizontalBarChart'
import MixedLineAndBar from './MixedLineAndBar'

const GraphSamples = () => {
    return (
        <div className='grid grid-cols-8'>
            <div className='col-span-8'>
                <p>Large Scatter</p>
                <ScatterPlot />
            </div>
            <div className='col-span-8 mt-4'>
                <p>Stacked Area Chart</p>
                <StackedAreaChart />
            </div>
            <div className='col-span-8 mt-4'>
                <p>Stacked Horizontal Bar</p>
                <StackedHorizontalBarChart />
            </div>
            <div className='col-span-8 mt-4'>
                <p>Mixed Line and Bar with WaterMark</p>
                <MixedLineAndBar />
            </div>
        </div>
    )
}

export default GraphSamples