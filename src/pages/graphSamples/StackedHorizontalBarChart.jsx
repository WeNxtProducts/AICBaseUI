import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import empData from './scatterGrapj.json';

const StackedHorizontalBarChart = () => {
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const policyData = empData.Sheet1;

        // Aggregate data by product name
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
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
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
                type: 'value',
            },
            yAxis: {
                type: 'category',
                data: productNames,
            },
            series: [
                // {
                //     name: 'Sum Assured',
                //     type: 'bar',
                //     stack: 'total',
                //     label: {
                //         show: true,
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
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: basicPremRate,
                },
                {
                    name: 'OCB Premium',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: ocbPrem,
                },
                {
                    name: 'Average Age',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true,
                    },
                    emphasis: {
                        focus: 'series',
                    },
                    data: averageAge,
                },
            ],
        };

        setChartOptions(options);
    }, []);

    return <ReactECharts option={chartOptions} style={{ height: '400px', width: '95%' }} />;
};

export default StackedHorizontalBarChart;
