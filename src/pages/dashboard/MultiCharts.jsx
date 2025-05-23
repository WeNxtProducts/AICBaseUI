import { useState } from 'react';
import GraphModal from './GraphModal';
import ScatterPlot from '../graphSamples/ScatterPlot';
import StackedAreaChart from '../graphSamples/StackedAreaChart';
import StackedHorizontalBarChart from '../graphSamples/StackedHorizontalBarChart';
import MixedLineAndBar from '../graphSamples/MixedLineAndBar';


const MultiCharts = () => {
    const [graphOpen, setGraphOpen] = useState(false);
    const [selectedGraph, setSelectedGraph] = useState({})

    const handleClose = () => {
        setSelectedGraph({})
        setGraphOpen(false);
    };

    const handleOpenMainchart = (index) => {
        if (index === '1') setSelectedGraph(index)
        if (index === '2') setSelectedGraph(index)
        if (index === '3') setSelectedGraph(index)
        if (index === '4') setSelectedGraph(index)
        setGraphOpen(true);
    };
    return (
        <div className='multi-charts mt-7'>
            <div onClick={() => handleOpenMainchart('1')} className='chart'>
                <ScatterPlot view="small" />
            </div>
            <div onClick={() => handleOpenMainchart('2')} className='chart'>
                <StackedAreaChart view="small" />
            </div>
            <div onClick={() => handleOpenMainchart('3')} className='chart'>
                <StackedHorizontalBarChart view="small" />
            </div>
            <div onClick={() => handleOpenMainchart('4')} className='chart'>
                <MixedLineAndBar view="small" />
            </div>
            {graphOpen && <GraphModal graphOpen={graphOpen} selectedGraph={selectedGraph}
                handleClose={handleClose} >
                <>
                    {selectedGraph == 1 && <ScatterPlot view="large" />}
                    {selectedGraph == 2 && <StackedAreaChart view="large" />}
                    {selectedGraph == 3 && <StackedHorizontalBarChart view="large" />}
                    {selectedGraph == 4 && <MixedLineAndBar view="large" />}
                </>
            </GraphModal>
            }
        </div>
    );
};

export default MultiCharts;
