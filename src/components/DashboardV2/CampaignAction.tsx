import { Icon } from "@tremor/react";
import { PlayIcon, PauseIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

interface CampaignActionProps {
  type: "play" | "pause" | "cancel";
  className?: string;
}

export const CampaignAction = ({ type, className }: CampaignActionProps) => {
  const [icon, setIcon] = useState<any>(null);
  const getIcon = (type: string) => {
    switch (type) {
      case "play":
        return PlayIcon;
      case "pause":
        return PauseIcon;
      case "cancel":
        return XMarkIcon;
      default:
        return XMarkIcon;
    }
  };

  useEffect(() => {
    setIcon(getIcon(type));
  }, [type]);

  return (
    <>
      {icon && (
        <button>
          <Icon
            icon={icon}
            className={`rounded-2xl bg-[#85878E] text-white ${className}`}
            variant="simple"
            size="xs"
          />
        </button>
      )}
    </>
  );
};
