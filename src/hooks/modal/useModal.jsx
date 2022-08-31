import { useContext } from "react";
import  ModalContext from "../../context/modal/ModalProvider";

const useModal = () => {
    return useContext(ModalContext)
}

export default useModal