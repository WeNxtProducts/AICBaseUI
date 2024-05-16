import CommonChart from "./CommonChart";

const MainChart = () => {
  return (
    <div className="charts-line">
      <div className="flex justify-between">
        <div className="ml-4 mt-2">
          <p className="graph-header">Forecast Vs Actuals</p>
        </div>
        <div className="mr-10 mt-2 days-filter">
          <span className="week-filter-non filter">
            <div className="empty-box-non empty-box-highlight"></div>This Week
          </span>
          <span className="month-filter-select filter ml-4">
            <div className="empty-box-select empty-box-highlight"></div>This
            Month
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="main-chart">
          <CommonChart
            details={true}
            data1={[100, 20, 10, 11, 100, 300, 10, 0, 148]}
            data2={[1, 23, 87, 56, 11, 12, 69, 90, 0]}
          />
        </div>
        <div className="graph-indicator flex justify-center items-center">
          <div>
            <div className="icon-with-text">
              <div className="circle-icon">
                <i className="bi bi-person-walking"></i>
              </div>
              <div className="text">
                <div className="indi">Forecast</div>
                <div className="number-indi">08 Trainings</div>
              </div>
            </div>
            <div className="icon-with-text mt-7">
              <div className="circle-icon cycle-icon">
                <i className="bi bi-bicycle"></i>
              </div>
              <div className="text">
                <div className="indi">Actuals</div>
                <div className="number-indi">16 Trainings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainChart;
