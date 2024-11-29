
import { auth } from "@/auth";
import Header from "@/components/Header";
import { signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";



export default async function ProtectedLayaout({children}:{children:ReactNode}) {
    
   
    //get data
    const session = await auth();
    console.log("session " + session);

   

    if (!session) {
        
        return <div>No estás autenticado</div>; 
    }

    return (
        <>{children}</>
    );
}