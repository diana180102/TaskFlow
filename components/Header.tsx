"use client";

interface HeaderProps {
  session: Session;
}

import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Header({ session }: HeaderProps) {
    
    //  const { data: session, status } = useSession();

    
    
    return ( 
    <div>
        <p>Nombre usuario {session?.user?.email}</p>
        <button onClick={() => signOut({callbackUrl:"/auth/login"})}>Sign Out</button>
    </div> );
}

export default Header;