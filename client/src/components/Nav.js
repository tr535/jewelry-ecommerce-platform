import { Link, useNavigate } from "react-router-dom"
import { removeToken } from "../features/aouth/authSlice"
import { useSelector, useDispatch } from "react-redux"
import useAuth from "../features/aouth/useAuth"
import BasketDialog from '../features/products/Bascet/BasketDialog';
import './nav.css'
import 'primeicons/primeicons.css';

import apiSlice from "../app/apislice"
import { useState } from "react";
const Nav = () => {
    const [tokenObj] = useAuth()
    const role = tokenObj ? tokenObj.roles : null
    const dispach = useDispatch()
    const navigate = useNavigate()
    const [showBasket, setShowBasket] = useState(false);

    const { isUserLoggedIn } = useSelector((state) => state.auth)
    const handleLogoutClick = () => {
        dispach(removeToken())
        dispach(apiSlice.util.resetApiState())
        navigate("/")

    }
    return (
        <nav className="navbar">
            <div className="logo-holder">
                <a id="logo">
                    <img width="221" height="45" src="http://localhost:1500/product/logo.png" alt="פנדורה | Pandora" title="פנדורה | Pandora" />
                </a>
            </div>

            <div className="navim">
                <ul className="nav-right">
                    {<Link className="nav-link" to="/">Home page</Link>}
                    <Link className="nav-link" to="/Login">כניסה</Link>
                    {<Link className="nav-link" to="/Register">הרשמה</Link>}
                    {<Link className="nav-link" to="/Products">תכשיטים</Link>}
                    {isUserLoggedIn && role === "Admin" && <Link className="nav-link" to="/Addproduct">ניהול מוצרים</Link>}
                    {isUserLoggedIn && (
                        <button onClick={() => setShowBasket(true)} className="nav-link">
                            סל קניות
                        </button>
                    )}
                    {showBasket && <BasketDialog
                        isUserLoggedIn={isUserLoggedIn}
                        visible={showBasket}
                        onHide={() => setShowBasket(false)}
                    />}
                                     {isUserLoggedIn && <button onClick={handleLogoutClick} className="logout-btn">logout</button>}

                </ul>

            </div>
        </nav>
    )
}
export default Nav