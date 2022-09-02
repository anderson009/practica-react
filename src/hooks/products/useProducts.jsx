import { useContext } from "react";
import  ProductsContext from "../../context/products/ProductsProvider";

const useProducts = () => {
    return useContext(ProductsContext)
}

export default useProducts