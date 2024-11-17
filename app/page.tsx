"use client"
import Button from "@/components/Button";
import Image from "next/image";
import { archivo_black } from "@/ui/fonts";
import Link from "next/link";


export default function Home() {
  return (
  
    <div className=" bg-[#1c2135] p-4 min-h-screen h-full">
      <main className="min-h-screen m-auto flex items-center">
        <section className="flex flex-col-reverse lg:flex-row h-full items-center justify-center gap-8 ">
          <div className="left-section flex flex-col justify-center mx-4 gap-4 lg:w-2/6">
            <h1 className={`bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent text-5xl xl:text-7xl ${archivo_black.className} font-extrabold`}>TASKFLOW</h1>
            <p className="text-white text-2xl">Bienvenidos a su organizador de proyectos donde podrás tener visión del progreso de tus proyectos</p>

            <div className="container-buttons flex flex-row gap-4 w-full">
              <Link href={"/auth/register"}>
                <Button 
                className="btn-cyan"> Register 
                </Button>
              </Link>
              
              <Link href={"/auth/login"}>
                <Button 
                
                className="btn-cyan"> Login 
                </Button>
              </Link>
            </div>

          </div>
          <div className="right-section ">
            <Image
            
            src={"/assets/images/task2.png"} 
            alt="image-home" 
            width={700} 
            height={900} 
            className={`w-full`}></Image>
          </div>
        </section>
      </main>
     
    </div>
   
  );
}
