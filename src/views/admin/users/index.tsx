//import FC from react
import type { FC } from "react";

//import SidebarMenu
import SidebarMenu from "../../../components/SideBarMenu";

//import Link from react-route
import { Link } from "react-router";

//import custom hook useUsers and interface User
import type { User } from "../../../hooks/user/useUsers";
import { useUsers } from "../../../hooks/user/useUsers";

//import custom hook useUserDelete
import { useUserDelete } from "../../../hooks/user/useUserDelete";

//import query client TanStack Query
import { useQueryClient } from "@tanstack/react-query";

const UsersIndex: FC = () => {
  // get users from useUsers
  const { data: users, isLoading, isError, error } = useUsers();

  //initialize useQueryClient
  const queryClient = useQueryClient();

  //initialize useUserDelete
  const { mutate, isPending } = useUserDelete();

  //handle delete user
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      //call useUserDelete
      mutate(id, {
        onSuccess: () => {
          //refetch data
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/4 px-4">
          <SidebarMenu />
        </div>
        <div className="w-full lg:w-3/4 px-4">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-semibold">USERS</span>
              <Link
                to="/admin/users/create"
                className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
              >
                ADD USER
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

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Full Name</th>
                      <th className="px-4 py-2 text-left">Username</th>
                      <th className="px-4 py-2 text-left">Email Address</th>
                      <th className="px-4 py-2 text-center w-1/5">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user: User) => (
                      <tr key={user.id} className="border-b">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.username}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2 text-center">
                          <Link
                            to={`/admin/users/detail/${user.id}`}
                            className="inline-block px-3 py-1 bg-gray-500 text-white text-sm rounded-lg hover:bg-gray-600 transition-colors mr-2"
                          >
                            VIEW
                          </Link>
                          <Link
                            to={`/admin/users/edit/${user.id}`}
                            className="inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors mr-2"
                          >
                            EDIT
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            disabled={isPending}
                            className="inline-block px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors disabled:bg-red-300"
                          >
                            {isPending ? "DELETING..." : "DELETE"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersIndex;
