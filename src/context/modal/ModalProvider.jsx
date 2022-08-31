import { useState, useEffect, createContext } from "react";
import { ClientHttp } from "../../services/client_http";
import { useNavigate } from "react-router-dom";

const ModalContext = createContext();

const ModalProvider = ({children}) => {

  const [modal, setModal] = useState(false);

  return (
    <ModalContext.Provider value={{
        setModal,
        modal
    }}>
      {children}
    </ModalContext.Provider>
  )
}

export{
    ModalProvider
}

export default  ModalContext