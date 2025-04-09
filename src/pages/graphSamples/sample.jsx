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
        const processed = policyData.map(policy => ({
            startDate: new Date((policy.POL_START_DATE - 25569) * 86400 * 1000),
            sumAssured: policy.POL_SUM_ASSURED,
            premiumRate: policy.POL_BASIC_PREM_RATE,
            productName: policy.POL_PROD_NAME,
        }));
        setProcessedData(processed);

        const allDates = processed.map(item => item.startDate);
        const minDate = Math.min(...allDates);
        const maxDate = Math.max(...allDates);

        const sumAssuredValues = processed.map(item => item.sumAssured);
        const minSumAssured = Math.min(...sumAssuredValues);
        const maxSumAssured = Math.max(...sumAssuredValues);

        const productNames = [...new Set(processed.map(item => item.productName))];

        const chartOption = {
            tooltip: {
                trigger: 'item',
                formatter: params =>
                    `Start Date: ${params.value[0].toLocaleDateString()}<br/>
                     Sum Assured: ${params.value[1]}<br/>
                     Premium Rate: ${params.value[2]}<br/>
                     Product Name: ${params.value[3]}`,
            },
            dataZoom: [
                { type: 'inside' },
                { type: 'slider' },
            ],
            grid: {
                top: 100,
                bottom: 65,
                left: '15%',
                right: '13%'
            },
            xAxis: {
                name: 'Policy Start Date',
                type: 'time',
                min: minDate,
                max: maxDate,
            },
            yAxis: {
                name: 'Sum Assured',
                type: 'value',
                min: minSumAssured,
                max: maxSumAssured,
            },
            visualMap: {
                type: 'piecewise',
                categories: productNames,
                dimension: 3,
                orient: 'horizontal',
                left: '0%',
                top: '30',
                itemWidth: 10,
                itemHeight: 10,
                align: 'left',
                itemGap: 10,
                inRange: {
                    color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#F7B9A6', '#FF6833'],
                },
            },
            series: [
                {
                    name: 'Policy Data',
                    type: 'scatter',
                    data: processed.map(item => [
                        item.startDate,
                        item.sumAssured,
                        item.premiumRate,
                        item.productName,
                    ]),
                    symbolSize: function (val) {
                        console.log("Val : ", val)
                        return Math.sqrt(val[2]) / 30;
                    },
                    clip: true,
                    itemStyle: {
                        opacity: 0.8,
                    },
                },
            ],
        };

        setOption(chartOption);
    }, [policyData]);

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

    // Filter data when either product names or date range changes
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
                style={{ height: '400px', width: '100%' }}
                onChartReady={onChartReady}
            />
            <div style={{ marginTop: 16 }}>
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
            </div>
        </>
    );
};

export default ScatterPlot;
