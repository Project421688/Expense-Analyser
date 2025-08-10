import React, { useState, useEffect } from "react";
import './Egg.css'; 
function Egg() {
  // Get current date and time as defaults
  const now = new Date();

  // Format date YYYY-MM-DD for input date
  const formatDate = (date) =>
    date.toISOString().split("T")[0];

  // Format time HH:MM for input time
  const formatTime = (date) =>
    date.toTimeString().slice(0, 5);

  // Minimum date allowed is 5 days ago
  const minDate = new Date(now);
  minDate.setDate(minDate.getDate() - 5);

  const [date, setDate] = useState(formatDate(now));
  const [time, setTime] = useState(formatTime(now));
  const [ratePerPlate, setRatePerPlate] = useState("");
  const [numPlates, setNumPlates] = useState("");
  const [sum, setSum] = useState(0);

  useEffect(() => {
    // Calculate sum automatically whenever rate or number of plates change
    const r = parseFloat(ratePerPlate);
    const n = parseInt(numPlates, 10);

    if (!isNaN(r) && !isNaN(n)) {
      let total= r*n;
      let tot =total.toFixed(2)
      setSum(tot);
    } else {
      setSum(0);
    }
  }, [ratePerPlate, numPlates]);

  const handleAdd = () => {
    alert(`Added:\nDate: ${date}\nTime: ${time}\nRate: ${ratePerPlate}\nNumber of Plates: ${numPlates}\nSum: ${sum}`);
    // Implement further add logic here
  };

  const handleCancel = () => {
    // Reset to defaults
    setDate(formatDate(now));
    setTime(formatTime(now));
    setRatePerPlate("");
    setNumPlates("");
    setSum(0);
  };

 return (
  <div className="egg-page-wrapper">
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
        <button onClick={handleAdd} className="egg-button egg-button-primary">
          Add
        </button>
        <button onClick={handleCancel} className="egg-button egg-button-secondary">
          Cancel
        </button>
      </div>
    </div>
  </div>
);

}

export default Egg;
