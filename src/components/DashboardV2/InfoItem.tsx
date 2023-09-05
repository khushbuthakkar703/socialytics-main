import { Avatar } from "./Avatar";

interface InfoItemProps {
  imageUrl?: string;
  title: string;
  data: string;
}

export const InfoItem = ({ imageUrl, title, data }: InfoItemProps) => {
  return (
    <div
      className={`inline-flex h-[2.5rem] w-auto max-w-md items-center justify-between rounded-lg border border-[#D2D2D2] xl:min-w-[17.5rem] ${
        imageUrl ? "px-1" : "p-2.5"
      } gap-x-1 font-poppins text-xs/[1.125rem] font-[600]`}
    >
      {imageUrl ? <Avatar imageUrl={imageUrl} className="xl:mr-3" /> : null}
      <span>{title}</span>
      <span className="text-[#EC2A90]">{data}</span>
    </div>
  );
};
