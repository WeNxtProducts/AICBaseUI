import { useState } from "react";
import CommonChart from "./CommonChart";
import GraphModal from "./GraphModal";

const MultiCharts = () => {
  const [graphOpen, setGraphOpen] = useState(false);

  const handleClose = () => {
    setGraphOpen(false);
  };

  const handleOpenMainchart = () => {
    setGraphOpen(true);
  };
  return (
    <div className="multi-charts mt-7">
      <div onClick={() => handleOpenMainchart()} className="chart">
        <p className="ml-4 mt-2 multi-graph-labels">Forecast Vs Actuals</p>
        <CommonChart
          details={false}
          data1={[100, 20, 10, 11, 100, 300, 10, 0, 148]}
          data2={[1, 23, 87, 56, 11, 12, 69, 90, 0]}
        />
      </div>
      <div onClick={() => handleOpenMainchart()} className="chart">
        <p className="ml-4 mt-2 multi-graph-labels">Forecast Vs Actuals</p>
        <CommonChart
          details={false}
          data1={[100, 20, 10, 11, 100, 300, 10, 0, 148]}
          data2={[1, 23, 87, 56, 11, 12, 69, 90, 0]}
        />
      </div>
      <div onClick={() => handleOpenMainchart()} className="chart">
        <p className="ml-4 mt-2 multi-graph-labels">Forecast Vs Actuals</p>
        <CommonChart
          details={false}
          data1={[78, 91, 22, 78, 30, 66, 123, 0, 148]}
          data2={[3, 99, 88, 91, 49, 23, 36, 78, 12]}
        />
      </div>
      <div onClick={() => handleOpenMainchart()} className="chart">
        <p className="ml-4 mt-2 multi-graph-labels">Forecast Vs Actuals</p>
        <CommonChart
          details={false}
          data1={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
          data2={[90, 80, 70, 60, 100, 40, 30, 20, 10]}
        />
      </div>
      {graphOpen && (
        <GraphModal graphOpen={graphOpen} handleClose={handleClose} />
      )}
    </div>
  );
};

export default MultiCharts;
