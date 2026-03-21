import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../Components/Header";

export function EditExpenses() {
  const { id } = useParams();
  const navigate = useNavigate();

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const expense = expenses.find((e) => e.id == id);

  const [title, setTitle] = useState(expense?.title || "");
  const [category, setCategory] = useState(expense?.category || "");
  const [subCategory, setSubCategory] = useState(expense?.subCategory || "");
  const [rating, setRating] = useState(expense?.rating || 0);
  const [experience, setExperience] = useState(expense?.experience || "");
  const [amount, setAmount] = useState(expense?.amount || "");

  function updateExpense() {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const updated = expenses.map((e) =>
      e.id == id
        ? { ...e, title, category, subCategory, rating, experience, amount }
        : e,
    );

    localStorage.setItem("expenses", JSON.stringify(updated));
    alert("Expense Updated!");
    navigate("/YourExpenses");
  }

  const categoryMap = {
    Essentials: ["Food", "Rent", "Transport", "Mobile", "Electricity"],
    Lifestyle: ["Snacks", "Entertainment", "Shopping", "Subscriptions"],
    Education: ["Courses", "Books", "Exam Fees", "Software"],
    Health: ["Doctor", "Medicine", "Gym", "Tests"],
    Emergency: ["Repairs", "Gifts", "Family Help"],
    Savings: ["Savings", "Investments", "Emergency Fund"],
  };

  return (
    <>
      <Header />

      <main className="w-full flex flex-col items-center gap-6 py-8 px-4">
        <div className="bg-white rounded-2xl shadow-soft p-8 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
            Edit Expense
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-primary-50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amount (₹)
              </label>
              <input
                value={amount}
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-primary-50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory("");
                }}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-primary-50 transition-all"
              >
                <option value="">Select category</option>
                {Object.keys(categoryMap).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sub Category
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                disabled={!category}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-primary-50 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">select sub-category</option>
                {category &&
                  categoryMap[category].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating
              </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-primary-50 transition-all"
              >
                <option value="0">Give Rating</option>
                <option value="1">⭐ 1 - Poor</option>
                <option value="2">⭐⭐ 2 - Fair</option>
                <option value="3">⭐⭐⭐ 3 - Good</option>
                <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
                <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience
              </label>
              <input
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-primary-50 transition-all"
              />
            </div>

            <button
              onClick={updateExpense}
              className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold text-base hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-soft hover:shadow-medium"
            >
              Update Expense
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
