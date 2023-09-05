import Expand from "../../public/images/Expand.svg";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Image from "next/image";
import ChartBg from "../../public/images/Path (1).png";
import ChartLine from "../../public/images/Path.png";
import ChartDot from "../../public/images/Vector.png";
type ChartProps = {
  title: string;
  value: string;
  date: string;
  changeRate: string;
  type: string;
  down?: boolean;
};
const options = {
  chart: {
    height: 130,
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
export default function ChartArea2(props: ChartProps) {
  return (
    <div className=" overflow-hidden rounded-xl border border-b-[8px] border-gray-300 border-b-blue-500 shadow-md">
      <div className="border-b p-[25px]">
        <p className="font-semibold">{props.title}</p>
      </div>
      <div className="">
        <div className="flex items-end gap-3 p-6">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold tracking-widest">
              {props.value}
            </p>
            <span className="block text-gray-400">{props.date}</span>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase text-gray-400">
              {props.type}
            </p>
            <span className="block w-[max-content] rounded-md bg-green-100 px-2 py-1 text-center text-[13px] font-medium text-green-500">
              {props.changeRate}
            </span>
          </div>
        </div>
        {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
        <div className="relative bottom-[-5px]">
          <Image src={ChartBg} alt={"graph"} className={" bottom-0 w-full"} />
          <div
            className={`absolute w-11/12 ${
              props.down ? "top-9 -scale-y-100" : "-scale-y-1 top-6"
            }`}
          >
            <Image src={ChartLine} alt={"graph"} className="w-full" />
            <Image
              src={ChartDot}
              alt={"graph"}
              className={`absolute right-[-10px] top-[-6px] rounded-full bg-white`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
