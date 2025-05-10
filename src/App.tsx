import type { FC } from "react";
import { Link } from "react-router";
import "./index.css";
import AppRoutes from "./routes";

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              to="/"
              className="text-xl font-bold hover:text-blue-400 transition-colors"
            >
              HOME
            </Link>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Toggle navigation"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-16 6h16"
                  />
                </svg>
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a
                  href="https://santrikoding.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white transition-colors"
                >
                  SANTRIKODING.COM
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="https://santrikoding.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 hover:text-white transition-colors"
            >
              SANTRIKODING.COM
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
