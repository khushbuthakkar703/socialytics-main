import Image from "next/image";
import { useState } from "react";
import Avatar from "./Avatar";
import Input from "./Input";
import lightIcon from "../../public/images/light-icon.svg";
import darkIcon from "../../public/images/dark-icon.svg";
import { useTheme } from "next-themes";
import { useStytchB2BClient, useStytchMember } from "@stytch/nextjs/dist/b2b";
import { StytchB2BHeadlessClient } from "@stytch/vanilla-js/dist/b2b";

interface profileType {
  profileData: any;
}

export default function TopNavigation(props: profileType) {
  const [isOpen, setIsOpen] = useState(true);
  const user = useStytchMember();

  const stytch = useStytchB2BClient() as StytchB2BHeadlessClient;

  const handleOption = (isOpen: boolean) => {
    setIsOpen(!isOpen);
  };

  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav className="sm:w-[calc(100% - 300px)] w-full rounded border-gray-200 pb-10 pt-2.5">
      <div className="container m-0 ml-auto flex flex-wrap items-center justify-between gap-x-10 gap-y-5 lg:flex-nowrap">
        <div className="flex w-full items-center">
          <a href="#" className="flex items-center">
            <span className="self-center whitespace-nowrap whitespace-pre-wrap text-[24px] font-semibold text-black dark:text-white sm:text-[36px]">
              Socialytics
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="ml-auto inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => handleOption(isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "flex" : "hidden md:flex"
          } w-full flex-wrap items-center justify-end sm:flex-nowrap`}
        >
          <div className="mb-5 w-full sm:mb-0">
            <Input
              placeholder="Search Data or some visualization"
              variant="search"
              width="w-full"
            />
          </div>
          <button
            title={`${currentTheme == "dark" ? "Dark Theme" : "Light Theme"}`}
            className="mx-3"
            // onClick={() => props?.settheam(!props?.darktheam)}
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {theme == "dark" ? (
              <Image
                src={darkIcon}
                className="rotate-[320deg] transform"
                alt=""
              />
            ) : (
              <Image src={lightIcon} alt="" />
            )}
          </button>
          <div className="mx-6 whitespace-nowrap font-bold leading-[15px] text-black dark:text-white">
            {user?.member?.name}
          </div>
          <Avatar
            onClick={() => {
              stytch.session.revoke();
              localStorage.removeItem("DASHBOARD_CLIENTS_ADDED");
            }}
            src={
              props?.profileData?.image ??
              "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=8"
            }
          />
        </div>
      </div>
    </nav>
  );
}
