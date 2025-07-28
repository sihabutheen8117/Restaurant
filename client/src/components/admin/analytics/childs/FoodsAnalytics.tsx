"use client"

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import { Package, Star, TrendingUp, DollarSign } from 'lucide-react';
import StatCard from '@/components/analytics/StatCard';

type CategoryDistribution = {
  _id: string;
  count: number;
  percent?: number;
};

type PriceAnalysis = {
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
};

type Overview = {
  totalFoods?: number;
  activeFoods?: number;
  averageRating?: number;
  totalRatedFoods?: number;
  foodsWithOffers?: number;
  priceAnalysis?: PriceAnalysis;
  categoryDistribution?: CategoryDistribution[];
};

type PopularFood = {
  food_name: string;
  category: string;
  price: number;
  totalOrders: number;
  rating_stars?: number;
  reviews?: unknown[]; // You can replace unknown with a proper type if needed
};

type Popular = {
  popularFoods?: PopularFood[];
  bestRatedFoods?: PopularFood[];
};

type PerformanceItem = {
  food_name: string;
  category: string;
  price: number;
  totalOrders: number;
  totalRevenue: number;
  rating_stars?: number;
  isDisable?: boolean;
};

type CategoryPerformance = {
  _id: string;
  totalRevenue: number;
};

type Performance = {
  categoryPerformance?: CategoryPerformance[];
  foodsPerformance?: PerformanceItem[];
};

type AnalyticsData = {
  overview: Overview;
  popular: Popular;
  performance: Performance;
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1'];

export default function FoodsAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    overview: {},
    popular: {},
    performance: {}
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFoodsData();
  }, []);

  const fetchFoodsData = async () => {
    try {
      const [overviewRes, popularRes, performanceRes] = await Promise.all([
        fetch('http://localhost:3001/foods/overview'),
        fetch('http://localhost:3001/foods/popular'),
        fetch('http://localhost:3001/foods/performance')
      ]);

      const [overview, popular, performance] = await Promise.all([
        overviewRes.json(),
        popularRes.json(),
        performanceRes.json()
      ]);

      setData({ overview, popular, performance });
    } catch (error) {
      console.error('Error fetching foods data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Food Analytics</h1>
          <p className="text-gray-600 mt-2">Performance insights for your menu items</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Foods"
            value={data.overview.totalFoods || 0}
            icon={<Package className="h-8 w-8 text-green-600" />}
            change={`${data.overview.activeFoods || 0} active`}
          />
          <StatCard
            title="Average Rating"
            value={(data.overview.averageRating || 0).toFixed(1)}
            icon={<Star className="h-8 w-8 text-yellow-600" />}
            change={`${data.overview.totalRatedFoods || 0} rated items`}
          />
          <StatCard
            title="Foods with Offers"
            value={data.overview.foodsWithOffers || 0}
            icon={<TrendingUp className="h-8 w-8 text-blue-600" />}
            change="Active promotions"
          />
          <StatCard
            title="Avg Price"
            value={`${(data.overview.priceAnalysis?.avgPrice || 0).toFixed(2)}`}
            icon={<DollarSign className="h-8 w-8 text-purple-600" />}
            change={`${data.overview.priceAnalysis?.minPrice || 0} - ${data.overview.priceAnalysis?.maxPrice || 0}`}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.overview.categoryDistribution || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ _id, percent }) => `${_id} ${(percent! * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(data.overview.categoryDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Performance */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Revenue Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.performance.categoryPerformance || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="totalRevenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Foods Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Most Ordered Foods */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Ordered Foods</h3>
            <div className="space-y-3">
              {(data.popular.popularFoods || []).slice(0, 5).map((food, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{food.food_name}</div>
                    <div className="text-sm text-gray-500">{food.category} • ${food.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{food.totalOrders} orders</div>
                    <div className="text-sm text-gray-500">⭐ {food.rating_stars || 'N/A'}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Best Rated Foods */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Best Rated Foods</h3>
            <div className="space-y-3">
              {(data.popular.bestRatedFoods || []).slice(0, 5).map((food, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{food.food_name}</div>
                    <div className="text-sm text-gray-500">{food.category} • ${food.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-600">⭐ {food.rating_stars}</div>
                    <div className="text-sm text-gray-500">{food.reviews?.length || 0} reviews</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Food Performance Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Food Performance Overview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(data.performance.foodsPerformance || []).slice(0, 10).map((food, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{food.food_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${food.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{food.totalOrders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${food.totalRevenue.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {food.rating_stars ? `⭐ ${food.rating_stars}` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          food.isDisable ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {food.isDisable ? 'Disabled' : 'Active'}
                      </span>
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

