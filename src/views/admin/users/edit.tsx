//import FC from react
import type { FC, FormEvent } from "react";

//import useState and useEffect from react
import { useEffect, useState } from "react";

//import SidebarMenu
import SidebarMenu from "../../../components/SideBarMenu";

//import useNavigate, useParams and Link from react-router
import { Link, useNavigate, useParams } from "react-router";

//import custom hook useUserByById
import { useUserById } from "../../../hooks/user/useUserById";

//import custom hook useUserUpdate
import { useUserUpdate } from "../../../hooks/user/useUserUpdate";

//interface for validation errors
interface ValidationErrors {
  [key: string]: string;
}

const UserEdit: FC = () => {
  //initialize useNavigate
  const navigate = useNavigate();

  //initialize useParams
  const { id } = useParams();

  //define state user
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //define state errors
  const [errors, setErrors] = useState<ValidationErrors>({});

  // inisialisasi useUSerById
  const { data: user } = useUserById(Number(id));

  //set data user to state
  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  // Inisialisasi useUserUpdate
  const { mutate, isPending } = useUserUpdate();

  // Handle submit form
  const updateUser = async (e: FormEvent) => {
    e.preventDefault();

    // Call the user update mutation
    mutate(
      {
        id: Number(id),
        data: {
          name,
          username,
          email,
          password,
        },
      },
      {
        onSuccess: () => {
          // Redirect to users index
          navigate("/admin/users");
        },
        onError: (error: any) => {
          //set errors to state "errors"
          setErrors(error.response.data.errors);
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/4 px-4">
          <SidebarMenu />
        </div>
        <div className="w-full lg:w-3/4 px-4">
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b">
              <h2 className="font-semibold">EDIT USER</h2>
            </div>
            <div className="p-6">
              <form onSubmit={updateUser}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full Name"
                  />
                  {errors.Name && (
                    <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded-lg">
                      {errors.Name}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Username"
                  />
                  {errors.Username && (
                    <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded-lg">
                      {errors.Username}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email Address"
                  />
                  {errors.Email && (
                    <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded-lg">
                      {errors.Email}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                  />
                  {errors.Password && (
                    <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded-lg">
                      {errors.Password}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 mr-2"
                  disabled={isPending}
                >
                  {isPending ? "Updating..." : "Update"}
                </button>

                <Link
                  to="/admin/users"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
