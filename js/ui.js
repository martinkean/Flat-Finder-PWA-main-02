// UI module for the FlatMate PWA
import { populateMainPage } from './pages/main.js';
import { populateLikedPage } from './pages/liked.js';
import { populateGroupPage } from './pages/group.js';
import { populateAccountPage } from './pages/account.js';

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
  let moveX = 0;
  let moveY = 0;
  
  card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  card.addEventListener('touchmove', (e) => {
    moveX = e.touches[0].clientX;
    moveY = e.touches[0].clientY;
    
    const deltaX = moveX - startX;
    const deltaY = moveY - startY;
    
    // Only allow horizontal swiping if the movement is more horizontal than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
      card.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.1}deg)`;
    }
  });
  
  card.addEventListener('touchend', (e) => {
    const deltaX = moveX - startX;
    
    if (deltaX > 100) {
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
      card.style.transform = '';
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

// Show property details
function showPropertyDetails(propertyId) {
  import('./pages/main.js').then(module => {
    module.showPropertyDetails(propertyId);
  });
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