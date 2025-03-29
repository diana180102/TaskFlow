"use client "
import { lexen } from "@/ui/fonts";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    type?: "button" | "submit" | "reset";
    children?: React.ReactNode;
}
function Button({children, className = "", ...rest}:ButtonProps) {
    
    const classname = className;

    return ( 
    <button className={`${classname} ${lexen.className} ` } {...rest}>
        {children}
    </button> );
}

export default Button;