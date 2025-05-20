// UI module for the FlatMate PWA
import { populateMainPage } from './pages/main.js';
import { populateLikedPage } from './pages/liked.js';
import { populateGroupPage } from './pages/group.js';
import { populateAccountPage } from './pages/account.js';
import { showPropertyDetails } from './pages/main.js';

// Initialize UI components
export function initUI() {
  console.log('Initializing UI components...');
  
  // Add any global UI event listeners here
  setupHeaderActions();
}

// Set up header action buttons
function setupHeaderActions() {
  // This will be populated by each page as needed
}

// Show a specific page
export function showPage(pageName) {
  console.log(`Showing page: ${pageName}`);
  
  // Hide all pages
  const pages = document.querySelectorAll('.page-container');
  pages.forEach(page => {
    page.classList.remove('current-page');
  });
  
  // Show the requested page
  const pageContainer = document.getElementById(`${pageName}-container`);
  if (pageContainer) {
    pageContainer.classList.add('current-page');
    
    // Populate the page content
    switch (pageName) {
      case 'main':
        populateMainPage();
        break;
      case 'liked':
        populateLikedPage();
        break;
      case 'group':
        populateGroupPage();
        break;
      case 'account':
        populateAccountPage();
        break;
    }
  }
}

// Create a property card
export function createPropertyCard(property, isStack = false) {
  const card = document.createElement('div');
  card.className = `property-card${isStack ? ' stack' : ''}`;
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
      <button class="action-button like" aria-label="Like this property">
        <svg viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
        </svg>
      </button>
      <button class="action-button info" aria-label="More information">
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
        </svg>
      </button>
      <button class="action-button dislike" aria-label="Dislike this property">
        <svg viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
      </button>
    </div>
  `;
  
  // Add event listeners
  addPropertyCardEventListeners(card);
  
  return card;
}

// Add event listeners to property cards
function addPropertyCardEventListeners(card) {
  // Like button
  const likeButton = card.querySelector('.action-button.like');
  if (likeButton) {
    likeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const propertyId = parseInt(card.dataset.id);
      likeProperty(propertyId, card);
    });
  }
  
  // Dislike button
  const dislikeButton = card.querySelector('.action-button.dislike');
  if (dislikeButton) {
    dislikeButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const propertyId = parseInt(card.dataset.id);
      dislikeProperty(propertyId, card);
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
  
  // Touch events for swiping
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;
  let initialRotation = 0;
  
  card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    card.classList.add('swiping');
  });
  
  card.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
    
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    const rotation = deltaX * 0.1;
    
    // Determine swipe direction
    if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -50) {
      // Swiping up
      card.classList.add('swiping-up');
      card.style.transform = `translateY(${deltaY}px)`;
    } else {
      // Swiping left/right
      card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
      
      if (deltaX > 50) {
        card.classList.add('swiping-right');
        card.classList.remove('swiping-left');
      } else if (deltaX < -50) {
        card.classList.add('swiping-left');
        card.classList.remove('swiping-right');
      } else {
        card.classList.remove('swiping-right', 'swiping-left');
      }
    }
  });
  
  card.addEventListener('touchend', (e) => {
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    
    card.classList.remove('swiping');
    
    if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < -100) {
      // Swiped up - show details
      const propertyId = parseInt(card.dataset.id);
      showPropertyDetails(propertyId);
    } else if (deltaX > 100) {
      // Swiped right (like)
      card.classList.add('swipe-right');
      const propertyId = parseInt(card.dataset.id);
      likeProperty(propertyId, card);
    } else if (deltaX < -100) {
      // Swiped left (dislike)
      card.classList.add('swipe-left');
      const propertyId = parseInt(card.dataset.id);
      dislikeProperty(propertyId, card);
    } else {
      // Reset position
      card.style.transform = ``;
      card.classList.remove('swiping-right', 'swiping-left', 'swiping-up');
    }
  });
}

// Like a property
function likeProperty(propertyId, card) {
  import('./pages/main.js').then(module => {
    module.likeProperty(propertyId, card);
  });
}

// Dislike a property
function dislikeProperty(propertyId, card) {
  import('./pages/main.js').then(module => {
    module.dislikeProperty(propertyId, card);
  });
}

// Show map overlay
export function showMapOverlay(properties) {
  // Create map overlay if it doesn't exist
  let mapOverlay = document.querySelector('.map-overlay');
  
  if (!mapOverlay) {
    mapOverlay = document.createElement('div');
    mapOverlay.className = 'map-overlay';
    mapOverlay.innerHTML = `
      <div class="map-header">
        <h2>Available Flats</h2>
        <button class="map-close">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </button>
      </div>
      <div class="map-content">
        <div id="map" class="map-container"></div>
      </div>
    `;
    
    document.body.appendChild(mapOverlay);
    
    // Add close button handler
    const closeButton = mapOverlay.querySelector('.map-close');
    closeButton.addEventListener('click', () => {
      mapOverlay.classList.remove('show');
    });
  }
  
  // Clear existing markers
  const mapContent = mapOverlay.querySelector('.map-content');
  const existingMarkers = mapContent.querySelectorAll('.map-marker');
  existingMarkers.forEach(marker => marker.remove());
  
  // Initialize map centered on North Dunedin
  const map = L.map('map').setView([-45.8644, 170.5144], 15);
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  
  // Add property markers
  properties.forEach(property => {
    // Create custom marker content
    const markerContent = `
      <div class="map-marker-content">
        <div class="map-marker-price">${property.price}</div>
        <div>${property.features.beds} beds</div>
      </div>
    `;
    
    // Create marker with custom icon
    const marker = L.marker(
      // Random positions around North Dunedin for demo
      [-45.8644 + (Math.random() - 0.5) * 0.01, 
       170.5144 + (Math.random() - 0.5) * 0.01],
      {
        icon: L.divIcon({
          className: 'map-marker',
          html: markerContent
        })
      }
    ).addTo(map);
    
    marker.on('click', () => {
      showPropertyDetails(property.id);
    });
  });
  
  // Show overlay
  mapOverlay.classList.add('show');
}

// Show a toast notification
export function showToast(message, duration = 3000) {
  // Remove any existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  // Add toast to the DOM
  document.body.appendChild(toast);
  
  // Show the toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Hide the toast after duration
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
}

// Create a loader
export function createLoader() {
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = `
    <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2">
          <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
          </path>
        </g>
      </g>
    </svg>
  `;
  return loader;
}

// Show filters overlay
export function showFiltersOverlay() {
  // Create filters overlay if it doesn't exist
  let filtersOverlay = document.querySelector('.filters-overlay');
  
  if (!filtersOverlay) {
    filtersOverlay = document.createElement('div');
    filtersOverlay.className = 'filters-overlay';
    filtersOverlay.innerHTML = `
      <div class="filters-header">
        <h2>Filters</h2>
        <button class="filters-close">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </button>
      </div>
      <div class="filters-content">
        <div class="filter-group">
          <h3 class="filter-group-title">Price Range (per week)</h3>
          <div class="filter-range">
            <div class="filter-range-values">
              <span>$150</span>
              <span>$400</span>
            </div>
            <input type="range" min="150" max="400" step="10" value="250">
          </div>
        </div>
        
        <div class="filter-group">
          <h3 class="filter-group-title">Bedrooms</h3>
          <div class="filter-options">
            <button class="filter-option">2+</button>
            <button class="filter-option">3+</button>
            <button class="filter-option selected">4+</button>
            <button class="filter-option">5+</button>
            <button class="filter-option">6+</button>
          </div>
        </div>
        
        <div class="filter-group">
          <h3 class="filter-group-title">Location</h3>
          <div class="filter-options">
            <button class="filter-option selected">North Dunedin</button>
            <button class="filter-option">Central Dunedin</button>
            <button class="filter-option">South Dunedin</button>
            <button class="filter-option">St Clair</button>
          </div>
        </div>
        
        <div class="filter-group">
          <h3 class="filter-group-title">Features</h3>
          <div class="filter-options">
            <button class="filter-option">Heat Pump</button>
            <button class="filter-option selected">Furnished</button>
            <button class="filter-option">Double Glazed</button>
            <button class="filter-option">Fiber Internet</button>
            <button class="filter-option">Pets Allowed</button>
          </div>
        </div>
        
        <div class="filter-group">
          <h3 class="filter-group-title">Agency</h3>
          <div class="filter-options">
            <button class="filter-option selected">Edinburgh</button>
            <button class="filter-option">Cutlers</button>
            <button class="filter-option">Metro</button>
            <button class="filter-option">Student Services</button>
          </div>
        </div>
      </div>
      <div class="filters-footer">
        <button class="reset-button">Reset All</button>
        <button class="apply-button">Apply Filters</button>
      </div>
    `;
    
    document.body.appendChild(filtersOverlay);
    
    // Add close button handler
    const closeButton = filtersOverlay.querySelector('.filters-close');
    closeButton.addEventListener('click', () => {
      filtersOverlay.classList.remove('show');
    });
    
    // Add filter option handlers
    const filterOptions = filtersOverlay.querySelectorAll('.filter-option');
    filterOptions.forEach(option => {
      option.addEventListener('click', () => {
        option.classList.toggle('selected');
      });
    });
    
    // Add button handlers
    const resetButton = filtersOverlay.querySelector('.reset-button');
    const applyButton = filtersOverlay.querySelector('.apply-button');
    
    resetButton.addEventListener('click', () => {
      filterOptions.forEach(option => option.classList.remove('selected'));
      const rangeInput = filtersOverlay.querySelector('input[type="range"]');
      if (rangeInput) rangeInput.value = 250;
    });
    
    applyButton.addEventListener('click', () => {
      filtersOverlay.classList.remove('show');
      showToast('Filters applied');
    });
  }
  
  // Show overlay
  filtersOverlay.classList.add('show');
}

// Show settings overlay
export function showSettingsOverlay() {
  // Create settings overlay if it doesn't exist
  let settingsOverlay = document.querySelector('.settings-overlay');
  
  if (!settingsOverlay) {
    settingsOverlay = document.createElement('div');
    settingsOverlay.className = 'settings-overlay';
    settingsOverlay.innerHTML = `
      <div class="settings-header">
        <h2>Settings</h2>
        <button class="settings-close">
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </button>
      </div>
      <div class="settings-content">
        <div class="settings-group">
          <h3 class="settings-group-title">Account</h3>
          <div class="settings-row">
            <div class="settings-row-info">
              <h3>Email Notifications</h3>
              <p>Get updates about new properties and applications</p>
            </div>
            <div class="settings-row-action">
              <label class="toggle">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          <div class="settings-row">
            <div class="settings-row-info">
              <h3>Push Notifications</h3>
              <p>Receive instant updates on your device</p>
            </div>
            <div class="settings-row-action">
              <label class="toggle">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="settings-group">
          <h3 class="settings-group-title">Privacy</h3>
          <div class="settings-row">
            <div class="settings-row-info">
              <h3>Profile Visibility</h3>
              <p>Control who can see your profile</p>
            </div>
            <div class="settings-row-action">
              <label class="toggle">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
          <div class="settings-row">
            <div class="settings-row-info">
              <h3>Location Services</h3>
              <p>Allow access to your location</p>
            </div>
            <div class="settings-row-action">
              <label class="toggle">
                <input type="checkbox" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="settings-group">
          <h3 class="settings-group-title">Appearance</h3>
          <div class="settings-row">
            <div class="settings-row-info">
              <h3>Dark Mode</h3>
              <p>Switch between light and dark themes</p>
            </div>
            <div class="settings-row-action">
              <label class="toggle">
                <input type="checkbox">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div class="settings-group">
          <h3 class="settings-group-title">Support</h3>
          <div class="settings-row">
            <div class="settings-row-info">
              <h3>Help Center</h3>
              <p>Get help with FlatMate</p>
            </div>
            <div class="settings-row-action">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
              </svg>
            </div>
          </div>
          <div class="settings-row">
            <div class="settings-row-info">
              <h3>Terms of Service</h3>
              <p>Read our terms and conditions</p>
            </div>
            <div class="settings-row-action">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
              </svg>
            </div>
          </div>
          <div class="settings-row">
            <div class="settings-row-info">
              <h3>Privacy Policy</h3>
              <p>Learn how we handle your data</p>
            </div>
            <div class="settings-row-action">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="settings-version">
          Version 1.0.0
        </div>
      </div>
    `;
    
    document.body.appendChild(settingsOverlay);
    
    // Add close button handler
    const closeButton = settingsOverlay.querySelector('.settings-close');
    closeButton.addEventListener('click', () => {
      settingsOverlay.classList.remove('show');
    });
    
    // Add toggle handlers
    const toggles = settingsOverlay.querySelectorAll('.toggle input');
    toggles.forEach(toggle => {
      toggle.addEventListener('change', () => {
        const setting = toggle.closest('.settings-row').querySelector('h3').textContent;
        const status = toggle.checked ? 'enabled' : 'disabled';
        showToast(`${setting} ${status}`);
      });
    });
    
    // Add support link handlers
    const supportLinks = settingsOverlay.querySelectorAll('.settings-group:last-child .settings-row');
    supportLinks.forEach(link => {
      link.addEventListener('click', () => {
        const title = link.querySelector('h3').textContent;
        showToast(`${title} coming soon!`);
      });
    });
  }
  
  // Show overlay
  settingsOverlay.classList.add('show');
}