import {BrowserRouter ,Routes,Route} from "react-router-dom"
import Layout from './components/Layout';
import Login from './features/aouth/Login';
import Register from './features/aouth/Register';
import Products from './features/products/Products';
import Addproduct from './features/products/Addproduct'
import Usebascet from "./features/products/Bascet/Usebascet";
import Bascet from "./features/products/Bascet/Bascet"
import Pay from "./features/products/Bascet/Pay";
import Home from "./components/Home";

function App() {
  return (
 <BrowserRouter>
    <Routes>
        <Route path='/' element={<Layout></Layout>}>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/products' element={<Products></Products>}></Route>
        <Route path='/Addproduct' element={<Addproduct></Addproduct>}></Route>
        <Route path='/Usebascet' element={<Usebascet></Usebascet>}></Route>
         <Route path='/Bascet' element={<Bascet></Bascet>}></Route>
          <Route path='/Pay' element={<Pay></Pay>}></Route>
          <Route path="/" element={<Home></Home>}></Route>
        </Route>
    </Routes>
 </BrowserRouter>
  );
}

export default App;
