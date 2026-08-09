import type { ReactElement } from "react";

interface ButtonProps{
     variant :"primary" | "secondary";
     text: string;
     startIcon?: ReactElement;   // ← add the ?
     onClick ?: ()=> void;
     loading ?: boolean;
}

const variantClasses ={
    "primary":"bg-blue-700 text-white ",
    "secondary":"bg-blue-200 text-black"
};

const defaultSize = "px-4 py-2 rounded-md font-light flex items-center"


export function Button({variant,text,startIcon, onClick, loading}:ButtonProps){
  return <button onClick={onClick} className={variantClasses[variant] + " " + defaultSize + ` ${loading? "opacity-45":" "}`} disabled={loading}>
    {startIcon && <div className="pr-2">{startIcon}</div>}
    {text}
  </button>
}