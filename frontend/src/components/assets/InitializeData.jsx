import axios from 'axios';
import React from 'react';

const InitializeData = ({ isDataInitialized }) => {
    async function initializeDataToDatabase() {
        try {
            const response = await axios.get('http://localhost:5000/api/transactions/initialize-database');

            //It is to  Notify the parent component that data has been initialized
            isDataInitialized();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex  justify-center p-8'>
            <section>
                <button className='bg-green-500 px-6 py-2 rounded-lg' onClick={initializeDataToDatabase}>
                    Initialize Data
                </button>
            </section>
        </div>
    );
};

export default InitializeData;
