import { NavLink } from "react-router-dom";
import {  useEffect } from "react";
import axios from "axios";
export function Header({isLoggedIn, setIsLoggedIn}) {
  
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/Logout",
        {},
        { withCredentials: true },
      );
      setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/auth-check", {
        withCredentials: true,
      })
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, []);
  return (
    <header className="sticky top-0 z-50 bg-gradient-header shadow-lg">
      <nav className="h-14 flex items-center justify-center gap-8">
        {isLoggedIn ? (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold text-sm sm:text-base px-3 py-2 rounded-lg border-b-2 border-blue-400 no-underline transition-all"
                  : "text-gray-100 font-semibold text-sm sm:text-base px-3 py-2 rounded-lg no-underline hover:bg-blue-500/20 hover:-translate-y-0.5 transition-all"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/EditExpenses"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold text-sm sm:text-base px-3 py-2 rounded-lg border-b-2 border-blue-400 no-underline transition-all"
                  : "text-gray-100 font-semibold text-sm sm:text-base px-3 py-2 rounded-lg no-underline hover:bg-blue-500/20 hover:-translate-y-0.5 transition-all"
              }
            >
              Edit Expenses
            </NavLink>
            <NavLink
              to="/YourExpenses"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold text-sm sm:text-base px-3 py-2 rounded-lg border-b-2 border-blue-400 no-underline transition-all"
                  : "text-gray-100 font-semibold text-sm sm:text-base px-3 py-2 rounded-lg no-underline hover:bg-blue-500/20 hover:-translate-y-0.5 transition-all"
              }
            >
              Your Expenses
            </NavLink>
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1.5 bg-red-500 text-white text-sm rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
              aria-label="logout-button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/Login"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold text-sm sm:text-base px-3 py-2 rounded-lg border-b-2 border-blue-400 no-underline transition-all"
                  : "text-gray-100 font-semibold text-sm sm:text-base px-3 py-2 rounded-lg no-underline hover:bg-blue-500/20 hover:-translate-y-0.5 transition-all"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-bold text-sm sm:text-base px-3 py-2 rounded-lg border-b-2 border-blue-400 no-underline transition-all"
                  : "text-gray-100 font-semibold text-sm sm:text-base px-3 py-2 rounded-lg no-underline hover:bg-blue-500/20 hover:-translate-y-0.5 transition-all"
              }
            >
              signup
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
