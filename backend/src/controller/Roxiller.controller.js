const RoxillerModel = require('../model/Roxiller.models.js');
const { StatusCodes: { OK, ACCEPTED, CREATED, NOT_FOUND, NO_CONTENT, BAD_REQUEST } } = require('http-status-codes');
const axios = require('axios');
const { config } = require('dotenv');
const { threeApiCreator } = require('../utils/ThreeApiUrls.js');
config();


const apiInstance = axios.create({

});


const initializeDatabase = async (request, response, next) => {
    try {
        const apiResponse = await apiInstance.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

        const data = await RoxillerModel.insertMany(apiResponse.data);


        return response.status(CREATED).json({
            error: false, message: `Data Inserted Successfully ! `, userData: {
                total: data.length,
                data
            }
        })

    } catch (error) {
        console.error('Axios Error:', error);
        response.status(BAD_REQUEST).json({ error: true, message: 'Internal Server Error' });
        next(error);
    }
};


const fetchBasedOnQuery = async (request, response, next) => {
    try {

        const { search, page, limitPerPage } = request.query

        let queryObject = search ?
            {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { price: parseFloat(search) || null },
                ],
            }
            : {}
        const transactionsCount = await RoxillerModel.find().countDocuments();

        const options = {
            skip: (parseInt(page) - 1) * parseInt(limitPerPage),
            limit: parseInt(limitPerPage),
        };


        const transactions = await RoxillerModel.find(queryObject, {}, options);

        return response.status(ACCEPTED).json({
            error: false, message: "Fetched Successfully", name: "Data For Query and Params", data: {
                count: transactionsCount,
                total: transactions.length,

                transactions
            }
        });

    } catch (error) {
        response.status(BAD_REQUEST).json({ success: false, message: 'Internal Server Error' });
        next(error);
    }
}

const fetchBasedOnStatistics = async (request, response, next) => {
    try {
        const { month } = request.query;
        const selectedMonth = parseInt(month);

        let transactions;

        if (isNaN(parseInt(selectedMonth))) {
            transactions = await RoxillerModel.find({});
        } else {
            transactions = await RoxillerModel.find({
                $expr: {
                    $eq: [{ $month: '$dateOfSale' }, selectedMonth],
                }
            });
        }

        const totalSaleAmount = transactions.reduce((totalAmount, currentTransaction) => {

            return totalAmount + currentTransaction.price

        }, 0)
        const totalOfSoldItems = transactions.filter(transaction => transaction.sold);
        const totalOfUnSoldItems = transactions.filter(transaction => !transaction.sold);


        return response.status(200).json({
            error: false, message: `Displaying the Sales Data of Month ${selectedMonth}`, name: "Data For Statistics", data: {
                total: transactions.length,
                totalSaleAmount,
                soldItemsList: {
                    totalSoldList: totalOfSoldItems.length,
                    totalOfSoldItems
                },
                unSoldItemsList: {
                    totalUnSoldList: totalOfUnSoldItems.length,
                    totalOfUnSoldItems
                },
                transactions,

            }
        })

    } catch (error) {

        next(error)
    }
}

const fetchDataForBarChart = async (request, response, next) => {
    try {
        const { month } = request.query;
        const selectedMonth = parseInt(month);

        const transactions = await RoxillerModel.find({
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, selectedMonth],
            }
        });

        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity },
        ];

        const priceRangeCounts = priceRanges.reduce((obj, range) => {
            obj[`${range.min}-${range.max === Infinity ? 'above' : range.max}`] = 0;
            return obj;
        }, {});

        transactions.forEach(transaction => {
            const price = transaction.price;
            for (const range of priceRanges) {
                if (price >= range.min && price <= range.max) {
                    priceRangeCounts[`${range.min}-${range.max === Infinity ? 'above' : range.max}`]++;
                    break;
                }
            }
        });
        const priceRangeArray = Object.entries(priceRangeCounts).map(([key, value]) => ({
            range: key,
            count: value
        }));

        return response.status(200).json({ error: false, message: ` Bar chart Data  `, name: "Data For Bar Chart", data: { priceRangeArray } })


    } catch (error) {
        next(error);
    }
}

const fetchDataForPieCharts = async (request, response, next) => {
    try {
        const { month } = request.query;
        const selectedMonth = parseInt(month);

        const transactions = await RoxillerModel.find({
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, selectedMonth],
            }
        });

        const selectedMonthCategoryCounts = [];

        transactions.forEach(selected => {
            const existingCategory = selectedMonthCategoryCounts.find(select => select.category === selected.category);

            if (existingCategory) {
                existingCategory.count += 1;
            } else {
                selectedMonthCategoryCounts.push({ category: selected.category, count: 1 });
            }
        });

        return response.status(200).json({
            error: false, message: `Data For Pie Chart`, name: "Data For Pie Chart", data: {
                totalFilteredForMonths: transactions.length,
                selectedMonthCategoryCounts
            }
        });
    } catch (error) {
        next(error);
    }
};


async function fetchData(threeApiUrls) {
    try {

        const threeApiResponse = await Promise.all(threeApiUrls.map(url => axios.get(url)));
        const threeUrlData = threeApiResponse.map(three => three.data)

        return threeUrlData;

    } catch (error) {
        console.log(error)
    }
};


const fetchDataOfAllOfThem = async (request, response, next) => {
    try {

        const { search, page, perPage } = request.query
        const { month } = request.query;
        const selectedMonth = parseInt(month);
        const threeApiUrls = threeApiCreator(search, page, perPage, selectedMonth)
        const dataOfThree = await fetchData(threeApiUrls)
       
       
        return response.status(200).json({ error: false, dataLocalHost: dataOfThree })
    } catch (error) {
        next(error);

    }
}

module.exports = {
    initializeDatabase,
    fetchBasedOnQuery,
    fetchBasedOnStatistics,
    fetchDataForBarChart,
    fetchDataForPieCharts,
    fetchDataOfAllOfThem
}