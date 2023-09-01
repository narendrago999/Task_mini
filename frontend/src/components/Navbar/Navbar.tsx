import React from 'react'
import './Navbar.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const Navbar:React.FC = () => {

  const Navigate = useNavigate()

  function handleLogout(){
    Cookies.remove('userData')
    alert("Logout Successfully")
    Navigate('/login')
  }


  return (
    <nav>
        <h1>WEB APP</h1>
        <ul>
        {window.location.pathname === '/dashboard'? <a href="/dashboard"><li>Dashboard</li></a>:""}
        {window.location.pathname === '/login' ? <a href="/register"><li>Register</li></a>: window.location.pathname  === '/dashboard' ? <a href="/profile"><li>Profile</li></a>: <a href="/login"><li>Login</li></a>}
        {window.location.pathname === '/dashboard'? <a href='#'><li onClick={handleLogout}>LogOut</li></a>:""}
        </ul>
    </nav>
  )
}

export default Navbar