export const BASE_URL = `http://localhost:5000/api/roxiller/`

//! Data For Pie Chart

export const options = {
    title: "",
    is3D: true,
};

export function pieChartData(pieChart) {
    const pieData = pieChart?.selectedMonthCategoryCounts?.map(pie => [`${pie.category} - ${pie.count}`, pie.count])
    pieData?.unshift(['category', 'count'])

    return pieData;
}

//! Data For Pie Chart

//! Data For Bar Chart

export function barChartData(barChart) {

    const barChartData = barChart?.priceRangeArray?.map(barchart => [barchart.range, barchart.count]);
    barChartData?.unshift(["", "counts"])
    return barChartData;
}

//! Data For Bar Chart