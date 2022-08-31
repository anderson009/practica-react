import React from 'react'

const Btn = ({children, disabled, bg, onClick}) => {
  return (
    <div>
        <button disabled={disabled}  type="submit" className={`w-full h-full ${bg}  text-white  rounded-lg  text-center`} onClick={onClick} >
            {children}
        </button>
    </div>
  )
}

export default Btn