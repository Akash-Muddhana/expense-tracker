import { StatusGauge } from "./StatusGauge";
import { Header } from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSavedExpenses } from "../../services/itemService";
import axios from "axios";
const API = import.meta.env.VITE_API_URL || "";

export function DashBoard({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const items = await getSavedExpenses();
        setExpenses(items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

useEffect(() => {
  axios
    .get(`${API}/api/auth/auth-check`, {
      withCredentials: true,
    })
    .then(() => setIsLoggedIn(true))
    .catch(() => setIsLoggedIn(false));
}, []);

  const now = new Date();

  const currentMonthExpenses = expenses.filter((item) => {
    if (!item.date) return false;

    const d = new Date(item.date);

    return (
      d.getUTCMonth() === now.getUTCMonth() &&
      d.getUTCFullYear() === now.getUTCFullYear()
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
      {isLoggedIn ? (
        <main className="w-full flex flex-col items-center min-h-calc-screen gap-8 py-8 px-4">
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => navigate("/NewExpense")}
              className="w-14 h-14 rounded-full bg-gradient-primary text-white cursor-pointer text-2xl font-bold flex items-center justify-center shadow-lg hover:-translate-y-1 transition-all duration-300 active:-translate-y-0.5"
            >
              <span>+</span>
            </button>
            <h4 className="m-0 text-sm sm:text-base font-semibold text-white drop-shadow-md">
              Add new expense
            </h4>
          </div>

          <div className="w-full flex justify-center">
            <div className="bg-white rounded-2xl shadow-soft p-8 flex justify-center">
              <StatusGauge
                value={monthlyDifferentiate}
                min={monthlyTotal === 0 ? -1 : -monthlyTotal}
                max={monthlyTotal === 0 ? 1 : monthlyTotal}
              />
            </div>
          </div>

          {expenses.length === 0 && (
            <p className="mt-12 text-lg text-gray-300 text-center p-8 bg-white rounded-2xl shadow-soft min-w-[300px]">
              No expenses yet
            </p>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-6 flex-wrap w-full px-4">
            <div className="bg-gradient-primary text-white p-6 rounded-2xl font-semibold text-center min-w-[240px] shadow-soft hover:-translate-y-1 transition-all duration-300">
              Expenses This Month: ₹ {monthlyTotal}
            </div>

            <div className="bg-gradient-danger text-white p-6 rounded-2xl font-semibold text-center min-w-[240px] shadow-soft hover:-translate-y-1 transition-all duration-300">
              Wasted Money: ₹ {monthlyWasted}
            </div>

            <div className="bg-gradient-success text-white p-6 rounded-2xl font-semibold text-center min-w-[240px] shadow-soft hover:-translate-y-1 transition-all duration-300">
              Utilized Properly: ₹ {monthlyUsedProperly}
            </div>
          </div>
        </main>
      ) : (
        <main className="w-full flex flex-col items-center min-h-calc-screen gap-8 py-8 px-4">
          <p className="mt-12 text-lg text-gray-300 text-center p-8 bg-white rounded-2xl shadow-soft min-w-[300px]">
            Please log in to view your dashboard.
          </p>
        </main>
      )}
    </>
  );
}
