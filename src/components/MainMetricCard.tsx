import { LittleChart } from "./LittleChart";
import Expand from "../../public/images/Expand.svg";
import Skeleton from "react-loading-skeleton";
import { useMemo } from "react";
import { nFormatter } from "@/lib/stytch/utils";

type ChartProps = {
  title?: string;
  data?: Record<string, number>;
  dark?: boolean;
  darkTheme?: string;
  subtitle?: string;
  width?: string;
  height?: string;
  isLoading?: boolean;
  compareTo?: number;
  promotedText?: string;
  numberType: "last" | "sum";
};

export default function MainMetricCard({
  title,
  promotedText = "",
  subtitle = "Followers For The Last 30 Days",
  width = "84",
  height = "65",
  isLoading = false,
  data,
  compareTo,
  numberType = "last",
}: ChartProps) {
  const { value, changeRate, down } = useMemo(() => {
    if (!data) return { value: "", changeRate: "" };

    const first = data[Object.keys(data)[0]];
    const last = data[Object.keys(data)[Object.keys(data).length - 1]];

    let value;
    let numValue;
    switch (numberType) {
      case "last":
        numValue = data ? last : 0;
        value = nFormatter(numValue);
        break;
      case "sum":
        numValue = data ? Object.values(data).reduce((a, b) => a + b, 0) : 0;
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

  return (
    <div
      className={`dark:filter-[drop-shadow(0px 10px 10px rgba(1, 27, 56, 0.28))] overflow-hidden rounded-xl border border-b-[8px] border-gray-300 border-b-blue-500 p-6  text-black shadow-[md] drop-shadow-2xl transition-[1s] hover:translate-y-[-16px] hover:border-b-[1px] hover:border-b-gray-300  hover:shadow-xl dark:bg-[#011B38] dark:text-white`}
    >
      <div className="flex items-center justify-between gap-6 border-b pb-4">
        <p className="font-semibold">{title}</p>
        <button>
          <img
            src={Expand.src}
            style={{
              filter:
                "invert(43%) sepia(39%) saturate(214%) hue-rotate(172deg) brightness(95%) contrast(86%)",
            }}
          />
        </button>
      </div>

      <div className="space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-3 py-7">
          {isLoading ? (
            <Skeleton containerClassName="flex-1" count={1} height={50} />
          ) : (
            <>
              <div className="mt-4 flex items-center gap-3">
                <div>
                  <p
                    className={`text-5xl font-extrabold ${
                      (value?.length ?? 0) > 3 ? "text-[40px]" : "text-[52px]"
                    }`}
                  >
                    {value}
                  </p>
                  <p className={`text-sm font-extrabold`}>{[promotedText]}</p>
                </div>

                {typeof changeRate != "boolean" && (
                  <span
                    className={`block w-[max-content] rounded-md px-2 py-1 text-center text-[13px] font-medium ${
                      down
                        ? "bg-[#F95A5A20] text-[#F95A5A]"
                        : "bg-green-100 text-green-500"
                    }`}
                  >
                    {changeRate}
                  </span>
                )}
              </div>
              <LittleChart
                data={data ?? {}}
                down={down}
                width={width}
                height={height}
              />
            </>
          )}
        </div>
        <p className="font-medium text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
