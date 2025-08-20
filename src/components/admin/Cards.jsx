import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./cards.css";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Common from "./Common";
import { ref, get, child } from "firebase/database";
import { rtdb } from "../../firebase/firebase"; // ✅ import rtdb, not db

const Cards = () => {
  const [counts, setCounts] = useState({
    airportQuotations: 0,
    safariQuotations: 0,
    tukTukQuotations: 0,
    tripQuotations: 0,
    hotelBookings: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const dbRef = ref(rtdb);

        // Read counts from each quotation type
        const airportSnap = await get(child(dbRef, "airportQuotations"));
        const safariSnap = await get(child(dbRef, "safariQuotations"));
        const tukTukSnap = await get(child(dbRef, "tukTukQuotations"));
        const tripSnap = await get(child(dbRef, "tripQuotations"));
        const hotelSnap = await get(child(dbRef, "hotelBookings"));

        setCounts({
          airportQuotations: airportSnap.exists() ? Object.keys(airportSnap.val()).length : 0,
          safariQuotations: safariSnap.exists() ? Object.keys(safariSnap.val()).length : 0,
          tukTukQuotations: tukTukSnap.exists() ? Object.keys(tukTukSnap.val()).length : 0,
          tripQuotations: tripSnap.exists() ? Object.keys(tripSnap.val()).length : 0,
          hotelBookings: hotelSnap.exists() ? Object.keys(hotelSnap.val()).length : 0,
        });
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);

  // Chart configs
  const data = {
    series: [counts.airportQuotations ? (counts.airportQuotations / 500) * 100 : 0], // % of target
    options: {
      chart: { type: "radialBar", foreColor: "grey" },
      plotOptions: { radialBar: { hollow: { size: "58%" }, dataLabels: { value: { show: false } } } },
      labels: [`${counts.airportQuotations}`],
      colors: ["#ff5b5b"],
    },
  };

  const data1 = {
    series: [counts.tukTukQuotations ? (counts.tukTukQuotations / 500) * 100 : 0],
    options: {
      chart: { type: "radialBar" },
      plotOptions: { radialBar: { hollow: { size: "58%" }, dataLabels: { value: { show: false } } } },
      labels: [`${counts.tukTukQuotations}`],
      colors: ["#E9B251"],
    },
  };

  const dataSafari = {
    series: [counts.safariQuotations ? (counts.safariQuotations / 500) * 100 : 0],
    options: {
      chart: { type: "radialBar" },
      plotOptions: { radialBar: { hollow: { size: "58%" }, dataLabels: { value: { show: false } } } },
      labels: [`${counts.safariQuotations}`],
      colors: ["#4CAF50"],
    },
  };

  const dataTrip = {
    series: [counts.tripQuotations ? (counts.tripQuotations / 500) * 100 : 0],
    options: {
      chart: { type: "radialBar" },
      plotOptions: { radialBar: { hollow: { size: "58%" }, dataLabels: { value: { show: false } } } },
      labels: [`${counts.tripQuotations}`],
      colors: ["#2196F3"],
    },
  };

  const dataHotel = {
    series: [counts.hotelBookings ? (counts.hotelBookings / 500) * 100 : 0],
    options: {
      chart: { type: "radialBar" },
      plotOptions: { radialBar: { hollow: { size: "58%" }, dataLabels: { value: { show: false } } } },
      labels: [`${counts.hotelBookings}`],
      colors: ["#9C27B0"],
    },
  };

  const Progress = ({ done }) => (
    <div className="progress">
      <div className="progress-done" style={{ opacity: 1, width: `${done}%` }}></div>
    </div>
  );

  return (
    <section className="cards grid">
      <div className="cardBox">
        <Common title="Airport Quotations" />
        <div className="circle">
          <div className="row">
            <ReactApexChart options={data.options} series={data.series} type="radialBar" height={150} />
          </div>
          <div className="title row">
            <h1>{counts.airportQuotations}</h1>
            <p>Quotations</p>
          </div>
        </div>
      </div>

      <div className="cardBox">
        <Common title="Tuk Tuk Quotations" />
        <div className="circle">
          <div className="row">
            <ReactApexChart options={data1.options} series={data1.series} type="radialBar" height={150} />
          </div>
          <div className="title row">
            <h1>{counts.tukTukQuotations}</h1>
            <p>Quotations</p>
          </div>
        </div>
      </div>

      <div className="cardBox">
        <Common title="Safari Quotations" />
        <div className="circle">
          <div className="row">
            <ReactApexChart options={dataSafari.options} series={dataSafari.series} type="radialBar" height={150} />
          </div>
          <div className="title row">
            <h1>{counts.safariQuotations}</h1>
            <p>Quotations</p>
          </div>
        </div>
      </div>

      <div className="cardBox">
        <Common title="Trip Quotations" />
        <div className="circle">
          <div className="row">
            <ReactApexChart options={dataTrip.options} series={dataTrip.series} type="radialBar" height={150} />
          </div>
          <div className="title row">
            <h1>{counts.tripQuotations}</h1>
            <p>Quotations</p>
          </div>
        </div>
      </div>

      <div className="cardBox">
        <Common title="Hotel Bookings" />
        <div className="circle">
          <div className="row">
            <ReactApexChart options={dataHotel.options} series={dataHotel.series} type="radialBar" height={150} />
          </div>
          <div className="title row">
            <h1>{counts.hotelBookings}</h1>
            <p>Bookings</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
