const express = require('express');

const router = express.Router();
const { fetchBasedOnQuery, fetchBasedOnStatistics,
    fetchDataForBarChart, fetchDataForPieCharts,
    fetchDataOfAllOfThem, initializeDatabase } = require('../controller/Roxiller.controller.js');



router.get('/initialize-database', initializeDatabase);
router.get('/search-query', fetchBasedOnQuery);
router.get('/statistics', fetchBasedOnStatistics);
router.get('/bar-chart', fetchDataForBarChart);
router.get('/pie-chart', fetchDataForPieCharts);
router.get('/three-apis', fetchDataOfAllOfThem);

module.exports = router;