export const newUser = async (firstName,secondName,email, password) => {
  const response = await fetch("http://localhost:3000/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({firstName,secondName, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data; 
  }

  return data;
};
export const login= async (email,password) => {
  const response = await fetch("http://localhost:3000/api/auth/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({email,password}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data; 
  }

  return data;
};
