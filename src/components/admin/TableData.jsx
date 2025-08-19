import React, { useState } from "react"
import "./Table.css"
import Common from "./Common"
import data from "./data"
import "./users.css"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

// Dummy data for each quotation type
const quotationTables = {
  airportQuotations: [
    {
      id: 1,
      name: "John Doe",
      pickup: "Bandaranaike International Airport",
      destination: "Colombo",
      date: "2024-06-01",
      time: "10:00",
      totalPrice: "3500",
      contact: "+94712345678",
      email: "john@example.com",
    },
    // ...more airport quotations
  ],
  hotelBookings: [
    {
      id: 1,
      name: "Jane Smith",
      hotel: "Hilton Garden Inn",
      city: "Colombo",
      date: "2024-06-02",
      nights: 2,
      totalPrice: "21000",
      contact: "+94787654321",
      email: "jane@example.com",
    },
    // ...more hotel bookings
  ],
  safariQuotations: [
    {
      id: 1,
      name: "Alex Lee",
      destinations: "Yala National Park",
      travelers: 2,
      date: "2024-06-03",
      totalPrice: "2000",
      contact: "+94711223344",
      email: "alex@example.com",
    },
    // ...more safari quotations
  ],
  tripQuotations: [
    {
      id: 1,
      name: "Sam Perera",
      destinations: "Kandy, Sigiriya",
      duration: "5 days",
      date: "2024-06-04",
      totalPrice: "4500",
      contact: "+94799887766",
      email: "sam@example.com",
    },
    // ...more trip quotations
  ],
  tukTukQuotations: [
    {
      id: 1,
      name: "Nimal Fernando",
      destination: "Ella",
      date: "2024-06-05",
      travelers: 2,
      totalPrice: "1200",
      contact: "+94766554433",
      email: "nimal@example.com",
    },
    // ...more tuk tuk quotations
  ],
}

// Table columns for each type
const tableColumns = {
  airportQuotations: [
    "ID",
    "Name",
    "Pickup",
    "Destination",
    "Date",
    "Time",
    "Total Price",
    "Contact",
    "Email",
  ],
  hotelBookings: [
    "ID",
    "Name",
    "Hotel",
    "City",
    "Date",
    "Nights",
    "Total Price",
    "Contact",
    "Email",
  ],
  safariQuotations: [
    "ID",
    "Name",
    "Destinations",
    "Travelers",
    "Date",
    "Total Price",
    "Contact",
    "Email",
  ],
  tripQuotations: [
    "ID",
    "Name",
    "Destinations",
    "Duration",
    "Date",
    "Total Price",
    "Contact",
    "Email",
  ],
  tukTukQuotations: [
    "ID",
    "Name",
    "Destination",
    "Date",
    "Travelers",
    "Total Price",
    "Contact",
    "Email",
  ],
}

const TableData = () => {
  const [selectedType, setSelectedType] = useState("airportQuotations")

  const rows = quotationTables[selectedType]
  const columns = tableColumns[selectedType]

  return (
    <>
      <section className='project'>
        <div className='user cardBox'>
          <Common title='Inbox' />
          <div className='userBox'>
            {data.map((value) => {
              return (
                <div className='cardBox flexSB'>
                  <div className='img'>
                    <img className='imageCircle' src={value.cover} alt='' />
                  </div>
                  <div className='title'>
                    <h3>{value.title}</h3>
                    <p>{value.email}</p>
                  </div>
                  <div className='time'>
                    <span>{value.time}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='table cardBox'>
          <Common title={selectedType} />
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor='quotation-type'
              style={{ marginRight: "8px" }}
            >
              Select Quotation Type:
            </label>
            <select
              id='quotation-type'
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                background: "#fff",
                color: "#333",
                border: "1px solid #ccc",
              }}
            >
              <option value='airportQuotations'>Airport Quotations</option>
              <option value='hotelBookings'>Hotel Bookings</option>
              <option value='safariQuotations'>Safari Quotations</option>
              <option value='tripQuotations'>Trip Quotations</option>
              <option value='tukTukQuotations'>Tuk Tuk Quotations</option>
            </select>
          </div>
          <div className='tableBox'>
            <TableContainer
              component={Paper}
              sx={{ boxShadow: "none", borderRadius: "none" }}
            >
              <Table
                className='tableContainer'
                sx={{
                  minWidth: 650,
                  background: "#313844",
                  border: "none",
                  "& td ,th": {
                    color: "rgb(166, 171, 176)",
                    borderBottom: "1px solid rgb(86, 86, 86)",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    {columns.map((col, idx) => (
                      <TableCell key={idx}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      {columns.map((col, idx) => (
                        <TableCell key={idx}>
                          {row[
                            col
                              .replace(/ /g, "")
                              .replace("ID", "id")
                              .replace("Name", "name")
                              .replace("Pickup", "pickup")
                              .replace("Destination", "destination")
                              .replace("Date", "date")
                              .replace("Time", "time")
                              .replace("TotalPrice", "totalPrice")
                              .replace("Total Price", "totalPrice")
                              .replace("Contact", "contact")
                              .replace("Email", "email")
                              .replace("Hotel", "hotel")
                              .replace("City", "city")
                              .replace("Nights", "nights")
                              .replace("Travelers", "travelers")
                              .replace("Destinations", "destinations")
                              .replace("Duration", "duration")
                          ] || ""}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </section>
    </>
  )
}

export default TableData
