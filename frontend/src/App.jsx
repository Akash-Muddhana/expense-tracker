import { Header } from "./Components/Header";
import { DashBoard } from "./pages/DashBoard";
import { Routes, Route } from "react-router-dom";
import { NewExpense } from "./pages/NewExpense";
import { YourExpenses } from "./pages/YourExpenses";
import { EditExpenses } from "./pages/EditExpenses";
import { Login } from "./pages/login";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <DashBoard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/NewExpense"
          element={
            <NewExpense isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/YourExpenses"
          element={
            <YourExpenses
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/EditExpenses"
          element={
            <YourExpenses
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/EditExpenses/:id"
          element={
            <EditExpenses
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditExpenses
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
