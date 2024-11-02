"use client";

interface HeaderProps {
  session: Session;
}

import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";


import { useSelector } from "react-redux";
import { RootState } from '../redux/store';


function Header({ session }: HeaderProps) {
    
    //  const { data: session, status } = useSession();

   

  

    
    
    return ( 
    <header className="bg-[#1c2135] w-full ">
        <p>Nombre usuario {session?.user?.email} {session?.user?.name} </p>
        <button onClick={() => signOut({callbackUrl:"/auth/login"})}>Sign Out</button>
    </header> );
}

export default Header;