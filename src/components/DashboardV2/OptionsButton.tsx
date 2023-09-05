import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Icon } from "@tremor/react";
import { ReactNode } from "react";

interface OptionsButtonProps {
  color?: string;
}

export default function OptionsButton({
  color = "#D1D8DE",
}: OptionsButtonProps) {
  return (
    <button>
      <Icon icon={EllipsisVerticalIcon} variant="simple" color="gray" />
    </button>
  );
}
