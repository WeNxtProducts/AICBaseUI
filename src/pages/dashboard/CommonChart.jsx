import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const CommonChart = ({ details, data1 = [], data2 = [] }) => {
 const [chartData, setChartData] = useState({
  series: [
   {
    name: '',
    data: [],
   },
   {
    name: '',
    data: [],
   },
  ],
  options: {
   tooltip: {
    enabled: true,
   },
   chart: {
    // height: 350,
    type: 'line',
    zoom: {
     enabled: false,
    },
   },
   dataLabels: {
    enabled: false,
   },
   stroke: {
    curve: 'smooth',
    width: 2,
   },
   title: {
    text: '',
    align: 'left',
   },
   grid: {
    row: {
     colors: ['#ffffff', 'transparent'],
     opacity: 0.5,
    },
   },
   xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
   },
   yaxis: {
    labels: {
     style: {
      fontSize: '12px',
      fontWeight: 'mild',
     },
    },
   },
   toolbar: {
    show: true,
   },
   legend: {
    show: false,
   },
  },
 });

 useEffect(() => {
  setChartData(prevState => ({
   ...prevState,
   series: [
    { name: 'Forecast ', data: data1 || [] },
    { name: 'Actuals', data: data2 || [] },
   ],
   options: {
    ...prevState.options,
    tooltip: {
     enabled: details,
    },
   },
  }));
 }, [details, data1, data2]);

 return (
  <ReactApexChart
   options={chartData.options}
   series={chartData.series}
   type='line'
   // height={220}
  />
 );
};

export default CommonChart;
