type ButtonType = {
  variant?: string;
  title?: string;
};
export default function Button(props: ButtonType) {
  return (
    <button
      className={`m-2 h-[2.875rem] w-[5.875rem] rounded-xl py-2 px-4 font-bold ${
        props.variant === "primary" &&
        "bg-[#3080FE] text-white hover:bg-blue-700"
      } ${
        props.variant === "warning" &&
        "bg-[#EC2A90] text-white hover:bg-[#ED248F]"
      } ${
        props.variant === "primary-border" &&
        "border-[1px] border-[#3080FE] bg-transparent text-[#3080FE] hover:border-blue-700"
      } ${
        props.variant === "white" &&
        "border-[1px] border-[#3080FE] bg-white text-[#3080FE] hover:border-blue-700"
      } ${props.variant === "default" && "bg-[#B3B3B3] text-white"} ${
        props.variant === "default-border" &&
        "border-[1px] border-[#B3B3B3] bg-transparent text-[#B3B3B3]"
      } ${props.variant === "link" && "text-[#3080FE]"}`}
    >
      {props.title}
    </button>
  );
}
