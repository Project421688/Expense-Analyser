import React, { useState, useEffect } from "react";
import "./Egg.css";
import axios from "axios";

function Egg() {
  const now = new Date();

  const formatDate = (date) => date.toISOString().split("T")[0];
  const formatTime = (date) => date.toTimeString().slice(0, 5);

  const minDate = new Date(now);
  minDate.setDate(minDate.getDate() - 5);

  // Form inputs
  const [date, setDate] = useState(formatDate(now));
  const [time, setTime] = useState(formatTime(now));
  const [ratePerPlate, setRatePerPlate] = useState("");
  const [numPlates, setNumPlates] = useState("");
  const [sum, setSum] = useState(0);

  // Data tables
  const [lastFive, setLastFive] = useState([]);
  const [fullData, setFullData] = useState([]);

  // Pagination & Filter
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filtered, setFiltered] = useState(false);


  // Calculate sum when rate or plates change
  useEffect(() => {
    const r = parseFloat(ratePerPlate);
    const n = parseInt(numPlates, 10);
    if (!isNaN(r) && !isNaN(n)) {
      setSum((r * n).toFixed(2));
    } else {
      setSum(0);
    }
  }, [ratePerPlate, numPlates]);

  // Fetch last 5 entries (small table)
  const fetchLastFiveEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/eggs/last5");
      setLastFive(res.data);
    } catch (err) {
      console.error("Error fetching last 5 eggs:", err);
    }
  };

  // Fetch full data table with pagination and filter
  const fetchFullData = async (page = 1) => {
    try {
      const res = await axios.get("http://localhost:5000/api/eggs", {
        params: {
          from: fromDate || undefined,
          to: toDate || undefined,
          page,
          limit: 10,
        },
      });
      setFullData(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error("Error fetching full data:", err);
    }
  };

  // Filter handler runs fetchFullData from page 1
 const handleFilter = () => {
  if (fromDate && toDate) {
    setFiltered(true);
    fetchFullData(1);
  } else {
    alert("Please select both From Date and To Date to filter.");
  }
};


  // Reset filter inputs and reload full data
 const handleReset = () => {
  setFromDate("");
  setToDate("");
  setFiltered(false); // hide table on reset
  setFullData([]);    // clear table data
};


  // Initial data fetch on mount
useEffect(() => {
  fetchLastFiveEntries();
  fetchFullData(1);
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  // Add new record
  const handleAdd = async () => {
    try {
      const res =await axios.post("http://localhost:5000/api/eggs", {
        date,
        time,
        rate_per_plate: parseFloat(ratePerPlate),
        no_of_plate: parseInt(numPlates, 10),
        amount: parseFloat(sum),
      });
      console.log(res.data)
      alert("Data added successfully!");
      
      handleCancel();
      fetchLastFiveEntries(); // Refresh last 5 table
      fetchFullData(currentPage); // Refresh full table on current page
    } catch (err) {
      console.error(err);
      alert("Error adding record");
    }
  };

  // Reset add form fields to default
  const handleCancel = () => {
    setDate(formatDate(now));
    setTime(formatTime(now));
    setRatePerPlate("");
    setNumPlates("");
    setSum(0);
  };

  return (
    <div className="egg-page-wrapper">
      <div className="egg-content">
        {/* 🍳 Add Data Card */}
        <div className="egg-card">
          <label className="egg-label">
            Date:
            <input
              type="date"
              value={date}
              min={formatDate(minDate)}
              max={formatDate(now)}
              onChange={(e) => setDate(e.target.value)}
              className="egg-input"
            />
          </label>

          <label className="egg-label">
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="egg-input"
            />
          </label>

          <label className="egg-label">
            Rate per Plate:
            <input
              type="number"
              min="0"
              step="0.01"
              value={ratePerPlate}
              onChange={(e) => setRatePerPlate(e.target.value)}
              placeholder="Enter rate"
              className="egg-input"
            />
          </label>

          <label className="egg-label">
            Number of Plates:
            <input
              type="number"
              min="0"
              step="1"
              value={numPlates}
              onChange={(e) => setNumPlates(e.target.value)}
              placeholder="Enter quantity"
              className="egg-input"
            />
          </label>

          <label className="egg-label">
            Sum:
            <input
              type="number"
              value={sum}
              readOnly
              className="egg-input egg-input-readonly"
            />
          </label>

          <div className="egg-buttons-wrapper">
            <button
              onClick={handleAdd}
              className="egg-button egg-button-primary"
            >
              Add
            </button>
            <button
              onClick={handleCancel}
              className="egg-button egg-button-secondary"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* 📋 Small Table: Last 5 Entries */}
        <div className="egg-table-wrapper">
          <table className="egg-table">
            <caption>
              <span>Last 5 entries</span>
              <button
                className="refresh-btn"
                onClick={fetchLastFiveEntries}
                title="Refresh"
              >
                🔄
              </button>
            </caption>
            <thead>
              <tr>
                <th>Date</th>
                <th>No. of Plates</th>
                <th>Rate/Plate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {lastFive.map((row) => (
                <tr key={row.egg_id}>
                  <td>{row.date}</td>
                  <td>{row.no_of_plate}</td>
                  <td>{row.rate_per_plate.toFixed(2)}</td>
                  <td>{row.amount.toFixed(2)}</td>
                </tr>
              ))}
              {lastFive.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 📦 Filter Card */}
        <div className="filter-card">
          <div className="filter-caption">Filter</div>

          <label className="egg-label">
            From Date:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="egg-input"
            />
          </label>

          <label className="egg-label">
            To Date:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="egg-input"
            />
          </label>

          <div className="egg-buttons-wrapper">
            <button
              className="egg-button egg-button-primary"
              onClick={handleFilter}
            >
              Filter
            </button>
            <button
              className="egg-button egg-button-secondary"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>

        {/* 📋 Full Table - Data with Pagination */}
        {filtered && (
        <div className="egg-table-wrapper">
          <table className="egg-table">
            <caption>Data</caption>
            <thead>
              <tr>
                <th>Date</th>
                <th>No. of Plates</th>
                <th>Rate/Plate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {fullData.map((row) => (
                <tr key={row.egg_id}>
                  <td>{row.date}</td>
                  <td>{row.no_of_plate}</td>
                  <td>{row.rate_per_plate.toFixed(2)}</td>
                  <td>{row.amount.toFixed(2)}</td>
                </tr>
              ))}
              {fullData.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>

        

        </div>)}
         {filtered && (<div className="pagination">
  <button
    disabled={currentPage === 1}
    onClick={() => fetchFullData(currentPage - 1)}
  >
    Prev
  </button>
  
  {Array.from({ length: totalPages }, (_, idx) => (
    <button
      key={idx + 1}
      className={"page-btn" + (currentPage === idx + 1 ? " active" : "")}
      onClick={() => fetchFullData(idx + 1)}
      disabled={currentPage === idx + 1}
    >
      {idx + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => fetchFullData(currentPage + 1)}
  >
    Next
  </button>
</div>)}
      </div>
    </div>
  );
}

export default Egg;
