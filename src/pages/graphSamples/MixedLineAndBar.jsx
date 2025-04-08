import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import empData from './scatterGrapj.json'; // Make sure this file is correctly imported

const MixedLineAndBar = () => {
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const watermarkText = 'WENXT';

        canvas.width = canvas.height = 100;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.08; // Adjust transparency level as needed
        ctx.font = '20px Microsoft Yahei';
        ctx.translate(50, 50);
        ctx.rotate(-Math.PI / 4); // Rotate text to make it slanted
        ctx.fillText(watermarkText, 0, 0);
        const policyData = empData.Sheet1;

        const xAxisLabels = policyData.map(item => item.POL_ASSR_NAME);
        const basicPremium = policyData.map(item => item.POL_BASIC_PREM_RATE);
        const ocbPremium = policyData.map(item => item.POL_OCB_PREM);
        const age = policyData.map(item => item.POL_ASSR_AGE);

        const option = {
            backgroundColor: {
                type: 'pattern',
                image: canvas,
                repeat: 'repeat'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                },
                {
                    type: 'slider'
                }
            ],
            legend: {
                data: ['Basic Premium', 'OCB Premium', 'Age']
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisLabels,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Premium',
                    min: 0,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    name: 'Age',
                    min: 0,
                    axisLabel: {
                        formatter: '{value} yrs'
                    }
                }
            ],
            series: [
                {
                    name: 'Basic Premium',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: (value) => `${value}`
                    },
                    label: { show: false },
                    data: basicPremium
                },
                {
                    name: 'OCB Premium',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: (value) => `${value}`
                    },
                    label: { show: false },
                    data: ocbPremium
                },
                {
                    name: 'Age',
                    type: 'line',
                    yAxisIndex: 1,
                    tooltip: {
                        valueFormatter: (value) => `${value} yrs`
                    },
                    data: age
                }
            ]
        };

        setChartOptions(option);
    }, []);

    return (
        <ReactECharts option={chartOptions} style={{ height: '400px', width: '100%' }} />
    );
};

export default MixedLineAndBar;
