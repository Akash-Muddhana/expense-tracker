import { useState } from "react";
import { Header } from "../Components/Header";
import "./YourExpenses.css";
import { useNavigate } from "react-router-dom";

export function YourExpenses() {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });

  function deleteExpense(index) {
    const updated = expenses.filter((_, i) => i !== index);

    setExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  }
  const navigate = useNavigate();

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
            <p>amount : {e.amount}</p>
            <p>Rating: {e.rating}</p>
            <p>Experience : {e.experience}</p>

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
