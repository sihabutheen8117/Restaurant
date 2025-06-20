'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    // title: { display: true, text: 'Total Revenue' , position :'top' }
  }
};

const data: ChartData<'line'> = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Users',
      data: [50, 80, 180, 260, 400],
      borderColor: 'rgba(16, 185, 129, 1)', // Tailwind green-500
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      fill: true,
      tension: 0.4
    }
  ]
};

export default function LineChart() {
  return (
    <div className="p-4">
      <Line options={options} data={data} />
    </div>
  );
}
