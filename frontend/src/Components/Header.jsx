import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "";
export function Header({ isLoggedIn, setIsLoggedIn }) {

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API}/api/auth/logout`, // ✅ fixed
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get("/api/auth/auth-check", { // ✅ fixed
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
            <NavLink to="/">Home</NavLink>

            <NavLink to="/expenses">Your Expenses</NavLink>

        

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}