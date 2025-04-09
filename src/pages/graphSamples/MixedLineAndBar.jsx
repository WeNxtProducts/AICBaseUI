import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import empData from './scatterGrapj.json'; // Make sure this file is correctly imported

const MixedLineAndBar = ({ view = 'small' }) => {
    const [chartOptions, setChartOptions] = useState({});
    const chartRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            chartRef.current?.getEchartsInstance()?.resize();
        }, 0);
    }, []);

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
            tooltip: view === 'large' && {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            grid: {
                top: view === 'large' ? 60 : 35,
                left: view === 'large' ? '3%' : '2%',
                right: view === 'large' ? '13%' : '6%',
                bottom: view === 'large' ? 65 : 25,
                containLabel: true,
            },
            dataZoom: view === 'large' && [
                {
                    type: 'inside'
                },
                {
                    type: 'slider'
                }
            ],
            legend: view === 'large' && {
                data: ['Basic Premium', 'OCB Premium', 'Age']
            },
            xAxis: {
                name: 'Name',
                type: 'category',
                data: xAxisLabels,
                axisPointer: {
                    type: 'shadow'
                },
                nameLocation: 'middle',
                nameGap: 30,
                axisLabel: {
                    formatter: value => view === 'small' ? value.charAt(0) : value
                }
            },
            yAxis: [
                {
                    type: 'value',
                    name: 'Premium',
                    min: 0,
                    // axisLabel: {
                    //     formatter: '{value}'
                    // },
                    axisLabel: {
                        formatter: view === 'small' ? (value) => {
                            if (value >= 1e6) return `${value / 1e6}M`;
                            if (value >= 1e3) return `${value / 1e3}k`;
                            return value;
                        } : undefined,
                    },
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
        <ReactECharts
            ref={chartRef}
            option={chartOptions}
            style={{ height: view === 'large' ? '400px' : '250px', width: '100%' }} />
    );
};

export default MixedLineAndBar;
