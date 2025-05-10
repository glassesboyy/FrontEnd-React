import type { FC } from "react";
import { Link, useParams } from "react-router";
import SidebarMenu from "../../../components/SideBarMenu";
import { useUserById } from "../../../hooks/user/useUserById";

const UserDetail: FC = () => {
  // Get id from URL params
  const { id } = useParams();

  // Fetch user data using useUserById hook
  const { data: user, isLoading, isError, error } = useUserById(Number(id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/4 px-4">
          <SidebarMenu />
        </div>
        <div className="w-full lg:w-3/4 px-4">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-semibold">USER DETAIL</span>
              <Link
                to="/admin/users"
                className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors"
              >
                BACK
              </Link>
            </div>
            <div className="p-4">
              {isLoading && (
                <div className="text-center text-blue-500 p-4">Loading...</div>
              )}

              {isError && (
                <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
                  Error: {error.message}
                </div>
              )}

              {user && (
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="text-gray-600 text-sm">Full Name</h3>
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="text-gray-600 text-sm">Username</h3>
                    <p className="text-gray-900 font-medium">{user.username}</p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="text-gray-600 text-sm">Email Address</h3>
                    <p className="text-gray-900 font-medium">{user.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
