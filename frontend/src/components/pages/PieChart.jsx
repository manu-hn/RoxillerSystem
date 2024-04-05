import React, { useState } from 'react';
import { Chart } from "react-google-charts";
import useDataForPieChart from '../../utils/hooks/useDataForieChart.jsx';
import { options } from '../../utils/constants';
import { pieChartData } from '../../utils/constants';
import DropDown from '../assets/DropDown';

const PieChart = () => {
  const [month, setMonth] = useState(1);
  const { pieChart } = useDataForPieChart(month)
  const pieData = pieChartData(pieChart)

  const handleMonthChange = (dropMonth) => {
    setMonth(parseInt(dropMonth));
  };

  return (
    <div className='w-full flex justify-center mt-8'>
      <section className="w-4/5 border shadow-md rounded-lg">
       <h1 className='text-xl font-bold text-center'>Monthly Sales Distribution by Category</h1>
        <section className='flex ml-8'>
          <span className='mr-2'>Showing Data for</span>
          <DropDown handleMonthChange={handleMonthChange} month={month} />
        </section>
        <Chart chartType="PieChart" data={pieData} 
          options={options} width={"100%"}height={"400px"} />
      </section>
    </div>
  )
}

export default PieChart