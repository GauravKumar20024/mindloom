import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// Convert moods into numeric values for graphing
const moodValue = {
  joyful: 5,
  happy: 4,
  content: 4,
  calm: 3,
  neutral: 3,
  tired: 2,
  sad: 1,
  stressed: 1,
  anxious: 1,
  angry: 0,
};

// Helper: Format date → e.g., "Nov 12"
function formatDateShort(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Helper: Group entries by day or week
function aggregate(entries, view = "daily") {
  const grouped = {};

  entries.forEach((e) => {
    const date = new Date(e.date);
    const key =
      view === "weekly"
        ? `${date.getFullYear()}-W${getWeekNumber(date)}`
        : date.toISOString().split("T")[0];

    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(e);
  });

  const aggregated = Object.entries(grouped).map(([key, arr]) => {
    const avgMood =
      arr.reduce((sum, e) => sum + (moodValue[e.mood] ?? 3), 0) / arr.length;
    const avgStress =
      arr.reduce((sum, e) => sum + (e.stress ?? 0), 0) / arr.length;

    let label = key;
    if (view === "daily") {
      label = formatDateShort(key);
    } else {
      // e.g., "2025-W45" → "Week 45"
      label = "Week " + key.split("-W")[1];
    }

    return {
      label,
      moodScore: Number(avgMood.toFixed(2)),
      stress: Number(avgStress.toFixed(2)),
    };
  });

  // Sort by date
  aggregated.sort((a, b) => {
    const ad = parseInt(a.label.match(/\d+/)?.[0]) || 0;
    const bd = parseInt(b.label.match(/\d+/)?.[0]) || 0;
    return ad - bd;
  });

  return aggregated;
}

// Helper: Get week number of year
function getWeekNumber(date) {
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date - firstJan + (firstJan.getTimezoneOffset() - date.getTimezoneOffset()) * 60000) /
      86400000
  );
  return Math.ceil((days + firstJan.getDay() + 1) / 7);
}

// Custom tooltip renderer
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const mood = payload.find((p) => p.dataKey === "moodScore")?.value;
    const stress = payload.find((p) => p.dataKey === "stress")?.value;
    return (
      <div
        style={{
          background: "#fff",
          padding: "8px 10px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: "13px",
        }}
      >
        <div style={{ fontWeight: "600" }}>📅 {label}</div>
        <div>😊 Avg Mood: {mood}</div>
        <div>😣 Avg Stress: {stress}</div>
      </div>
    );
  }
  return null;
}

export default function MoodChart({ entries }) {
  const [view, setView] = useState("daily");

  const data = useMemo(() => {
    const sorted = [...entries].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return aggregate(sorted, view);
  }, [entries, view]);

  if (data.length === 0) {
    return (
      <div className="card small" style={{ marginTop: 12 }}>
        No chart data — log a few entries.
      </div>
    );
  }

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div
        className="header"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <h3 style={{ margin: 0 }}>Mood Trend ({view})</h3>
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "8px",
            border: "1px solid #e5e5ef",
            fontSize: "14px",
          }}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis
              yAxisId="left"
              domain={[0, 5]}
              label={{ value: "Mood", angle: -90, position: "insideLeft" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 10]}
              label={{ value: "Stress", angle: 90, position: "insideRight" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="moodScore"
              stroke="#7C83FD"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Mood"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="stress"
              stroke="#FF6B6B"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Stress"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
