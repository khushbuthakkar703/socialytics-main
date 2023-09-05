// import Head from 'next/head'

// type LayoutProps = {
//   children: React.ReactNode;
//   title?: String;
//   darkTheme: any;
//   setDarkTheme: any;
// };
// export default function Layout({
//   children,
//   title = "This is the default title",
//   darkTheme,
// }: LayoutProps) {
//   return (
//     <div
//       className={`transition-[1s] ${darkTheme ? "bg-[#011B38] text-white" : "bg-white text-black"
//         }`}
//     >
//       <Head>
//         <title>{title}</title>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="initial-scale=1.0, width=device-width" />
//       </Head>
//       <div className='p-5'>
//         {children}
//       </div>
//     </div>
//   )
// }

import SideNavigation from "@/components/SideNavigation";
import TopNavigation from "../components/TopNavigation";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

interface LayoutProps {
  children?: React.ReactNode;
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

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const hideSidebar = router.pathname.includes("/login");
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      <SideNavigation
        handleActive={() => {}}
        menu={menu}
        mode={currentTheme as string}
      />
      <div
        className={`ml-auto w-full bg-[#fff] p-4 text-black transition-[0.5s] dark:bg-[#011B38] dark:text-white sm:w-[calc(100%-256px)]`}
      >
        <main className="px-2 sm:px-4">
          <div>
            <TopNavigation profileData={null} />
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
