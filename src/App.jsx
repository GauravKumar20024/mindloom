import React, { useState, useEffect } from "react";

// Components
import AddEntry from "./components/AddEntry";
import EntryList from "./components/EntryList";
import MoodChart from "./components/MoodChart";
import Filters from "./components/Filters";
import ExportCSV from "./components/ExportCSV";

// Helpers
import { loadEntries, saveEntries } from "./helpers/storage";
import {
  positiveMoods,
  neutralMoods,
  negativeMoods,
} from "./helpers/moodCategories";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [filters, setFilters] = useState({
    start: "",
    end: "",
    moodType: "all",
  });

  // Load entries on mount
  useEffect(() => {
    const stored = loadEntries();
    setEntries(stored);
  }, []);

  // Automatically save when entries change
  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  // ----------------------------
  // ⭐ Filtering Logic
  // ----------------------------
  const applyFilters = () => {
    let filtered = [...entries];

    // Filter start date
    if (filters.start) {
      filtered = filtered.filter(
        (e) => new Date(e.date) >= new Date(filters.start)
      );
    }

    // Filter end date
    if (filters.end) {
      filtered = filtered.filter(
        (e) =>
          new Date(e.date) <= new Date(filters.end + "T23:59:59")
      );
    }

    // Mood category
    if (filters.moodType === "positive") {
      filtered = filtered.filter((e) =>
        positiveMoods.includes(e.mood)
      );
    }
    if (filters.moodType === "neutral") {
      filtered = filtered.filter((e) =>
        neutralMoods.includes(e.mood)
      );
    }
    if (filters.moodType === "negative") {
      filtered = filtered.filter((e) =>
        negativeMoods.includes(e.mood)
      );
    }

    return filtered;
  };

  const filteredEntries = applyFilters();

  return (
    <div className="container" style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>🌿 MindLoom</h1>

      {/* Add Entry Form */}
      <AddEntry entries={entries} setEntries={setEntries} />

      {/* Filters */}
      <Filters onFilterChange={setFilters} />

      {/* Chart */}
      {filteredEntries.length > 0 ? (
        <MoodChart entries={filteredEntries} />
      ) : (
        <div className="card" style={{ marginTop: 20 }}>
          No data for selected filters.
        </div>
      )}

      {/* Entry List */}
      <EntryList
        entries={filteredEntries}
        setEntries={setEntries}
      />

      {/* Export CSV */}
      <ExportCSV entries={filteredEntries} />
    </div>
  );
}
