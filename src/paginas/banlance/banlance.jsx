import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import Btn from "../../components/Btn";
import Modal from "./modal/modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from 'react-router-dom'
import { ClientHttp } from '../../services/client_http';
import useAuth from "../../hooks/auth/useAuth";
import useModal from "../../hooks/modal/useModal";

const Banlance = () => {

  const navigate = useNavigate();

  const [ventas, setVentas] = useState([]);

  const [egresos, setEgresos] = useState([]);

  const [hola, setHola] = useState([]);


  const [id, setId] = useState('');

  const [startDate, setStartDate] = useState(new Date());

  const {usuario, config} = useAuth()

  const {modal, setModal} = useModal()

  const [utilidad, setUtilidad] = useState( )

  const [gastos, setGastos] = useState(0)




  useEffect(() => {

    const ventasInfo = async() => {
      
      try {
        const { data } = await ClientHttp.get('/ventas', config);
        setVentas(data);
        let reduce = data.reduce((acumulador, actual) => acumulador + actual.total, 0);
        setUtilidad(reduce)
      } catch (error) {

        console.log(error);

      }
    }

    ventasInfo();

  },[]);

  useEffect(() => {

    const ventasInfo = async() => {
      
      try {
        const { data } = await ClientHttp.get('/gastos', config);
        data.map( el => setHola(el))
        setVentas(data);
        let reduce = data.reduce((acumulador, actual) => acumulador + actual.montoTotal, 0);
        setGastos(reduce)
      } catch (error) {

        console.log(error);

      }
    }

    ventasInfo();

  },[]);



  const openModal = () => {
    setModal(true)
  }


  return (
    <>
    <div className='flex flex-col w-full h-full justify-center items-center mt-10 mb-10'>
      <div className='flex w-4/6 flex-col justify-center items-center head bg-white py-3 px-8 text-2xl font-extrabold rounded-2xl '>
        <div className='mb-3'>
          <p className='mb-5'>Empresa: </p>
          <h1 className='text-5xl'>
            {usuario.empresa}
          </h1>
          <p className='mt-3'>Propietario</p>
        </div>

        <div>
        <nav className="dark:bg-black dark:text-white flex flex-col md:flex-row items-center md:justify-between px-6 py-4  shadow-sm max-w-screen-2xl mx-auto">
          <div className="mt-5 md:mt-0">
            <ul className="flex flex-col md:flex-row md:space-x-5 w-full items-center">

            <li>
                <Link
                  to={'/Layout/'} 
                  className="font-semibold tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
                  >
                    Diario
                </Link>
              </li>

              <li>
                <Link
                  to={'/perfil'}
                  className="font-semibold tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
                >
                  Semanal
                </Link>
              </li>

              <li>
                <Link
                  to={'/perfil'} 
                  className="font-semibold tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
                  >
                    Mensual
                  </Link>
              </li>

              <li>
                <Link
                  to={'perfil'}
                  className="font-semibold tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
                  >
                    Anual
                  </Link>
              </li>
            </ul>
          </div>
        </nav>
        </div>
      </div>

      <div className='flex w-4/6 flex-col mt-5 justify-center items-center bg-white py-3 px-8 text-2xl font-extrabold rounded-2xl '>
       
       <div className='m-10'>
        <label htmlFor=""  className=' text-blue-500'>Selecione una fecha</label>
        <DatePicker la withPortal portalId="root-portal" className='text-blue-500 bg-slate-200 text-center p-2 border mt-5 border-slate-900  rounded block ' selected={startDate} onChange={(e) => setStartDate(e)} />
       </div>
        
        
      </div>

      <div className='flex w-4/6 flex-row mt-5 bg-white py-3 px-8 text-2xl font-extrabold rounded-2xl pb-20'>
       

       <div className='flex flex-grow justify-between'>
         <div className=' flex flex-col ml-5 mt-10 justify-center items-center'>
          <p className='ml-5 text-blue-900 text-5xl mb-5'>Utilidad Total:</p>
          <p className='ml-5 text-5xl'>$ {utilidad - gastos}</p>
         </div>

         <div className=' flex flex-col mr-5 mt-10 justify-center items-center'>
          <p className='ml-5 text-blue-900 text-5xl mb-4'>Ventas Totales:</p>
          <p className='ml-5 text-4xl mb-10'>$ {utilidad}</p>
          <p className='ml-5 text-blue-900 text-5xl mb-4'>Gastos Totales:</p>
          <p className='ml-5 text-4xl'>$ {gastos}</p>
         </div>

       </div>

     </div>

     <div className='flex w-4/6 flex-col mt-5 bg-white py-3 px-8 rounded-2xl pb-20'>
      <div className='flex flex-row justify-between mt-8'>
        <div className='flex flex-col'>
          <input className='py-1 px-5 rounded bg-slate-200 border border-solid placeholder-black' placeholder='Bucar Movimientos' type="text" />
        </div>
        <div className='flex flex-row mr-5 '>
          <Btn onClick={() => navigate('registerVenta')} bg={'px-4 bg-blue-500 hover:bg-blue-800'} >Nueva Venta</Btn>
          <Btn onClick={() => navigate('registerGasto')} bg={' bg-red-500 hover:bg-red-800 ml-5'} >Nuevo Gasto</Btn>
        </div>
      </div>

      <div className='flex flex-col mb-7 justify-center items-center'>

        {ventas < 1 && egresos < 1 ? 
        <div class="flex flex-col items-center mt-10">
          <img src="../../../public/img/search-fail.svg" alt="" />
          <p class="font-sans text-2xl">
            No hay alumnos en la lista
          </p>
        </div> :
        ventas.map( (el) => (
          <div  className='flex justify-between w-1/2 mt-10 bg-blue-500  hover:bg-blue-600 text-white cursor-pointer py-3 px-8 rounded-2xl'>

            <div onClick={() => {openModal(); setId(el._id)}} className=' flex cursor-pointer w-full'>
               <div className='w-3/4'>
                <p>Concepto: </p>
                <p className=' text-3xl '>{el.concepto}</p>
              </div>
              <div className=' w-1/3 text-right flex flex-col'>
                <p>Total: </p>
                <p className=' text-3xl '>{el.total}</p>
                <p>{el.metodoDePago}</p>
              </div>
            </div>
            
             

              <div className=' w-1/3 text-right flex flex-col mt-3'>
                <Btn bg={' bg-red-500 hover:bg-red-800 ml-5 mb-2 uppercase'} >Eliminar</Btn>
                <Btn bg={' bg-green-500 hover:bg-green-800 ml-5 mt-2 uppercase'} >Editar</Btn>
              </div>
            
          </div>
        ))}


      { egresos.map( (el) => (
          <div  className='flex justify-between w-1/2 mt-10 bg-red-500 hover:bg-red-600 text-white cursor-pointer py-3 px-8 rounded-2xl'>

            <div onClick={() => {openModal(); setId(el._id)}} className=' flex cursor-pointer w-full'>
               <div className='w-3/4'>
                <p>concepto: </p>
                <p className=' text-3xl '>{el.concepto}</p>
              </div>
              <div className=' w-1/3 text-right flex flex-col'>
                <p>Total: </p>
                <p className=' text-3xl '>{el.montoTotal}</p>
                <p>{el.metodoDePago}</p>
              </div>
            </div>
            
             

              <div className=' w-1/3 text-right flex flex-col mt-3'>
                <Btn bg={' bg-red-500 hover:bg-red-800 ml-5 mb-2 uppercase'} >Eliminar</Btn>
                <Btn bg={' bg-green-500 hover:bg-green-800 ml-5 mt-2 uppercase'} >Editar</Btn>
              </div>
            
          </div>
        ))
      }

        

        
        
      </div>

     </div>

   

       
    </div>
    {modal? <Modal titulo={'Resumen'} setModal={setModal} id ={id} />: null}
    </>
  )
}

export default Banlance