import React from 'react'
import ScatterPlot from './ScatterPlot'
import StackedAreaChart from './StackedAreaChart'
import StackedHorizontalBarChart from './StackedHorizontalBarChart'
import MixedLineAndBar from './MixedLineAndBar'

const GraphSamples = () => {
    return (
        <div className='grid grid-cols-8 gap-5'>
            <div className='col-span-4 border-2 p-1'>
                <p>Large Scatter</p>
                <ScatterPlot view='large' />
            </div>
            <div className='col-span-4 border-2 p-1'>
                <p>Stacked Area Chart</p>
                <StackedAreaChart view='large' />
            </div>
            <div className='col-span-4 mt-4 border-2 p-1'>
                <p>Stacked Horizontal Bar</p>
                <StackedHorizontalBarChart view='large' />
            </div>
            <div className='col-span-4 mt-4 border-2 p-1'>
                <p>Mixed Line and Bar with WaterMark</p>
                <MixedLineAndBar />
            </div>
        </div>
    )
}

export default GraphSamples