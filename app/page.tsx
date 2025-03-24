"use client"
import Button from "@/components/Button";
import Image from "next/image";
import { lexen } from "@/ui/fonts";
import Link from "next/link";


export default function Home() {
  return (
  
    <div className=" bg-[#101214] ">
      <main className="min-h-screen m-auto flex items-center justify-center">
        <section className="flex flex-col-reverse lg:flex-row  items-center justify-center p-4 ">
          <div className="left-section flex flex-col justify-center mx-4 gap-4 w-1/2">
            <h1 className={`text-[#13F287] text-5xl xl:text-7xl ${lexen.className} font-bold`}>TASKFLOW</h1>
            <p className={`text-white text-2xl ${lexen.className} font-medium`}>Bienvenidos a su organizador de proyectos donde podrás tener visión del progreso de tus proyectos</p>

            <div className="container-buttons flex flex-row gap-4 w-full">
              <Link href={"/auth/register"}>
                <Button 
                className={`btn-green ${lexen.className}`}> Register 
                </Button>
              </Link>
              
              <Link href={"/auth/login"}>
                <Button 
                
                className={`btn-green ${lexen.className}`}> Login 
                </Button>
              </Link>
            </div>

          </div>
          <div className="right-section w-1/2 flex items-center justify-center ">
            <Image
            
            src={"/assets/images/image1.svg"} 
            alt="image-home" 
            width={500} 
            height={500} 
            className={`w-[600px] h-[600px]`}></Image>
          </div>
        </section>
      </main>
     
    </div>
   
  );
}
