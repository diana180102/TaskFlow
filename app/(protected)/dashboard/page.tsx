import DashboardLayaout from "@/components/layaout/dashboardLayaout";
import { ClipboardList, FolderTree } from "lucide-react";
import { archivo_black, monserrat } from "@/ui/fonts";

import React from "react";
import DonutChart from "@/components/DonurtChart";

export default async function Dashboard() {
  return (
    <DashboardLayaout>
      <section className=" w-full max-w-[1500px] rounded-md shadow-sm flex flex-col gap-8 items-center">
        <div className="header bg-zinc-50 p-4 flex justify-start rounded-lg shadow-md w-full">
          <h2
            className={` text-4xl  xl:text-5xl font-extrabold m-4  tracking-wider text-orange-600  ${archivo_black.className}`}
          >
            DASHBOARD
          </h2>
        </div>

        <div className="bg-zinc-50 w-full rounded-md shadow-sm flex flex-col items-center">
          {/* Totales */}
          <div className="total flex flex-col md:flex-row gap-8 mt-8">
            <div className="card w-[280px] h-[170px]  flex flex-row justify-center items-center gap-4 bg-orange-500">
              <div className="details flex flex-row justify-between items-center gap-8 ">
                <div className="title flex flex-col items-center gap-2">
                  <ClipboardList
                    className="text-center text-gray-800  "
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
            <div className="card w-[280px] h-[170px]  flex flex-row justify-center items-center gap-4 bg-orange-500">
              <div className="details flex flex-row justify-between items-center gap-8 ">
                <div className="title flex flex-col items-center gap-2">
                  <FolderTree
                    className="text-center text-gray-800  "
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
          <div className="Projects flex flex-col  md:flex-row items-center md:items-start  gap-8  py-8">
            <div className="card flex flex-col justify-center items-center  w-[420px] md:w-[380px] h-[433px]  xl:w-[480px] bg-[#061e2b]">
              <h2 className="text-white tracking-wide mb-4 font-bold text-xl">
                Distribución Porcentual del Estado de Proyectos
              </h2>
              <DonutChart />
            </div>
            <div className="card flex flex-col justify-center items-center  w-[420px] md:w-[380px] h-[433px]  xl:w-[480px] bg-[#061e2b]">
              <h2 className="text-white tracking-wide mb-4 font-bold text-xl">
                Estado de Proyectos: Conteo Total
              </h2>
              <DonutChart />
            </div>
          </div>
          {/* Task */}
          <div className="Projects flex flex-col  md:flex-row items-center md:items-start  gap-8  py-8">
            <div className="card flex flex-col justify-center items-center  w-[420px] md:w-[380px] h-[433px]  xl:w-[480px] bg-[#061e2b]">
              <h2 className="text-white tracking-wide mb-4 font-bold text-xl">
                Distribución Porcentual del Estado de Proyectos
              </h2>
              <DonutChart />
            </div>
            <div className="card flex flex-col justify-center items-center  w-[420px] md:w-[380px] h-[433px]  xl:w-[480px] bg-[#061e2b]">
              <h2 className="text-white tracking-wide mb-4 font-bold text-xl">
                Estado de Proyectos: Conteo Total
              </h2>
              <DonutChart />
            </div>
          </div>
        </div>
      </section>
    </DashboardLayaout>
  );
}
