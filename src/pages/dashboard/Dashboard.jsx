import StatisticsCards from './StatisticsCards';
import UserDetail from './UserDetail';
import MultiCharts from './MultiCharts';
import './Dashboard.scss';
import SalesPerformance from './salesPerformance/SalesPerformance';

const Dashboard = () => {
    return (
        <div className='dashboard'>
            <UserDetail />
            <StatisticsCards />
            {/* <MultiCharts /> */}
            <SalesPerformance />
        </div>
    );
};

export default Dashboard;
