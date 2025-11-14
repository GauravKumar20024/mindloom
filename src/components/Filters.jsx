import React, { useState } from "react";

export default function Filters({ onFilterChange }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [moodType, setMoodType] = useState("all");

  const handleChange = () => {
    onFilterChange({
      start,
      end,
      moodType
    });
  };

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <h3>Filters</h3>

      <div className="flex" style={{ gap: "12px", flexWrap: "wrap" }}>
        {/* Start Date */}
        <div>
          <label>From</label>
          <input
            type="date"
            value={start}
            onChange={(e) => {
              setStart(e.target.value);
              handleChange();
            }}
          />
        </div>

        {/* End Date */}
        <div>
          <label>To</label>
          <input
            type="date"
            value={end}
            onChange={(e) => {
              setEnd(e.target.value);
              handleChange();
            }}
          />
        </div>

        {/* Mood Category */}
        <div>
          <label>Mood Type</label>
          <select
            value={moodType}
            onChange={(e) => {
              setMoodType(e.target.value);
              handleChange();
            }}
          >
            <option value="all">All</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>
      </div>
    </div>
  );
}
