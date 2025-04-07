import React from 'react'
import ScatterPlot from './ScatterPlot'

const GraphSamples = () => {
    return (
        <div className='grid grid-cols-8 bg-[#D0DDD0]'>
            <div className='col-span-8'>
                <p>Large Scatter</p>
                <ScatterPlot />
            </div>
        </div>
    )
}

export default GraphSamples