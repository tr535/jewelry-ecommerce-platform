import { Outlet } from "react-router-dom"
import Nav from "./Nav"

const Layout=()=>{
    return(
        <>
        <Nav></Nav>
        <main className="main_Layout">
            <Outlet></Outlet>
        </main>
        </>
    )
}
export default Layout