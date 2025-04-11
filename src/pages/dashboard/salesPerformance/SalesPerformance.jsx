import { useEffect, useState } from 'react';
import GraphModal from '../GraphModal';
import PolicySold from '../allGraphs/PolicySold';
import graphDataJSON from '../graphdata1.json'
import PremiumCollected from '../allGraphs/PremiumCollected';
import SalesByProduct from '../allGraphs/SalesByProduct';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const SalesPerformance = () => {
    const { graphType, fromDate, toDate } = useSelector((state) => state.dashboard);
    const [graphData, setGraphData] = useState(null)
    const [graphOpen, setGraphOpen] = useState(false);
    const [selectedGraph, setSelectedGraph] = useState({})

    useEffect(() => {
        setGraphData(graphDataJSON?.Sheet1)
    }, [])

    useEffect(() => {
        if (fromDate) {
            const start = dayjs(fromDate, 'YYYY-MM');
            const end = toDate ? dayjs(toDate, 'YYYY-MM').endOf('month') : dayjs();

            const filteredData = graphDataJSON?.Sheet1.filter(item => {
                const policyStartDate = dayjs(item.POL_START_DATE);
                return policyStartDate.isBetween(start, end, null, '[]');
            });

            if (filteredData?.length > 0) {
                setGraphData(filteredData);
            } else setGraphData([])

            console.log("filteredData : ", filteredData)
        }
    }, [fromDate, toDate]);

    const handleClose = () => {
        setSelectedGraph({})
        setGraphOpen(false);
    };

    const handleOpenMainchart = (index) => {
        if (graphData?.length === 0) return;
        if (index === '1') setSelectedGraph(index)
        if (index === '2') setSelectedGraph(index)
        if (index === '3') setSelectedGraph(index)
        if (index === '4') setSelectedGraph(index)
        setGraphOpen(true);
    };

    const graphRender = (view) => (
        <PolicySold
            graphData={graphData}
            view={view}
        />
    )


    return (
        <div className='multi-charts mt-7'>
            {graphData !== null &&
                <>
                    <div onClick={() => handleOpenMainchart('1')} className='chart'>
                        {graphData?.length > 0 ?
                            graphRender('small') : <p>No data available</p>}
                    </div>
                    <div onClick={() => handleOpenMainchart('2')} className='chart'>
                        {graphData?.length > 0 ?
                            <PremiumCollected
                                graphData={graphData}
                                view='small'
                            /> : <p>No data available</p>}
                    </div>
                    <div onClick={() => handleOpenMainchart('3')} className='chart'>
                        {graphData?.length > 0 ?
                            graphRender('small') : <p>No data available</p>}
                    </div>
                    <div onClick={() => handleOpenMainchart('4')} className='chart'>
                        {graphData?.length > 0 ?
                            <SalesByProduct
                                graphData={graphData}
                                view='small'
                            /> : <p>No data available</p>}
                    </div>
                </>
            }

            {graphOpen &&
                <GraphModal
                    graphOpen={graphOpen}
                    selectedGraph={selectedGraph}
                    handleClose={handleClose}
                >
                    <>
                        {selectedGraph == 1 &&
                            graphRender('large')
                        }
                        {selectedGraph == 2 &&
                            <PremiumCollected
                                graphData={graphData}
                                view='large'
                            />
                        }
                        {selectedGraph == 3 &&
                            graphRender('large')
                        }
                        {selectedGraph == 4 &&
                            <SalesByProduct
                                graphData={graphData}
                                view='large'
                            />
                        }
                    </>
                </GraphModal>
            }
        </div>
    );
};

export default SalesPerformance;
