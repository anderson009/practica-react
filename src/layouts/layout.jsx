import React from 'react'
import { Outlet, Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";

const layout = () => {
  const {usuario, cargando} = useAuth();

  if (cargando) return 'cargando'
  
  return (
    <>
    {usuario._id ?

      <div className='md:min-h-screen bg-gradient-to-r from-slate-300 '>

        <div>

          <nav className="bg-white dark:bg-black dark:text-white flex flex-col md:flex-row items-center md:justify-between px-10 py-4 border-b border-b-gray-60 shadow-sm  ">
            <div>
              <h2 className="text-3xl font-bold">
                <a>My <span className="text-blue-600">B</span>rand</a>
              </h2>
            </div>
            <div className="mt-5 md:mt-0">
              <ul className="flex flex-col md:flex-row md:space-x-5 w-full items-center">

                <li> 
                  <Link
                    to={'/Layout/'} className="font-semibold tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
                    >Inicio
                  </Link>
                </li>

                <li>
                  <Link
                    to={'/perfil'} className="font-semibold tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
                    >Balance
                  </Link>
                </li>

                <li>
                  <Link
                    to={'/perfil'} className="font-semibold tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
                    >Deudas
                  </Link>
                </li>

                <li>
                  <Link
                    to={'inventario'} className="font-semibold tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
                    >Inventario
                  </Link>
                </li>

                <li>
                  <Link
                    to={'perfil'} className="font-semibold tracking-tight block cursor-pointer p-2 hover:text-blue-500 transition-colors duration-300"
                    >Perfil
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
  
          <Outlet />
  
        </div>
      </div>

      : <Navigate to='/' />
    }
    </>

  )
}

export default layout