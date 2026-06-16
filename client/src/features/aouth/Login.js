import React from 'react';
import { useEffect, useState } from "react"
import { useLoginMutation } from "./authApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { setToken } from "./authSlice"
import { useDispatch } from "react-redux"
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import "./login.css"

const Login = () => {
    const navigate = useNavigate()
    const dispach = useDispatch()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [loginFomc, { isLoading, isSuccess, error, isError, data }] = useLoginMutation()

    useEffect(() => {
        if (isSuccess) {
            dispach(setToken(data))
            navigate("/products")
        }
    }, [isSuccess])

    if (isLoading)
        return (<h1>loading...</h1>)

    const handleSubmit = (e) => {
        e.preventDefault()
        loginFomc(formData)
    }

    const handleChange = (e) => {
        // התיקון שמונע מ-PrimeReact לשלוח סיסמה ריקה
        const name = e.target.name || e.target.id;
        const value = e.target.value;
        
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <div className="login-wrapper">
            <Card className="login-card">
                <div className="login-header">
                    <h2>HI YOU</h2>
                    <h3>כיף לראות אותך פה!</h3>
                    <p>הכנס ואנחנו ממשיכים...</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="login-input-wrapper">
                        <FloatLabel>
                            <InputText id="username" name="username" onChange={handleChange} required />
                            <label htmlFor="username">Username</label>
                        </FloatLabel>
                    </div>

                    <div className="login-password-wrapper">
                        <FloatLabel>
                            <Password id="password" name="password" onChange={handleChange} required />
                            <label htmlFor="password">Password</label>
                        </FloatLabel>
                    </div>

                    <button type="submit" className="login-button">Login</button>
                    {isError && <h4 style={{ textAlign: "center" }} >שם משתמש או סיסמא אינם תקינים</h4>}
                    {isError && <Link style={{ textAlign: "center" }} to="/register">הרשם עכשיו</Link>}

                    <div className="divider"><span>או</span></div>

                    <div className="social-buttons">
                        <button className="google-btn">Google</button>
                        <button className="facebook-btn">facebook</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default Login;