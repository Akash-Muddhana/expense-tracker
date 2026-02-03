import { useState } from "react";
import { Header } from "../Components/Header";
import "./YourExpenses.css";
import { useNavigate } from "react-router-dom";

export function YourExpenses() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const usedProperly = expenses.reduce(
    (sum, item) => sum + Number(item.rating >= 3 ? item.amount : 0),
    0,
  );
  const wasted = expenses.reduce(
    (sum, item) => sum + Number(item.rating < 3 ? item.amount : 0),
    0,
  );

  function deleteExpense(index) {
    const updated = expenses.filter((_, i) => i !== index);

    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  }
  const navigate = useNavigate();

  return (
    <>
      <Header />
      
      <h2>Your Expenses</h2>
      <h3 className="totalExpenses">Your Total Expenses: ₹ {total}</h3>
      
      <h3 className="wasted">Wasted Money: ₹ {wasted}</h3>
      <h3 className="saved">Utilized Properly: ₹ {usedProperly}</h3>

      <div className="expenses-card">
        {expenses.length === 0 && <p>No expenses yet</p>}

        {expenses.map((e, i) => (
          <div key={i} className="expense-card">
            <h4>{e.title}</h4>
            <p>
              {e.category} - {e.subCategory}
            </p>
            <p>amount : {e.amount}</p>
            <p>Rating: {e.rating}</p>
            <p>Experience : {e.experience}</p>
            <p>Date: {new Date(e.date).toLocaleDateString()}</p>

            <button onClick={() => deleteExpense(i)} className="del-button">
              Delete
            </button>
            <button onClick={() => navigate(`/edit/${e.id}`)}>Edit</button>
          </div>
        ))}
      </div>
    </>
  );
}
