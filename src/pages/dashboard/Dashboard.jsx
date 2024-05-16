import StatisticsCards from "./StatisticsCards";
import UserDetail from "./UserDetail";
import MultiCharts from "./MultiCharts";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <UserDetail />
      <StatisticsCards />
      <MultiCharts />
    </div>
  );
};

export default Dashboard;
