"use client";

import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { Users, UserPlus, Activity } from 'lucide-react';
import StatCard from '@/components/analytics/StatCard';

type TrendData = {
  _id: string;
  totalRegistrations: number;
  customerRegistrations: number;
};

type ActivityDistribution = {
  _id: string;
  count: number;
};

type FoodAnalysis = {
  mostOrderedFoods: {
    _id: string;
    totalQuantity: number;
    orderCount: number;
  }[];
};

type MostActiveUser = {
  user_name: string;
  user_email: string;
  orderCount: number;
  createdAt: string;
};

type OverviewData = {
  totalUsers: number;
  totalAdmins: number;
  totalCustomers: number;
  totalAnonymousUsers: number;
  userGrowthRate: number;
  recentUsers: number;
  usersWithOrders: number;
  usersWithoutOrders: number;
};

type ActivityData = {
  activityDistribution: ActivityDistribution[];
  mostActiveUsers: MostActiveUser[];
};

type UserData = {
  overview: Partial<OverviewData>;
  trends: TrendData[];
  activity: Partial<ActivityData>;
  foodAnalysis?: FoodAnalysis;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function CustomerAnalytics() {
  const [data, setData] = useState<UserData>({
    overview: {},
    trends: [],
    activity: {},
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [timePeriod, setTimePeriod] = useState<'day' | 'week' | 'month' | 'year'>('month');

  useEffect(() => {
    fetchUsersData();
  }, [timePeriod]);

  const fetchUsersData = async () => {
    try {
      const [overviewRes, trendsRes, activityRes] = await Promise.all([
        fetch('http://localhost:3001/users/overview'),
        fetch(`http://localhost:3001/users/registration-trends?period=${timePeriod}`),
        fetch('http://localhost:3001/users/activity')
      ]);

      const [overview, trends, activity] = await Promise.all([
        overviewRes.json(),
        trendsRes.json(),
        activityRes.json()
      ]);


      setData({ overview, trends, activity });
    } catch (error) {
      console.error('Error fetching users data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const userTypeData = [
    { name: 'Customers', value: data.overview.totalCustomers || 0, color: '#0088FE' },
    { name: 'Admins', value: data.overview.totalAdmins || 0, color: '#00C49F' },
    { name: 'Anonymous', value: data.overview.totalAnonymousUsers || 0, color: '#FFBB28' }
  ];

  const userActivityData = [
    { name: 'With Orders', value: data.overview.usersWithOrders || 0, color: '#0088FE' },
    { name: 'Without Orders', value: data.overview.usersWithoutOrders || 0, color: '#FF8042' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">User Analytics</h1>
          <p className="text-gray-600 mt-2">Detailed insights into user behavior and registration patterns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={data.overview.totalUsers || 0}
            icon={<Users className="h-8 w-8 text-blue-600" />}
            change={`${data.overview.userGrowthRate || 0}% growth rate`}
          />
          <StatCard
            title="New Users (30d)"
            value={data.overview.recentUsers || 0}
            icon={<UserPlus className="h-8 w-8 text-green-600" />}
            change="Last 30 days"
          />
          <StatCard
            title="Active Users"
            value={data.overview.usersWithOrders || 0}
            icon={<Activity className="h-8 w-8 text-purple-600" />}
            change="Users with orders"
          />
          <StatCard
            title="Anonymous Users"
            value={data.overview.totalAnonymousUsers || 0}
            icon={<Users className="h-8 w-8 text-yellow-600" />}
            change="Guest checkouts"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Registration Trends</h3>
              <select
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value as 'day' | 'week' | 'month' | 'year')}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalRegistrations" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="customerRegistrations" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.activity.activityDistribution || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userActivityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userActivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Ordered Foods</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Food ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Count</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(data.foodAnalysis?.mostOrderedFoods || []).map((food, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{food._id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{food.totalQuantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{food.orderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Active Users</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(data.activity.mostActiveUsers || []).map((user, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.user_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.user_email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{user.orderCount}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}


