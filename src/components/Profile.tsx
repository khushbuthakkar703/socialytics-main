import Avatar from "./Avatar";
import { Cog8ToothIcon, ChartBarIcon } from "@heroicons/react/24/outline";

interface profileType {
  profileData: any;
}
export default function Profile(props: profileType) {
  return (
    <div className="block w-[247px] max-w-sm rounded-xl border border-gray-200 bg-white px-2 pt-5 shadow">
      <div className="flex items-center rounded-xl bg-[#F6FCFF] py-2.5 px-3">
        <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <div>
          <h5 className="ml-3.5 text-[18px] font-bold leading-[17px] text-gray-900 dark:text-white">
            {props?.profileData?.name}
          </h5>
          <h3 className="ml-3.5 text-[16px] leading-[17px] text-gray-400">
            {props?.profileData?.designation}
          </h3>
        </div>
      </div>
      <div className="p-3">
        <ul className="max-w-md">
          <li className="cursor-pointer p-3 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Cog8ToothIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[18px] text-sm font-medium leading-[26px] text-gray-900 dark:text-white">
                  Settings
                </p>
              </div>
            </div>
          </li>
          <li className="cursor-pointer p-3 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <ChartBarIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[18px] text-sm font-medium leading-[26px] text-gray-900 dark:text-white">
                  Reports
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
