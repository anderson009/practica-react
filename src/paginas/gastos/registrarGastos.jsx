import React from 'react'
import Form from "./form/form";
import { useNavigate } from "react-router-dom";


const registrarGastos = () => {

  const navigate = useNavigate()
  return (
    <>

      <p  onClick={() => navigate('/layout')} className='ml-10 mt-10 cursor-pointer text-green-600 hover:text-green-800 text-3xl font-bold'> Volver a Balance</p>
      
      <Form></Form>
    </>
   
  )
}

export default registrarGastos