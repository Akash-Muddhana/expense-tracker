import {NavLink} from 'react-router-dom'
import './Header.css'
export function Header(){
    return(<>
    <header className='header'>
        <NavLink to="/" className={({ isActive }) =>
            isActive ? "nav-link Active" : "nav-link"
          }>
           Home
    </NavLink>
    <NavLink to="/EditExpenses" className={({ isActive }) =>
            isActive ? "nav-link Active" : "nav-link"
          }>
            edit expenses
    </NavLink>
     
     <NavLink to="/YourExpenses" className={({ isActive }) =>
            isActive ? "nav-link Active" : "nav-link"
          }>
           Your Expenses
    </NavLink>
    </header>
    </>)
}
