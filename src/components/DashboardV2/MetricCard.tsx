import { Card, Flex, Icon, Metric, Text } from "@tremor/react";
import { Avatar } from "./Avatar";
import { LittleChart } from "../LittleChart";
import MinichartTable from "./MinichartTable";
import { useMemo, useState } from "react";
import { nFormatter } from "@/lib/stytch/utils";
import Skeleton from "react-loading-skeleton";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

interface MetricCardProps {
  title?: string;
  avatarImg?: string;
  avatarClassName?: string;
  total?: string;
  compareTotal?: string;
  positiveTotal?: boolean;
  positiveComparisson?: boolean;
  subtitle?: string;
  data?: any;
  numberType?: "last" | "sum";
  compareTo?: number;
  isLoading?: boolean;
  clientSummary?: any;
}

export const MetricCard = ({
  title,
  avatarImg,
  avatarClassName,
  total,
  compareTotal,
  positiveTotal = true,
  positiveComparisson = true,
  compareTo,
  subtitle,
  numberType = "last",
  data,
  isLoading,
}: any) => {
  const [showTable, setShowTable] = useState(false);
  const { value, changeRate, down } = useMemo(() => {
    if (!data) return { value: "", changeRate: "" };

    const first = data[Object.keys(data)[0]];
    const last = data[Object.keys(data)[Object.keys(data).length - 1]];

    let value;
    let numValue: any;
    switch (numberType) {
      case "last":
        numValue = data ? last : 0;
        value = nFormatter(numValue);
        break;
      case "sum":
        numValue = data
          ? Object.values(data).reduce((a: any, b: any) => a + b, 0)
          : 0;
        value = nFormatter(numValue);
        break;
    }

    let changeRate;
    if (compareTo == 0) changeRate = false;
    else if (compareTo) {
      changeRate = ((numValue - compareTo) / compareTo) * 100;
    } else {
      changeRate = ((last - first) / first) * 100;
    }

    const down = changeRate < 0;

    return {
      value,
      changeRate:
        typeof changeRate == "number"
          ? `${changeRate.toFixed(1)}%`
          : changeRate,
      down,
    };
  }, [data]);

  const getPercentText = (text: string, withArrow = false) => {
    let arrow = "";
    const positiveSign = withArrow ? positiveComparisson : positiveTotal;
    if (withArrow) {
      if (positiveComparisson) arrow = "⬆";
      else arrow = "⬇";
    }

    return `${arrow}${positiveSign ? "+" : "-"}${text}%`;
  };
  const handleShowTable = () => setShowTable(!showTable);
  return (
    <>
      {showTable && (
        <MinichartTable data={title} handleModal={handleShowTable} />
      )}
      <Card
        className="max-h-[11.5rem] shadow-[3px_4px_10px_rgba(0,0,0,0.05)] dark:bg-inherit dark:text-white cursor-pointer
        hover:bg-blue-950 hover:!text-white transition-all duration-200 ease-in-out dark:hover:bg-blue-950 dark:hover:text-white
        "
        onClick={handleShowTable}
      >
        <Flex alignItems="center">
          <Text className="font-[600]  dark:text-white text-inherit">
            {title}
          </Text>
          <Avatar
            svgIcon={avatarImg}
            className={`max-h-[2.5rem] min-h-[2.5rem] min-w-[2.5rem] max-w-[2.5rem] justify-center p-1 ${avatarClassName}`}
            maxWidth={"2.5rem"}
            maxHeight={"2.5rem"}
          />
        </Flex>

        {isLoading && <Skeleton className="h-[75px]" />}
        {!isLoading && (
          <>
            <Metric className="mt-2 lg:mt-0 text-inherit">
              {value} <Icon icon={QuestionMarkCircleIcon} />
            </Metric>

            <div className="align-center mt-2 flex ">
              <Text
                className={`max-w-[66px] basis-1/4 font-semibold 
              ${
                down ? " text-[#F95A5A]" : " text-green-500"
              } text-xs flex-auto`}
              >
                {typeof changeRate != "boolean" &&
                  `${changeRate} ${changeRate.includes("-") ? "⬇" : "⬆"}`}
              </Text>
              <Text className="mx-1 w-fit basis-auto dark:text-white text-xs flex-2 ">
                {subtitle}
              </Text>
              {/* <Chart
            showLegend={false}
            showXAxis={false}
            showYAxis={false}
            showGridLines={false}
            className="max-h-[1.875rem] max-w-[6.25rem] p-0"
          /> */}
              {data && (
                <div className="relative mb-4 mt-4 block  basis-full justify-center md:basis-1/4 lg:mb-0 lg:mt-0 w-auto flex-1 ">
                  <LittleChart
                    data={data ?? {}}
                    chartType="line"
                    down={down}
                    width="null"
                    height="30"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </Card>
    </>
  );
};
