import { useState, useEffect, createContext } from "react";
import { ClientHttp } from "../../services/client_http";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

  const navigate = useNavigate() 

  const [usuario, setUsuario] = useState({});
  const [cargando, setCargando] = useState(true);
  const [config, setConfig] = useState({});

  useEffect(() => {
    const autenticarUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false)
        return
      }
          
      const config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }

      setConfig(config)

      try {
        const result = await ClientHttp.get(`/register/my_profile/`, config);
        setUsuario(result.data);
        navigate('/Layout')
      } catch (error) {
    
        console.log(error);
    
      }
      setCargando(false)
    }
    autenticarUser()
  }, []);
    
  return (
    <AuthContext.Provider value={{
      setUsuario,
      usuario,
      cargando,
      config
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export{
    AuthProvider
}

export default  AuthContext