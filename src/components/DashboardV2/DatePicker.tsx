import { DateRangePicker } from "@tremor/react";

export const DatePicker = () => {
  return (
    <>
      <DateRangePicker
        placeholder="Select dates"
        dropdownPlaceholder="Default ranges"
        className="w-[16.25rem]"
        maxDate={new Date(Date.now())}
      />
    </>
  );
};
