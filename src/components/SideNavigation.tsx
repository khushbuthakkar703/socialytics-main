import { Dashboard } from "../menu/Dashboard";
import { Reports } from "../menu/Reports";
import { Message } from "../menu/Message";
import Link from "next/link";
import { ComponentShield } from "next-shield";
import { useAuth } from "@/lib/stytch/useAuth";

type MenuType = {
  handleActive: (index: number) => void;
  menu: any;
  mode: string;
};
const SideNavigation = (props: MenuType) => {
  const authData = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full transition-transform sm:translate-x-0">
      <div className={`h-full overflow-y-auto bg-[#011B38]`}>
        <div className="bg-[#011B38]  p-8">
          <img src="/images/logo.png" />
        </div>
        <ul className={`space-y-2 bg-[#011B38] text-white`}>
          <li>
            <Link
              href={"/dashboard-v2"}
              className={`flex items-center py-4 pl-14 text-[18px] text-base font-normal  hover:bg-[#3080FE] `}
            >
              <Dashboard fill="#FFF" />
              <span className={`ml-3`}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href={"/tweets"}
              className={`flex items-center py-4 pl-14 text-[18px] text-base font-normal  hover:bg-[#3080FE] `}
            >
              <Reports fill="#FFF" />
              <span className={`ml-3`}>Tweets</span>
            </Link>
          </li>
          <ComponentShield
            RBAC
            showForRole="SUPERADMIN"
            userRole={authData.role}
          >
            <li>
              <Link
                href={"/admin"}
                className={`flex items-center py-4 pl-14 text-[18px] text-base font-normal  hover:bg-[#3080FE] `}
              >
                <Message fill="#FFF" />
                <span className={`ml-3`}>Admin</span>
              </Link>
            </li>
          </ComponentShield>
        </ul>
      </div>
    </aside>
  );
};

export default SideNavigation;
