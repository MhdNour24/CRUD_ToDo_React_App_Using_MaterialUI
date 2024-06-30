import { createContext, useState } from "react";
import MySnackBar from '../components/MySnackBar';


export const ToastContext=createContext({});

export function ToastPorvider({children}) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] =useState("");
    function showHideToast(message) {
        setOpen(true);
        setMessage(message);
        setTimeout(() => {
          setOpen(false);
        }, 1500);
    }

    return (
        <ToastContext.Provider value={{showHideToast:showHideToast}}>
            <MySnackBar open={open} message={message}/>
            {children}
        </ToastContext.Provider>
    )
}