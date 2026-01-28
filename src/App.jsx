import { Header } from "./Components/Header"
import { DashBoard } from "./pages/DashBoard"
import {Routes,Route} from "react-router-dom"
import { NewExpense } from "./pages/NewExpense"
import { YourExpenses } from "./pages/YourExpenses"

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<DashBoard /> }/>
       <Route path="/NewExpense" element={<NewExpense /> }/>
        <Route path="/YourExpenses" element={<YourExpenses /> }/>
      </Routes>
    </>
  )
}

export default App
