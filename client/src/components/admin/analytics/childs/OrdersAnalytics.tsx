"use client"

import { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { ShoppingBag, TrendingUp, Users } from 'lucide-react';
import StatCard from '@/components/analytics/StatCard';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

export default function OrdersAnalytics() {
  const [data, setData] = useState({
    overview: {},
    trends: [],
    customerInsights: {},
    foodAnalysis: {}
  });
  const [loading, setLoading] = useState(true);
  const [trendPeriod, setTrendPeriod] = useState('day');

  useEffect(() => {
    fetchOrdersData();
  }, [trendPeriod]);

  const fetchOrdersData = async () => {
    try {
      const [overviewRes, trendsRes, customerRes, foodRes] = await Promise.all([
        fetch('http://localhost:3001/orders/overview'),
        fetch(`http://localhost:3001/orders/trends?period=${trendPeriod}`),
        fetch('http://localhost:3001/orders/customer-insights'),
        fetch('http://localhost:3001/orders/food-analysis')
      ]);

      const [overview, trends, customerInsights, foodAnalysis] = await Promise.all([
        overviewRes.json(),
        trendsRes.json(),
        customerRes.json(),
        foodRes.json()
      ]);

      setData({
        overview,
        trends: trends.orderTrends || [],
        customerInsights,
        foodAnalysis
      });
    } catch (error) {
      console.error('Error fetching orders data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Order Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive analysis of orders, trends, and customer behavior</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Orders"
            value={data.overview.totalOrders || 0}
            icon={<ShoppingBag className="h-8 w-8 text-purple-600" />}
            change={`${data.overview.recentOrders || 0} last 7 days`}
          />
          <StatCard
            title="Total Revenue"
            value={`${(data.overview.revenueMetrics?.totalRevenue || 0).toFixed(2)}`}
            icon={<TrendingUp className="h-8 w-8 text-green-600" />}
            change={`${(data.overview.recentRevenue || 0).toFixed(2)} this week`}
          />
          <StatCard
            title="Avg Order Value"
            value={`${(data.overview.revenueMetrics?.avgOrderValue || 0).toFixed(2)}`}
            icon={<TrendingUp className="h-8 w-8 text-blue-600" />}
            change="Per order average"
          />
          <StatCard
            title="Items Sold"
            value={data.overview.revenueMetrics?.totalQuantity || 0}
            icon={<Users className="h-8 w-8 text-yellow-600" />}
            change="Total items"
          />
        </div>

        {/* Order Trends */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Order Trends</h3>
            <select
              value={trendPeriod}
              onChange={(e) => setTrendPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="hour">Hourly</option>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data.trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="orderCount" stroke="#8884d8" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="totalRevenue" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distributions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Order Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.overview.statusDistribution || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(data.overview.statusDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Order Type */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.overview.typeDistribution || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.overview.paymentDistribution || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ _id, percent }) => `${_id ? 'Online' : 'Cash'} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(data.overview.paymentDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Customers by Orders</h3>
            <div className="space-y-3">
              {(data.customerInsights.topCustomersByCount || []).slice(0, 5).map((customer, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-900">{customer.userName || customer._id}</div>
                  <div className="font-bold text-purple-600">{customer.orderCount} orders</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Customers by Revenue</h3>
            <div className="space-y-3">
              {(data.customerInsights.topCustomersByRevenue || []).slice(0, 5).map((customer, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{customer.userName || customer._id}</div>
                    <div className="text-sm text-gray-500">{customer.orderCount} orders</div>
                  </div>
                  <div className="font-bold text-green-600">${customer.totalSpent.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
