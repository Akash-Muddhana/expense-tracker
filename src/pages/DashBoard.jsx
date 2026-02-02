import "./DashBoard.css";
import { StatusGauge } from "./StatusGauge";
import { Header } from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export function DashBoard() {
  const navigate = useNavigate();
 const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });
    const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <>
      <Header />
      <main className="DashBoard-main">
        <div className="expense-button">
          <button
            onClick={() => navigate("/NewExpense")}
            className="new-expense-button"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
          <h4 className="new-expense-text">Add new expense</h4>
        </div>

        <StatusGauge value={80} />
        {expenses.length === 0 && <p>No expenses yet</p>}
         <h3 className="totalExpenses">Your Total Expenses: {total}</h3>
        
      </main>
    </>
  );
}
