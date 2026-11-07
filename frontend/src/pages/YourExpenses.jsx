import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedExpenses } from "../../services/itemService";
import { deleteExpenseItem } from "../../services/itemService";
export function YourExpenses() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSavedExpenses()
      .then(setExpenses)
      .catch((error) => console.error("Failed to load expenses:", error));
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

  return (
    <main className="mx-auto flex min-h-calc-screen w-full max-w-5xl flex-col items-center px-4 py-10 sm:px-6">
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your Expenses
          </h2>
          <p className="mb-8 text-center text-slate-500">
            A clear view of where your money went.
          </p>

          <div className="mb-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Total</p>
              <p className="mt-1 text-xl font-bold text-slate-900">₹ {total.toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Needs a second look</p>
              <p className="mt-1 text-xl font-bold text-rose-600">₹ {wasted.toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Used well</p>
              <p className="mt-1 text-xl font-bold text-emerald-600">₹ {usedProperly.toLocaleString("en-IN")}</p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            {expenses.length === 0 && (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-6 text-center text-slate-500">
                No expenses recorded yet. Start by adding your first expense! 📊
              </p>
            )}

            {expenses.map((e) => (
              <div
                key={e.id}
                className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
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
                    onClick={async () => {
                      try {
                        await deleteExpenseItem(e.id);
                        setExpenses((prev) =>
                          prev.filter((item) => item.id !== e.id),
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
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
  );
}
