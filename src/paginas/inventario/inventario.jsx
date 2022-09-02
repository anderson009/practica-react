import {useState, useEffect} from 'react'
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/products/useProducts";
import useModal from "../../hooks/modal/useModal";
import Modal from "./modal/modal";

const form = () => {
  const navigate = useNavigate()

  const {products} = useProducts();

  const {modal, setModal} = useModal()


  return (
    <>
      <div className='flex flex-col w-full h-full justify-center items-center mt-10 mb-10'>
        <div className='flex w-2/4  flex-col justify-center items-center head mb-5 bg-white py-3 px-8  font-extrabold rounded-2xl '>
            <h1 className='text-3xl text-blue-500 mt-3'>Inventario</h1>
        <div class="w-2/5 mt-5 ">
          

            <div class="mb-5">
              <label class="block text-gray-700 text-2xl font-bold mb-2" for="Buscar">
                Buscar Producto
              </label>
              <input class="shadow appearance-none border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="Buscar" type="text" placeholder="Buscar producto"/>
            </div>

            {products < 1 ? 
                <div class="flex flex-col items-center mt-10 mb-5">
                    <img src="../../../public/img/search-fail.svg" alt="" />
                    <p class="font-sans text-xl">
                        No hay productos en la lista
                    </p>
                </div>: <p>holaaaa</p>}


            <Btn onClick={() => setModal(true)} bg={'bg-blue-500 hover:bg-blue-800 mb-5 py-2.5 px-5'}>Crear Productos</Btn>
        </div>
        </div>
        {modal? <Modal setModal={setModal} titulo={'Crear Productos'} />: null}
      </div>
    </>
  )
}

export default form