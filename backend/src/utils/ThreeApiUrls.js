


 function threeApiCreator(search , page , limitPerPage , selectedMonth) {
  
    const threeApiUrls = [
        `http://localhost:5000/api/roxiller/search-query?search=${search}&page=${page}&perPage=${limitPerPage}`,
        `http://localhost:5000/api/roxiller/statistics?month=${selectedMonth}`,
        `http://localhost:5000/api/roxiller/bar-chart?month=${selectedMonth}`,
    ]


    return threeApiUrls;

}

module.exports = {
    threeApiCreator
}
