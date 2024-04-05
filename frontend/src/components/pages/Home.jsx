import React, { useEffect, useState } from 'react';
import useTransactions from '../../utils/hooks/useTransactions.jsx';
import TransactionViewer from '../assets/TransactionViewer';
import InitializeData from '../assets/InitializeData';

const Home = () => {
    const [perPageCount, setPerPageCount] = useState(6);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { filteredTransactions, transactions, totalTransactionCount, fetchAllTransaction } = useTransactions(search, page, limit);

    const handleLimitChange = (e) => {
        e.preventDefault();
        const limitData = parseInt(e.target.value);
        setLimit(limitData);
        setPerPageCount(totalTransactionCount / limitData);
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleInitializeData = () => {
        fetchAllTransaction();
    };

   
    const handleNextPage = () => {
        setPage((page) => page + 1);
    };

    const handlePreviousPage = () => {
        setPage((page) => page - 1);
    };

    useEffect(() => {
        fetchAllTransaction();
    }, [page, search, limit]);

    return transactions?.length === 0 ? <InitializeData isDataInitialized={handleInitializeData} /> : (
        <div className='w-full flex justify-center mt-6 py-8'>
             <section className='w-4/5 '>
        <section className=' w-full'>
          <span className='w-2/4 block '>
            <input type="text" name="" id="" placeholder='Search Transaction'
              onChange={handleChange} className='outline-none py-1 w-full px-4 border-b border-black ' />

          </span>
        </section>
        <section>
          {filteredTransactions?.map((transact) => <TransactionViewer key={transact.id} transact={transact} />)}

        </section>
        <section className='flex justify-between'>

          <div>
            <button disabled={page === 1 ? true : false} className='border px-6 py-1 border-black mx-6' onClick={handlePreviousPage}>Previous</button>
            <button disabled={page === perPageCount ? true : false} className='border px-6 py-1 border-black' onClick={handleNextPage}>Next</button>
          </div>
          <select disabled={page===perPageCount ? true : false} value={limit} onChange={handleLimitChange} name="" id="">

            <option value="10">10 Per Page </option>
            <option value="20">20 Per Page </option>
            <option value="30">30 Per Page </option>
          </select>
        </section>
      </section>
        </div>
    );
};

export default Home;