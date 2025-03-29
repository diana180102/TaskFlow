"use client"
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import React from 'react';

// Cargar ApexCharts solo en el cliente (Next.js no renderiza gráficos en el servidor)
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DonutChartProps {
  pending: number;
  progress: number;
  completed: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ pending, progress, completed }) => {
  // Opciones del gráfico con tipado ApexOptions
  const options: ApexOptions = {
    labels: ['Hechas', 'En Progreso', 'Pendientes'],
    colors: ['#13EA82', '#10C86F', '#0DA65C'],
    legend: {
      position: 'bottom',
      labels: {
      colors: ['#13EA82', '#10C86F', '#0DA65C'], // Cambia el color de los nombres en la leyenda
    }
    
    },
    stroke: {
      show: true,
      width: 0, // Eliminar el borde blanco alrededor de las secciones del gráfico
    },
    dataLabels: {
      enabled: true,
      
      style: {
        colors: ['#282F35'],  // Cambiar el color del label (texto de los porcentajes)
        fontSize: '10px',
        
      },
    },
    tooltip:{
      style:{
        fontSize: '12px'
      }
    },
    chart: {
    width: '100%'
    }
  };

  const series = [completed, progress, pending]; // Datos de ejemplo: Hechas, En Progreso, Pendientes

  

  return (
    <div>
      <Chart 
        className="" 
        options={options} 
        series={series} 
        type="donut" 
        width="100%"  
      />
    </div>
  );
};

export default DonutChart;
