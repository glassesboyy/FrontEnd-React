// import FC from react
import type { FC, FormEvent } from "react";
import { useContext, useState } from "react";

//import hook useNavigate from react router
import { useNavigate } from "react-router";

//import custom  hook useLogin from hooks
import { useLogin } from "../../hooks/auth/useLogin";

//import js-cookie
import Cookies from "js-cookie";

//import context
import { AuthContext } from "../../context/AuthContext";

//interface for validation errors
interface ValidationErrors {
  [key: string]: string;
}

export const Login: FC = () => {
  //initialize navigate
  const navigate = useNavigate();

  //initialize useLogin
  const { mutate, isPending } = useLogin();

  //destruct auth context "setIsAuthenticated"
  const { setIsAuthenticated } = useContext(AuthContext)!;

  //define state
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //define state for errors
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Handle submit form
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // Call the login mutation
    mutate(
      {
        username,
        password,
      },
      {
        onSuccess: (data: any) => {
          //set token to cookie
          Cookies.set("token", data.data.token);

          //set user to cookie
          Cookies.set(
            "user",
            JSON.stringify({
              id: data.data.id,
              name: data.data.name,
              username: data.data.username,
              email: data.data.email,
            })
          );

          //set isAuthenticated to true
          setIsAuthenticated(true);

          // Redirect to dashboard page
          navigate("/admin/dashboard");
        },
        onError: (error: any) => {
          //set errors to state "errors"
          setErrors(error.response.data.errors);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg px-8 py-6">
          <h4 className="text-2xl font-bold text-center text-gray-800 mb-6">
            LOGIN
          </h4>
          <div className="border-b border-gray-200 mb-6"></div>
          {errors.Error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              Username or Password is incorrect
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
              />
              {errors.Username && (
                <div className="bg-red-100 text-red-700 p-2 rounded-lg mt-2">
                  {errors.Username}
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
              {errors.Password && (
                <div className="bg-red-100 text-red-700 p-2 rounded-lg mt-2">
                  {errors.Password}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "LOGIN"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
