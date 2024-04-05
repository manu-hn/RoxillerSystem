import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../constants';

const useStatistics = (month  ) => {
    const [statistics, setStatistics] = useState(null);
    const [filteredStatistics, setFilteredStatistics] = useState(null);

    async function fetchStatistics() {
        try {

            const response = await axios.get(`${BASE_URL}statistics?month=${month}`);
            setFilteredStatistics(response.data.data);
            setStatistics(response.data.data);
          

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchStatistics()
    }, [month]);


    return {statistics, filteredStatistics}
}

export default useStatistics