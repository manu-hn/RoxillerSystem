import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../constants';

const useDataForBarChart = (month) => {

    const [barChart, setBarChart] = useState(null);

    async function fetchDataForPieChart() {
        try {

            const response = await axios.get(`${BASE_URL}bar-chart?month=${month}`);
            setBarChart(response.data.data)
           
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchDataForPieChart()
    },[month])

    return {barChart}
}

export default useDataForBarChart