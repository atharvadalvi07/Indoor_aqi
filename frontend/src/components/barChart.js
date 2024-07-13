import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Co2BarChart = ({ co2Data }) => {
  const categories = [
    { label: 'Acceptable', range: [0, 800], color: '#00B050' },
    { label: 'Moderate', range: [800, 1200], color: '#FFA500' },
    { label: 'Poor', range: [1200, 1400], color: '#FF8200' },
    { label: 'Very Poor', range: [1400, 2000], color: '#EF3340' },
    { label: 'Severe', range: [2000, Infinity], color: '#000000' },
  ];


  const categoryCounts = categories.map(category => ({
    name: category.label,
    hours: 0,
    fill: category.color
  }));

 
  const filteredData = co2Data.filter(data => {
    const date = new Date(data.time);
    const hour = date.getHours();
    const day = date.getDay();
  
    return hour >= 8 && hour < 20 && day >= 1 && day <= 5;
  });

 
  filteredData.forEach(data => {
    const co2Level = data.co2conc;
    for (const category of categories) {
      if (co2Level >= category.range[0] && co2Level < category.range[1]) {
        categoryCounts.find(c => c.name === category.label).hours++;
        break;
      }
    }
  });

  return (
    <div>
      <ResponsiveContainer width="90%" height={250}>
      <BarChart width={700} height={300} data={categoryCounts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: 'Air quality during office hours', angle: -90, position: 'insideBottomLeft', offset: 6 }} />
        <Tooltip />
        
        <Bar dataKey="hours" fill="#8884d8" barSize={40}/>
      </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Co2BarChart;
