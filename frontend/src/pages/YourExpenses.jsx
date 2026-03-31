import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { getSavedExpenses } from "../../services/itemService";
export function YourExpenses({ isLoggedIn, setIsLoggedIn }) {
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
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/auth-check", {
        withCredentials: true,
      })
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, []);
  return (
    <>
      {isLoggedIn ? (
        <main className="w-full flex flex-col items-center min-h-calc-screen py-8 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-8 drop-shadow-md">
            Your Expenses
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap w-full mb-8">
            <div className="bg-white text-primary-500 p-4 rounded-xl font-semibold text-center min-w-[240px] shadow-soft border-l-4 border-primary-500">
              Total: ₹ {total}
            </div>
            <div className="bg-white text-danger-600 p-4 rounded-xl font-semibold text-center min-w-[240px] shadow-soft border-l-4 border-danger-600">
              Wasted: ₹ {wasted}
            </div>
            <div className="bg-white text-success-500 p-4 rounded-xl font-semibold text-center min-w-[240px] shadow-soft border-l-4 border-success-500">
              Utilized: ₹ {usedProperly}
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-4">
            {expenses.length === 0 && (
              <p className="text-lg text-gray-300 text-center p-8 bg-white rounded-xl shadow-soft min-w-[300px]">
                No expenses recorded yet. Start by adding your first expense! 📊
              </p>
            )}

            {expenses.map((e, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-soft p-5 w-full max-w-2xl border-l-4 border-primary-500 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-1">
                      {e.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {e.category} - {e.subCategory}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary-600">
                      ₹{e.amount}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(e.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Rating:</span> {e.rating}/5
                    ⭐
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-semibold">Feedback:</span>{" "}
                    {e.experience}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => deleteExpense(i)}
                    className="flex-1 bg-gradient-danger text-white py-2 rounded-lg font-semibold hover:shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${e.id}`)}
                    className="flex-1 bg-gradient-primary text-white py-2 rounded-lg font-semibold hover:shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
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
