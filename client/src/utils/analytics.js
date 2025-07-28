export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  export const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };
  
  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  export const formatPercentage = (value, total) => {
    if (total === 0) return '0%';
    return `${((value / total) * 100).toFixed(1)}%`;
  };
  
  export const getChangeType = (current, previous) => {
    if (current > previous) return 'positive';
    if (current < previous) return 'negative';
    return 'neutral';
  };
  
  export const calculateGrowthRate = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };
  
  // Chart color constants
  export const CHART_COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1',
    '#d084d0', '#ffb347', '#87ceeb', '#dda0dd', '#98fb98'
  ];
  
  export const STATUS_COLORS = {
    pending: '#fbbf24',
    processing: '#3b82f6',
    completed: '#10b981',
    cancelled: '#ef4444',
    delivered: '#059669'
  };