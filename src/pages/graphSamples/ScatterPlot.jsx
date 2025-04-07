import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import empData from './scatterGrapj.json';

const ScatterPlot = () => {
    const policyData = empData.Sheet1;
    const [option, setOption] = useState({});

    useEffect(() => {
        // Process the policy data
        const processedData = policyData.map(policy => ({
            startDate: new Date((policy.POL_START_DATE - 25569) * 86400 * 1000), // Convert Excel date to JS date
            sumAssured: policy.POL_SUM_ASSURED,
            premiumRate: policy.POL_BASIC_PREM_RATE,
            productName: policy.POL_PROD_NAME,
        }));

        const allDates = processedData.map(item => item.startDate);
        const minDate = Math.min(...allDates);
        const maxDate = Math.max(...allDates);

        // Calculate y-axis (sum assured) range
        const sumAssuredValues = processedData.map(item => item.sumAssured);
        const minSumAssured = Math.min(...sumAssuredValues);
        const maxSumAssured = Math.max(...sumAssuredValues);

        // Extract unique product names for color mapping
        const productNames = [...new Set(processedData.map(item => item.productName))];

        const chartOption = {
            title: {
                text: '',
            },
            tooltip: {
                trigger: 'item',
                formatter: params =>
                    `Start Date: ${params.value[0].toLocaleDateString()}<br/>
                     Sum Assured: ${params.value[1]}<br/>
                     Premium Rate: ${params.value[2]}<br/>
                     Product Name: ${params.value[3]}`,
            },

            dataZoom: [
                {
                    type: 'inside'
                },
                {
                    type: 'slider'
                }
            ],
            grid: {
                top: 100,
                bottom: 60,
                left: '8%',
                right: '10%'
            },
            xAxis: {
                name: 'Policy Start Date',
                type: 'time',
                min: minDate,
                max: maxDate
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
                top: 30,
                left: 'center',
                inRange: {
                    color: ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#F7B9A6', '#FF6833'],
                },
                // outOfRange: {
                //     color: '#999',
                // },
            },
            series: [
                {
                    name: 'Policy Data',
                    type: 'scatter',
                    data: processedData.map(item => [
                        item.startDate,
                        item.sumAssured,
                        item.premiumRate,
                        item.productName,
                    ]),
                    symbolSize: function (val) {
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

    return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default ScatterPlot;
