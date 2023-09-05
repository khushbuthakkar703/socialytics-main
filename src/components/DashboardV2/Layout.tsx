import SideNavigation from "@/components/SideNavigation";
import TopNavigation from "./TopNavigation";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

interface LayoutProps {
  children?: React.ReactNode;
  download?: boolean;
  title?: string;
}

const menu = [
  {
    title: "Dashboard",
    active: false,
  },
  {
    title: "My Wallet",
    active: false,
  },
  {
    title: "Transaction",
    active: false,
  },
  {
    title: "Analytics",
    active: false,
  },
  {
    title: "Reports",
    active: false,
  },
  {
    title: "Message",
    active: false,
  },
  {
    title: "Login",
    url: "/auth/login?test=test",
    active: false,
  },
];

export default function Layout({
  title = "Growth Dashboard",
  children,
  download,
}: LayoutProps) {
  const router = useRouter();
  const hideSidebar = router.pathname.includes("/login");
  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      <SideNavigation
        handleActive={() => {}}
        menu={menu}
        mode={currentTheme as string}
      />
      <div
        className={`ml-auto h-full min-h-screen w-full bg-[#F5F6F8] text-black transition-[0.5s] dark:bg-[#011B38] dark:text-white sm:w-[calc(100%-256px)]`}
      >
        <main className="">
          <div
            className={`bg-[#fff] p-4 px-16 shadow-[0px_4px_17px_rgba(0,0,0,0.13)] dark:bg-inherit`}
          >
            <TopNavigation
              profileData={null}
              title={title}
              download={download}
            />
          </div>
          <div className={`px-16  `}>{children}</div>
        </main>
      </div>
    </>
  );
}
