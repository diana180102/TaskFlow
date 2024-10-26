import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    type?: string
}

function Input({className, type = 'text', ...delegated}:InputProps) {
    
   const classname = className || "input-default";

     return ( 
    <input {...delegated} className={classname} type={type}  /> 
    );
}

export default Input;