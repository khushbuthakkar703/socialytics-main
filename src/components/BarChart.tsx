import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as React from "react";

interface chartType {
  title: string;
  categories: any;
  data: any;
}

export const BarChart = (props: chartType) => {
  const chartOptions: Options = {
    chart: {
      type: "spline",
    },
    title: {
      text: props.title,
    },
    series: props.data,
    xAxis: {
      categories: props.categories,
      labels: {
        useHTML: true,
        formatter: () => "",
      },
    },
    plotOptions: {
      series: {
        // borderRadius: 5
      },
      column: {
        pointPadding: 0,
        pointWidth: 17,
      },
    },
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </>
  );
};
