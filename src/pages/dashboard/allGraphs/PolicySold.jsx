import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const PolicySold = ({ view = 'small', graphData }) => {
    const chartRef = useRef(null);
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const productCountMap = {};

        graphData.forEach(({ POL_PROD_CODE }) => {
            if (POL_PROD_CODE) {
                productCountMap[POL_PROD_CODE] = (productCountMap[POL_PROD_CODE] || 0) + 1;
            }
        });

        const productCodes = Object.keys(productCountMap);
        const policyCounts = productCodes.map((code) => productCountMap[code]);

        const options = {
            tooltip: view === 'large' ? {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                },
            } : undefined,
            legend: view === 'large' ? {
                data: ['Policies Sold'],
            } : undefined,
            grid: {
                top: view === 'large' ? 60 : 45,
                left: view === 'large' ? '3%' : '4%',
                right: view === 'large' ? '1%' : '1%',
                bottom: view === 'large' ? 35 : 25,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: productCodes,
                name: 'Product Code',
                nameLocation: 'middle',
                nameGap: 30,
            },
            yAxis: {
                type: 'value',
                name: 'Policies Sold',
                axisLabel: {
                    formatter: (value) => {
                        if (value >= 1e6) return `${value / 1e6}M`;
                        if (value >= 1e3) return `${value / 1e3}k`;
                        return value;
                    },
                },
            },
            series: [
                {
                    name: 'Policies Sold',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series',
                    },
                    data: policyCounts,
                },
            ],
        };

        setChartOptions(options);
    }, [graphData, view]);

    useEffect(() => {
        setTimeout(() => {
            chartRef.current?.getEchartsInstance()?.resize();
        }, 0);
    }, []);

    return (
        <ReactECharts
            ref={chartRef}
            option={chartOptions}
            style={{ height: view === 'large' ? '400px' : '250px', width: '95%' }}
        />
    );
};

export default PolicySold;
