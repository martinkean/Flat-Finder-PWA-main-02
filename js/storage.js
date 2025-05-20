// Local storage module for the FlatMate PWA

// Initialize storage with default values if needed
export function initStorage() {
  console.log('Initializing local storage...');
  
  // Create storage namespace if it doesn't exist
  if (!localStorage.getItem('flatmate_app')) {
    localStorage.setItem('flatmate_app', JSON.stringify({
      initialized: true,
      timestamp: Date.now()
    }));
  }
}

// Get data from storage
export function getFromStorage(key) {
  try {
    const data = localStorage.getItem(`flatmate_${key}`);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error retrieving ${key} from storage:`, error);
    return null;
  }
}

// Save data to storage
export function saveToStorage(key, data) {
  try {
    localStorage.setItem(`flatmate_${key}`, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to storage:`, error);
    return false;
  }
}

// Remove data from storage
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(`flatmate_${key}`);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from storage:`, error);
    return false;
  }
}

// Clear all app data
export function clearStorage() {
  const appKeys = [];
  
  // Find all app-related keys
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('flatmate_')) {
      appKeys.push(key);
    }
  }
  
  // Remove all app keys
  appKeys.forEach(key => {
    localStorage.removeItem(key);
  });
  
  return appKeys.length > 0;
}

// Get all keys for the app
export function getAllKeys() {
  const appKeys = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('flatmate_')) {
      appKeys.push(key.replace('flatmate_', ''));
    }
  }
  
  return appKeys;
}

// Add an item to an array in storage
export function addToStorageArray(arrayKey, item) {
  const array = getFromStorage(arrayKey) || [];
  array.push(item);
  return saveToStorage(arrayKey, array);
}

// Remove an item from an array in storage
export function removeFromStorageArray(arrayKey, itemId) {
  let array = getFromStorage(arrayKey) || [];
  array = array.filter(item => item.id !== itemId);
  return saveToStorage(arrayKey, array);
}

// Update an item in an array in storage
export function updateInStorageArray(arrayKey, itemId, updatedItem) {
  let array = getFromStorage(arrayKey) || [];
  const index = array.findIndex(item => item.id === itemId);
  
  if (index !== -1) {
    array[index] = { ...array[index], ...updatedItem };
    return saveToStorage(arrayKey, array);
  }
  
  return false;
}