import type { FC } from "react";
import { Link } from "react-router";

//import custom hook useLogout
import { useLogout } from "../hooks/auth/useLogout";

const SidebarMenu: FC = () => {
  //initialize useLogout
  const logout = useLogout();

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b font-bold">MAIN MENU</div>
      <div className="p-4">
        <div className="flex flex-col gap-2">
          <Link
            to="/admin/dashboard"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Users
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-left"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
