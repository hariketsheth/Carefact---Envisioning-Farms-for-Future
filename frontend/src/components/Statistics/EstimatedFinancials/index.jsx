import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

//import * as Analysis from "analysis"

import './style.scss';

const EstimatedFinancials = (props) => {

  const result = Analysis.determineSpendingAndRevenue(props.statsData)
  
  const data = [
    {
      name: 'Spring 2023',
    },
    {
      name: 'Summer 2023',
    },
    {
      name: 'Fall 2023',
    },
    {
      name: 'Winter 2023',
    },
  ];

  for (let j = 0; j < data.length; j++) {
      data[j].spending = -result.spending[j].toFixed(2)
      data[j].revenue = result.revenue[j].toFixed(2)
  }

  return (
    <div className="EstimatedFinancials">
      <h3 className="stat-title">Estimated Financials</h3>
      <p className="sub-title">Based off location and current harvest</p>
      <ResponsiveContainer width="99%" aspect={1.5}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            allowDataOverflow={true}
            tick={{ fontSize: 10 }}
            interval={0}
          />
          <YAxis unit="$" />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="spending" fill="#FF1F1F" />
          <Bar dataKey="revenue" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EstimatedFinancials;
