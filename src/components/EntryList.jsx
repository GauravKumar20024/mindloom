import React, { useState } from "react";
import { moods } from "../helpers/moodOptions"; // list of mood options like ["joyful", "happy", "sad" ...]
import { loadEntries, saveEntries } from "../helpers/storage"; // your localStorage helpers

export default function EntryList({ entries, setEntries }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ mood: "", stress: 0, notes: "" });

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setFormData({
      mood: entry.mood,
      stress: entry.stress || 0,
      notes: entry.notes || "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ mood: "", stress: 0, notes: "" });
  };

  const handleSave = (id) => {
    const updated = entries.map((e) =>
      e.id === id ? { ...e, ...formData } : e
    );
    setEntries(updated);
    saveEntries(updated);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    saveEntries(updated);
  };

  if (entries.length === 0)
    return (
      <div className="card small" style={{ marginTop: 12 }}>
        No entries yet — log your first mood!
      </div>
    );

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <h3>Recent Entries</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {entries
          .slice()
          .reverse()
          .map((entry) => (
            <li
              key={entry.id}
              style={{
                borderBottom: "1px solid #eee",
                padding: "12px 0",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {editingId === entry.id ? (
                <>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <select
                      value={formData.mood}
                      onChange={(e) =>
                        setFormData({ ...formData, mood: e.target.value })
                      }
                      style={{
                        padding: "6px 8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                      }}
                    >
                      {moods.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={formData.stress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stress: Number(e.target.value),
                        })
                      }
                      style={{
                        width: "60px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        textAlign: "center",
                      }}
                    />
                  </div>

                  <textarea
                    rows="2"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "6px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleSave(entry.id)}
                      className="btn small"
                    >
                      💾 Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn small secondary"
                    >
                      ✖ Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <strong>{entry.mood}</strong> &nbsp;·&nbsp; Stress{" "}
                    <strong>{entry.stress}</strong>
                  </div>
                  {entry.notes && (
                    <div
                      style={{
                        color: "#666",
                        fontSize: "14px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {entry.notes}
                    </div>
                  )}
                  <div style={{ fontSize: "12px", color: "#999" }}>
                    {new Date(entry.date).toLocaleString()}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleEdit(entry)}
                      className="btn small"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="btn small danger"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
