
 export const addNewExpense = async (
  title,
  amount,
  category,
  subCategory,
  rating,
  experience,
) => {
  const response = await fetch(
    "http://localhost:3000/api/expense/NewExpense",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount,
        category,
        subCategory,
        rating,
        experience,
      }),
    },
  );if (!response.ok) {
  throw new Error("Request failed");
}
  const item = await response.json();
  return mapServerToLocalItem(item);
};
 export const getSavedExpenses=async()=>{
  
  const response = await fetch(
    "http://localhost:3000/api/expense/YourExpenses",
    {
      method: "GET",
    },
  );
  if (!response.ok) {
  throw new Error("Request failed");
}
  const items=await response.json()
  return items.map(mapServerToLocalItem)
  
 }
export const editExpenseItem = async (id, updatedData) => {
  const response = await fetch(
    `http://localhost:3000/api/expense/EditExpenses/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    },
  );
if (!response.ok) {
  throw new Error("Request failed");
}
  const item = await response.json();
  return mapServerToLocalItem(item);
};
 export const expenseItemById=async(id)=>{
  const response = await fetch(
    `http://localhost:3000/api/expense/YourExpenses/${id}`,
    {
      method: "GET",
      
    },
    
  );if (!response.ok) {
  throw new Error("Request failed");
}
  const items=await response.json()
  return mapServerToLocalItem(items) 
 }
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
