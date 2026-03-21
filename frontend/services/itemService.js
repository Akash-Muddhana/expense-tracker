
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
  );
  const item = await response.json();
  return mapServerToLocalItem(item);
};
 export const getSavedExpenses=async()=>{
  
  const response = await fetch(
    "http://localhost:3000/api/expense",
    {
      method: "GET",
    },
  );
  
  const items=await response.json()
  return items.map(mapServerToLocalItem)
  
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
  };
};
