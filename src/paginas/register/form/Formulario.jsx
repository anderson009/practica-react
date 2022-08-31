import React from 'react'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Btn from "../../../components/Btn";
import { Link } from 'react-router-dom';
import {ClientHttp} from '../../../services/client_http';


const Formulario = () => {

  const nuevoClienteSchema = Yup.object().shape({
    password: Yup.string().required('El  password es obligatorio'),
    empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
    email: Yup.string().email('Email no valido').required('El email es obligatorio'),
  })


  const hamdleSubmit = async (valores) => {
    try {
      const result = await ClientHttp.post('/register', valores);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Formik 
        initialValues={{
          email: "",
          password: "",
          empresa: ""
        }}

        enableReinitialize={true}

        onSubmit={ async (values) =>{ 
         hamdleSubmit(values)
       }}

       validationSchema={nuevoClienteSchema}
      >
      {({errors, touched}) => { return (
      <>
        <Form className='my-10 bg-white shadow rounded-lg p-10'>
          <div className='w-full group md:w-2/3 mx-auto mt-14'>
            <div className="relative z-0 mb-10">
              <Field type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
              {errors.email && touched.email ? (
                <p className='text-red-800 '>{errors.email}</p>
              ): null}
              <label  for="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>

            <div className="relative z-0 mb-10">
              <Field type="text" name="empresa" id="empresa" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
              <label  for="empresa" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nombre de la empresa</label>
              {errors.empresa && touched.empresa ? (
                <p className='text-red-800 '>{errors.empresa}</p>
              ): null}
            </div>

            <div className="relative z-0 mb-10">
              <Field type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
              <label  for="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              {errors.password && touched.password ? (
                <p className='text-red-800 '>*Este campo es obligatorio</p>
              ): null}
            </div>

            <Btn bg={'bg-blue-500 hover:bg-blue-800 mb-5 py-2.5 px-5'}>Registrarse</Btn>
          </div>
          
        </Form>

        <nav className='lg:flex lg:justify-between mb-10'>
          <Link to={'/'} className='block text-center text-slate-500 uppercase text-sm hover:text-sky-700' >Ya tienes tienes cuenta? <span>Inicia sesion</span></Link> 
        </nav>
        </>
      )}}
      </Formik>
    </>
  )
}

export default Formulario