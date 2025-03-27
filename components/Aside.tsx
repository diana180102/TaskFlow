"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsProgress, faGauge, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { lexen } from "@/ui/fonts";

function Aside() {
return ( 
<aside className="  md:w-[19%] lg:w-[15%] 2xl:w-[10%] bg-[#13F287]  flex flex-col justify-between items-center xl:items-start">
    <div className="top flex flex-col gap-10 items-center w-full ">
            
        <p className={`text-md md:text-xl xl:text-2xl mt-4 ml-4 text-[#101214] font-extrabold ${lexen.className} self-start `}>TaskFlow</p>
                <div className="links flex flex-col gap-4  w-full">
                    <Link className={`text-[#282F35] flex flex-col md:flex-row justify-center md:justify-start items-start gap-1 ${lexen.className} hover:bg-[#B5FF57] w-full p-4 py-2 `} href={`/dashboard`}> 
                        <FontAwesomeIcon className="mr-2 text-2xl" icon={faGauge} />
                        <p className=" lg:text-lg text-center ">Dashboard</p></Link>
                    <Link className={`text-[#282F35] flex flex-col md:flex-row justify-center md:justify-start items-start gap-1 ${lexen.className} hover:bg-[#B5FF57] w-full p-4 py-2 `} href={`/dashboard/projects`}> 
                        <FontAwesomeIcon className="mr-2 text-2xl" icon={faBarsProgress} />
                        <p className="lg:text-lg text-center ">Projects</p>
                    </Link>
                </div>
            </div>

            <Button className={`text-[#282F35] hover:text-[#101214] flex flex-row justify-center md:justify-start mb-4 p-4 py-2`} onClick={() => signOut({callbackUrl:"/auth/login"})}> 
                <FontAwesomeIcon  className="mr-2 text-2xl" icon={faRightFromBracket} />
                <p className="hidden md:block">Sign Out</p>
            </Button>
            
        </aside> 
    );
}

export default Aside;