import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../constants';

const useTransactions = (search, start, limit) => {
    const [transactions, setTransactions] = useState(null);
    const [filteredTransactions, setFilteredTransactions] = useState(null);
    const [totalTransactionCount, setTotalTransactionCount] = useState();

    async function fetchAllTransaction() {
        try {
            const response = await axios.get(`${BASE_URL}search-query?search=${search}&page=${start}&limitPerPage=${limit}`);
            setFilteredTransactions(response?.data?.data?.transactions);
            setTransactions(response?.data?.data?.transactions);
            setTotalTransactionCount(response?.data?.data?.count);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAllTransaction();
    }, [start, search, limit]);

    return { transactions, filteredTransactions, totalTransactionCount, fetchAllTransaction };
};

export default useTransactions;
