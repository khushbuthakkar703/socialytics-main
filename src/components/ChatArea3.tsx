import Expand from "../../public/images/Expand.svg";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ChartLight from "../../public/images/Chartlight.png";
import ChartDark from "../../public/images/Chartdark.png";
import Image from "next/image";

type ChartProps = {
  title?: string;
  value?: string;
  changeRate?: string;
  dark?: boolean;
  darkTheme?: string;
  notHover: any;
  icon: any;
};

const options = {
  chart: {
    height: 130,
    width: 100,
  },
  credits: {
    enabled: false,
  },
  legend: {
    enabled: false,
  },
  title: {
    text: "",
  },
  series: [
    {
      type: "area",
      data: [120, 280, 220, 180, 320],
    },
  ],
  yAxis: {
    visible: false,
  },
  xAxis: {
    visible: false,
  },
};

export default function ChartArea3(props: ChartProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl p-6 shadow-[0px_3px_20px_-8px_rgba(0,0,0,0.3)]   drop-shadow-2xl transition-[1s]`}
    >
      <div className="flex items-center justify-between gap-6 pb-4">
        <p className="font-semibold">{props.title}</p>
        <button>
          <img src={props.icon?.src} />
        </button>
      </div>

      <div className="space-y-1 py-5">
        <div
          className={`flex flex-wrap items-center justify-between gap-3 ${
            props.notHover ? "py-0" : "py-7"
          }`}
        >
          <div className="mt-4 flex items-end gap-3">
            <p
              className={`text - 5xl font-extrabold ${
                props.value?.length ?? 0 > 3 ? "text-[28px]" : "text-[52px]"
              } `}
            >
              {props.value}
            </p>
          </div>
          {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
          <Image
            src={props.darkTheme ? ChartDark : ChartLight}
            height={55}
            width={85}
            alt={"chart"}
          />
        </div>
        <div className="flex">
          <p className="pr-2 text-[#03DE73]">5.26%</p>
          <p className="font-medium text-gray-500">Since last month</p>
        </div>
      </div>
    </div>
  );
}
