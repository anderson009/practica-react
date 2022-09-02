import { useState, useEffect, createContext } from "react";
import { ClientHttp } from "../../services/client_http";
import { useNavigate } from "react-router-dom";

const ProductsContext = createContext();

const ProductsProvider = ({children}) => {

    const [products, setProducts] = useState([])

    useEffect( () => {
      const ventasInfo = async() => {

        const token = localStorage.getItem('token');         
        const config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }

          try {
    
            let respuesta = await ClientHttp.get('/products', config);
            let resp = respuesta.data;
            setProducts(resp)
          } catch (error) {
    
            console.log(error);
    
          }
        }
        ventasInfo()
  }, [])



  return (
    <ProductsContext.Provider value={{
        products
    }}>
      {children}
    </ProductsContext.Provider>
  )
}

export{
    ProductsProvider
}

export default  ProductsContext