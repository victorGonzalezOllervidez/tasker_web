import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Dashboard = () => {
  const [data, setData] = useState({
    docs: [],
  });

  useEffect(() => {
    fetch('/api/changes').finally(() => {
      const socket = io()

      socket.on('change', (change) => {
        const docIndex = data.docs.findIndex((doc) => doc._id === change.id);
        if (docIndex > -1) {
          setData({
            ...data,
            docs: data.docs.map((doc) => {
              if (doc._id === change.id) {
                return change.doc;
              }
              return doc;
            })
          })
        }
      })

      // socket.on('disconnect', () => {
      //   console.log('disconnect')
      // })
    });

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
            <li key={doc._id}>{doc.name}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default Dashboard;
