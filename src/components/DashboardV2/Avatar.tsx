import * as AvatarRadix from "@radix-ui/react-avatar";

interface AvatarProps {
  imageUrl?: string;
  fallback?: string;
  className?: string;
  svgIcon?: string;
  maxHeight?: number | string;
  maxWidth?: number | string;
}

export const Avatar = ({
  imageUrl,
  fallback = "Avatar",
  className = "",
  svgIcon,
  maxHeight = "1.875rem",
  maxWidth = "1.875rem",
}: AvatarProps) => {
  return (
    <AvatarRadix.Root
      className={`relative inline-flex h-auto overflow-hidden rounded-lg ${className}`}
      style={{ maxWidth: maxHeight, maxHeight: maxWidth }}
    >
      {imageUrl ? (
        <AvatarRadix.Image src={imageUrl} className={`object-cover`} />
      ) : svgIcon ? (
        <AvatarRadix.Image src={svgIcon} className="p-1" />
      ) : null}
      <AvatarRadix.Fallback>{fallback[0].toUpperCase()}</AvatarRadix.Fallback>
    </AvatarRadix.Root>
  );
};
