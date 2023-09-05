import Search from "../../public/images/Search.svg";

type ButtonType = {
  variant?: string;
  placeholder?: string;
  width?: string;
};
export default function Input(props: ButtonType) {
  return (
    <div className={`relative ${props.width ? props.width : ""}`}>
      {props.variant === "search" && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            width="20"
            height="23"
            viewBox="0 0 20 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="9.68113"
              cy="10.7425"
              rx="8.49461"
              ry="9.35238"
              stroke="#011B38"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.5891 17.733L18.9195 21.3901"
              stroke="#011B38"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      <input
        type="text"
        placeholder={props.placeholder}
        className={`${
          props.variant === "search" ? "pl-10" : "pl-4"
        }  dark:bg-initial block w-full rounded-[24px] border border-gray-300 bg-white py-[14px] text-[16px]
         text-sm leading-5 text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
      />
    </div>
  );
}
