// Account page module
import { getFromStorage, saveToStorage } from '../storage.js';
import { showToast } from '../ui.js';

// Populate the account page with content
export function populateAccountPage() {
  console.log('Populating account page...');
  
  // Get the container
  const container = document.getElementById('account-container');
  if (!container) return;
  
  // Set up the header
  setupHeader(container);
  
  // Set up the account tabs
  setupAccountTabs(container);
  
  // Set up the account content (default to profile)
  showAccountTab('profile', container);
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
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
      </svg>
      <h1 class="header-title">Account</h1>
    </div>
    <div class="header-actions">
      <button class="icon-button" aria-label="Settings">
        <svg viewBox="0 0 24 24">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"></path>
        </svg>
      </button>
    </div>
  `;
  
  // Add to container
  container.appendChild(header);
}

// Set up account tabs
function setupAccountTabs(container) {
  // Clear existing tabs
  const existingTabs = container.querySelector('.tabs');
  if (existingTabs) {
    existingTabs.remove();
  }
  
  // Create tabs
  const tabs = document.createElement('div');
  tabs.className = 'tabs';
  tabs.innerHTML = `
    <button class="tab active" data-tab="profile">Profile</button>
    <button class="tab" data-tab="smart-vault">Smart Vault</button>
    <button class="tab" data-tab="current-flat">My current flat</button>
  `;
  
  // Add to container
  container.appendChild(tabs);
  
  // Add event listeners
  const tabButtons = tabs.querySelectorAll('.tab');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show tab content
      const tabName = button.getAttribute('data-tab');
      showAccountTab(tabName, container);
    });
  });
}

// Show a specific account tab
function showAccountTab(tabName, container) {
  console.log(`Showing account tab: ${tabName}`);
  
  // Clear existing content
  const existingContent = container.querySelector('.tab-content');
  if (existingContent) {
    existingContent.remove();
  }
  
  // Get user profile
  const userProfile = getFromStorage('userProfile');
  
  if (!userProfile) {
    // No user profile yet
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <svg viewBox="0 0 24 24" width="64" height="64">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
      </svg>
      <h2>No profile yet</h2>
      <p>Set up your profile to get started.</p>
      <button class="primary-button">Set Up Profile</button>
    `;
    container.appendChild(emptyState);
    return;
  }
  
  // Create tab content
  const tabContent = document.createElement('div');
  tabContent.className = 'tab-content';
  container.appendChild(tabContent);
  
  // Load the appropriate tab content
  switch (tabName) {
    case 'profile':
      loadProfileTab(tabContent, userProfile);
      break;
    case 'smart-vault':
      loadSmartVaultTab(tabContent, userProfile);
      break;
    case 'current-flat':
      loadCurrentFlatTab(tabContent, userProfile);
      break;
  }
}

