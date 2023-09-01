import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import "../Login/Login.css";
import axios from "axios";
const Register: React.FC = () => {
    // getting all the fields
    const Navigate = useNavigate();
    const [EmpId, setEmpId] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    var alerts = document.getElementById("alert") as HTMLParagraphElement;

    // storing in an object
    interface userType {
        EmpId: string;
        fname: string;
        lname: string;
        number: string;
        email: string;
        password: string;
    }
    const data: userType = {
        EmpId: EmpId,
        fname: fname,
        lname: lname,
        number: number,
        email: email,
        password: password,
    };

    // function to register user

    async function handleRegister() {
        try {
            if (
                EmpId !== "" &&
                fname !== "" &&
                lname !== "" &&
                number !== "" &&
                email !== "" &&
                password !== "" &&
                cpassword !== ""
            ) {
                
                if (password.length >= 8) {
                    if (password === cpassword) {
                        try {
                            const RegisterRequest = await axios.post(
                                "http://localhost:8080/register",
                                data
                                );
                                console.log(RegisterRequest);
                                console.log(data);
                            if(RegisterRequest.data.message === "User Already Registered"){
                                alerts.className = "alert";
                                alerts.textContent = "User Already Registered";
                            }
                            if(RegisterRequest.data.message === "User Created"){
                                alerts.className = "alert";
                                alerts.textContent = "Successfully Registered";
                                Navigate("/login")
                            }
                            if(RegisterRequest.data.message === "empty data"){
                                alerts.className = "alert";
                                alerts.textContent = "empty data";
                            }
                        } catch (error) {
                            console.log(error);
                            
                            alerts.className = "alert";
                            alerts.textContent = "Network Error";
                        }
                    } else {
                        alerts.className = "alert";
                        alerts.textContent = "password donot match";
                    }
                } else {
                        alerts.className = "alert";
                        alerts.textContent = "Length must be Greater than 8";
                    
                }
            }else{
                if (alerts === null) {
                    alert("All field are mandatory");
                } else {
                    alerts.className = "alert";
                    alerts.textContent = "All field are mandatory";
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // localStorage.setItem(lname.email,JSON.stringify(lname))
    // // const handleOnchange = (e)=>{
    // //     setFname(e.target.value)

    // // }
    // const data:string = localStorage.getItem(fname.email)
    // console.log(JSON.parse(data))
    // const jsonData = JSON.parse(data)
    // console.log(jsonData.name);
    return (
        <div>
            <div className="form">
                <div className="box">
                    <h1>REGISTER</h1>
                    <div className="emp_id">
                        <input
                            type="text"
                            placeholder="Emp_Id"
                            onChange={(e) => setEmpId(e.target.value)}
                        />
                    </div>
                    <div className="name">
                        <input
                            type="text"
                            placeholder="First Name"
                            onChange={(e) => setFname(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            onChange={(e) => setLname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="email">
                        <input
                            type="number"
                            placeholder="Mobile Number"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Organization Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="password">
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <input
                            type="password"
                            name="confirmpassword"
                            onChange={(e) => setCpassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <p id="alert"></p>
                    <div className="btn">
                        <button onClick={handleRegister}>Register</button>
                        <p>Already Registered <a href="/login">Login here</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
