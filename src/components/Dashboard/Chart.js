import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = (props) => {
  const { options, series, type, width } = props;
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type={type}
        width={width}
      />
    </div>
  );
};

export default Chart;
