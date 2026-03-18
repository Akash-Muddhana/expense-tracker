import {NavLink} from 'react-router-dom'

export function Header(){
    return(
    <header className='sticky top-0 z-50 bg-gradient-header shadow-lg'>
        <nav className='h-14 flex items-center justify-center gap-8'>
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              isActive 
                ? "text-blue-400 font-bold text-sm sm:text-base px-3 py-2 rounded-lg border-b-2 border-blue-400 no-underline transition-all" 
                : "text-gray-100 font-semibold text-sm sm:text-base px-3 py-2 rounded-lg no-underline hover:bg-blue-500/20 hover:-translate-y-0.5 transition-all"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/EditExpenses" 
            className={({ isActive }) =>
              isActive 
                ? "text-blue-400 font-bold text-sm sm:text-base px-3 py-2 rounded-lg border-b-2 border-blue-400 no-underline transition-all" 
                : "text-gray-100 font-semibold text-sm sm:text-base px-3 py-2 rounded-lg no-underline hover:bg-blue-500/20 hover:-translate-y-0.5 transition-all"
            }
          >
            Edit Expenses
          </NavLink>
          <NavLink 
            to="/YourExpenses" 
            className={({ isActive }) =>
              isActive 
                ? "text-blue-400 font-bold text-sm sm:text-base px-3 py-2 rounded-lg border-b-2 border-blue-400 no-underline transition-all" 
                : "text-gray-100 font-semibold text-sm sm:text-base px-3 py-2 rounded-lg no-underline hover:bg-blue-500/20 hover:-translate-y-0.5 transition-all"
            }
          >
            Your Expenses
          </NavLink>
        </nav>
    </header>
    )
}
