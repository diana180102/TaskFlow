"use client"
import Button from "@/components/Button";
import Image from "next/image";
import { archivo_black } from "@/ui/fonts";

export default function Home() {
  return (
    <div className=" bg-[#1c2135] p-4 min-h-screen">
      <main className="min-h-screen m-auto flex items-center">
        <section className="flex flex-col-reverse lg:flex-row h-full items-center justify-center gap-8 ">
          <div className="left-section flex flex-col justify-center mx-4 gap-4 lg:w-2/6">
            <h1 className={`bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent text-5xl xl:text-7xl ${archivo_black.className} font-extrabold`}>TASKFLOW</h1>
            <p className="text-white text-2xl">Bienvenidos a su organizador de proyectos donde podrás tener visión del progreso de tus proyectos</p>

            <div className="container-buttons flex flex-row gap-4 w-full">
              <Button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"> Register </Button>
              <Button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"> Login </Button>
            </div>

          </div>
          <div className="right-section ">
            <Image 
            src={"/rb_937.png"} 
            alt="image-home" 
            width={500} 
            height={500} 
            className={`w-full`}></Image>
          </div>
        </section>
      </main>
    </div>
  );
}
