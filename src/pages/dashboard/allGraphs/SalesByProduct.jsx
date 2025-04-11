import React, { useEffect, useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';

const SalesByProduct = ({ view = 'small', graphData }) => {
    const chartRef = useRef(null);
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const premiumMap = graphData.reduce((acc, { POL_PROD_CODE, POL_BASIC_PREM_RATE }) => {
            const code = POL_PROD_CODE;
            const rate = parseFloat(POL_BASIC_PREM_RATE);
            acc[code] = (acc[code] || 0) + rate;
            return acc;
        }, {});

        const productCodes = Object.keys(premiumMap);
        const totalPremiums = productCodes.map(code => premiumMap[code]);

        console.log(productCodes); // ['LPLAN001', 'LPLAN002']
        console.log(totalPremiums);
    }, [graphData])

    useEffect(() => {
        const premiumMap = graphData.reduce((acc, { POL_PROD_CODE, POL_BASIC_PREM_RATE }) => {
            const code = POL_PROD_CODE;
            const rate = parseFloat(POL_BASIC_PREM_RATE);
            acc[code] = (acc[code] || 0) + rate;
            return acc;
        }, {});

        const productCodes = Object.keys(premiumMap);
        const totalPremiums = productCodes.map(code => premiumMap[code]);
        
        const options = {
            tooltip: view === 'large' ? {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            } : undefined,
            legend: view === 'large' ? {
                data: ['Total Premium Collected'],
            } : undefined,
            grid: {
                top: view === 'large' ? 60 : 40,
                left: view === 'large' ? '3%' : '4%',
                right: view === 'large' ? '4%' : '2%',
                bottom: view === 'large' ? 35 : 25,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: productCodes,
                name: 'Product Code',
                nameLocation: 'middle',
                nameGap: 30,
            },
            yAxis: {
                type: 'value',
                name: 'Total Premium',
                axisLabel: {
                    formatter: view === 'small' ? (value) => {
                        // console.log("value : ", value)
                        if (value >= 1e21) return `${(value / 1e21).toFixed(1)}Z`; // Quintillion
                        if (value >= 1e15) return `${(value / 1e15).toFixed(1)}Q`; // Quadrillion
                        if (value >= 1e12) return `${(value / 1e12).toFixed(1)}T`; // Trillion
                        if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;  // Billion
                        if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;  // Million
                        if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;  // Thousand
                        return value;
                    } : undefined,
                }
            },
            series: [
                {
                    name: 'Total Premium Collected',
                    type: 'bar',
                    data: totalPremiums,
                    itemStyle: {
                        color: '#5470C6',
                    },
                    emphasis: {
                        focus: 'series',
                    },
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

export default SalesByProduct;
