import {useState, useEffect} from 'react'
import Btn from "../../../components/Btn";
import Modal from "../modal/modal";
import useModal from "../../../hooks/modal/useModal";
import { ClientHttp } from '../../../services/client_http';
import useAuth from "../../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

const form = () => {
  const [total, setTotal] = useState( )
  const [concepto, setConcepto] = useState([])
  const [pago, setPago] = useState('')
  const [products, setProducts] = useState([])

  const {modal, setModal} = useModal()

  const {config} = useAuth()

  const navigate = useNavigate()

  const hamdleSudmit = async (e) => {
    e.preventDefault();
    const obj = {
      total,
      concepto: concepto.map(el => el.name).toString(),
      metodoDePago: pago,
      products
    }

    if (Object.values(obj).includes('')) {
      return
    }

    try {
      await ClientHttp.post('/ventas', obj, config);
      navigate('/Layout')
    } catch (error) {

      console.log(error);

    }
  }

  return (
    <>
      <div className='flex flex-col w-full h-full justify-center items-center mt-10 mb-10'>
        <div className='flex w-2/4  flex-col justify-center items-center head bg-white py-3 px-8  font-extrabold rounded-2xl '>
        <div class="w-2/5 mt-5 ">
          <form onSubmit={hamdleSudmit} class="px-8 pt-6 pb-8 mb-4">

            <div class="mb-5">
              <label class="block text-gray-700 text-2xl font-bold mb-2" for="">
                  Seleccionar Productos
              </label>
              <Btn onClick={() => setModal(true)} bg={'bg-green-500 hover:bg-green-800  py-2.5 px-5'}>{products < 1 ? 'Seleccionar Productos' :  <p>{products.length} Productos seleccionado</p>}</Btn>
            </div>

            <div class="mb-5">
              <label class="block text-gray-700 text-2xl font-bold mb-2" for="username">
                Valor Total
              </label>
              <input class="shadow appearance-none border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={total} onChange={e => setTotal(e.target.value)} id="total" type="number" placeholder="Valor Total"/>
            </div>

            <div class="mb-5">
              <label class="block text-gray-700 text-2xl font-bold mb-2" for="username">
                Concepto
              </label>
              <input class="shadow appearance-none border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username"
                 value={concepto.map(el => el.name)} type="text" placeholder="Concepto"/>
            </div>

            <div class="mb-6">
             <label class="block text-gray-700 text-2xl font-bold mb-2" for="password">
                Password
              </label>
              <select   value={pago} onChange={e => setPago(e.target.value)} className=" w-full py-2 px-3 border border-slate-900 rounded">
                <option value="">---Seleccione un metodo de pago---</option>
                <option value="Efectivo">Efectivo</option>
                <option value="Deuda">Deuda</option>
              </select>
            </div>

            <Btn bg={'bg-blue-500 hover:bg-blue-800 mb-5  mb-5 py-2.5 px-5'}>Crear Venta</Btn>
          </form>  
        </div>
        </div>
      </div>
      {modal? <Modal  setProducts={setProducts} setConcepto={setConcepto} setTotal={setTotal} setModal={setModal} titulo={'Agregar Productos'} />: null}
    </>
  )
}

export default form