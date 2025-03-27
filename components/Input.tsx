import { lexen } from "@/ui/fonts";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    type?: string
}

function Input({className, type = 'text', ...delegated}:InputProps) {
    
   const classname = className || "input-default";

     return ( 
    <input  className={`input-default placeholder:${lexen.className} font-extralight`} type={type}  {...delegated} /> 
    );
}

export default Input;
