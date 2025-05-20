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
    <div class="empty-state">
      <svg viewBox="0 0 24 24" width="64" height="64">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </svg>
      <h2>No current flat</h2>
      <p>You don't have a current flat set up yet.</p>
      <button class="primary-button">Add Current Flat</button>
    </div>
  `;
  
  container.appendChild(content);
  
  // Add event listeners
  const addFlatButton = content.querySelector('.primary-button');
  if (addFlatButton) {
    addFlatButton.addEventListener('click', () => {
      showToast('Current flat setup coming soon!');
    });
  }
}