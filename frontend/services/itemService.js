export const addNewExpense = async (
  title,
  amount,
  category,
  subCategory,
  rating,
  email,
  experience,
) => {
  const response = await fetch("http://localhost:3000/api/expense/NewExpense", {
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
if (!response.ok) {
  const errorData = await response.json();
  console.error("Backend error:", errorData);
  throw new Error(errorData.message || "Request failed");
}
  const item = await response.json();
  return mapServerToLocalItem(item);
};
export const getSavedExpenses = async () => {
  const response = await fetch(
    "http://localhost:3000/api/expense/YourExpenses",
    {
      method: "GET",
      credentials: "include",
    },
  );
 if (!response.ok) {
  const errorData = await response.json();
  console.error("Backend error:", errorData);
  throw new Error(errorData.message || "Request failed");
}
  const items = await response.json();
  return items.map(mapServerToLocalItem);
};
export const editExpenseItem = async (id, updatedData) => {
  const response = await fetch(
    `http://localhost:3000/api/expense/EditExpenses/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedData),
    },
  );
if (!response.ok) {
  const errorData = await response.json();
  console.error("Backend error:", errorData);
  throw new Error(errorData.message || "Request failed");
}
  const item = await response.json();
  return mapServerToLocalItem(item);
};
export const expenseItemById = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/expense/YourExpenses/${id}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
if (!response.ok) {
  const errorData = await response.json();
  console.error("Backend error:", errorData);
  throw new Error(errorData.message || "Request failed");
}
  const items = await response.json();
  return mapServerToLocalItem(items);
};

const mapServerToLocalItem = (serveritem) => {
  console.log(serveritem);
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
