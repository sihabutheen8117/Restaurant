
import React from "react";

export function FilterPanel({ filters, onFilterChange, onApplyFilters, onResetFilters }) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filters.map((filter, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {filter.label}
              </label>
              {filter.type === 'select' ? (
                <select
                  value={filter.value}
                  onChange={(e) => onFilterChange(filter.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  {filter.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : filter.type === 'date' ? (
                <input
                  type="date"
                  value={filter.value}
                  onChange={(e) => onFilterChange(filter.key, e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type="text"
                  value={filter.value}
                  onChange={(e) => onFilterChange(filter.key, e.target.value)}
                  placeholder={filter.placeholder}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onResetFilters}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reset
          </button>
          <button
            onClick={onApplyFilters}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
        </div>
      </div>
    );
  }