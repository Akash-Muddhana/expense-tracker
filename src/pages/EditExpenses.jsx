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
  return (
    <>
      <Header />

      <main className="Newexpense-main">
        <h2>Edit Expense</h2>

        <h3>Enter Title</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <h3>Enter Amount</h3>
        <input
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <h3>Select Category</h3>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />

        <h3>Select Sub Category</h3>
        <input
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        />

        <h3>Rating</h3>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />

        <h3>Experience</h3>
        <input
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <button onClick={updateExpense}>Update</button>
      </main>
    </>
  );
}
