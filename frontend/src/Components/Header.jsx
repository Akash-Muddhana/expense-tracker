import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import API from "../../services/api";
export function Header({ isLoggedIn, setIsLoggedIn }) {
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const authHeaders = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    try {
      await axios.post(`${API}/api/auth/logout`, {}, authHeaders);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const authHeaders = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    axios
      .get(`${API}/api/auth/auth-check`, authHeaders)
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, [setIsLoggedIn]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-6xl items-center justify-center gap-1 px-3 sm:justify-between sm:px-6">
        <NavLink
          to="/"
          className="mr-auto hidden items-center gap-2 font-bold tracking-tight text-slate-800 sm:flex"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white shadow-md shadow-indigo-200">
            ₹
          </span>
          <span>Spendwise</span>
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `rounded-xl px-3 py-2 text-sm font-semibold transition-colors sm:px-4 ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            Expenses
          </NavLink>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-700 sm:px-4"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:px-4"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md"
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
