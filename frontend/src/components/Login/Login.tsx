import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from 'axios'
import {useNavigate} from 'react-router-dom' 
import './Login.css'
const Login:React.FC = () => {

    const Navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    var alerts = document.getElementById('alert') as HTMLParagraphElement


    interface typeCheck{
        email:string,
        password:string
    }
    const data:typeCheck = {
        email:email,
        password: password
    }




    async function handleLogin(){
        try {
            if(email && password){

                const response = await axios.post("http://localhost:8080/login",data)
                const userData = response.data.data
                console.log(userData);
                
                sessionStorage.setItem("authToken",response.data.token)
                
                if(response.data.message==="Login"){
                            alerts.className='alert'
                            alerts.textContent= 'Login Successfully'
                            Navigate('/dashboard')
                        }
                        if(response.data.message==="password not matching"){
                            alerts.className='alert'
                            alerts.textContent= 'Invalid User'
                        }
                        if(response.data.message==="User Not Found"){
                            alerts.className='alert'
                            alerts.textContent= 'User Not Found'
                        }
                        if(response.data.message==="empty datad"){
                            alerts.className='alert'
                            alerts.textContent= 'All Fields are mandetory'
                        }
            }else{
                alerts.className='alert'
                alerts.textContent= 'All Fields are mandetory'

            }
    } catch (error) {
            console.log(error);
            
    }
    }
 return (
    <>
    <div className="form">
        <div className="box">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
</svg>
            <h1>LOG IN</h1>
            <div className="email">
                <input type="email" placeholder='Email' onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="password">
                <input type="password" name='password' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <p id='alert'></p>
            <div className="btn">
               <button onClick={handleLogin}>Login</button>
               <p>Donot have account <a href="/register">Register here</a> </p>
            </div>
            </div>
        </div>
    </>
  )
}

export default Login