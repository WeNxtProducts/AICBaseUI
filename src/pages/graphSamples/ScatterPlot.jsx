import React, { useEffect, useState, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import empData from './scatterGrapj.json';

const ScatterPlot = ({ view = 'small' }) => {
    const policyData = empData.Sheet1;
    const [option, setOption] = useState({});
    const [selectedProductNames, setSelectedProductNames] = useState([]);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [filteredData, setFilteredData] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            chartRef.current?.getEchartsInstance()?.resize();
        }, 0);
    }, []);

    useEffect(() => {
        const processedData = policyData.map(policy => ({
            startDate: new Date((policy.POL_START_DATE - 25569) * 86400 * 1000),
            sumAssured: policy.POL_SUM_ASSURED,
            premiumRate: policy.POL_BASIC_PREM_RATE,
            productName: policy.POL_PROD_NAME,
        }));
        setProcessedData(processedData);

        const allDates = processedData.map(item => item.startDate.getTime());
        const minDate = Math.min(...allDates);
        const maxDate = Math.max(...allDates);

        const sumAssuredValues = processedData.map(item => item.sumAssured);
        const minSumAssured = Math.min(...sumAssuredValues);
        const maxSumAssured = Math.max(...sumAssuredValues);

        const productNames = [...new Set(processedData.map(item => item.productName))];

        // Determine visualMap item size based on the number of product names
        const visualMapItemSize = productNames.length > 6 ? { itemWidth: 8, itemHeight: 8, itemGap: 5 } : { itemWidth: 10, itemHeight: 10, itemGap: 10 };

        const chartOption = {
            tooltip: view === 'large' && {
                trigger: 'item',
                formatter: params =>
                    `Start Date: ${new Date(params.value[0]).toLocaleDateString()}<br/>
                     Sum Assured: ${params.value[1]}<br/>
                     Premium Rate: ${params.value[2]}<br/>
                     Product Name: ${params.value[3]}`,
            },
            dataZoom: view === 'large' ? [
                { type: 'inside' },
                { type: 'slider' },
            ] : [],
            grid: {
                top: view === 'large' ? 100 : 40,
                bottom: view === 'large' ? 65 : 45,
                left: view === 'large' ? '12%' : '14%',
                right: view === 'large' ? '13%' : '7%',
            },
            xAxis: {
                name: 'Policy Start Date',
                type: 'time',
                min: minDate,
                max: maxDate,
                nameLocation: 'middle',
                nameGap: 30,
            },
            yAxis: {
                name: 'Sum Assured',
                type: 'value',
                min: minSumAssured,
                max: maxSumAssured,
                axisLabel: {
                    formatter: view === 'small' ? (value) => {
                        if (value >= 1e6) return `${value / 1e6}M`;
                        if (value >= 1e3) return `${value / 1e3}k`;
                        return value;
                    } : undefined,
                },
            },

            visualMap: {
                type: 'piecewise',
                categories: productNames,
                dimension: 3,
                orient: 'horizontal',
                left: '0%',
                top: 30,
                show: view === 'large',
                inRange: {
                    color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#F7B9A6', '#FF6833'],
                },
            },
            series: [
                {
                    name: 'Policy Data',
                    type: 'scatter',
                    data: processedData.map(item => [
                        item.startDate.getTime(),
                        item.sumAssured,
                        item.premiumRate,
                        item.productName,
                    ]),
                    symbolSize: function (val) {
                        return Math.sqrt(val[2]) / (view === 'small' ? 100 : 30);
                    },
                    itemStyle: {
                        opacity: 0.8,
                    },
                },
            ],
        };

        setOption(chartOption);
    }, [policyData, view]);

    const onChartReady = (chart) => {
        chartRef.current = chart;

        const handleDataRangeSelected = (params) => {
            const selected = Object.keys(params.selected).filter(key => params.selected[key]);
            setSelectedProductNames(selected);
        };

        const handleDataZoom = () => {
            const { startValue, endValue } = chart.getOption().dataZoom[0];
            setDateRange({
                start: new Date(startValue),
                end: new Date(endValue),
            });
        };

        chart.on('datarangeselected', handleDataRangeSelected);
        chart.on('datazoom', handleDataZoom);

        return () => {
            chart.off('datarangeselected', handleDataRangeSelected);
            chart.off('datazoom', handleDataZoom);
        };
    };

    useEffect(() => {
        if (!processedData.length) return;

        const filtered = processedData.filter(item => {
            const matchesProduct = selectedProductNames.length === 0 || selectedProductNames.includes(item.productName);
            const matchesDate =
                (!dateRange.start || item.startDate >= dateRange.start) &&
                (!dateRange.end || item.startDate <= dateRange.end);
            return matchesProduct && matchesDate;
        });

        setFilteredData(filtered);
    }, [selectedProductNames, dateRange, processedData]);

    return (
        <>
            <ReactECharts
                ref={chartRef}
                option={option}
                style={{ height: view === 'large' ? '400px' : '250px', width: '100%' }}
                onChartReady={onChartReady}
            />
            {/* <div style={{ marginTop: 16 }}>
                <strong>Selected Product Names:</strong> {selectedProductNames.join(', ') || 'All'}
            </div>
            <div>
                <strong>Date Range:</strong>{' '}
                {dateRange.start ? dateRange.start.toLocaleDateString() : 'N/A'} -{' '}
                {dateRange.end ? dateRange.end.toLocaleDateString() : 'N/A'}
            </div>
            <div style={{ marginTop: 16 }}>
                <strong>Filtered Data:</strong>
                <pre style={{ maxHeight: 200, overflow: 'auto', background: '#f5f5f5', padding: 10 }}>
                    {JSON.stringify(filteredData, null, 2)}
                </pre>
            </div> */}
        </>
    );
};

export default ScatterPlot;
