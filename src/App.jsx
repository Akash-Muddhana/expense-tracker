import { Header } from "./Components/Header";
import { DashBoard } from "./pages/DashBoard";
import { Routes, Route } from "react-router-dom";
import { NewExpense } from "./pages/NewExpense";
import { YourExpenses } from "./pages/YourExpenses";
import { EditExpenses } from "./pages/EditExpenses";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/NewExpense" element={<NewExpense />} />
        <Route path="/YourExpenses" element={<YourExpenses />} />
        <Route path="/EditExpenses" element={<EditExpenses />} />
        <Route path="/edit/:id" element={<EditExpenses />} />
      </Routes>
    </>
  );
}

export default App;
