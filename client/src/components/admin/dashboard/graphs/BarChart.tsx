"use client"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
    //   title: {
    //     display: true,
    //     text: 'Total Orders'
    //   }
    }
  };
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr','Jan', 'Feb', 'Mar', 'Apr','Jan', 'Feb', 'Mar', 'Apr'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56,65, 59, 80, 81, 56,65, 59, 80, 81, 56],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(59, 130, 246, 1)'
      }
    ]
  };
  
  export default function BarChart() {
    return (
      <div className="p-4">
        <Bar options={options} data={data} />
      </div>
    );
  }
  