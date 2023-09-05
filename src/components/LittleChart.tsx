import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";

type HighchartDataType =
  | number
  | [string | number, number | null]
  | Highcharts.PointOptionsObject
  | null;

interface LittleChartProps {
  data: Record<string, HighchartDataType>;
  width?: string;
  height?: string;
  down?: boolean;
  chartType?: "area" | "line";
}

export const LittleChart = ({
  data,
  width = "null",
  height = "65",
  down,
  chartType = "area",
}: LittleChartProps) => {
  const chartOptions: Highcharts.Options = {
    chart: {
      renderTo: "chart",
      margin: 0,
      width: JSON.parse(width),
      height: JSON.parse(height),
      backgroundColor: "transparent",
    },

    accessibility: {
      enabled: false,
    },
    tooltip: {
      // formatter: function () {
      //   return `<p>${this?.x}</p><p>${nFormatter(this?.y ?? 0)}</p>`;
      // },
      enabled: false,
    },
    xAxis: {
      categories: data ? Object?.keys(data) : [],
      gridLineWidth: 0,
      visible: false,
    },
    yAxis: {
      gridLineWidth: 0,
    },
    credits: {
      enabled: false,
    },
    legend: {
      navigation: {
        enabled: false,
      },
      symbolPadding: 0,
      symbolWidth: 0,
      symbolHeight: 0,
      squareSymbol: false,
    },
    title: {
      text: "",
    },
    series: [
      {
        type: chartType,
        data: data ? Object.values(data) : [],
        name: "",
        marker: {
          enabled: false,
        },
        color: down ? "#96414D" : "#77DC34",
        className: "",
      },
    ],
    plotOptions: {
      series: {
        marker: {
          enabled: false,
        },
      },
      spline: {
        lineWidth: 0,
      },
      area: {
        marker: {
          enabled: false,
        },
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, down ? "#F95A5A" : "#93E460"], // Replace with a hardcoded color value
            [
              1,
              down ? "rgba(224, 84, 87, 0.12) 100%)" : "rgba(119, 220, 52, 0)",
            ],
          ],
        },
      },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 150,
          },
          chartOptions: {
            chart: {
              className: "!w-full",
            },
          },
        },
      ],
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      width="100%"
    />
  );
};
