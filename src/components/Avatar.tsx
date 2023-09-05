type ButtonType = {
  src?: string;
  onClick?: any;
};
export default function Avatar(props: ButtonType) {
  return (
    <img
      onClick={props.onClick}
      className="inline-block h-12 w-12 cursor-pointer rounded-full ring-2 ring-white"
      src={props.src}
      alt=""
    />
  );
}
