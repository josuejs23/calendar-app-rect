import React from 'react'
import { useAuthStore } from '../../hooks'

export const Navbar = () => {
  

  const { startLogout, user } = useAuthStore();

  const handleLogout = ()=>{
    startLogout();
  }

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span className='navbar-brand'>
            <i className='fas fa-calendar-alt'></i>
            &nbsp;
            {/* Josue Zorrilla */}
            {user?.name}
        </span>

        <button 
          className='btn btn-outline-danger'
          onClick={handleLogout}
        >
            <i className='fas fa-sign-out-alt'></i>
            &nbsp;
            <span>Exit</span>
        </button>
    </div>
  )
}
