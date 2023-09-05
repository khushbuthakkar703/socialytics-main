import Dropdown from "./Dropdown";

interface ReqSizeDropdownProps {
  handleSize: (size: { value: number; label: string }) => void;
  availableSizes?: number[];
}

export const ReqSizeDropdown = ({
  handleSize,
  availableSizes = [10, 25, 50],
}: ReqSizeDropdownProps) => {
  const labelSize = (size: number) => `Show ${size} Results`;
  const getSizeOption = (size: number) => ({
    value: size,
    label: labelSize(size),
  });
  //   const sizeOptions = [getSizeOption(10), getSizeOption(25), getSizeOption(50)];
  const sizeOptions = availableSizes.map((size) => getSizeOption(size));

  return (
    <>
      <Dropdown
        data={sizeOptions}
        handleSelected={handleSize}
        defaultSelected={sizeOptions[0]}
        showSelected={true}
        itemKey="value"
        valueKey="label"
      />
    </>
  );
};
