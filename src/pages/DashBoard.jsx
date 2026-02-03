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
  const now = new Date();

  
 
  
  const currentMonthExpenses = expenses.filter((item) => {
    const d = new Date(item.date);

    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
  const monthlyTotal = currentMonthExpenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0,
  );

  const monthlyUsedProperly = currentMonthExpenses.reduce(
    (sum, item) => sum + Number(item.rating >= 3 ? item.amount : 0),
    0,
  );

  const monthlyWasted = currentMonthExpenses.reduce(
    (sum, item) => sum + Number(item.rating < 3 ? item.amount : 0),
    0,
  );

  const monthlyDifferentiate = monthlyUsedProperly - monthlyWasted;

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
        <StatusGauge
          value={monthlyDifferentiate}
          min={monthlyTotal === 0 ? -1 : -monthlyTotal}
          max={monthlyTotal === 0 ? 1 : monthlyTotal}
        />

        {expenses.length === 0 && <p>No expenses yet</p>}
        <h3 className="monthlyExpenses">
          Expenses This Month So Far: ₹ {monthlyTotal}
        </h3>
    

        <h3 className="wastedmonthly">Wasted Money: ₹ {monthlyWasted}</h3>
        <h3 className="savedmonthly">Utilized Properly: ₹ {monthlyUsedProperly}</h3>
        
      </main>
    </>
  );
}
