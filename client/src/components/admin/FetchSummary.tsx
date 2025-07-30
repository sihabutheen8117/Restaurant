'use client';

import React from 'react'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { download_summary } from '@/reactQuery/analyticsQuery'

export default function FetchSummary() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const download_mutation = useMutation({
    mutationFn: download_summary,
    onSuccess: (response) => {
      // Handle successful download
      handleFileDownload(response);
    },
    onError: (error) => {
      console.error('Download failed:', error);
      setError('Failed to download orders. Please try again.');
    }
  });

  const handleFileDownload = async (response:any) => {
    try {
      // Get the filename from the response headers (axios format)
      const contentDisposition = response.headers['content-disposition'];
      let filename = 'orders_report.xlsx';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      // Create blob and download (response.data is already a blob with responseType: 'blob')
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('File download failed:', error);
      setError('Failed to process downloaded file. Please try again.');
    }
  };

  const handleDownload = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date cannot be after end date');
      return;
    }

    setError('');

    // Use the mutation instead of direct fetch
    download_mutation.mutate({
      startDate,
      endDate,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Download Orders Report
        </h1>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleDownload}
            disabled={download_mutation.isPending}
            className={`w-full py-2 px-4 rounded-md font-medium text-white transition-colors ${
              download_mutation.isPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {download_mutation.isPending ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Report...
              </div>
            ) : (
              'Download Orders Excel'
            )}
          </button>

          <div className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="font-medium mb-1">Note:</p>
            <p>This report will include only paid orders within the selected date range.</p>
          </div>
        </div>
      </div>
    </div>
  );
}