import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch('/api/get-documents')
    .then((res) => res.json())
    .then((res) => {
      setData(res);
    })
  }, []);
  // console.log('data =====>', data);
  return(
    <div>
      <h1>Hola soy el Dashboard</h1>
      <ul>
        {
          data.docs.map((doc) => (
            <li>{doc.name}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default Dashboard;
