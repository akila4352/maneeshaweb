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
import { ref, get, child, remove } from "firebase/database"
import { rtdb } from "../../firebase/firebase"

const tableColumns = {
  airportQuotations: [
    "ID",
    "Name",
    "Pickup",
    "Destination",
    "Date",
    "Time",
    "Distance",
    "Vehicle Name(s)",
    "Total Price",
    "Contact",
    "Email",
    "Created At",
    "Delete"
  ],
  hotelBookings: [
    "ID",
    "Name",
    "Destination",
    "Start Date",
    "End Date",
    "Adult",
    "Children",
    "Room",
    "Contact",
    "Email",
    "Created At",
    "Delete"
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
    "Message",
    "Created At",
    "Delete"
  ],
  tripQuotations: [
    "ID",
    "Name",
    "Destinations",
    "Duration",
    "Date",
    "Contact",
    "Email",
    "Created At",
    "Delete"
  ],
  tukTukQuotations: [
    "ID",
    "Name",
    "Destination",
    "Date",
    "Travelers",
    "Contact",
    "Email",
    "Message",
    "Created At",
    "Delete"
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
          let arr = Object.entries(dataObj).map(([key, value]) => ({
            id: value.id || key,
            ...value,
          }))
          // FIFO: sort by createdAt ascending (oldest first)
          arr = arr.sort((a, b) => {
            const ta = a.timestamp || new Date(a.createdAt || 0).getTime();
            const tb = b.timestamp || new Date(b.createdAt || 0).getTime();
            return ta - tb;
          });
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

  const handleDelete = async (rowId) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await remove(ref(rtdb, `${selectedType}/${rowId}`));
      setRows(rows => rows.filter(row => row.id !== rowId));
    } catch (err) {
      alert("Failed to delete record.");
    }
  };

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
                        // Map column names to actual data keys
                        let value = "";
                        switch (col) {
                          case "ID": value = row.id; break;
                          case "Name": value = row.name; break;
                          case "Pickup": value = row.pickup; break;
                          case "Destination": value = row.destination || row.destinations; break;
                          case "Date": value = row.date?.startDate || row.date?.endDate || row.date || ""; break;
                          case "Start Date": value = row.date?.startDate || ""; break;
                          case "End Date": value = row.date?.endDate || ""; break;
                          case "Time": value = row.time; break;
                          case "Distance": value = row.distance; break;
                          case "Vehicle Name(s)": value = row.vehicleNames || (row.vehicles ? row.vehicles.map(v => v.name).join(", ") : ""); break;
                          case "Total Price": value = row.totalPrice; break;
                          case "Adult": value = row.adult; break;
                          case "Children": value = row.children; break;
                          case "Room": value = row.room || (row.options ? row.options.room : ""); break;
                          case "Travelers": value = row.travelers; break;
                          case "Contact": value = row.contact || row.phone; break;
                          case "Email": value = row.email; break;
                          case "Message": value = row.message; break;
                          case "Created At": value = row.createdAt ? new Date(row.createdAt).toLocaleString() : ""; break;
                          case "Delete":
                            return (
                              <TableCell key={idx}>
                                <button
                                  style={{
                                    background: "#e25d5d",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "4px 12px",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                  }}
                                  onClick={() => handleDelete(row.id)}
                                >
                                  Delete
                                </button>
                              </TableCell>
                            );
                          default:
                            value = row[col.toLowerCase()] || "";
                        }
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