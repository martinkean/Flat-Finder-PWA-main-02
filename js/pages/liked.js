// Liked page module for saved properties
import { getFromStorage, saveToStorage } from '../storage.js';
import { createPropertyCard, showToast } from '../ui.jsx';

// Populate the liked page with content
export function populateLikedPage() {
  console.log('Populating liked page...');
  
  // Get the container
  const container = document.getElementById('liked-container');
  if (!container) return;
  
  // Set up the header
  setupHeader(container);
  
  // Set up the liked properties
  setupLikedProperties(container);
}

// Set up the header
function setupHeader(container) {
  // Clear existing header
  const existingHeader = container.querySelector('.header');
  if (existingHeader) {
    existingHeader.remove();
  }
  
  // Create header
  const header = document.createElement('div');
  header.className = 'header';
  header.innerHTML = `
    <div class="header-logo">
      <svg viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
      </svg>
      <h1 class="header-title">Liked Flats</h1>
    </div>
  `;
  
  // Add to container
  container.appendChild(header);
}

// Set up liked properties
function setupLikedProperties(container) {
  // Clear existing content
  const existingContent = container.querySelector('.main-content');
  if (existingContent) {
    existingContent.remove();
  }
  
  // Create main content
  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';
  container.appendChild(mainContent);
  
  // Get liked properties
  const likedProperties = getFromStorage('likedProperties') || [];
  
  if (likedProperties.length === 0) {
    // No liked properties yet
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <svg viewBox="0 0 24 24" width="64" height="64">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
      </svg>
      <h2>No liked flats yet</h2>
      <p>When you like a flat, it will appear here.</p>
    `;
    mainContent.appendChild(emptyState);
    return;
  }
  
  // Create grid for property cards
  const listContainer = document.createElement('div');
  listContainer.className = 'liked-properties-list';
  mainContent.appendChild(listContainer);
  
  // Add property cards
  likedProperties.forEach(property => {
    const card = createLikedPropertyCard(property);
    listContainer.appendChild(card);
  });
}

// Create a liked property card
function createLikedPropertyCard(property) {
  const card = document.createElement('div');
  card.className = 'property-card list-view';
  card.dataset.id = property.id;
  
  // Create card content
  card.innerHTML = `
    <div class="property-image">
      <img src="${property.image}" alt="${property.title}">
      <div class="property-rating">
        <svg viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
        ${property.rating}
      </div>
      <div class="property-logo">
        <strong>${property.agency}</strong>
      </div>
    </div>
    <div class="property-info">
      <h2 class="property-title">${property.title}</h2>
      <p class="property-price">${property.price}</p>
      <div class="property-features">
        <div class="feature">
          <svg viewBox="0 0 24 24">
            <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V7H1v10h22v-6c0-2.21-1.79-4-4-4z"></path>
          </svg>
          <span>${property.features.beds} beds</span>
        </div>
        <div class="feature">
          <svg viewBox="0 0 24 24">
            <path d="M7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5.05 1.55c.24.41.45.85.6 1.31.18-.66.46-1.27.84-1.82.23.33.57.6.96.78-.42.26-.78.62-1.06 1.03-.75-.87-1.86-1.44-3.12-1.44-1.4 0-2.62.7-3.37 1.76-.37-.23-.66-.55-.85-.95.9-.73 1.68-1.27 2.33-1.62.32.32.77.53 1.27.53s.95-.19 1.27-.53c.32.32.77.53 1.27.53s.95-.19 1.27-.53c.07.07.15.13.23.18zm-4.53 3.05c-.73-.73-1.92-.73-2.65 0L2.95 16.2c-.39.4-.39 1.05 0 1.45.4.39 1.05.39 1.45 0l.65-.65v3h8v-3l2.4 2.4c.39.4 1.05.4 1.45 0 .39-.4.39-1.05 0-1.45l-4.65-4.65c-.38-.38-1-.56-1.55-.56-.56 0-1.18.18-1.55.55l-.1.1v-1.3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.3l-.1-.1z"></path>
          </svg>
          <span>${property.features.showers} showers</span>
        </div>
        <div class="feature">
          <svg viewBox="0 0 24 24">
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"></path>
          </svg>
          <span>${property.features.parking} car parks</span>
        </div>
      </div>
      <div class="property-tags">
        ${property.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </div>
    <div class="property-actions">
      <button class="action-button unlike" aria-label="Unlike this property">
        <svg viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
      </button>
      <button class="action-button info" aria-label="More information">
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
        </svg>
      </button>
      <button class="action-button share" aria-label="Share this property">
        <svg viewBox="0 0 24 24">
          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"></path>
        </svg>
      </button>
      <button class="action-button apply" aria-label="Apply for this property">
        <svg viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
        </svg>
      </button>
    </div>
  `;
  
  // Add event listeners
  addLikedPropertyCardEventListeners(card);
  
  return card;
}

// Add event listeners to liked property cards
function addLikedPropertyCardEventListeners(card) {
  // Unlike button
  const unlikeButton = card.querySelector('.action-button.unlike');
  if (unlikeButton) {
    unlikeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const propertyId = parseInt(card.dataset.id);
      unlikeProperty(propertyId, card);
    });
  }
  
  // Info button
  const infoButton = card.querySelector('.action-button.info');
  if (infoButton) {
    infoButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const propertyId = parseInt(card.dataset.id);
      showPropertyDetails(propertyId);
    });
  }
  
  // Share button
  const shareButton = card.querySelector('.action-button.share');
  if (shareButton) {
    shareButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const propertyId = parseInt(card.dataset.id);
      shareProperty(propertyId);
    });
  }
  
  // Apply button
  const applyButton = card.querySelector('.action-button.apply');
  if (applyButton) {
    applyButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const propertyId = parseInt(card.dataset.id);
      applyForProperty(propertyId);
    });
  }
}

// Unlike a property
function unlikeProperty(propertyId, card) {
  console.log(`Unliking property ${propertyId}`);
  
  // Get liked properties
  let likedProperties = getFromStorage('likedProperties') || [];
  
  // Remove the property
  likedProperties = likedProperties.filter(property => property.id !== propertyId);
  saveToStorage('likedProperties', likedProperties);
  
  // Remove the card with animation
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      card.remove();
      
      // Check if we need to show empty state
      const listContainer = document.querySelector('.liked-properties-list');
      if (listContainer && listContainer.children.length === 0) {
        setupLikedProperties(document.getElementById('liked-container'));
      }
      
      // Show toast
      showToast('Property removed from liked flats');
    }, 300);
  }
}

// Show property details
function showPropertyDetails(propertyId) {
  console.log(`Showing details for property ${propertyId}`);
  
  // For now, just show a toast
  showToast('Property details coming soon!');
}

// Share a property
function shareProperty(propertyId) {
  console.log(`Sharing property ${propertyId}`);
  
  // Get the property
  const likedProperties = getFromStorage('likedProperties') || [];
  const property = likedProperties.find(p => p.id === propertyId);
  
  if (property) {
    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this flat: ${property.title}`,
        url: window.location.href,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback if Web Share API is not available
      showToast('Share functionality coming soon!');
    }
  }
}

// Apply for a property
function applyForProperty(propertyId) {
  console.log(`Applying for property ${propertyId}`);
  showToast('Application started - redirecting to form...');
}