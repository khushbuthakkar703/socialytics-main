import Image from "next/image";
import lightIcon from "../../../public/images/light-icon.svg";
import darkIcon from "../../../public/images/dark-icon.svg";

interface ThemeButtonProps {
  currentTheme?: string;
  theme?: string;
  setTheme: (theme: string) => void;
  className?: string;
}

export const ThemeButton = ({
  currentTheme,
  theme,
  setTheme,
  className = "",
}: ThemeButtonProps) => {
  return (
    <button
      title={`${currentTheme == "dark" ? "Dark Theme" : "Light Theme"}`}
      className={`mx-3 ${className}`}
      // onClick={() => props?.settheam(!props?.darktheam)}
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      {theme == "dark" ? (
        <Image src={darkIcon} className="rotate-[320deg] transform" alt="" />
      ) : (
        <Image src={lightIcon} alt="" />
      )}
    </button>
  );
};
