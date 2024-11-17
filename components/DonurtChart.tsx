"use client"
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';

// Cargar ApexCharts solo en el cliente (Next.js no renderiza gráficos en el servidor)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DonutChart: React.FC = () => {
  // Opciones del gráfico con tipado ApexOptions
  const options: ApexOptions = {
    labels: ['Hechas', 'En Progreso', 'Pendientes'],
    colors: ['#16DB65', '#00A6ED', '#FF8360'],
    legend: {
      position: 'bottom',
      labels: {
      colors: ['#16DB65', '#00A6ED', '#FF8360'], // Cambia el color de los nombres en la leyenda
    }
    },
    stroke: {
      show: true,
      width: 0, // Eliminar el borde blanco alrededor de las secciones del gráfico
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#FFF'], // Cambiar el color del label (texto de los porcentajes)
      },
    },
    chart: {
    width: '100%'
  }
  };

  const series = [45, 30, 25]; // Datos de ejemplo: Hechas, En Progreso, Pendientes

  

  return (
    <div>
      <Chart className="" options={options} series={series} type="donut" width="280" />
    </div>
  );
};

export default DonutChart;
