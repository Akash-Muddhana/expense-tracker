
const API = import.meta.env.VITE_API_URL;

if (!API) {
  throw new Error("VITE_API_URL is not defined");
}
export const newUser = async (firstName, secondName, email, password) => {
  const response = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ firstName, secondName, email, password }),
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid server response");
  }
  if (!response.ok) {
    throw data;
  }

  return data;
};

export const login = async (email, password) => {
  const response = await fetch(`${API}/api/auth/login`, {
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
