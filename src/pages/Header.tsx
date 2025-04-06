import { Link, Outlet } from "react-router-dom";
import "../index.css";

const Header = () => {
  return (
    <>
      <header className="bg-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <div className="flex gap-4">
            <Link
              to="/"
              className="px-4 py-2 rounded-md text-lg font-semibold text-blue-600 hover:bg-blue-100 transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 rounded-md text-lg font-semibold text-blue-600 hover:bg-blue-100 transition"
            >
              About
            </Link>
            <Link
              to="/master_maintenance"
              className="px-4 py-2 rounded-md text-lg font-semibold text-blue-600 hover:bg-blue-100 transition"
            >
              masterMaintenance
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
