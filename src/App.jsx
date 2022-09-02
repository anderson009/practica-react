import Login from "./paginas/login/login";
import Register from "./paginas/register/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout";
import Banlance from "./paginas/banlance/banlance";
import Perfil from "./paginas/perfil/perfil";
import AuthLayout from "./layouts/auth/authLayout";
import Ventas from "./paginas/ventas/createVentas/createVenta";
import Gastos from "./paginas/gastos/registrarGastos";
import Inventario from "./paginas/inventario/inventario";
import { AuthProvider } from "./context/auth/AuthProvider";
import { ModalProvider } from "./context/modal/ModalProvider";
import { ProductsProvider } from "./context/products/ProductsProvider";

function App() {

  return (
    <BrowserRouter>
     <AuthProvider>
     <ModalProvider>
      <ProductsProvider>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={ <Login />} />
          <Route path="register" element={ <Register />} />
        </Route>

        <Route path="/layout" element={<Layout />}>
          <Route index element={ <Banlance />} />
          <Route path='registerVenta' element={ <Ventas />} />
          <Route path='registerGasto' element={ <Gastos />} />
          <Route path='inventario' element={ <Inventario />} />
        </Route>
      </Routes>
      </ProductsProvider>
    </ModalProvider>
    </AuthProvider>
    </BrowserRouter>  
  )
}

export default App
