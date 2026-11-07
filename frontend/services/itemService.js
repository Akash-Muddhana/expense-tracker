import API from "./api";
const GUEST_ID_KEY = "guestId";

const getRequestHeaders = () => {
  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (
    !guestId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      guestId,
    )
  ) {
    guestId = crypto.randomUUID();
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }

  const headers = { "X-Guest-Id": guestId };
  const token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

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
  experience,
) => {
  const response = await fetch(`${API}/api/expense/NewExpense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getRequestHeaders(),
    },
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
    headers: getRequestHeaders(),
  });
  const data = await handleResponse(response);
  return data.map(mapServerToLocalItem);
};

export const editExpenseItem = async (id, updatedData) => {
  const response = await fetch(`${API}/api/expense/EditExpenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getRequestHeaders(),
    },
    body: JSON.stringify(updatedData),
  });
  const data = await handleResponse(response);
  return mapServerToLocalItem(data);
};

export const expenseItemById = async (id) => {
  const response = await fetch(`${API}/api/expense/YourExpenses/${id}`, {
    method: "GET",
    headers: getRequestHeaders(),
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
    headers: getRequestHeaders(),
  });

  await handleResponse(response);
};
