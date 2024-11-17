
import { auth } from "@/auth";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import React from "react";



export default async function DashboardLayaout({children}: Readonly<{children:React.ReactNode}>) {
    
    // const {data:session} = useSession();
    //get data
    const session = await auth();
    console.log("session " + session);

   
     
   

    return (
        <>
     { session &&  
        <div className=" w-full bg-[#1B1B1D] flex flex-row min-w-[600px] min-h-screen  ">
           <Aside></Aside>

            <div className="w-full flex flex-col items-center  ">
                <Header session={session}></Header>
              <div className="flex flex-col items-center p-4  w-full ">
                {children}
                </div>   
            </div>
            
           
        </div>
      }
        </>
    );
}