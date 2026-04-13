const API = import.meta.env.VITE_API_URL;
if (!API) throw new Error("Missing API URL");
const handleResponse = async (response) => {
  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    console.error("Backend error:", data);
    throw new Error(data.message || "Request failed");
  }

  return data;
};
export const addNewExpense = async (
  title,
  amount,
  category,
  subCategory,
  rating,
  email,
  experience,
) => {
  const response = await fetch(`${API}/api/expense/NewExpense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      title,
      amount,
      category,
      subCategory,
      rating,
      experience,
    }),
  });
  const data = await handleResponse(response);
  return mapServerToLocalItem(data);
};

export const getSavedExpenses = async () => {
  const response = await fetch(`${API}/api/expense/YourExpenses`, {
    method: "GET",
    credentials: "include",
  });
  const data = await handleResponse(response);
  return data.map(mapServerToLocalItem);
};

export const editExpenseItem = async (id, updatedData) => {
  const response = await fetch(`${API}/api/expense/EditExpenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(updatedData),
  });
  const data = await handleResponse(response);
  return mapServerToLocalItem(data);
};

export const expenseItemById = async (id) => {
  const response = await fetch(`${API}/api/expense/YourExpenses/${id}`, {
    method: "GET",
    credentials: "include",
  });

  const data = await handleResponse(response);
  return mapServerToLocalItem(data);
};

const mapServerToLocalItem = (serveritem) => {
  if (!serveritem) throw new Error("Invalid server data");
  return {
    id: serveritem._id,
    title: serveritem.title,
    amount: serveritem.amount,
    category: serveritem.category,
    subCategory: serveritem.subCategory,
    rating: serveritem.rating,
    experience: serveritem.experience,

    date: serveritem.date,
  };
};
export const deleteExpenseItem = async (id) => {
  const response = await fetch(`${API}/api/expense/DeleteExpense/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  await handleResponse(response);
};
