import * as RadixTooltip from "@radix-ui/react-tooltip";

interface TooltipProps {
  label?: string;
  content?: string | JSX.Element;
  btn?: JSX.Element;
}

export const Tooltip = ({ label = "?", content = "", btn }: TooltipProps) => {
  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          {btn ?? (
            <button className="inline-flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-blue-500 pt-[6px] text-xs font-semibold text-blue-500">
              {label}
            </button>
          )}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className=" data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] dark:bg-[#011B38] dark:text-white"
            sideOffset={5}
          >
            {content}
            <RadixTooltip.Arrow className="fill-white" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
