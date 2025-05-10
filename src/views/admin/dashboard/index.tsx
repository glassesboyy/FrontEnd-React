import type { FC } from "react";
import SidebarMenu from "../../../components/SideBarMenu";
import { useAuthUser } from "../../../hooks/auth/useAuthUser";

const Dashboard: FC = () => {
  const user = useAuthUser();
  console.log("Dashboard user:", user); // Debug log

  return (
    <div className="container mx-auto px-4 my-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/4 px-4">
          <SidebarMenu />
        </div>
        <div className="w-full md:w-3/4 px-4">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b font-bold">DASHBOARD</div>
            <div className="px-6 py-4">
              Selamat Datang,
              {user ? <strong> {user.name}</strong> : <span> Tamu</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
