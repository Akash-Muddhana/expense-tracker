import { StatusGauge } from "./StatusGauge";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSavedExpenses } from "../../services/itemService";
export function DashBoard() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getSavedExpenses()
      .then(setExpenses)
      .catch((error) => console.error("Failed to load expenses:", error));
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
    <main className="mx-auto flex min-h-calc-screen w-full max-w-6xl flex-col items-center gap-8 px-4 py-10 sm:px-6">
          <div className="flex w-full flex-col items-center gap-5 rounded-3xl border border-white/80 bg-white/70 px-5 py-8 text-center shadow-sm backdrop-blur sm:py-10">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Your money, at a glance
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Expense dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                See how you spent this month and keep your goals on track.
              </p>
            </div>
            <button
              onClick={() => navigate("/NewExpense")}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:translate-y-0"
            >
              <span className="text-xl leading-none">+</span>
              Add expense
            </button>
          </div>

          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-xl justify-center rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8">
              <StatusGauge
                value={monthlyDifferentiate}
                min={monthlyTotal === 0 ? -1 : -monthlyTotal}
                max={monthlyTotal === 0 ? 1 : monthlyTotal}
              />
            </div>
          </div>

          {expenses.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-8 py-6 text-center text-slate-500">
              No expenses yet. Add one to see your monthly summary.
            </p>
          )}

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">
                Expenses this month
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-indigo-700">
                ₹ {monthlyTotal.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">
                Needs a second look
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-rose-600">
                ₹ {monthlyWasted.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-sm font-medium text-slate-500">Used well</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-600">
                ₹ {monthlyUsedProperly.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
    </main>
  );
}
