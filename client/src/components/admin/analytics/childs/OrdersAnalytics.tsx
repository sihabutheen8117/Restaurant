"use client"

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { ShoppingBag, TrendingUp, Users } from 'lucide-react';
import StatCard from '@/components/analytics/StatCard';
import {
  overview_orders,
  orders_trends,
  orders_customer_insights,
  orders_food_analysis
} from '@/reactQuery/analyticsQuery'
import { useQuery } from '@tanstack/react-query';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

export default function OrdersAnalytics() {
  const [trendPeriod, setTrendPeriod] = useState('day');

  // React Query implementations
  const overviewQuery = useQuery({
    queryKey: ["overview_orders"],
    queryFn: overview_orders
  });

  const trendsQuery = useQuery({
    queryKey: ["orders_trends", trendPeriod],
    queryFn: () => orders_trends(trendPeriod)
  });

  const customerInsightsQuery = useQuery({
    queryKey: ["orders_customer_insights"],
    queryFn: orders_customer_insights
  });

  const foodAnalysisQuery = useQuery({
    queryKey: ["orders_food_analysis"],
    queryFn: orders_food_analysis
  });

  // Check if any query is loading
  const isLoading = overviewQuery.isLoading || trendsQuery.isLoading || 
                   customerInsightsQuery.isLoading || foodAnalysisQuery.isLoading;

  // Check if any query has error
  const hasError = overviewQuery.error || trendsQuery.error || 
                   customerInsightsQuery.error || foodAnalysisQuery.error;

  // Extract data from queries
  const overviewData = overviewQuery.data || {};
  const trendsData = trendsQuery.data?.orderTrends || [];
  const customerInsightsData = customerInsightsQuery.data || {};
  const foodAnalysisData = foodAnalysisQuery.data || {};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error loading data</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
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
            value={overviewData.totalOrders || 0}
            icon={<ShoppingBag className="h-8 w-8 text-purple-600" />}
            change={`${overviewData.recentOrders || 0} last 7 days`}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${(overviewData.revenueMetrics?.totalRevenue || 0).toFixed(2)}`}
            icon={<TrendingUp className="h-8 w-8 text-green-600" />}
            change={`₹${(overviewData.recentRevenue || 0).toFixed(2)} this week`}
          />
          <StatCard
            title="Avg Order Value"
            value={`₹${(overviewData.revenueMetrics?.avgOrderValue || 0).toFixed(2)}`}
            icon={<TrendingUp className="h-8 w-8 text-blue-600" />}
            change="Per order average"
          />
          <StatCard
            title="Items Sold"
            value={overviewData.revenueMetrics?.totalQuantity || 0}
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
            <LineChart data={trendsData}>
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
                  data={overviewData.statusDistribution || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(overviewData.statusDistribution || []).map((entry, index) => (
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
              <BarChart data={overviewData.typeDistribution || []}>
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
                  data={overviewData.paymentDistribution || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ _id, percent }) => `${_id ? 'Online' : 'Cash'} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(overviewData.paymentDistribution || []).map((entry, index) => (
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
              {(customerInsightsData.topCustomersByCount || []).slice(0, 5).map((customer, index) => (
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
              {(customerInsightsData.topCustomersByRevenue || []).slice(0, 5).map((customer, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{customer.userName || customer._id}</div>
                    <div className="text-sm text-gray-500">{customer.orderCount} orders</div>
                  </div>
                  <div className="font-bold text-green-600">₹{customer.totalSpent.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}