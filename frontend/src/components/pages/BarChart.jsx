import  { useState } from 'react';
import { Chart } from "react-google-charts";
import useDataForBarChart from '../../utils/hooks/useDataForBarChart';
import DropDown from '../assets/DropDown';
import { barChartData } from '../../utils/constants.jsx';


const BarChart = () => {
  const [month, setMonth] = useState(1);
  const { barChart } = useDataForBarChart(month)

  const dataForBarChart = barChartData(barChart)

  const handleMonthChange = (dropMonth) => {
    setMonth(parseInt(dropMonth));
  };

  return (
    <div className='w-full flex justify-center mt-8'>
      <section className="w-4/5 border shadow-md rounded-lg">
        <h1 className='text-xl font-bold text-center'>Price Range Distribution for Selected Month</h1>
        <section className='flex ml-8'>
          <span className='mr-2'>Showing Data for</span>
          <DropDown value={month} handleMonthChange={handleMonthChange} />
        </section>
        <Chart chartType="ColumnChart" data={dataForBarChart}
          width={"100%"} height={"25em"} />
      </section>
    </div>
  )
}

export default BarChart