// Load profile tab content
function loadProfileTab(container, userProfile) {
  const content = document.createElement('div');
  content.className = 'main-content';
  content.innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar">
        <img src="${userProfile.avatar}" alt="${userProfile.name}">
      </div>
      <h2 class="profile-name">${userProfile.name}</h2>
      <p class="profile-location">${userProfile.location}</p>
      <button class="profile-edit">
        <svg viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
        </svg>
        Edit Profile
      </button>
    </div>
    <div class="contact-card">
      <h2 class="contact-title">Contact Information</h2>
      <div class="contact-item">
        <p class="contact-label">Email</p>
        <p class="contact-value">${userProfile.contact.email}</p>
      </div>
      <div class="contact-item">
        <p class="contact-label">Phone</p>
        <p class="contact-value">${userProfile.contact.phone}</p>
      </div>
      <div class="contact-item">
        <p class="contact-label">University</p>
        <p class="contact-value">${userProfile.contact.university}</p>
      </div>
    </div>
  `;
  
  container.appendChild(content);
  
  // Add event listeners
  const editButton = content.querySelector('.profile-edit');
  if (editButton) {
    editButton.addEventListener('click', () => {
      showToast('Profile editing coming soon!');
    });
  }
}

// Load Smart Vault tab content
function loadSmartVaultTab(container, userProfile) {
  const content = document.createElement('div');
  content.className = 'main-content';
  content.innerHTML = `
    <div class="section">
      <h2 class="section-title">Smart Vault</h2>
      <p class="section-description">Store and manage all your rental documents in one secure place.</p>
    </div>
    
    <div class="section">
      <div class="setting-row">
        <div>
          <h3>Auto fill applications</h3>
          <p>Save time on repetitive forms</p>
        </div>
        <label class="toggle">
          <input type="checkbox" checked>
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>
    
    <div class="section">
      <h3 class="section-title">Your documents</h3>
    </div>
  `;
  
  // Add document sections
  const documentsContainer = document.createElement('div');
  documentsContainer.className = 'documents-container';
  
  // CV section
  const cvSection = createDocumentSection(
    'Curriculum Vitae',
    'Upload your CV',
    [userProfile.documents.cv]
  );
  documentsContainer.appendChild(cvSection);
  
  // References section
  const referencesSection = createDocumentSection(
    'References',
    'Add your references',
    userProfile.documents.references.map(ref => ({
      name: ref.name,
      date: ref.affiliation
    }))
  );
  documentsContainer.appendChild(referencesSection);
  
  // ID section
  const idSection = createDocumentSection(
    'ID & Proof of Address',
    'Passport or drivers license ONLY.',
    userProfile.documents.identification
  );
  documentsContainer.appendChild(idSection);
  
  // Flatting history section
  const historySection = createDocumentSection(
    'Flatting History',
    'Add your past flats',
    userProfile.documents.flattingHistory.map(flat => ({
      name: flat.address,
      date: flat.agency
    }))
  );
  documentsContainer.appendChild(historySection);
  
  // Digital signature section
  const signatureSection = document.createElement('div');
  signatureSection.className = 'document-card';
  signatureSection.innerHTML = `
    <div class="document-header">
      <h3 class="document-title">Digital Signature</h3>
      <div class="document-actions">
        <button class="icon-button" aria-label="More options">
          <svg viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="signature-area">
      <img src="https://images.pexels.com/photos/5945601/pexels-photo-5945601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Signature" width="200">
    </div>
  `;
  documentsContainer.appendChild(signatureSection);
  
  content.appendChild(documentsContainer);
  container.appendChild(content);
  
  // Add event listeners
  setupSmartVaultEventListeners(content);
}

// Create a document section
function createDocumentSection(title, description, documents) {
  const section = document.createElement('div');
  section.className = 'document-card';
  
  let documentsHtml = '';
  if (documents && documents.length > 0) {
    documents.forEach(doc => {
      documentsHtml += `
        <div class="document-row">
          <div class="document-item">
            <div class="document-icon ${doc.name.includes('.pdf') ? 'pdf' : 'doc'}">
              <svg viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path>
              </svg>
            </div>
            <div class="document-info">
              <p class="document-name">${doc.name}</p>
              <p class="document-meta">Uploaded ${doc.date}</p>
            </div>
          </div>
          <div class="document-options">
            <button aria-label="More options">
              <svg viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
    });
  }
  
  section.innerHTML = `
    <div class="document-header">
      <h3 class="document-title">${title}</h3>
      <div class="document-actions">
        <button class="icon-button" aria-label="More options">
          <svg viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
          </svg>
        </button>
      </div>
    </div>
    <p class="document-description">${description}</p>
    <div class="document-list">
      ${documentsHtml}
    </div>
    <button class="add-button">
      <svg viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
      </svg>
      Add Reference
    </button>
  `;
  
  return section;
}

// Set up event listeners for Smart Vault
function setupSmartVaultEventListeners(container) {
  // Toggle switch
  const toggle = container.querySelector('.toggle input');
  if (toggle) {
    toggle.addEventListener('change', () => {
      const status = toggle.checked ? 'enabled' : 'disabled';
      showToast(`Auto-fill ${status}`);
    });
  }
  
  // Add reference buttons
  const addButtons = container.querySelectorAll('.add-button');
  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      showToast('Document upload coming soon!');
    });
  });
  
  // Document options
  const optionsButtons = container.querySelectorAll('.document-options button');
  optionsButtons.forEach(button => {
    button.addEventListener('click', () => {
      showToast('Document options coming soon!');
    });
  });
}

