import { useState } from "react"
import { useRegisterMutation } from "./authApiSlice"
import { useNavigate } from 'react-router-dom';
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";

const Register = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
        phone: ""
    })
    const [registerFunc, { isError, isLoading }] = useRegisterMutation()
    const navigate = useNavigate();

    if (isLoading)
        return (<h1>loading....</h1>)
    if (isError)
        return (<h1>error</h1>)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        registerFunc(formData)
        navigate("/login")
    }
    return (
    <div className="login-wrapper">
        <Card className="login-card">
            <div className="login-header">
                <h2>HI YOU</h2>
                <h3>ברוכים הבאים לאתר שלנו!!</h3>
                <p>הרשם עכשיו ואנחנו ממשיכים...</p>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-input-wrapper">
                    <FloatLabel>
                        <InputText id="name" name="name" onChange={(e) => handleChange(e)} required />
                        <label htmlFor="name">name</label>
                    </FloatLabel>
                </div>
                <div className="login-input-wrapper">
                    <FloatLabel>
                        <InputText id="username" name="username" onChange={(e) => handleChange(e)} required />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                </div>

                <div className="login-password-wrapper">
                    <FloatLabel>
                        <Password  id="password" name="password" type="password" onChange={(e) => handleChange(e)} required />
                        <label htmlFor="password">Password</label>
                    </FloatLabel>
                </div>
                <div className="login-input-wrapper">
                    <FloatLabel>
                        <InputText id="email" name="email" type="email" onChange={(e) => handleChange(e)} required />
                        <label htmlFor="email">email</label>
                    </FloatLabel>
                </div>
                      <div className="login-input-wrapper">
                    <FloatLabel>
                        <InputText id="phone" name="phone"  type="number" onChange={(e) => handleChange(e)} required />
                        <label htmlFor="phone">phone</label>
                    </FloatLabel>
                </div>
                <button type="submit" className="login-button">register</button>
            </form>
        </Card>
        </div>)}
export default Register