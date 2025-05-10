import type { FC } from "react";
import { Link } from "react-router";

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
            FULLSTACK DEVELOPER
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Belajar FullStack Developer dengan Golang dan React TypeScript di
            SantriKoding.com
          </p>
          <div className="h-px bg-gray-200" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium text-lg"
            >
              REGISTER
            </Link>
            <Link
              to="/login"
              className="inline-flex justify-center items-center px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors text-white font-medium text-lg"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
