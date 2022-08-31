import React, { useState } from 'react'
import { useEffect } from 'react';
import  { formatearFecha } from "../../../helpers/index";
import useAuth from "../../../hooks/auth/useAuth";
import { ClientHttp } from '../../../services/client_http';
import Btn from "../../../components/Btn";



const modal = ({titulo, id, setModal}) => {

  const [venta, setVenta] = useState({});

  const [length, setLength] = useState(0);

  const [products, setProducts] = useState([]);

  const {config} = useAuth()


    useEffect(() => {

        const ventasInfo = async() => {
    
          try {
            const { data } = await ClientHttp.get(`/ventas/${id}`, config);
            console.log(data);
            let products = data.productos;
            setVenta(data)
            setProducts(products)
            setLength(data.productos.length)
          } catch (error) {
    
            console.log(error);
    
          }
        }
        ventasInfo();
    
      }, {});
  return (
    <>
        <div className="z-50 fixed w-full h-full top-0 left-0 flex justify-center items-center lg:p-0">
            <div className="modal-overlay w-full h-full bg-gray-900 opacity-50"></div>
            <div className="bg-white fixed lg:h-5/6 lg:w-1/2  mt-4  -scroll-mt-56  mx-auto rounded-lg shadow-xl z-50  overflow-scroll">

                <div className="head bg-gray-100 py-4 flex justify-between px-8 text-2xl font-extrabold">

                    <div className='flex flex-row'>
                        <Btn bg={' bg-red-500 hover:bg-red-800 p-2 uppercase'} >Eliminar</Btn>
                        <Btn bg={' bg-green-500 hover:bg-green-800 ml-5 p-2 uppercase'} >Editar</Btn>
                    </div>

                    <div className=''>
                         <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full" onClick={() => setModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                        </button>
                    </div>
                </div>
                
                <div class="flex flex-col content justify-center pt-5 items-center mb-10">
                    <div className='flex justify-center mb-5'>
                        <h1 className=' text-4xl text-blue-500'>{titulo}</h1>
                    </div>
                    <div className='bg-gray-100 w-3/4 p-10 rounded-xl  '>
                        <p className='text-4xl text-green-500 text-center font-bold'>{venta.concepto}</p>

                       <div className='flex flex-col '>
                            
                            <div className='flex flex-row mt-5'>
                                <p className='mr-2 text-lg font-bold'>Fecha: </p>
                                <p className='text-lg'>{formatearFecha(venta.fecha)}</p>
                            </div>

                            <div className='flex flex-row'>
                                <p className='mr-2 text-lg font-bold'>Metodo de Pago: </p>
                                <p className='text-lg'>{venta.metodoDePago}</p>
                            </div>

                            <div className='flex flex-row '>
                                <p className='mr-2 text-lg font-bold'>Total: </p>
                                <p className='text-lg'>${venta.total}</p>
                            </div>

                            <div className='flex flex-row'>
                                <p className='mr-2 text-lg font-bold'>Productos Totales: </p>
                                <p className='text-lg'>{length}</p>
                            </div>
                       </div>
                    </div>

                    <div className='bg-gray-100 w-3/4 mt-5 p-10 rounded-xl'>
                        <div className='flex flex-row w-full bg-slate-400 justify-between'>
                            <div class="w-2/5">
                                <p class="text-xl uppercase font-bold">Productos</p>
                            </div>

                            <div class=" w-2/12 ">
                                <p class="text-xl uppercase font-bold">Cant.</p>
                            </div>

                            <div class="w-1/5">
                                <p class="text-xl text-right uppercase font-bold">Precio U.</p>
                            </div>

                            <div class="w-1/5">
                                <p class="text-xl text-right uppercase font-bold">Total.</p>
                            </div>
                        </div>
                            

                       <div className='flex flex-col '>
                        {products.map((el) => (
                           <div class="flex flex-row mt-5 ">
                                <div class="w-2/5 ">
                                    <p  class=" text-xl text-left uppercase font-bold">{el.name}</p>
                                </div>

                                <div class="w-2/12">
                                    <p  class=" text-xl text-center  uppercase font-bold">{el.cantidad}</p>
                                </div>

                                <div class="w-1/5">
                                    <p  class="text-xl text-right uppercase font-bold">{el.precioUnitario}</p>
                                </div>

                                <div class="w-1/5">
                                    <p  class=" text-xl text-right  uppercase font-bold">{el.total}</p>
                                </div>
                         </div>
                        ))}
                       </div>
                    </div>

                </div>                
            </div>
        </div>
    </>
  )
}

export default modal