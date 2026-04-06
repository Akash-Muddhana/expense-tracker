// ✅ SIGNUP
const API = import.meta.env.VITE_API_URL || "";

export const newUser = async (firstName, secondName, email, password) => {
  const response = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ firstName, secondName, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

// ✅ LOGIN
export const login = async (email, password) => {
  const response = await fetch(`${API}/api/auth/login`, { // ✅ lowercase
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};
