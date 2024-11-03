"use client";

interface HeaderProps {
  session: Session;
}

import { Session } from "next-auth";
import Image from "next/image";



function Header({ session }: HeaderProps) {
    
;

   
    const image = session.user?.image === '' ? "/assets/images/profile.png": session.user?.image;
  

    
    
    return ( 
    <header className="bg-[##1B1B1D] w-full text-white flex items-end flex-col p-4 gap-4  ">
        <div className="profile flex gap-4 border border-zinc-800 hover:bg-[#32323D] p-2 rounded-lg ">
          <div className="profile-details">
            <p className="font-bold">{session?.user?.name}</p>
            <p className="text-sm"> {session?.user?.email}  </p>
          </div>
          <Image className="rounded-full  w-14 h-14" src="/assets/images/profile.png" width={300} height={300} alt="profile-photo"></Image>
        </div>
        <div className="w-[95%] h-[1px] bg-zinc-700">
          
        </div>
       
    </header> );
}

export default Header;