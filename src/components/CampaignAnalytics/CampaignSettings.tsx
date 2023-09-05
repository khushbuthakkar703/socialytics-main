import { ReactNode } from "react";
import OptionsButton from "../DashboardV2/OptionsButton";

export interface CampaignSetting {
  id: string;
  label: string;
  data: number | string | ReactNode;
}

interface CampaignSettingsProps {
  settings?: CampaignSetting[];
}

export const CampaignSettings = ({ settings }: CampaignSettingsProps) => {
  return (
    <div className="mb-4 w-full rounded-xl bg-white px-4 pt-7 dark:border-2 dark:bg-inherit">
      <div className="mb-4 flex flex-row justify-between">
        <h5 className="text-xl font-semibold">Campaign Settings</h5>
        <OptionsButton />
      </div>
      <div>
        {settings &&
          settings.length > 0 &&
          settings.map((setting) => (
            <div
              key={setting.id}
              className="align-center mb-4 flex w-full flex-row justify-between text-sm"
            >
              <div className="pt-1 font-gotham font-light">{setting.label}</div>
              <div className=" font-semibold">{setting.data}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
