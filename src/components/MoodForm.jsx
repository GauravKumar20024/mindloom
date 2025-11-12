import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const moodOptions = [
  { key: 'very_happy', label: 'Very Happy' },
  { key: 'happy', label: 'Happy' },
  { key: 'neutral', label: 'Neutral' },
  { key: 'tired', label: 'Tired' },
  { key: 'stressed', label: 'Stressed' },
  { key: 'anxious', label: 'Anxious' },
];

export default function MoodForm({ onAdd }) {
  const [mood, setMood] = useState('neutral');
  const [note, setNote] = useState('');
  const [stress, setStress] = useState(5);

  function handleSubmit(e){
    e.preventDefault();
    const entry = {
      id: uuidv4(),
      date: new Date().toISOString(), // store ISO — we'll format for display
      mood,
      note: note.trim(),
      stress: Number(stress)
    };
    onAdd(entry);
    // reset
    setMood('neutral');
    setNote('');
    setStress(5);
  }

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="header">
        <div className="title">
          <h1>Log mood</h1>
          <p className="small">Record how you feel right now — private and stored locally.</p>
        </div>
        <div className="mood-pill">{mood.replace('_',' ')}</div>
      </div>

      <div className="form-row gap-12">
        <div style={{flex:1}}>
          <label className="small">Mood</label>
          <select value={mood} onChange={e=>setMood(e.target.value)}>
            {moodOptions.map(m => (
              <option value={m.key} key={m.key}>{m.label}</option>
            ))}
          </select>
        </div>

        <div style={{width:140}}>
          <label className="small">Stress (1-10)</label>
          <input
            type="number"
            min="1"
            max="10"
            value={stress}
            onChange={e=>setStress(e.target.value)}
          />
        </div>
      </div>

      <div style={{marginBottom:12}}>
        <label className="small">Note (optional)</label>
        <textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a short note..."/>
      </div>

      <div style={{display:'flex', justifyContent:'flex-end'}}>
        <button type="submit">Save entry</button>
      </div>
    </form>
  );
}
