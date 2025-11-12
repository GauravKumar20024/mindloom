import React, { useEffect, useState } from 'react';
import './index.css';

import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';
import MoodChart from './components/MoodChart';
import { loadEntries, saveEntries } from './utils/localStorageHelper';

function App(){
  const [entries, setEntries] = useState([]);

  useEffect(()=>{
    setEntries(loadEntries());
  },[]);

  useEffect(()=>{
    saveEntries(entries);
  },[entries]);

  function handleAdd(entry){
    setEntries(prev => [entry, ...prev]); // newest first
  }

  function handleDelete(id){
    if(!confirm('Delete this entry?')) return;
    setEntries(prev => prev.filter(e=>e.id !== id));
  }

  return (
    <div className="container">
      <div style={{display:'flex', gap:16, alignItems:'center', marginBottom:14}}>
        <div style={{display:'flex', flexDirection:'column'}}>
          <h1 style={{margin:0}}>MindLoom</h1>
          <div className="small">Weave your feelings. Track your growth.</div>
        </div>
        <div style={{marginLeft:'auto'}}>
          <div className="small">Local only · Private</div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 360px', gap:16}}>
        <div>
          <MoodForm onAdd={handleAdd} />
          <MoodChart entries={entries} />
        </div>

        <div>
          <MoodList entries={entries} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
