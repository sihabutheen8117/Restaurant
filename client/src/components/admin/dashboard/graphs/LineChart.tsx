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

const dayLabels = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
];

const dayTLabel = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
];

const quatLabels = ['Jan', 'Feb', 'Mar'];
const halfLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const YearLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' , 'Aug' ,'Sep' , 'Oct' , 'Nov' , 'Dec'];

export default function LineChart(props : any) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); 
  const totalDays = new Date(year, month + 1, 0).getDate();  

  const labels = props.range === "1" ? ( totalDays == 31 ? dayLabels : dayTLabel ) : props.range == "3" ? quatLabels : props.range =="6" ? halfLabels : YearLabels;

  const data: ChartData<'line'> = {
    labels: labels,
    datasets: [
      {
        label: 'Orders',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="p-4">
      <Line options={options} data={data} />
    </div>
  );
}
