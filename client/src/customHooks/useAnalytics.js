import React from 'react';
import { useState, useEffect } from 'react';

export function useAnalytics(endpoints, dependencies = []) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, dependencies);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const promises = Object.entries(endpoints).map(async ([key, url]) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${key}`);
        return [key, await response.json()];
      });

      const results = await Promise.all(promises);
      const newData = Object.fromEntries(results);
      setData(newData);
    } catch (err) {
      setError(err.message);
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData };
}