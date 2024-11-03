"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faGauge, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

function Aside() {
    return ( 
<aside className=" w-[20%] md:w-[19%] lg:w-[15%] 2xl:w-[10%]   bg-[#222226] p-4 flex flex-col justify-between items-center lg:items-start">
   <div className="top flex flex-col gap-10 items-center  ">
           
    <p className={`text-md xl:text-2xl mt-4 text-[#fd7834] font-extrabold `}>TaskFlow</p>
            <div className="links flex flex-col gap-6">
                <Link className="text-gray-300 flex flex-row justify-center md:justify-start " href={`/dashboard`}> 
                    <FontAwesomeIcon className="mr-2 text-2xl" icon={faGauge} />
                    <p className="hidden xl:block lg:text-lg ">Dashboard</p></Link>
                <Link className="text-gray-300 flex flex-row justify-center md:justify-start " href={`/dashboard/projects`}> 
                    <FontAwesomeIcon className="mr-2 text-2xl" icon={faBarsProgress} />
                    <p className="hidden xl:block lg:text-lg ">Projects</p>
                </Link>
            </div>
        </div>

        <Button className="text-[#FD8D3C] flex flex-row justify-center md:justify-start mb-4" onClick={() => signOut({callbackUrl:"/auth/login"})}> 
            <FontAwesomeIcon  className="mr-2 text-2xl" icon={faRightFromBracket} />
             <p className="hidden md:block">Sign Out</p>
        </Button>
        
    </aside> 
    );
}

export default Aside;