import { DatePicker } from "./DatePicker";
import { InfoItem } from "./InfoItem";
import { Select } from "./Select";

export const SectionHeader = () => {
  return (
    <div className="grid w-full grid-cols-1 items-center justify-between gap-4 2xl:grid-cols-2">
      <div className="inline-flex w-full items-center justify-between gap-x-2 2xl:justify-start">
        <Select placeholder="Twitter - @VenomFoundation" />
        <DatePicker />
      </div>
      <div className="inline-flex items-center justify-between gap-x-2 2xl:justify-end ">
        <InfoItem title={"Number of active Venom accounts:"} data={"23,546"} />
        <InfoItem
          title={"Your Social Success Manager:"}
          data={"Christopher Nung"}
          imageUrl="https://pbs.twimg.com/profile_images/1578653652717391875/CO3y0_aB_400x400.jpg"
        />
      </div>
    </div>
  );
};
