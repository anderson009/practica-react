import {useState} from 'react'
import Btn from '../../../components/Btn'
import useAuth from '../../../hooks/auth/useAuth'
import { ClientHttp } from '../../../services/client_http'

const modal = ({setModal, titulo}) => {

    const [name, setName] = useState('')

    const [precioU, setprecioU] = useState(0)

    const [costoU, setCostoU] = useState(0)

    const [categoria, setCategoria] = useState('')

    const [descripcion, setDescripcion] = useState('')

    const [cantidadDisp, setCantidadDisp] = useState(0)

    const {config} = useAuth()


    const hamdleSudmit = async (e) => {
        e.preventDefault();
        const obj = {
          name,
          precioUnitario: Number(precioU),
          costoUnitario: Number(costoU),
          descripcion,
          categoria,
          cantidadDisp: Number(cantidadDisp),
        }
    
        if (name === '') {
          console.log('jjjj');
          return
        }

        if (precioU < 1) {
            console.log('jjjj');
            return
        }

          if (costoU < 1) {
            console.log('jjjj');
            return
        }

        if (cantidadDisp < 1) {
            console.log('jjjj');
            return
        }
    
        try {
            await ClientHttp.post('/products', obj, config);
            setModal(false)
          } catch (error) {
      
            console.log(error);
      
          }
    }
   

  return (
    <>
       

       <div className="z-50 fixed w-full h-full top-0 left-0 flex justify-center items-center lg:p-0">
            <div className="modal-overlay w-full h-full bg-gray-900 opacity-50"></div>
            <div className="bg-white fixed lg:h-5/6 lg:w-2/3     mt-4  -scroll-mt-56  mx-auto rounded-lg shadow-xl z-50  overflow-scroll">

                 <div className="modal-header flex flex-row mt-5 items-center  justify-between p-4 border-b border-gray-200 rounded-t-md">
                    <div>
                        <h1 className=' text-4xl text-blue-500'>{titulo}</h1>
                    </div>
                    <div className=''>
                         <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full" onClick={() => setModal(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
                        </button>
                    </div>
                </div>


                <div className=' content mt-20 flex flex-col w-full h-full justify-center items-center mb-5'>
                    <div className='flex w-full  flex-col justify-center items-center head bg-white py-3 px-8  font-extrabold rounded-2xl '>

                        <div class="w-2/5 mt-5 ">
                            <form onSubmit={hamdleSudmit} class="px-8 pt-6 pb-5">

                                <div class="mb-6">
                                    <label class="block text-gray-700 text-2xl font-bold mb-2" for="name">
                                        Nombre
                                    </label>
                                    <input  value={name} onChange={e => setName(e.target.value)} class="shadow appearance-none border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="name" type="text" placeholder="Nombre"/>
                                </div>

                                <div class="mb-5">
                                    <label class="block text-gray-700 text-2xl font-bold mb-2" for="precioU">
                                        Precio Unitario
                                    </label>
                                    <input  value={precioU} onChange={e => setprecioU(e.target.value)} class="shadow appearance-none border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="precioU" type="number" placeholder=" Precio Unitario"/>
                                </div>

                                <div class="mb-5">
                                    <label class="block text-gray-700 text-2xl font-bold mb-2" for="costoU">
                                        Costo unitario
                                    </label>
                                    <input  value={costoU} onChange={e => setCostoU(e.target.value)} class="shadow appearance-none border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="costoU" type="text" placeholder="Costo unitario"/>
                                </div>

                                <div class="mb-6">
                                    <label id='categoria' class="block text-gray-700 text-2xl font-bold mb-2" for="metodo de pago">
                                        categoria <span>Opcional*</span>
                                    </label>
                                    <select  value={categoria} onChange={e => setCategoria(e.target.value)} id='categoria' className=" w-full py-2 px-3 border border-slate-900 rounded">
                                        <option value="">---Seleccione una categoria---</option>
                                        <option value="Efectivo">Efectivo</option>
                                        <option value="Deuda">Deuda</option>
                                    </select>
                                </div>

                                <div class="mb-5">
                                    <label class="block text-gray-700 text-2xl font-bold mb-2" for="descripcion">
                                        descripcion  <span>Opcional*</span>
                                    </label>
                                    <input  value={descripcion} onChange={e => setDescripcion(e.target.value)} class="shadow appearance-none border border-slate-900 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="descripcion" type="text" placeholder="descripcion"/>
                                </div>

                    
                                <div class="mb-5">
                                    <label id='categoria' class="block text-gray-700 text-2xl font-bold mb-2" for="cantidadDisp">
                                        Cantidad Disponible 
                                    </label>
                                    <select  value={cantidadDisp} onChange={e => setCantidadDisp(e.target.value)} id='cantidadDisp' className=" w-full py-2 px-3 border border-slate-900 rounded">
                                        <option value="">---Seleccione una cantidad---</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>

                                    </select>
                                </div>

                                <Btn   bg={'bg-blue-500 hover:bg-blue-800 mb-5 py-2.5 px-5'}>Crear Producto</Btn>
                            </form>  
                        </div>
                    </div>
                </div>
    
               
            </div>
        </div>
    </>
  )
}

export default modal