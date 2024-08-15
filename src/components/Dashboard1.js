import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import axios from 'axios';

function Dashboard1() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/sales/today')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const chartData = {
    labels: data.map(item => item.productName),
    datasets: [{
      label: 'Sales Amount',
      data: data.map(item => item.salesAmount),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const columns = [
    { headerName: 'Product Name', field: 'productName' },
    { headerName: 'Category', field: 'category' },
    { headerName: 'Quantity Sold', field: 'quantitySold' },
    { headerName: 'Sales Amount', field: 'salesAmount' }
  ];

  return (
    <div>
      <h1>Today's Sales</h1>
      {loading ? <p>Loading...</p> : <Bar data={chartData} />}
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={columns}
          rowData={data}
          pagination
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}

export default Dashboard1;
