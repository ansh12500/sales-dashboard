import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function Dashboard2() {
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/sales?date=${date1.toISOString().split('T')[0]}`)
      .then(response => {
        setData1(response.data);
        return axios.get(`/api/sales?date=${date2.toISOString().split('T')[0]}`);
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

  const chartData = {
    labels: data1.map(item => item.productName),
    datasets: [
      {
        label: 'Date 1 Sales',
        data: data1.map(item => item.salesAmount),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      },
      {
        label: 'Date 2 Sales',
        data: data2.map(item => item.salesAmount),
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  const comparisonColumns = [
    { headerName: 'Product Name', field: 'productName' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Date 1 Sales Amount', field: 'salesAmountDate1' },
    { headerName: 'Date 2 Sales Amount', field: 'salesAmountDate2' },
    { headerName: 'Difference', field: 'difference' }
  ];

  return (
    <div>
      <h1>Sales Comparison</h1>
      <DatePicker selected={date1} onChange={date => setDate1(date)} />
      <DatePicker selected={date2} onChange={date => setDate2(date)} />
      {loading ? <p>Loading...</p> : <Line data={chartData} />}
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={comparisonColumns}
          rowData={[/* Comparison data */]}
          pagination
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}

export default Dashboard2;
