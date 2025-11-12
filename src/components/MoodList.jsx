import React from 'react';

function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleString();
}

export default function MoodList({ entries, onDelete }){
  if(!entries || entries.length === 0){
    return <div className="card"><p className="small">No entries yet — start by logging a mood.</p></div>
  }

  return (
    <div className="card" style={{marginTop:12}}>
      <h3 style={{marginTop:0}}>History</h3>
      <div style={{display:'grid', gap:10}}>
        {entries.map(e => (
          <div key={e.id} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px', borderRadius:8, border:'1px solid #f1f1f6'}}>
            <div>
              <div style={{fontWeight:700}}>{e.mood.replace('_',' ')}</div>
              <div className="small">{formatDate(e.date)} · Stress: {e.stress}</div>
              {e.note && <div style={{marginTop:6}}>{e.note}</div>}
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end'}}>
              <button onClick={()=>onDelete(e.id)} style={{background:'#ffeef0', color:'#b43b51', padding:'6px 10px', borderRadius:8, border:0}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
