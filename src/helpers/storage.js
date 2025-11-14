const STORAGE_KEY = 'mindloom_entries';

export function loadEntries(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    console.error('Failed to parse entries', e);
    return [];
  }
}

export function saveEntries(entries){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }catch(e){
    console.error('Failed to save entries', e);
  }
}