// Load Current Flat tab content
function loadCurrentFlatTab(container, userProfile) {
  const content = document.createElement('div');
  content.className = 'main-content';
  content.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">Current Flat</h2>
    </div>

    <div class="property-card list-view">
      <div class="property-image">
        <img src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg" alt="530 Leith Street">
        <div class="property-rating">
          <svg viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
          4.5
        </div>
      </div>
      <div class="property-info">
        <h2 class="property-title">530 Leith Street</h2>
        <p class="property-price">$235 per room/week</p>
        <div class="property-features">
          <div class="feature">
            <svg viewBox="0 0 24 24">
              <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V7H1v10h22v-6c0-2.21-1.79-4-4-4z"></path>
            </svg>
            <span>5 beds</span>
          </div>
          <div class="feature">
            <svg viewBox="0 0 24 24">
              <path d="M7 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5.05 1.55c.24.41.45.85.6 1.31.18-.66.46-1.27.84-1.82.23.33.57.6.96.78-.42.26-.78.62-1.06 1.03-.75-.87-1.86-1.44-3.12-1.44-1.4 0-2.62.7-3.37 1.76-.37-.23-.66-.55-.85-.95.9-.73 1.68-1.27 2.33-1.62.32.32.77.53 1.27.53s.95-.19 1.27-.53c.32.32.77.53 1.27.53s.95-.19 1.27-.53c.07.07.15.13.23.18zm-4.53 3.05c-.73-.73-1.92-.73-2.65 0L2.95 16.2c-.39.4-.39 1.05 0 1.45.4.39 1.05.39 1.45 0l.65-.65v3h8v-3l2.4 2.4c.39.4 1.05.4 1.45 0 .39-.4.39-1.05 0-1.45l-4.65-4.65c-.38-.38-1-.56-1.55-.56-.56 0-1.18.18-1.55.55l-.1.1v-1.3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v1.3l-.1-.1z"></path>
            </svg>
            <span>2 showers</span>
          </div>
          <div class="feature">
            <svg viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"></path>
            </svg>
            <span>2 car parks</span>
          </div>
        </div>
        <div class="property-tags">
          <span class="tag">Furnished</span>
          <span class="tag">Heat pump</span>
          <span class="tag">Fiber internet</span>
        </div>
      </div>
      <div class="property-actions">
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
      </div>
    </div>
    
    <div class="section">
      <div class="document-card">
        <div class="document-header">
          <h3 class="document-title">Contract Details</h3>
          <div class="document-actions">
            <button class="icon-button" aria-label="Download contract">
              <svg viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="document-row">
          <div class="document-item">
            <div class="document-icon pdf">
              <svg viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path>
              </svg>
            </div>
            <div class="document-info">
              <p class="document-name">Tenancy Agreement 2024.pdf</p>
              <p class="document-meta">Valid until Dec 31, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">Upcoming Events</h3>
      <div class="document-card">
        <div class="document-row">
          <div class="document-item">
            <div class="document-icon">
              <svg viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path>
              </svg>
            </div>
            <div class="document-info">
              <p class="document-name">Property Inspection</p>
              <p class="document-meta">March 15, 2024 at 10:00 AM</p>
            </div>
          </div>
        </div>
        <div class="document-row">
          <div class="document-item">
            <div class="document-icon">
              <svg viewBox="0 0 24 24">
                <path d="M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path>
              </svg>
            </div>
            <div class="document-info">
              <p class="document-name">Heat Pump Service</p>
              <p class="document-meta">March 20, 2024 at 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">Landlord Chat</h3>
      <div class="chat-container">
        <div class="chat-messages">
          <div class="message message-received">
            <p>Hi everyone, just a reminder about the inspection next week. Please make sure all common areas are tidy.</p>
            <p class="message-meta">John (Landlord), 2 days ago</p>
          </div>
          <div class="message message-sent">
            <p>Thanks for the reminder! We'll make sure everything is ready.</p>
            <p class="message-meta">Me, 1 day ago</p>
          </div>
          <div class="message message-received">
            <p>Great! Also, the heat pump service has been scheduled for March 20th.</p>
            <p class="message-meta">John (Landlord), 1 day ago</p>
          </div>
        </div>
        <div class="chat-input">
          <input type="text" placeholder="Type a message..." aria-label="Type a message">
          <button aria-label="Send message">
            <svg viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
  
  container.appendChild(content);

  // Add chat input handler
  const chatInput = content.querySelector('.chat-input input');
  const chatSendButton = content.querySelector('.chat-input button');
  const chatMessages = content.querySelector('.chat-messages');

  if (chatInput && chatSendButton && chatMessages) {
    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message message-sent';
        const now = new Date();
        messageElement.innerHTML = `
          <p>${message}</p>
          <p class="message-meta">Me, just now</p>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.value = '';
      }
    };

    chatSendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }

  // Add event listeners for the action buttons
  const infoButton = content.querySelector('.action-button.info');
  const shareButton = content.querySelector('.action-button.share');

  if (infoButton) {
    infoButton.addEventListener('click', () => {
      showToast('Flat details coming soon!');
    });
  }

  if (shareButton) {
    shareButton.addEventListener('click', () => {
      showToast('Share functionality coming soon!');
    });
  }
}