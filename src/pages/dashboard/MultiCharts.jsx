import { useState } from 'react';
import CommonChart from './CommonChart';
import GraphModal from './GraphModal';
import ScatterPlot from '../graphSamples/ScatterPlot';
import StackedAreaChart from '../graphSamples/StackedAreaChart';
import StackedHorizontalBarChart from '../graphSamples/StackedHorizontalBarChart';
import MixedLineAndBar from '../graphSamples/MixedLineAndBar';

const MultiCharts = () => {
    const [graphOpen, setGraphOpen] = useState(false);
    const [selectedGraph, setSelectedGraph] = useState({})
    const graph1 = {
        data1: [100, 20, 10, 11, 100, 300, 10, 0, 148],
        data2: [1, 23, 87, 56, 11, 12, 69, 90, 0]
    }
    const graph2 = {
        data1: [90, 100, 78, 95, 120, 123, 23, 0, 88],
        data2: [12, 90, 67, 23, 109, 100, 20, 45, 28]
    }
    const graph3 = {
        data1: [78, 91, 22, 78, 30, 66, 123, 0, 148],
        data2: [3, 99, 88, 91, 49, 23, 36, 78, 12]
    }
    const graph4 = {
        data1: [10, 20, 30, 40, 50, 60, 70, 80, 90],
        data2: [90, 80, 70, 60, 100, 40, 30, 20, 10]
    }

    const handleClose = () => {
        setSelectedGraph({})
        setGraphOpen(false);
    };

    const handleOpenMainchart = (index) => {
        if (index === '1') setSelectedGraph(graph1)
        if (index === '2') setSelectedGraph(graph2)
        if (index === '3') setSelectedGraph(graph3)
        if (index === '4') setSelectedGraph(graph4)
        setGraphOpen(true);
    };
    return (
        <div className='multi-charts mt-7'>
            <div onClick={() => handleOpenMainchart('1')} className='chart'>
                {/* <p className='ml-4 mt-2 multi-graph-labels'>Forecast Vs Actuals</p> */}
                <ScatterPlot view="small" />
            </div>
            <div onClick={() => handleOpenMainchart('2')} className='chart'>
                {/* <p className='ml-4 mt-2 multi-graph-labels'>Forecast Vs Actuals</p> */}
                <StackedAreaChart />
            </div>
            <div onClick={() => handleOpenMainchart('3')} className='chart'>
                {/* <p className='ml-4 mt-2 multi-graph-labels'>Forecast Vs Actuals</p> */}
                {/* <StackedHorizontalBarChart /> */}
                <ScatterPlot view="small" />
            </div>
            <div onClick={() => handleOpenMainchart('4')} className='chart'>
                {/* <p className='ml-4 mt-2 multi-graph-labels'>Forecast Vs Actuals</p> */}
                {/* <MixedLineAndBar /> */}
                <ScatterPlot view="small" />
            </div>
            {graphOpen && <GraphModal graphOpen={graphOpen} selectedGraph={selectedGraph}
                handleClose={handleClose} />}
        </div>
    );
};

export default MultiCharts;
