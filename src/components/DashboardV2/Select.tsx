import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import * as SelectRadix from "@radix-ui/react-select";
import { Avatar } from "./Avatar";

interface SelectProps {
  placeholder?: string;
}

export const Select = ({ placeholder = "" }: SelectProps) => {
  return (
    <>
      <SelectRadix.Root>
        <SelectRadix.Trigger className="inline-flex h-[2.5rem] w-[16rem] items-center justify-between rounded-lg border border-[#D2D2D2] px-1 py-1 font-poppins text-xs font-semibold">
          <Avatar imageUrl="https://pbs.twimg.com/profile_images/1578653652717391875/CO3y0_aB_400x400.jpg" />

          <SelectRadix.Value placeholder={placeholder} />
          <SelectRadix.Icon className="pr-2 text-[#EC2A90]" />
        </SelectRadix.Trigger>
        <SelectRadix.Portal>
          <SelectRadix.Content>
            <SelectRadix.ScrollUpButton className="flex items-center justify-center  leading-none text-gray-700 dark:text-gray-300">
              <ChevronUpIcon />
            </SelectRadix.ScrollUpButton>
            <SelectRadix.Viewport className="rounded-lg bg-inherit p-2 shadow-lg dark:bg-gray-800">
              <SelectRadix.Group>
                {/* {["Apple", "Banana", "Blueberry", "Strawberry", "Grapes"].map(
                                (f, i) => (
                                    <SelectRadix.Item
                                    disabled={f === "Grapes"}
                                    key={`${f}-${i}`}
                                    value={f.toLowerCase()}
                                    className={
                                        "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 font-medium focus:bg-gray-100 dark:focus:bg-gray-900"
                                        // "radix-disabled:opacity-50",
                                        // "focus:outline-none select-none"
                                    }
                                    >
                                    <SelectRadix.ItemText>{f}</SelectRadix.ItemText>
                                    <SelectRadix.ItemIndicator className="absolute left-2 inline-flex items-center">
                                        <CheckIcon />
                                    </SelectRadix.ItemIndicator>
                                    </SelectRadix.Item>
                                )
                                )} */}
              </SelectRadix.Group>
            </SelectRadix.Viewport>
            <SelectRadix.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
              <ChevronDownIcon />
            </SelectRadix.ScrollDownButton>
          </SelectRadix.Content>
        </SelectRadix.Portal>
      </SelectRadix.Root>
    </>
  );
};
