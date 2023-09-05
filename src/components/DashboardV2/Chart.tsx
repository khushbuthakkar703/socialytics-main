import {
  Title,
  Card,
  LineChart,
  CurveType,
  Metric,
  Subtitle,
  Dropdown,
  DropdownItem,
} from "@tremor/react";
import { useEffect, useState } from "react";
import * as SelectRadix from "@radix-ui/react-select";
import { Avatar } from "@/components/DashboardV2/Avatar";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

interface ChartProps {
  className?: string;
  title?: string;
  titleClassName?: string;
  curveType?: CurveType | "basis";
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGridLines?: boolean;
  showLegend?: boolean;
  chartdata?: any[];
}

// const chartdata = [
//   {
//     date: "Jan 22",
//     CurrentPeriod: 2890,
//     "Previous Period": 2338,
//   },
//   {
//     date: "Feb 22",
//     CurrentPeriod: 2756,
//     "Previous Period": 2103,
//   },
//   {
//     date: "Mar 22",
//     CurrentPeriod: 3322,
//     "Previous Period": 2194,
//   },
//   {
//     date: "Apr 22",
//     CurrentPeriod: 3470,
//     "Previous Period": 2108,
//   },
//   {
//     date: "May 22",
//     CurrentPeriod: 3475,
//     "Previous Period": 1812,
//   },
//   {
//     date: "Jun 22",
//     CurrentPeriod: 3129,
//     "Previous Period": 1726,
//   },
// ];

const dataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};

export const Chart = ({
  className = "",
  title,
  curveType = "basis",
  titleClassName = "",
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  showLegend = true,
  chartdata = [],
}: ChartProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("");

  const handleFilter = (filter: string) => {
    setFilter(filter);
  };

  const habdlePrevPeriod = () =>
    [...chartData].reduce((acc, period) => {
      const val = period["Previous Period"] ?? 0;
      return acc + val;
    }, 0);
  const habdleCurrentPeriod = () =>
    [...chartData].reduce((acc, period) => {
      const val = period["Current Period"] ?? 0;
      return acc + val;
    }, 0);

  useEffect(() => {
    const handleFilter = (): any[] => {
      if (filter === "Week") {
        return [...chartdata]
          .map((data) => {
            return {
              date: data.dayOfCurrentPeriod,
              "Current Period": data.followersOfCurrentPeriod,
              "Previous Period": data.followersOfPreviousPeriod,
            };
          })
          .splice(0, 7);
      }
      if (filter === "Month") {
        return [...chartdata]
          .map((data) => {
            return {
              date: data.dayOfCurrentPeriod,
              "Current Period": data.followersOfCurrentPeriod,
              "Previous Period": data.followersOfPreviousPeriod,
            };
          })
          .splice(0, 30);
      }
      return [];
    };
    setChartData(() => handleFilter());
  }, [filter]);

  useEffect(() => {
    chartdata?.length && setFilter("Week");
  }, [chartdata]);

  return (
    <Card className={`bg-white  dark:bg-inherit dark:text-white ${className}`}>
      {title ? (
        <Title
          className={`font-brandonGrotesque text-2xl font-[450] dark:text-white ${titleClassName} flex justify-between items-center`}
        >
          {title}

          <SelectRadix.Root
            onValueChange={(f) => handleFilter(f)}
            defaultValue={"Week"}
          >
            <SelectRadix.Trigger className="inline-flex h-[2.5rem] w-[150px] items-center justify-between rounded-lg border border-[#D2D2D2] px-1 py-1 font-poppins text-xs font-semibold">
              <SelectRadix.Value placeholder={"Week"} defaultValue={"Week"} />
              <SelectRadix.Icon className="pr-2 text-[#EC2A90]" />
            </SelectRadix.Trigger>
            <SelectRadix.Portal>
              <SelectRadix.Content>
                <SelectRadix.ScrollUpButton className="flex items-center justify-center  leading-none text-gray-700 dark:text-gray-300">
                  <ChevronUpIcon />
                </SelectRadix.ScrollUpButton>
                <SelectRadix.Viewport className="rounded-lg bg-inherit p-2 shadow-lg dark:bg-gray-800 bg-white">
                  <SelectRadix.Group className="z-20 ">
                    {["Week", "Month"].map((f, i) => (
                      <SelectRadix.Item
                        disabled={f === "Grapes"}
                        key={`${f}-${i}`}
                        value={f}
                        className={
                          "relative w-full flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900 z-20"
                          // "radix-disabled:opacity-50",
                          // "focus:outline-none select-none"
                        }
                      >
                        <SelectRadix.ItemText>{f}</SelectRadix.ItemText>
                        {/*<SelectRadix.ItemIndicator className="absolute left-2 inline-flex items-center">*/}
                        {/*    <CheckIcon />*/}
                        {/*</SelectRadix.ItemIndicator>*/}
                      </SelectRadix.Item>
                    ))}
                  </SelectRadix.Group>
                </SelectRadix.Viewport>
                <SelectRadix.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
                  <ChevronDownIcon />
                </SelectRadix.ScrollDownButton>
              </SelectRadix.Content>
            </SelectRadix.Portal>
          </SelectRadix.Root>
          {/*<Dropdown className="w-fit " placeholder="Per Week"       onValueChange={(value) => handleFilter( value)}>*/}
          {/*  <DropdownItem value="Week" text="Per Week" />*/}
          {/*  <DropdownItem value="Month" text="Per Month" />*/}
          {/*</Dropdown>*/}
        </Title>
      ) : null}
      <div className="flex gap-10 ml-16 relative">
        <div>
          <Subtitle>Current {filter}</Subtitle>
          <Metric className="flex items-center gap-2 text-2xl">
            <div className="w-3 h-3 rounded-full bg-fuchsia-500"></div>{" "}
            {habdleCurrentPeriod()}
          </Metric>
        </div>
        <div>
          <Subtitle>Previous {filter}</Subtitle>
          <Metric className="flex items-center gap-2 text-2xl">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            {habdlePrevPeriod()}
          </Metric>
        </div>
      </div>
      <LineChart
        data={chartData}
        categories={["Current Period", "Previous Period"]}
        index="date"
        // valueFormatter={dataFormatter}
        curveType={curveType as CurveType}
        colors={["fuchsia", "gray"]}
        showXAxis={showXAxis}
        showYAxis={showYAxis}
        showGridLines={showGridLines}
        showLegend={showLegend}
      />
    </Card>
  );
};
