export function getLocalStore(key) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}

export function setLocalStore(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeLocalStore(key) {
  localStorage.removeItem(key);
}

export function escapeRegExp(string){
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}