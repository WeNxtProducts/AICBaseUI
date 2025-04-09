import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import empData from './scatterGrapj.json';

const StackedHorizontalBarChart = ({ view = 'small' }) => {
    const [chartOptions, setChartOptions] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        const policyData = empData.Sheet1;
        const productMap = policyData.reduce((acc, policy) => {
            const { POL_PROD_NAME, POL_SUM_ASSURED, POL_BASIC_PREM_RATE, POL_OCB_PREM, POL_ASSR_AGE } = policy;
            if (!acc[POL_PROD_NAME]) {
                acc[POL_PROD_NAME] = {
                    POL_SUM_ASSURED: 0,
                    POL_BASIC_PREM_RATE: 0,
                    POL_OCB_PREM: 0,
                    totalAge: 0,
                    count: 0,
                };
            }
            acc[POL_PROD_NAME].POL_SUM_ASSURED += POL_SUM_ASSURED;
            acc[POL_PROD_NAME].POL_BASIC_PREM_RATE += POL_BASIC_PREM_RATE;
            acc[POL_PROD_NAME].POL_OCB_PREM += POL_OCB_PREM;
            acc[POL_PROD_NAME].totalAge += POL_ASSR_AGE;
            acc[POL_PROD_NAME].count += 1;
            return acc;
        }, {});

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
            averageAge.push(item.totalAge / item.count);
        });

        const options = {
            tooltip: view === 'large' && {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            legend: view === 'large' && {
                data: ['Sum Assured', 'Basic Premium Rate', 'OCB Premium', 'Average Age'],
            },
            grid: {
                top: view === 'large' ? 60 : 35,
                left: '3%',
                right: view === 'large' ? '13%' : '9%',
                bottom: view === 'large' ? 65 : 25,
                containLabel: true,
            },
            xAxis: {
                name: 'Sum Assured',
                type: 'value',
                nameLocation: 'middle',
                nameGap: 30,
                axisLabel: {
                    formatter: view === 'small' ? (value) => {
                        if (value >= 1e6) return `${value / 1e6}M`;
                        if (value >= 1e3) return `${value / 1e3}k`;
                        return value;
                    } : undefined,
                },
            },
            yAxis: {
                name: 'Plan Types',
                type: 'category',
                data: productNames,
            },
            dataZoom: view === 'large' && [
                {
                    type: 'inside',
                },
                {
                    type: 'slider',
                },
            ],
            series: [
                // {
                //     name: 'Sum Assured',
                //     type: 'bar',
                //     stack: 'total',
                //     label: {
                //         show:  view === 'large',
                //     },
                //     emphasis: {
                //         focus: 'series',
                //     },
                //     data: sumAssured,
                // },
                {
                    name: 'Basic Premium Rate',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: view === 'large',
                    },
                    emphasis: view === 'large' && {
                        focus: 'series',
                    },
                    data: basicPremRate,
                },
                {
                    name: 'OCB Premium',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: view === 'large',
                    },
                    emphasis: view === 'large' && {
                        focus: 'series',
                    },
                    data: ocbPrem,
                },
                {
                    name: 'Average Age',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: view === 'large',
                    },
                    emphasis: view === 'large' && {
                        focus: 'series',
                    },
                    data: averageAge,
                },
            ],
        };

        setChartOptions(options);
    }, [view]);

    useEffect(() => {
        setTimeout(() => {
            chartRef.current?.getEchartsInstance()?.resize();
        }, 0);
    }, []);

    return (
        <>
            <ReactECharts
                option={chartOptions}
                ref={chartRef}
                style={{ height: view === 'large' ? '400px' : '250px', width: '100%' }} />
        </>
    )

};

export default StackedHorizontalBarChart;
