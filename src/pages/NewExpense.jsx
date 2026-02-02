import { Header } from "../Components/Header";
import { useState } from "react";
import { EditExpenses } from "./EditExpenses";
import "./NewExpense.css";
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

      <main className="Newexpense-main">
        <h3>Enter Title</h3>
        <input
          placeholder="Enter Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>Enter amount</h3>
        <input
          placeholder="Enter Amount"
          type="number"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <h3>Select Category</h3>
        <select
          className="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory("");
          }}
        >
          <option value="">Select category</option>

          {Object.keys(categoryMap).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <h3>Select Sub Category</h3>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          disabled={!category}
        >
          <option value="">select sub-category</option>
          {category &&
            categoryMap[category].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>
        <h3>Give Rating on your expense</h3>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value="0">Give Rating</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <h3>Your experice on this expense</h3>
        <input
          placeholder="Your experience"
          onChange={(e) => setExperience(e.target.value)}
        />
        <button onClick={saveExpenses}>Save</button>
      </main>
    </>
  );
}
