import "./DashBoard.css";
import { StatusGauge } from "./StatusGauge";
import { Header } from "../Components/Header";
import { useNavigate } from "react-router-dom";

export function DashBoard() {
  const navigate = useNavigate();

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

        <StatusGauge value={80} />
        
      </main>
    </>
  );
}
