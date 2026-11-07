
import API from "./api";

const readResponse = async (response) => {
  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(`Invalid server response (HTTP ${response.status})`);
  }

  if (!response.ok) {
    const validationErrors = data.errors
      ?.map((error) => error.msg)
      .filter(Boolean)
      .join(", ");
    throw new Error(
      validationErrors || data.message || `Request failed (HTTP ${response.status})`,
    );
  }

  return data;
};

export const newUser = async (firstName, secondName, email, password) => {
  const response = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName.trim(),
      secondName: secondName.trim(),
      email: email.trim().toLowerCase(),
      password,
    }),
  });
  return readResponse(response);
};

export const login = async (email, password) => {
  const response = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
  });

  const data = await readResponse(response);
  if (typeof data.token !== "string" || !data.token) {
    throw new Error("Login response did not include an authentication token");
  }
  localStorage.setItem("token", data.token);

  return data;
};
