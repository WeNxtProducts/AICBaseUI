import React, { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import empData from './scatterGrapj.json';

const StackedAreaChart = ({ view = 'small' }) => {
    const [chartOptions, setChartOptions] = useState({});
    const policyData = empData.Sheet1;
    const chartRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            chartRef.current?.getEchartsInstance()?.resize();
        }, 0);
    }, []);

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
            tooltip: view === 'large' && {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985',
                    },
                },
            },
            legend: view === 'large' && {
                data: ['Sum Assured', 'Basic Premium Rate', 'OCB Premium', 'Average Age'],
            },
            grid: {
                top: view === 'large' ? 60 : 40,
                left: '3%',
                right: view === 'large' ? 10 : 2,
                bottom: view === 'large' ? 45 : 25,
                containLabel: true,
            },
            xAxis: {
                name: 'Product Name',
                type: 'category',
                boundaryGap: false,
                data: productNames,
                nameLocation: 'middle',
                nameGap: 30,
            },
            yAxis: {
                name: 'Sum Assured',
                type: 'value',
                axisLabel: {
                    formatter: view === 'small' ? (value) => {
                        if (value >= 1e6) return `${value / 1e6}M`;
                        if (value >= 1e3) return `${value / 1e3}k`;
                        return value;
                    } : undefined,
                },
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
    }, [view, policyData]);

    return (
        <ReactECharts
            ref={chartRef}
            option={chartOptions}
            style={{ height: view === 'large' ? '400px' : '250px', width: '95%' }} />
    );
};

export default StackedAreaChart;
