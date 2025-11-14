import React from "react";

export default function ExportCSV({ entries }) {
  const handleExport = () => {
    if (entries.length === 0) {
      alert("No data to export!");
      return;
    }

    const header = "Date,Mood,Stress,Notes\n";

    const rows = entries
      .map((e) =>
        [
          new Date(e.date).toLocaleString(),
          e.mood,
          e.stress,
          `"${(e.notes || "").replace(/"/g, '""')}"`
        ].join(",")
      )
      .join("\n");

    const csv = header + rows;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "mindloom_export.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <button className="btn" onClick={handleExport}>
        📤 Export CSV
      </button>
    </div>
  );
}
