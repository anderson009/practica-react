import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { ClientHttp } from '../../../services/client_http';
import useAuth from "../../../hooks/auth/useAuth";
import useProducts from "../../../hooks/products/useProducts";

const modal = ({setModal, titulo, setTotal, setProducts, setConcepto}) => {
   

    const [carrito, setCarrito] = useState([])

    const [cantidad, setCantidad] = useState(1)

    const {products} = useProducts()


    const agregarCarrito = producto => {
        if (carrito.some((articulo) => articulo.id === producto.id)) {
            const carritoActualizado = carrito.map(articulo => {
                if (articulo.id === producto.id) {
                    articulo.cantidad = producto.cantidad
                }
                return articulo
            })

            setCarrito(carritoActualizado)
        } else {
            setCarrito([...carrito, producto])
        }
    }

    const agregateProduct = (product) => {
        
       const {_id, name, cantidadDisp, precioUnitario} = product

       const prroductoSeleccionado = {
        id: _id,
        name,
        cantidadDisp,
        precioUnitario,
        cantidad,
       }

       agregarCarrito(prroductoSeleccionado)
    }

    const actualizarCantidad = (producto) => {
        const carritoActualizado = carrito.map(articulo => {
            if (articulo.id === producto.id) {
                articulo.cantidad = producto.cantidad
            }
            return articulo
        })

        setCarrito(carritoActualizado)
    }

    const eliminarProducto = (id) => {
        const carritoActualizado = carrito.filter((articulo) => articulo.id !== id)
        setCarrito(carritoActualizado)
        console.log(carrito);
    }


    const confirmProducts = () => {
        const calcTotal = carrito.reduce(
            (total, producto) => total + producto.cantidad * producto.precioUnitario, 0
        );
        
        const getNameAndProducts = carrito.map((el) => {
            return   {
                cantidad: el.cantidad,
                products: el.id
            }    
        })

        const getName = carrito.map((el) => {
            return   {
                name: el.name,
            }    
        })

        setConcepto(getName);
        setProducts(getNameAndProducts)
        setTotal(calcTotal);
        setModal(false)
    }

  return (
    <>
        <div className="z-50 fixed w-full h-full top-0 left-0 flex justify-center items-center lg:p-0">
            <div className="modal-overlay w-full h-full bg-gray-900 opacity-50"></div>
            <div className="bg-white fixed lg:h-5/6 lg:w-5/6    mt-4  -scroll-mt-56  mx-auto rounded-lg shadow-xl z-50  overflow-scroll">

                <div className="modal-header flex flex-shrink-0 items-center  justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <div>
                        <h1 className=' text-4xl text-blue-500'>{titulo}</h1>
                    </div>
                    <div className=''>
                         <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full" onClick={() => setModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                        </button>
                    </div>
                </div>
                
                <div class="flex flex-col content justify-center  items-center">

                    <div className=' flex-row w-full flex flex-no-wrap h-full'>

                        <div class=" w-3/5 border-r h-3/5  border-gray-200 flex-none ">
                            <div class=" text-center p-2">

                                <div className='grid gap-10 md:grid-cols-3 p-5 rounded-xl '>

                                    {products.map( (el) => (

                                        <div className=" bg-slate-200 max-w-screen-2xl border ">
                                           <div className='flex justify-center items-center'>
                                                <img className=' w-full bg-blue-500  h-40' src="../../../public/img/search-fail.svg" height={100} alt="" /> 
                                           </div> 

                                            <h1 className='text-3xl text-center font-bold mb-2'>{el.name}</h1> 
                                            <p class="text-gray-700  mb-3">{el.cantidadDisp} Disponible</p>
                                            <p class="text-gray-700">${el.precioUnitario}</p>   
                                            <div className='flex justify-center'>
                                                <button onClick={() => {agregateProduct(el)}} className=' bg-blue-600 text-center p-2 mt-3 text-white rounded mb-5'>seleccionar Producto</button>
                                            </div>                    
                                        </div>

                                    ))}


                                </div>
                            </div>
                        </div>

                        <div class=" w-2/5 h-full mt-5 flex-col flex-none  ">
                            
                           
                            {carrito < 1 ? <p className='text-center mb-5'>Slecciona Un producto</p> :
                                    
                                carrito.map( (el) => (

                                    <div class="flex mb-5 h-full ">
                                        <div class="w-full  flex mx-5 flex-col md:flex-row mt-5 justify-between rounded-lg bg-white shadow-lg">
                                            <div className='flex flex-row w-full h-full'>
                                                <img class=" w-1/4 " src="../../../public/img/search-fail.svg"  alt="" />
                                                <div class="pt-6 flex flex-col justify-start">
                                                    <h5 class="text-gray-900 text-xl font-medium mb-2">{el.name}</h5>
                                                    <p class="text-gray-600 text-xs mb-2">{el.cantidadDisp} disponible</p>
                                                    <p class="text-gray-600 text-xs">{el.precioUnitario} x unidad</p>
                                                </div>
                                            </div>
                                            
                                            <div class="flex flex-col pt-6 mb-3 pr-3">
                                                <label class="block text-gray-700 font-bold mb-2" for="password">
                                                    cantidad
                                                </label>
                                                <select value={el.cantidad} 
                                                    onChange={(e) => { actualizarCantidad({cantidad: parseInt(e.target.value), id: el.id})}} 
                                                    className=" w-full py-2 px-3 border border-slate-900 rounded">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                </select>
                                                    <p class="text-gray-600 text-xs">{ el.precioUnitario * el.cantidad}</p>
                                            </div>
                                         

                                            <div class="flex flex-col pt-2 pl-5 pr-5">
                                                <button className="p-2 bg-gray-200 hover:bg-gray-500 rounded-full" onClick={() => eliminarProducto(el.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="10px" viewBox="0 0 24 24" width="10px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                                                </button>
                                            </div>
                                        </div>
                                        
                                    </div>

                                ))
                            }
                             
                            <div className='modal-footer w-2/5 absolute bottom-0 flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md '>
                                <button  onClick={() => confirmProducts()} className='w-full bg-blue-500 hover:bg-blue-700 text-center p-2 text-white rounded mb-5'>Confirmar Productos</button>
                            </div>
                           
                        </div>

                    </div>

                </div>                
            </div>
        </div>
    </>
  )
}

export default modal