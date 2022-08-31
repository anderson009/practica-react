import React from 'react'
import { Link } from 'react-router-dom';
import Formulario from "./form/Formulario";

const register = () => {
  return (
    <>
      <header className='my-14'>
        <h1 className='text-black text-center text-4xl font-black'>Registrarse</h1>
      </header>

      <Formulario />

    </>
  )
}

export default register