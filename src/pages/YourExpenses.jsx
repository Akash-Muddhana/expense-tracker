import { useState } from "react";
import { Header } from "../Components/Header";
import './YourExpenses.css'
export function YourExpenses() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  function deleteExpense(index) {
    const updated = expenses.filter((_, i) => i !== index);

    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  }

  return (
    <>
      <Header />
      <div className="expenses-card">
        <h2>Your Expenses</h2>

        {expenses.length === 0 && <p>No expenses yet</p>}

        {expenses.map((e, i) => (
          <div key={i} className="expense-card">
            <h4>{e.title}</h4>
            <p>
              {e.category} - {e.subCategory}
            </p>
            <p>Rating: {e.rating}</p>
            <p>{e.experience}</p>

            <button onClick={() => deleteExpense(i)} className="del-button">Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
