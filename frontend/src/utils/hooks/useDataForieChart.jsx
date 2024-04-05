import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../constants';


const useDataForPieChart = (month) => {

    const [pieChart, setPieChart] = useState(null);

    async function fetchDataForPieChart() {
        try {

            const response = await axios.get(`${BASE_URL}pie-chart?month=${month}`);
            setPieChart(response.data.data)
           
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchDataForPieChart()
    },[month])

    return {pieChart}
}

export default useDataForPieChart