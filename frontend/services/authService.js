export const newUser = async (email, password) => {
  const response = await fetch("http://localhost:3000/api/auth/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error("Request failed");
  }
  const user = await response.json();
  console.log(user);
  return mapServerToLocalItem(user);
};

const mapServerToLocalItem = (serveritem) => {
  return {
    id: serveritem._id,
    email: serveritem.email,
   
  };
};
