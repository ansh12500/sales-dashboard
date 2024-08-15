import { useState, useEffect } from 'react';
import { fetchSalesData, fetchTodaySalesData } from '../utils/api';

export const useSalesData = (date1, date2) => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSalesData(date1)
      .then(response => {
        setData1(response.data);
        return fetchSalesData(date2);
      })
      .then(response => {
        setData2(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [date1, date2]);

  return { data1, data2, loading };
};

export const useTodaySalesData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodaySalesData()
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return { data, loading };
};
