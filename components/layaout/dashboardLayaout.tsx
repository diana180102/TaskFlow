
import { auth } from "@/auth";
import Aside from "@/components/Aside";
import Header from "@/components/Header";
import React from "react";



export default async function DashboardLayaout({children}: Readonly<{children:React.ReactNode}>) {
    
    // const {data:session} = useSession();
    //get data
    const session = await auth();
    

   
     
   

    return (
        <>
     { session &&  
        <div className=" w-full bg-gray-200 flex flex-row min-w-[600px] min-h-screen  ">
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