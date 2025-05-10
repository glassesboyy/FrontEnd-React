// import FC from react
import type { FC, FormEvent } from "react";
import { useState } from "react";

//import hook useNavigate from react router
import { useNavigate } from "react-router";

//import custom  hook useRegister from hooks
import { useRegister } from "../../hooks/auth/useRegister";

//interface for validation errors
interface ValidationErrors {
  [key: string]: string;
}

const Register: FC = () => {
  //initialize navigate
  const navigate = useNavigate();

  //initialize useRegister
  const { mutate, isPending } = useRegister();

  //define state
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //define state for errors
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Handle submit form
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    // Call the register mutation
    mutate(
      {
        name,
        username,
        email,
        password,
      },
      {
        onSuccess: () => {
          // Redirect to login page
          navigate("/login");
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
      <div className="w-full max-w-2xl">
        <div className="bg-white shadow-md rounded-lg px-8 py-6">
          <h4 className="text-2xl font-bold text-center text-gray-800 mb-6">
            REGISTER
          </h4>
          <div className="border-b border-gray-200 mb-6"></div>
          <form onSubmit={handleRegister}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Full Name"
                />
                {errors.Name && (
                  <div className="bg-red-100 text-red-700 p-2 rounded-lg mt-2">
                    {errors.Name}
                  </div>
                )}
              </div>
              <div>
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
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email Address"
                />
                {errors.Email && (
                  <div className="bg-red-100 text-red-700 p-2 rounded-lg mt-2">
                    {errors.Email}
                  </div>
                )}
              </div>
              <div>
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
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
                disabled={isPending}
              >
                {isPending ? "Loading..." : "REGISTER"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
