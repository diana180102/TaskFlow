
import { auth } from "@/auth";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import React from "react";



export default async function Dashboard({children}: Readonly<{children:React.ReactNode}>) {
    
    // const {data:session} = useSession();
    //get data
    const session = await auth();
    console.log("session " + session);

   
     
   

    return (
        <>
     { session &&  
        <div className="w-full h-full bg-[#1B1B1D] flex flex-row ">
           <Aside></Aside>

            <div className="w-full">
                <Header session={session}></Header>
                
                {children}
            </div>
            
           
        </div>
      }
        </>
    );
}