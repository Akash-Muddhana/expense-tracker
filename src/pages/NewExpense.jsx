import { Header } from "../Components/Header";
import { useState } from "react";

export function NewExpense() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [amount, setAmount] = useState(0);
  
  function saveExpenses() {
    const newExpense = {
      id: Date.now(),
      amount,
      title,
      category,
      subCategory,
      rating,
      experience,
        date: new Date().toISOString(),  
    };
    // 1. Get old data
    const oldExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // 2. Add new one
    const updatedExpenses = [...oldExpenses, newExpense];

    // 3. Save back
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    alert("Saved!");

    // Optional: clear form
    setTitle("");
    setCategory("");
    setSubCategory("");
    setRating(0);
    setExperience("");
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
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
            Add New Expense
          </h1>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                placeholder="Enter expense title"
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
                placeholder="Enter amount"
                type="number"
                value={amount}
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
                Rating (How well you used this money?)
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
                Your Experience
              </label>
              <input
                placeholder="Share your thoughts about this expense..."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 focus:bg-primary-50 transition-all"
              />
            </div>

            <button
              onClick={saveExpenses}
              className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold text-base hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-soft hover:shadow-medium"
            >
              Save Expense
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
