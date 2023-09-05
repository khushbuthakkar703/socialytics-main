import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
type DropdownType = {
  data?: object[];
  title?: string | JSX.Element;
  bgcolor?: string;
  handleSelected: (value: any) => void;
  textcolor?: string;
  borderNone?: boolean;
  darkTheme?: string;
  itemKey?: string;
  valueKey?: string;
  showSelected?: boolean;
  defaultSelected?: any;
  icnButton?: JSX.Element;
  className?: string;
};
export default function Dropdown({
  data,
  title,
  handleSelected,
  itemKey,
  valueKey,
  defaultSelected = {},
  showSelected = false,
  icnButton,
  className,
}: DropdownType) {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<any>(defaultSelected);
  const handleDropdown = () => {
    setActive(!active);
  };
  const handleSelect = (value: any) => {
    if (handleSelected) handleSelected(value);
    setSelected(value);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          onClick={handleDropdown}
          className={
            className ??
            `inline-flex items-center justify-center rounded-xl bg-[#D6EFFF] px-4 py-2 text-sm font-bold text-[#3080FE] shadow-sm dark:text-[#011B38]`
          }
        >
          {showSelected ? (valueKey ? selected[valueKey] : selected) : title}
          {icnButton ? (
            icnButton
          ) : active ? (
            <ChevronRightIcon
              className="-mr-1 ml-2 h-4 w-4"
              aria-hidden="true"
            />
          ) : (
            <ChevronDownIcon
              className="-mr-1 ml-2 h-4 w-4"
              aria-hidden="true"
            />
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-[100] mt-2 w-[9.188rem] origin-top-right rounded-xl bg-[#D6EFFF] shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="h-full py-1">
            {data?.map((element: any, index: number) => (
              <Menu.Item key={itemKey ? element[itemKey] : index}>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={(e) => handleSelect(element)}
                    className={classNames(
                      active ? "bg-gray-100 text-[#3080FE]" : "text-[#3080FE]",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {valueKey ? element[valueKey] : element?.value}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
