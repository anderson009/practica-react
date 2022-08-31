import {useState} from 'react'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Btn from "../../../components/Btn";
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { ApiService } from "../../../services/api";
import useAuth from "../../../hooks/auth/useAuth";

const Formulario = () => {

  const {setUsuario} = useAuth()

  const nuevoClienteSchema = Yup.object().shape({
    password: Yup.string().required('* El password es obligatorio'),
    email: Yup.string().email('Email no valido').required('* El email es obligatorio'),
  })

  const navigate = useNavigate();

  const hamdleSubmit = async (valores) => {
    try {
      const result = await ApiService.login(valores);
      let token = result.token.token;
      console.log(token);
      setUsuario(result.user._doc);
      localStorage.setItem('token', token)
      navigate('/layout');
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
        }}

        enableReinitialize={true}

        onSubmit={ async (values) =>{ 
          await hamdleSubmit(values)
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
              <label  for="nombre" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>

            <div className="relative z-0 mb-10">
              <Field type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
              {errors.password && touched.password ? (
                <p className='text-red-800 '>{errors.password}</p>
              ): null}
              <label  for="nombre" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>

            <Btn bg={'bg-blue-500 hover:bg-blue-800 mb-5  mb-5 py-2.5 px-5'}>Login</Btn>
          </div>
          
        </Form>
        <nav className='lg:flex lg:justify-between'>
          <Link to={'/register'} className='block text-center text-slate-500 uppercase text-sm hover:text-sky-700' >No tienes cuenta? <span>Regitrate</span></Link>
          <Link to={'/register'} className='block text-center text-slate-500 uppercase text-sm hover:text-sky-700' >Olvido su contraseña?</Link>
        </nav>
      </>
      )}}
      </Formik>
    </>
  )
}

export default Formulario