import React from 'react';

export default function StatCard({ title, value, icon, change, changeType = 'neutral' }) {
  const changeColor = changeType === 'positive' ? 'text-green-600' : 
                     changeType === 'negative' ? 'text-red-600' : 'text-gray-600';
  
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-gray-400">
          {icon}
        </div>
      </div>
      {change && (
        <p className={`text-sm mt-2 ${changeColor}`}>{change}</p>
      )}
    </div>
  );
}