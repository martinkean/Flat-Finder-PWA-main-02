// Main page module for property browsing
import { getFromStorage, saveToStorage, addToStorageArray } from '../storage.js';
import { createPropertyCard, showToast, showMapOverlay } from '../ui.js';

// Populate the main page with content
export function populateMainPage() {
  console.log('Populating main page...');
  
  // Get the container
  const container = document.getElementById('main-container');
  if (!container) return;
  
  // Set up the header
  setupHeader(container);
  
  // Set up the property cards
  setupPropertyCards(container);
  
  // Add map button
  addMapButton(container);
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
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </svg>
    </div>
    <div class="search-bar">
      <div class="search-input-container">
        <svg viewBox="0 0 24 24">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
        </svg>
        <input type="text" placeholder="7 bedroom flat, North Dunedin" aria-label="Search for properties">
      </div>
      <button class="filter-button" aria-label="Filter search results">
        <svg viewBox="0 0 24 24">
          <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
        </svg>
      </button>
    </div>
  `;
  
  // Add to container
  container.appendChild(header);
}

// Set up property cards
function setupPropertyCards(container) {
  // Clear existing content
  const existingContent = container.querySelector('.card-stack');
  if (existingContent) {
    existingContent.remove();
  }
  
  // Create card stack container
  const cardStack = document.createElement('div');
  cardStack.className = 'card-stack';
  container.appendChild(cardStack);
  
  // Get properties and liked/disliked ones
  const properties = getFromStorage('properties') || [];
  const likedProperties = getFromStorage('likedProperties') || [];
  const dislikedProperties = getFromStorage('dislikedProperties') || [];
  
  // Filter out liked and disliked properties
  const availableProperties = properties.filter(property => 
    !likedProperties.some(liked => liked.id === property.id) && 
    !dislikedProperties.some(disliked => disliked.id === property.id)
  );
  
  // Show only the first 3 properties in the stack
  const visibleProperties = availableProperties.slice(0, 3);
  
  if (visibleProperties.length === 0) {
    // No more properties to show
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <svg viewBox="0 0 24 24" width="64" height="64">
        <path d="M19.5 12c0-2.33-4.5-7-7.5-7s-7.5 4.67-7.5 7c0 2.38 1.69 4.52 4 5.64V21h7v-3.36c2.31-1.12 4-3.26 4-5.64zm-7.5 3c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path>
      </svg>
      <h2>No more flats to show</h2>
      <p>We've run out of properties matching your preferences.</p>
      <button class="primary-button">Adjust filters</button>
    `;
    cardStack.appendChild(emptyState);
    return;
  }
  
  // Add cards to the stack in reverse order (so first one is on top)
  visibleProperties.reverse().forEach((property, index) => {
    const card = createPropertyCard(property, true);
    cardStack.appendChild(card);
  });
}

// Add map button
function addMapButton(container) {
  // Remove existing map button
  const existingMapButton = container.querySelector('.map-button');
  if (existingMapButton) {
    existingMapButton.remove();
  }
  
  // Create map button
  const mapButton = document.createElement('button');
  mapButton.className = 'map-button';
  mapButton.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
    </svg>
    <span>Map</span>
  `;
  
  // Add event listener
  mapButton.addEventListener('click', () => {
    const properties = getFromStorage('properties') || [];
    showMapOverlay(properties);
  });
  
  // Add to container
  container.appendChild(mapButton);
}

// Like a property
export function likeProperty(propertyId, card) {
  console.log(`Liking property ${propertyId}`);
  
  // Get the property and liked properties
  const properties = getFromStorage('properties') || [];
  const property = properties.find(p => p.id === propertyId);
  
  if (property) {
    // Add to liked properties
    const likedProperties = getFromStorage('likedProperties') || [];
    likedProperties.push(property);
    saveToStorage('likedProperties', likedProperties);
    
    // Remove the card with animation
    if (card) {
      card.classList.add('swipe-right');
      
      setTimeout(() => {
        card.remove();
        
        // Show a new card if available
        checkForMoreCards();
        
        // Show toast
        showToast('Property added to liked flats!');
      }, 300);
    }
  }
}

// Dislike a property
export function dislikeProperty(propertyId, card) {
  console.log(`Disliking property ${propertyId}`);
  
  // Get the property
  const properties = getFromStorage('properties') || [];
  const property = properties.find(p => p.id === propertyId);
  
  if (property) {
    // Add to disliked properties
    const dislikedProperties = getFromStorage('dislikedProperties') || [];
    dislikedProperties.push(property);
    saveToStorage('dislikedProperties', dislikedProperties);
    
    // Remove the card with animation
    if (card) {
      card.classList.add('swipe-left');
      
      setTimeout(() => {
        card.remove();
        
        // Show a new card if available
        checkForMoreCards();
      }, 300);
    }
  }
}

// Check if we need to show more cards
function checkForMoreCards() {
  const cardStack = document.querySelector('.card-stack');
  if (!cardStack) return;
  
  // If there are less than 3 cards, add more
  const visibleCards = cardStack.querySelectorAll('.property-card');
  if (visibleCards.length < 3) {
    // Get properties and liked/disliked ones
    const properties = getFromStorage('properties') || [];
    const likedProperties = getFromStorage('likedProperties') || [];
    const dislikedProperties = getFromStorage('dislikedProperties') || [];
    
    // Filter out liked and disliked properties
    const availableProperties = properties.filter(property => 
      !likedProperties.some(liked => liked.id === property.id) && 
      !dislikedProperties.some(disliked => disliked.id === property.id)
    );
    
    // Get only the properties that aren't already showing
    const visibleIds = Array.from(visibleCards).map(card => parseInt(card.dataset.id));
    const newProperties = availableProperties.filter(property => !visibleIds.includes(property.id));
    
    // Show only what we need to get to 3 cards
    const neededCount = 3 - visibleCards.length;
    const propertiesToAdd = newProperties.slice(0, neededCount);
    
    // Add new cards to the bottom of the stack
    propertiesToAdd.forEach(property => {
      const card = createPropertyCard(property, true);
      cardStack.appendChild(card);
    });
  }
}

// Show property details
export function showPropertyDetails(propertyId) {
  console.log(`Showing details for property ${propertyId}`);
  
  // For now, just show a toast
  showToast('Property details coming soon!');
}