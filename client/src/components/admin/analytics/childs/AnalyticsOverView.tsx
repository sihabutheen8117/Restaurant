"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  ShoppingBag,
  Package,
  TrendingUp,
  DollarSign,
  Activity,
} from 'lucide-react';
import { useQueries } from '@tanstack/react-query';
import {
  overview_users ,
  overview_foods ,
  overview_orders 
} from '@/reactQuery/analyticsQuery'

// Type definitions
type RevenueMetrics = {
  totalRevenue: number;
  avgOrderValue: number;
  totalQuantity: number;
};

type UsersOverview = {
  totalUsers?: number;
  recentUsers?: number;
  usersWithOrders?: number;
  userGrowthRate?: number;
  totalCustomers?: number;
};

type FoodsOverview = {
  activeFoods?: number;
  disabledFoods?: number;
  totalFoods?: number;
  averageRating?: number;
  foodsWithOffers?: number;
  categoryDistribution: { _id: string; count: number }[];
};

type OrdersOverview = {
  totalOrders?: number;
  recentOrders?: number;
  recentRevenue?: number;
  revenueMetrics?: RevenueMetrics;
};

type DashboardData = {
  users: UsersOverview;
  foods: FoodsOverview;
  orders: OrdersOverview;
};

// Props for cards
type StatCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
};

type AnalyticsStat = {
  label: string;
  value: number | string;
};

type AnalyticsCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  stats: AnalyticsStat[];
  view : any
};

export default function AnalyticsOverView(props:any) {
  
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    users: {},
    foods: { categoryDistribution: [] },
    orders: {},
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [usersRes, foodsRes, ordersRes] = await Promise.all([
        fetch('http://localhost:3001/users/overview'),
        fetch('http://localhost:3001/foods/overview'),
        fetch('http://localhost:3001/orders/overview'),
      ]);

      const [users, foods, orders] = await Promise.all([
        usersRes.json(),
        foodsRes.json(),
        ordersRes.json(),
      ]);

      setDashboardData({ users, foods, orders });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into your food delivery business</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={dashboardData.users.totalUsers || 0}
            icon={<Users className="h-8 w-8 text-blue-600" />}
            change={`+${dashboardData.users.recentUsers || 0} this month`}
            changeType="positive"
          />
          <StatCard
            title="Active Foods"
            value={dashboardData.foods.activeFoods || 0}
            icon={<Package className="h-8 w-8 text-green-600" />}
            change={`${dashboardData.foods.disabledFoods || 0} disabled`}
            changeType="neutral"
          />
          <StatCard
            title="Total Orders"
            value={dashboardData.orders.totalOrders || 0}
            icon={<ShoppingBag className="h-8 w-8 text-purple-600" />}
            change={`${dashboardData.orders.recentOrders || 0} last 7 days`}
            changeType="positive"
          />
          <StatCard
            title="Total Revenue"
            value={`$${(dashboardData.orders.revenueMetrics?.totalRevenue || 0).toFixed(2)}`}
            icon={<DollarSign className="h-8 w-8 text-yellow-600" />}
            change={`$${(dashboardData.orders.recentRevenue || 0).toFixed(2)} this week`}
            changeType="positive"
          />
        </div>

        {/* Analytics Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnalyticsCard
            view = { (data:any) => props.view(data) }
            title="Customer Analytics"
            description="Detailed insights into user registration, activity, and behavior patterns"
            icon={<Users className="h-12 w-12 text-blue-600" />}
            href="2"
            stats={[
              { label: 'Total Users', value: dashboardData.users.totalUsers || 0 },
              { label: 'Active Users', value: dashboardData.users.usersWithOrders || 0 },
              { label: 'Growth Rate', value: `${dashboardData.users.userGrowthRate || 0}%` },
            ]}
          />

          <AnalyticsCard
            view = { (data:any) => props.view(data) }
            title="Food Analytics"
            description="Performance metrics for your menu items, ratings, and popularity"
            icon={<Package className="h-12 w-12 text-green-600" />}
            href="1"
            stats={[
              { label: 'Total Foods', value: dashboardData.foods.totalFoods || 0 },
              { label: 'Avg Rating', value: (dashboardData.foods.averageRating || 0).toFixed(1) },
              { label: 'With Offers', value: dashboardData.foods.foodsWithOffers || 0 },
            ]}
          />

          <AnalyticsCard
            view = { (data:any) => props.view(data) }
            title="Order Analytics"
            description="Comprehensive order analysis, trends, and customer insights"
            icon={<Activity className="h-12 w-12 text-purple-600" />}
            href="3"
            stats={[
              { label: 'Total Orders', value: dashboardData.orders.totalOrders || 0 },
              {
                label: 'Avg Order Value',
                value: `$${(dashboardData.orders.revenueMetrics?.avgOrderValue || 0).toFixed(2)}`,
              },
              {
                label: 'Total Revenue',
                value: `$${(dashboardData.orders.revenueMetrics?.totalRevenue || 0).toFixed(0)}`,
              },
            ]}
          />
        </div>

        {/* Recent Activity Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{dashboardData.users.totalCustomers || 0}</div>
              <div className="text-sm text-gray-600">Total Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {dashboardData.foods.categoryDistribution.length || 0}
              </div>
              <div className="text-sm text-gray-600">Food Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {dashboardData.orders.revenueMetrics?.totalQuantity || 0}
              </div>
              <div className="text-sm text-gray-600">Items Sold</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable StatCard component
function StatCard({ title, value, icon, change, changeType }: StatCardProps) {
  const changeColor =
    changeType === 'positive'
      ? 'text-green-600'
      : changeType === 'negative'
      ? 'text-red-600'
      : 'text-gray-600';

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        {icon}
      </div>
      <p className={`text-sm mt-2 ${changeColor}`}>{change}</p>
    </div>
  );
}

// Reusable AnalyticsCard component
function AnalyticsCard({ title, description, icon, href, stats , view }: AnalyticsCardProps) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="text-xl font-semibold text-gray-900 ml-3">{title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-sm text-gray-600">{stat.label}:</span>
              <span className="text-sm font-medium text-gray-900">{stat.value}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 flex items-center text-blue-600 text-sm font-medium"
        onClick={() => view(href)}
        >
          View Details <TrendingUp className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
}

