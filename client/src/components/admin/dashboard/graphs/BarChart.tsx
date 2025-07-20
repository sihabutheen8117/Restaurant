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
import { useQuery } from '@tanstack/react-query'
import { get_dashboard_analytics_orders_customers } from '@/reactQuery/queries'


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
    // title: {
    //   display: true,
    //   text: 'Total Orders'
    // }
  },
  scales: {
    y: {
      beginAtZero: true,         // ✅ Start Y-axis from 0
      ticks: {
        stepSize: 1,             // ✅ Increment ticks by 1
        callback: function(value:any) {
          return Number.isInteger(value) ? value : null; // ✅ Show only integers
        }
      }
    }
  }
};

// Define both day and month labels
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

export default function BarChart(props: { range: string }) {
  const analytics_query = useQuery({
      queryKey: ["admin_analytics_customers", props.range ], 
      queryFn: () => get_dashboard_analytics_orders_customers({
        range:  props.range
      })
    });

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); 
  const totalDays = new Date(year, month + 1, 0).getDate();  

  const labels = props.range === "1" ? ( totalDays == 31 ? dayLabels : dayTLabel ) : props.range == "3" ? quatLabels : props.range =="6" ? halfLabels : YearLabels;
  const data = analytics_query.isSuccess ? {
    labels : analytics_query.data.data.labels,
    datasets: analytics_query.data.data.datasets
  } : {
    labels : labels,
    datasets: [
      {
        label: 'Customers',
        data: labels.map(() => Math.floor(Math.random() * 100)),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(59, 130, 246, 1)'
      }
    ]
  };

  return (
    <div className="p-4">
      <Bar options={options} data={data} />
    </div>
  );
}
