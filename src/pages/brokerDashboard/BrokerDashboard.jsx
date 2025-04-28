import React, { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { SearchOutlined } from '@ant-design/icons';
import './BrokerDashboard.scss';

const BrokerDashboard = () => {
    // States for dropdown selections
    const [quotesTimeframe, setQuotesTimeframe] = useState('Last 30 Days');
    const [policiesTimeframe, setPoliciesTimeframe] = useState('Last 30 Days');
    const [endorsementsTimeframe, setEndorsementsTimeframe] = useState('Last 30 Days');
    const [notificationsTimeframe, setNotificationsTimeframe] = useState('Last 30 Days');

    // Data states
    const [quotesCount, setQuotesCount] = useState(11);
    const [policiesCount, setPoliciesCount] = useState(11);
    const [renewalQuotesCount, setRenewalQuotesCount] = useState(0);
    const [renewalPoliciesCount, setRenewalPoliciesCount] = useState(0);

    // Sample data for charts
    const getPoliciesQuotesChartOption = () => {
        return {
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['10/04/2025', '11/04/2025', '12/04/2025', '15/04/2025', '16/04/2025', '17/04/2025', '18/04/2025', '20/04/2025', '24/04/2025'],
                axisLine: {
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                axisLabel: {
                    fontSize: 10,
                    interval: 1,
                    rotate: 0,
                    color: '#666'
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 6,
                interval: 1,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#eee'
                    }
                },
                axisLabel: {
                    color: '#666'
                }
            },
            series: [
                {
                    name: 'Quotes',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        width: 3
                    },
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        color: '#37475F'
                    },
                    data: [2, 1, 0.8, 2, 6, 1, 1, 0, 0]
                },
                {
                    name: 'Policies',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        width: 3
                    },
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        color: '#4CAF50'
                    },
                    data: [0, 2, 1, 2, 0, 1, 4, 4, 3]
                }
            ],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#ccc',
                borderWidth: 1,
                textStyle: {
                    color: '#333'
                },
                formatter: function (params) {
                    let result = params[0].axisValue + '<br/>';
                    params.forEach(param => {
                        result += `<span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:${param.color};"></span> ${param.seriesName}: ${param.value}<br/>`;
                    });
                    return result;
                }
            },
            legend: {
                data: ['Quotes', 'Policies'],
                bottom: 0,
                icon: 'circle',
                itemWidth: 10,
                itemHeight: 10,
                textStyle: {
                    fontSize: 12,
                    color: '#666'
                }
            }
        };
    };

    const getQuotesOverviewChartOption = () => {
        return {
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['10/04/2025', '12/04/2025', '16/04/2025', '17/04/2025', '18/04/2025'],
                axisLine: {
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                axisLabel: {
                    fontSize: 10,
                    interval: 0,
                    color: '#666'
                }
            },
            yAxis: {
                type: 'value',
                min: 0,
                max: 7,
                interval: 0.5,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#eee'
                    }
                },
                axisLabel: {
                    color: '#666',
                    formatter: function (value) {
                        return value.toFixed(1);
                    }
                }
            },
            series: [
                {
                    name: 'Quotes',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        width: 3
                    },
                    symbol: 'circle',
                    symbolSize: 6,
                    itemStyle: {
                        color: '#37475F'
                    },
                    data: [2, 1.3, 6, 1.2, 0]
                }
            ],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#ccc',
                borderWidth: 1,
                textStyle: {
                    color: '#333'
                }
            }
        };
    };

    const handleDropdownChange = (setter) => (e) => {
        setter(e.target.value);
    };

    return (
        <div className="broker-dashboard">
            <div className="dashboard-container">
                {/* Top Cards */}
                <div className="dashboard-cards">
                    <div className="dashboard-card">
                        <div className="card-content">
                            <div className="card-info">
                                <h3>Quotes</h3>
                                <h2>{quotesCount}</h2>
                            </div>
                            <div className="card-icon quotes-icon">
                                <i className="bi bi-file-text"></i>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-content">
                            <div className="card-info">
                                <h3>Policies</h3>
                                <h2>{policiesCount}</h2>
                            </div>
                            <div className="card-icon policies-icon">
                                <i className="bi bi-shield-check"></i>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-content">
                            <div className="card-info">
                                <h3>Renewal Quotes</h3>
                                <h2>{renewalQuotesCount}</h2>
                            </div>
                            <div className="card-icon renewal-quotes-icon">
                                <i className="bi bi-arrow-repeat"></i>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-card">
                        <div className="card-content">
                            <div className="card-info">
                                <h3>Renewal Policies</h3>
                                <h2>{renewalPoliciesCount}</h2>
                            </div>
                            <div className="card-icon renewal-policies-icon">
                                <i className="bi bi-shield-fill-check"></i>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts and Tables Section */}
                <div className="dashboard-charts-tables">
                    {/* Recent Policies/Quotes Chart */}
                    <div className="dashboard-chart-container">
                        <div className="chart-header">
                            <h3>Recent Policies/Quotes</h3>
                            <div className="chart-filter">
                                <select
                                    value={policiesTimeframe}
                                    onChange={handleDropdownChange(setPoliciesTimeframe)}
                                >
                                    <option>Last 30 Days</option>
                                    <option>Last 60 Days</option>
                                    <option>Last 90 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="chart-body">
                            <ReactECharts
                                option={getPoliciesQuotesChartOption()}
                                style={{ height: '100%', width: '100%' }}
                            />
                        </div>
                    </div>

                    {/* Quotes Overview Chart */}
                    <div className="dashboard-chart-container">
                        <div className="chart-header">
                            <h3>Quotes OverView</h3>
                            <div className="chart-filter">
                                <select
                                    value={quotesTimeframe}
                                    onChange={handleDropdownChange(setQuotesTimeframe)}
                                >
                                    <option>Last 30 Days</option>
                                    <option>Last 60 Days</option>
                                    <option>Last 90 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="chart-body">
                            <ReactECharts
                                option={getQuotesOverviewChartOption()}
                                style={{ height: '100%', width: '100%' }}
                            />
                        </div>
                    </div>

                    {/* Recent Endorsements */}
                    <div className="dashboard-chart-container">
                        <div className="chart-header">
                            <h3>Recent Endorsements</h3>
                            <div className="chart-filter">
                                <select
                                    value={endorsementsTimeframe}
                                    onChange={handleDropdownChange(setEndorsementsTimeframe)}
                                >
                                    <option>Last 30 Days</option>
                                    <option>Last 60 Days</option>
                                    <option>Last 90 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="chart-body empty-chart">
                            <p>No Endorsement Available</p>
                        </div>
                    </div>

                    {/* Notifications Table */}
                    <div className="dashboard-chart-container">
                        <div className="chart-header">
                            <h3>Notifications</h3>
                            <div className="chart-filter">
                                <select
                                    value={notificationsTimeframe}
                                    onChange={handleDropdownChange(setNotificationsTimeframe)}
                                >
                                    <option>Last 30 Days</option>
                                    <option>Last 60 Days</option>
                                    <option>Last 90 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="table-container">
                            <div className="table-search">
                                <input
                                    type="text"
                                    placeholder="Global Search"
                                    className="global-search"
                                />
                                <SearchOutlined className="search-icon" />
                            </div>

                            <table className="notifications-table">
                                <thead>
                                    <tr>
                                        <th>Email <i className="bi bi-arrow-down-up"></i></th>
                                        <th>Phone No <i className="bi bi-arrow-down-up"></i></th>
                                        <th>Date <i className="bi bi-arrow-down-up"></i></th>
                                        <th>Content <i className="bi bi-arrow-down-up"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Empty table body */}
                                </tbody>
                            </table>

                            <div className="table-pagination">
                                <button className="pagination-btn"><i className="bi bi-chevron-double-left"></i></button>
                                <button className="pagination-btn"><i className="bi bi-chevron-left"></i></button>
                                <span className="page-indicator">1</span>
                                <button className="pagination-btn"><i className="bi bi-chevron-right"></i></button>
                                <button className="pagination-btn"><i className="bi bi-chevron-double-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrokerDashboard;