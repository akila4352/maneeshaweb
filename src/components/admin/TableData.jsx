import React, { useState, useEffect } from "react"
import "./Table.css"
import Common from "./Common"
// import data from "./data" // Remove if not needed for inbox
import "./users.css"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { ref, get, child } from "firebase/database"
import { rtdb } from "../../firebase/firebase"

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
  const [rows, setRows] = useState([])
  const [inbox, setInbox] = useState([])

  useEffect(() => {
    // Fetch inbox emails
    const fetchInbox = async () => {
      try {
        const snap = await get(child(ref(rtdb), "newsletterInbox"));
        if (snap.exists()) {
          const dataObj = snap.val();
          const arr = Object.entries(dataObj).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setInbox(arr.reverse()); // latest first
        } else {
          setInbox([]);
        }
      } catch (err) {
        setInbox([]);
      }
    };
    fetchInbox();
  }, []);

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const dbRef = ref(rtdb)
        const snap = await get(child(dbRef, selectedType))
        if (snap.exists()) {
          // Convert object to array, add id if not present
          const dataObj = snap.val()
          const arr = Object.entries(dataObj).map(([key, value]) => ({
            id: value.id || key,
            ...value,
          }))
          setRows(arr)
        } else {
          setRows([])
        }
      } catch (err) {
        setRows([])
      }
    }
    fetchRows()
  }, [selectedType])

  const columns = tableColumns[selectedType]

  return (
    <>
      <section className='project'>
        <div className='user cardBox'>
          <Common title='Inbox' />
          <div className='userBox'>
            {inbox.map((value) => (
              <div className='cardBox flexSB' key={value.id}>
                <div className='title'>
                  <h3>{value.email}</h3>
                  <p>{new Date(value.time).toLocaleString()}</p>
                </div>
              </div>
            ))}
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
              name='quotation-type'
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
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
                      {columns.map((col, idx) => {
                        const value =
                          row[
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
                          ];
                        // If value is an object, convert to string
                        let displayValue = value;
                        if (typeof value === "object" && value !== null) {
                          displayValue = Array.isArray(value)
                            ? value.join(", ")
                            : Object.values(value).join(" - ");
                        }
                        return (
                          <TableCell key={idx}>
                            {displayValue || ""}
                          </TableCell>
                        );
                      })}
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