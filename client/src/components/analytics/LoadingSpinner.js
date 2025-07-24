import React from "react";

export function LoadingSpinner({ color = 'blue-600' }) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className={`animate-spin rounded-full h-32 w-32 border-b-2 border-${color}`}></div>
      </div>
    );
  }