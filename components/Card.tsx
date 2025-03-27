import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className: string;
};

function Card({children, className}:CardProps) {
    return ( 
        <div className={`rounded-lg p-4 bg-[#f0fee0] mx-4 shadow-md ${className}`}>
            {children}
        </div> 
    );
}

export default Card;