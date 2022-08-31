import {useState, useEffect} from 'react'
import Btn from "../../../components/Btn";
import { ClientHttp } from '../../../services/client_http';
import useAuth from "../../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";


const form = () => {

  const {config} = useAuth()
  const navigate = useNavigate()

  const hamdleSudmit = async (e) => {
    e.preventDefault();
  }

  return (
    <>
      <div className='flex flex-col w-full h-full justify-center items-center mt-10 mb-10'>
        <div className='flex w-2/4  flex-col justify-center items-center head bg-white py-3 px-8  font-extrabold rounded-2xl '>
            <h1 className='text-3xl text-red-500 mt-3'>Registrar Gasto</h1>
        <div class="w-2/5 mt-5 ">
          <form onSubmit={hamdleSudmit} class="px-8 pt-6 pb-8 mb-4">

          <div class="mb-6">
             <label class="block text-gray-700 text-2xl font-bold mb-2" for="password">
                Categoria del gasto
              </label>
              <select className=" w-full py-2 px-3 border border-slate-900 rounded">
                <option value="">---Seleccione un metodo de pago---</option>
                <option value="Efectivo">compra de productos e insumos</option>
                <option value="Deuda">Arriendo</option>
                <option value="Deuda">Nomina</option>
              </select>
            </div>

            <div class="mb-5">
              <label class="block text-gray-700 text-2xl font-bold mb-2" for="username">
                Monto Total
              </label>
              <input class="shadow appearance-none border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="total" type="number" placeholder="Monto Total"/>
            </div>

            <div class="mb-5">
              <label class="block text-gray-700 text-2xl font-bold mb-2" for="username">
                Concepto
              </label>
              <input class="shadow appearance-none border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username"
                  type="text" placeholder="Concepto"/>
            </div>

            <div class="mb-6">
             <label class="block text-gray-700 text-2xl font-bold mb-2" for="password">
                Metodo de pago
              </label>
              <select    className=" w-full py-2 px-3 border border-slate-900 rounded">
                <option value="">---Seleccione un metodo de pago---</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Deuda">Deuda</option>
              </select>
            </div>

            <Btn   bg={'bg-red-500 hover:bg-red-800 mb-5 py-2.5 px-5'}>Crear Venta</Btn>
          </form>  
        </div>
        </div>
      </div>
    </>
  )
}

export default form