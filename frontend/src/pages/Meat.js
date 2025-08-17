import React, { useState, useEffect } from "react";
import "./Meat.css";
import axios from "axios";

function Meat() {
  const now = new Date();

  const formatDate = (date) => date.toISOString().split("T")[0];
  const formatTime = (date) => date.toTimeString().slice(0, 5);

  const minDate = new Date(now);
  minDate.setDate(minDate.getDate() - 5);

  // Add Data form states
  const [date, setDate] = useState(formatDate(now));
  const [time, setTime] = useState(formatTime(now));
  const [weight, setWeight] = useState("");
  const [amount, setAmount] = useState("");

  // Tables data states
  const [lastFive, setLastFive] = useState([]);
  const [fullData, setFullData] = useState([]);

  // Pagination and filtering states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filtered, setFiltered] = useState(false);

  // Fetch last 5 meat entries
  const fetchLastFiveEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meat/last5");
      setLastFive(res.data);
    } catch (err) {
      console.error("Error fetching last 5 entries:", err);
    }
  };

  // Fetch filtered & paginated full meat data
  const fetchFullData = async (page = 1) => {
    try {
      const res = await axios.get("http://localhost:5000/api/meat", {
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
      console.error("Error fetching filtered data:", err);
    }
  };

  // Filter button handler
  const handleFilter = () => {
    if (fromDate && toDate) {
      setFiltered(true);
      fetchFullData(1);
    } else {
      alert("Please select both From Date and To Date to filter.");
    }
  };

  // Reset filter inputs and table
  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setFiltered(false);
    setFullData([]);
  };

  // Add new meat record
  const handleAdd = async () => {
    try {
      await axios.post("http://localhost:5000/api/meat", {
        date,
        time,
        weight: parseFloat(weight),
        amount: parseFloat(amount),
      });
      alert("Data added successfully!");
      handleCancel();
      fetchLastFiveEntries();
      if (filtered) fetchFullData(currentPage);
    } catch (err) {
      console.error(err);
      alert("Error adding record");
    }
  };

  // Reset form fields
  const handleCancel = () => {
    setDate(formatDate(now));
    setTime(formatTime(now));
    setWeight("");
    setAmount("");
  };

  // Fetch initial last 5 entries on mount
  useEffect(() => {
    fetchLastFiveEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="meat-page-wrapper">
      <div className="meat-content">
        {/* Add Meat Data Card */}
        <div className="meat-card">
          <label className="meat-label">
            Date:
            <input
              type="date"
              value={date}
              min={formatDate(minDate)}
              max={formatDate(now)}
              onChange={(e) => setDate(e.target.value)}
              className="meat-input"
            />
          </label>

          <label className="meat-label">
            Time:
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="meat-input"
            />
          </label>

          <label className="meat-label">
            Weight (kg):
            <input
              type="number"
              min="0"
              step="0.01"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter Weight"
              className="meat-input"
            />
          </label>

          <label className="meat-label">
            Amount:
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="meat-input"
            />
          </label>

          <div className="meat-buttons-wrapper">
            <button onClick={handleAdd} className="meat-button meat-button-primary">
              Add
            </button>
            <button onClick={handleCancel} className="meat-button meat-button-secondary">
              Cancel
            </button>
          </div>
        </div>

        {/* Small Table: Last 5 Entries */}
        <div className="meat-table-wrapper">
          <table className="meat-table">
            <caption>
              <span>Last 5 entries</span>
              <button className="refresh-btn" onClick={fetchLastFiveEntries} title="Refresh">
                🔄
              </button>
            </caption>
            <thead>
              <tr>
                <th>Date</th>
                <th>Weight (kg)</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {lastFive.length > 0 ? (
                lastFive.map((row) => (
                  <tr key={row.meat_id}>
                    <td>{row.date}</td>
                    <td>{row.weight?.toFixed(2)}</td>
                    <td>{row.amount?.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Filter Card */}
        <div className="filter-card">
          <div className="filter-caption">Filter</div>

          <label className="meat-label">
            From Date:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="meat-input"
            />
          </label>

          <label className="meat-label">
            To Date:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="meat-input"
            />
          </label>

          <div className="meat-buttons-wrapper">
            <button
              className="meat-button meat-button-primary"
              onClick={handleFilter}
              disabled={!fromDate || !toDate}
            >
              Filter
            </button>
            <button className="meat-button meat-button-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        {/* Full Table with Pagination - show only if filtered */}
        {filtered && (
          <div className="meat-table-wrapper">
            <table className="meat-table">
              <caption>Data</caption>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weight (kg)</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {fullData.length > 0 ? (
                  fullData.map((row) => (
                    <tr key={row.meat_id}>
                      <td>{row.date}</td>
                      <td>{row.weight?.toFixed(2)}</td>
                      <td>{row.amount?.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="pagination">
              <button disabled={currentPage === 1} onClick={() => fetchFullData(currentPage - 1)}>
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
              <button disabled={currentPage === totalPages} onClick={() => fetchFullData(currentPage + 1)}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Meat;
