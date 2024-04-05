import React, { useState } from 'react'
import useStatistics from '../../utils/hooks/useStatistics.jsx';
import TransactionViewer from '../assets/TransactionViewer';

const Statistics = () => {
  const [isSoldItemsVisible, setIsIsSoldItemsVisible] = useState(false);
  const [isUnsoldItemsVisible, setIsUnsoldItemsVisible] = useState(false);
  const [month, setMonth] = useState('all');
  const { filteredStatistics, statistics } = useStatistics(month)

  const handleMonthChange = (e) => {
    e.preventDefault();


    setMonth(parseInt(e.target.value));
  };

  const soldItemsDisplayHandler = () => {
    setIsIsSoldItemsVisible(!isSoldItemsVisible)
  }
  const unSoldItemsDisplayHandler = () => {
   setIsUnsoldItemsVisible(!isUnsoldItemsVisible)
  }
  return (
    <div className='w-full flex justify-center  mt-4 py-10'>
      <section className='w-4/5 '>
        <section className=''>
          <h1 className="text-center text-3xl font-bold">Statistics Report</h1>
          <span className='flex w-1/3 font-semibold justify-between'> <h1>Displaying the Statistic report for</h1>
            <select name="" id="" value={month} onChange={handleMonthChange}>
              <option value="all"  >All</option>
              <option value="1"  >January</option>
              <option value="2"  >February</option>
              <option value="3"  >March</option>
              <option value="4"  >April</option>
              <option value="5"  >May</option>
              <option value="6"  >June</option>
              <option value="7"  >July</option>
              <option value="8"  >August</option>
              <option value="9"  >September</option>
              <option value="10" >October</option>
              <option value="11" >November</option>
              <option value="12" >December</option>
            </select>
            <h1>Month</h1>
          </span>
        </section>
        <h1 className='font-semibold my-4'>Total Sale Amount : <span className='underline underline-offset-2 text-red-600'>{statistics?.totalSaleAmount?.toFixed(2)}</span> </h1>

        <section className='mt-4  '>
          <div className='flex justify-between py-2 items-center border-b-2'>
            <h1 className='font-semibold'>Total Number of Sold Items: <span className='underline underline-offset-2 text-red-600'>{statistics?.soldItemsList?.totalSoldList}</span> </h1>
            <button onClick={soldItemsDisplayHandler} className='border-border-black bg-green-700 px-6 py-1 rounded-lg text-white'>Display Sold Items</button>

          </div>

          {
            isSoldItemsVisible && <div>
              {
                statistics?.soldItemsList?.totalOfSoldItems?.map(soldItem => <TransactionViewer key={soldItem.id} transact={soldItem} />)

              }
            </div>
          }

        </section>
        <section className='mt-4  '>
          <div className='flex justify-between py-2 items-center border-b-2'>
            <h1 className='font-semibold'>Total Number of Unsold Items: <span className='underline underline-offset-2 text-red-600'>{statistics?.unSoldItemsList?.totalUnSoldList}</span> </h1>
            <button onClick={unSoldItemsDisplayHandler} className='border-border-black bg-red-700 px-6 py-1 rounded-lg text-white'>Display Unsold Items</button>

          </div>

          {
            isUnsoldItemsVisible && <div>
              {
                statistics?.unSoldItemsList?.totalOfUnSoldItems?.map(soldItem => <TransactionViewer key={soldItem.id} transact={soldItem} />)

              }
            </div>
          }

        </section>


      </section>
    </div>
  )
}

export default Statistics