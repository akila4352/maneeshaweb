import React, { useState } from "react"
import Common from "./Common"
import "./chart.css"
import ReactApexChart from "react-apexcharts"

// Dummy summary data for each quotation type
const chartData = {
  airportQuotations: {
    donut: {
      series: [10, 5, 2],
      labels: ["Completed", "Pending", "Cancelled"],
    },
    bar: {
      series: [
        {
          name: "Total Price",
          data: [3500, 4200, 3900, 4100, 3800, 4000],
        },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    line: {
      series: [
        { name: "Quotations", data: [2, 4, 3, 5, 6, 7] },
        { name: "Revenue", data: [3500, 4200, 3900, 4100, 3800, 4000] },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  },
  hotelBookings: {
    donut: {
      series: [8, 3, 1],
      labels: ["Completed", "Pending", "Cancelled"],
    },
    bar: {
      series: [
        {
          name: "Total Price",
          data: [21000, 18000, 25000, 22000, 20000, 23000],
        },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    line: {
      series: [
        { name: "Bookings", data: [1, 2, 2, 3, 2, 3] },
        { name: "Revenue", data: [21000, 18000, 25000, 22000, 20000, 23000] },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  },
  safariQuotations: {
    donut: {
      series: [6, 2, 0],
      labels: ["Completed", "Pending", "Cancelled"],
    },
    bar: {
      series: [
        {
          name: "Total Price",
          data: [2000, 2200, 2100, 2300, 2400, 2500],
        },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    line: {
      series: [
        { name: "Quotations", data: [1, 2, 1, 2, 2, 2] },
        { name: "Revenue", data: [2000, 2200, 2100, 2300, 2400, 2500] },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  },
  tripQuotations: {
    donut: {
      series: [7, 1, 1],
      labels: ["Completed", "Pending", "Cancelled"],
    },
    bar: {
      series: [
        {
          name: "Total Price",
          data: [4500, 4700, 4300, 4800, 4600, 4900],
        },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    line: {
      series: [
        { name: "Quotations", data: [2, 2, 2, 3, 2, 3] },
        { name: "Revenue", data: [4500, 4700, 4300, 4800, 4600, 4900] },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  },
  tukTukQuotations: {
    donut: {
      series: [5, 2, 1],
      labels: ["Completed", "Pending", "Cancelled"],
    },
    bar: {
      series: [
        {
          name: "Total Price",
          data: [1200, 1300, 1100, 1400, 1350, 1250],
        },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    line: {
      series: [
        { name: "Quotations", data: [1, 1, 2, 2, 2, 2] },
        { name: "Revenue", data: [1200, 1300, 1100, 1400, 1350, 1250] },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
  },
}

const Charts = () => {
  const [selectedType, setSelectedType] = useState("airportQuotations")
  const chart = chartData[selectedType]

  const donutOptions = {
    chart: { type: "donut", foreColor: "grey" },
    fill: { colors: ["#35B8E0", "#6658DD", "#FF8ACC"] },
    stroke: { colors: ["#313844"] },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            total: { showAlways: true, show: true },
          },
        },
      },
    },
    labels: chart.donut.labels,
    legend: { position: "bottom" },
  }

  const barOptions = {
    chart: { type: "bar", height: 350, foreColor: "grey" },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "25%", endingShape: "rounded" },
    },
    dataLabels: { foreColor: "#fff", enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    fill: { opacity: 1 },
    grid: { show: false },
    xaxis: {
      categories: chart.bar.categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { show: true },
    },
    yaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { show: true },
    },
  }

  const lineOptions = {
    chart: { height: 350, type: "line", zoom: { enabled: false }, foreColor: "grey" },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      categories: chart.line.categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { show: true },
    },
    yaxis: {
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: { show: true },
    },
    grid: { show: false },
  }

  return (
    <>
      <section className='charts grid2'>
        <div style={{ marginBottom: "16px", gridColumn: "1 / -1" }}>
          <label htmlFor="chart-type" style={{ marginRight: "8px" }}>
            Select Quotation Type:
          </label>
          <select
            id="chart-type"
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            style={{ padding: "6px 12px", borderRadius: "6px" }}
          >
            <option value="airportQuotations">Airport Quotations</option>
            <option value="hotelBookings">Hotel Bookings</option>
            <option value="safariQuotations">Safari Quotations</option>
            <option value="tripQuotations">Trip Quotations</option>
            <option value="tukTukQuotations">Tuk Tuk Quotations</option>
          </select>
        </div>
        <div className='cardBox'>
          <Common title='Summary' />
          <ReactApexChart options={donutOptions} series={chart.donut.series} type='donut' height={350} />
        </div>
        <div className='cardBox'>
          <Common title='Statistics' />
          <ReactApexChart options={barOptions} series={chart.bar.series} type='bar' height={350} />
        </div>
        <div className='cardBox'>
          <Common title='Total Revenue' />
          <ReactApexChart options={lineOptions} series={chart.line.series} type='line' height={350} />
        </div>
      </section>
    </>
  )
}

export default Charts
