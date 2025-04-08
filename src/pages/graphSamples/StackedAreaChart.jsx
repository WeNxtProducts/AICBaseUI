import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import empData from './scatterGrapj.json';

const StackedAreaChart = () => {
    const [chartOptions, setChartOptions] = useState({});
    const policyData = empData.Sheet1;

    useEffect(() => {
        const productMap = {};

        policyData.forEach((policy) => {
            const { POL_PROD_NAME, POL_SUM_ASSURED, POL_BASIC_PREM_RATE, POL_OCB_PREM, POL_ASSR_AGE } = policy;
            if (!productMap[POL_PROD_NAME]) {
                productMap[POL_PROD_NAME] = {
                    POL_SUM_ASSURED: 0,
                    POL_BASIC_PREM_RATE: 0,
                    POL_OCB_PREM: 0,
                    totalAge: 0,
                    policyCount: 0,
                };
            }

            productMap[POL_PROD_NAME].POL_SUM_ASSURED += POL_SUM_ASSURED || 0;
            productMap[POL_PROD_NAME].POL_BASIC_PREM_RATE += POL_BASIC_PREM_RATE || 0;
            productMap[POL_PROD_NAME].POL_OCB_PREM += POL_OCB_PREM || 0;
            productMap[POL_PROD_NAME].totalAge += POL_ASSR_AGE || 0;
            productMap[POL_PROD_NAME].policyCount += 1;
        });

        const productNames = Object.keys(productMap);

        const sumAssured = [];
        const basicPremRate = [];
        const ocbPrem = [];
        const averageAge = [];

        productNames.forEach((prodName) => {
            const item = productMap[prodName];
            sumAssured.push(item.POL_SUM_ASSURED);
            basicPremRate.push(item.POL_BASIC_PREM_RATE);
            ocbPrem.push(item.POL_OCB_PREM);
            averageAge.push(item.totalAge / item.policyCount); // Calculate average age
        });

        const options = {
            title: {
                text: '',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985',
                    },
                },
            },
            legend: {
                data: ['Sum Assured', 'Basic Premium Rate', 'OCB Premium', 'Average Age'],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: productNames,
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: 'Sum Assured',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: { focus: 'series' },
                    data: sumAssured,
                },
                {
                    name: 'Basic Premium Rate',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: { focus: 'series' },
                    data: basicPremRate,
                },
                {
                    name: 'OCB Premium',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: { focus: 'series' },
                    data: ocbPrem,
                },
                {
                    name: 'Average Age',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: { focus: 'series' },
                    data: averageAge,
                },
            ],
        };

        setChartOptions(options);
    }, []);

    return (
        <ReactECharts option={chartOptions} style={{ height: '400px', width: '95%' }} />
    );
};

export default StackedAreaChart;
