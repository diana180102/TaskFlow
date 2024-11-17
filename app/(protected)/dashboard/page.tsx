
import DashboardLayaout from "@/components/layaout/dashboardLayaout";
import { ClipboardList, FolderTree } from "lucide-react";
import { archivo_black, monserrat } from "@/ui/fonts";



import React from "react";
import DonutChart from "@/components/DonurtChart";

export default async function Dashboard() {
  

  return (
    <DashboardLayaout>
       <h2
            className={`  text-4xl md:text-5xl xl:text-6xl font-extrabold mt-2 tracking-wider text-orange-400  ${archivo_black.className}`}
          >
            DASHBOARD
          </h2>
      <section className="flex flex-col justify-center items-center my-7  p-4 gap-8 bg-[#222226] rounded-md  w-full  max-w-[1500px] ">
           
           <div className="total flex flex-col md:flex-row gap-8">
             <div className="card w-[280px] h-[170px]  flex flex-row justify-center items-center gap-4 bg-gray-950">
              <div className="details flex flex-row justify-between items-center gap-8 ">
                <div className="title flex flex-col items-center gap-2">
                  <ClipboardList
                    className="text-center text-[#fd413c]  "
                    size={40}
                  />
                  <h4 className="text-white font-semibold text-xl md:text-lg text-center">
                    {" "}
                    Total Tasks
                  </h4>
                </div>
                <div className=" rounded-full w-[50px] h-[50px] flex justify-center items-center">
                  <p className="text-6xl text-center font-bold text-white  ">
                    14
                  </p>
                </div>
              </div>
            </div>

            <div className="card w-[280px] h-[170px]  flex flex-row justify-center items-center gap-4 bg-gray-950">
              <div className="details flex flex-row justify-between items-center gap-8 ">
                <div className="title flex flex-col items-center gap-2">
                  <FolderTree
                    className="text-center text-[#fd7b38]  "
                    size={40}
                  />
                  <h4 className="text-white font-semibold text-xl md:text-lg text-center">
                    {" "}
                    Total Projects
                  </h4>
                </div>
                <div className=" rounded-full w-[50px] h-[50px] flex justify-center items-center">
                  <p className="text-6xl text-center font-bold text-white  ">
                    14
                  </p>
                </div>
              </div>
            </div>
           </div>

           
           {/* Projects */}
          <div className="Projects flex flex-col  lg:flex-row items-center md:items-start  gap-8  py-8">
            
             <div className="card flex flex-col justify-center items-center  w-[430px] md:w-[380px] h-[433px]  xl:w-[480px] bg-gray-950">
                     <h2 className="text-white tracking-wide mb-4 font-bold text-base">Distribución Porcentual del Estado de Proyectos</h2>
                        <DonutChart />
                        </div>
                           <div className="card flex flex-col justify-center items-center  w-[430px] md:w-[380px] h-[433px]  xl:w-[480px] bg-gray-950">
                             <h2 className="text-white tracking-wide mb-4 font-bold text-lg">Estado de Proyectos: Conteo Total</h2>
                            <DonutChart />
                           </div>
             
            
          </div>
           
           {/* Tasks */}
          <div className="Task flex flex-col  lg:flex-row items-center md:items-start  gap-8  py-8">
            
             <div className="card flex flex-col justify-center items-center  w-[430px] md:w-[380px] h-[433px]  xl:w-[480px] bg-gray-950">
                     <h2 className="text-white tracking-wide mb-4 font-bold text-base">Distribución Porcentual del Estado de Proyectos</h2>
                        <DonutChart />
                        </div>
                           <div className="card flex flex-col justify-center items-center  w-[430px] md:w-[380px] h-[433px]  xl:w-[480px] bg-gray-950">
                             <h2 className="text-white tracking-wide mb-4 font-bold text-lg">Estado de Proyectos: Conteo Total</h2>
                            <DonutChart />
                           </div>
             
            
          </div>
        
      </section>
    </DashboardLayaout>
  );
}
