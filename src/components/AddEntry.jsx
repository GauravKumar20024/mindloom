import React, { useState } from "react";

export default function AddEntry({ entries, setEntries }) {
  const [mood, setMood] = useState("neutral");
  const [stress, setStress] = useState(5);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      id: Date.now(),
      mood,
      stress,
      notes,
      date: new Date().toISOString(),
    };

    const updated = [...entries, newEntry];
    setEntries(updated);

    // Reset fields
    setMood("neutral");
    setStress(5);
    setNotes("");
  };

  return (
    <div className="card">
      <h3>Add Mood Entry</h3>

      <form onSubmit={handleSubmit} className="flex-col">
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="joyful">Joyful</option>
          <option value="happy">Happy</option>
          <option value="content">Content</option>
          <option value="calm">Calm</option>
          <option value="neutral">Neutral</option>
          <option value="tired">Tired</option>
          <option value="sad">Sad</option>
          <option value="stressed">Stressed</option>
          <option value="anxious">Anxious</option>
          <option value="angry">Angry</option>
        </select>

        <input
          type="number"
          min="0"
          max="10"
          value={stress}
          onChange={(e) => setStress(Number(e.target.value))}
        />

        <textarea
          rows="2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any notes..."
        />

        <button className="btn">Add Entry</button>
      </form>
    </div>
  );
}
