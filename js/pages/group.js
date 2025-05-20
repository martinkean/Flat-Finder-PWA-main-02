// Group page module
import { getFromStorage, saveToStorage } from '../storage.js';
import { showToast } from '../ui.jsx';

// Populate the group page with content
export function populateGroupPage() {
  console.log('Populating group page...');
  
  // Get the container
  const container = document.getElementById('group-container');
  if (!container) return;
  
  // Set up the header
  setupHeader(container);
  
  // Set up the group content
  setupGroupContent(container);
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
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
      <h1 class="header-title">Group Dashboard</h1>
    </div>
    <div class="header-actions group-dropdown">
      <button id="select-group">
        Select Group
        <svg viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5H7z"></path>
        </svg>
      </button>
      <div class="group-dropdown-content" id="groupDropdown">
        <div class="group-item">
          <div class="group-item-info">
            <div class="group-item-name">Group 1</div>
            <div class="group-item-members">6 members</div>
          </div>
        </div>
        <div class="group-item">
          <div class="group-item-info">
            <div class="group-item-name">Castle Breathers</div>
            <div class="group-item-members">5 members</div>
          </div>
        </div>
        <div class="group-item">
          <div class="group-item-info">
            <div class="group-item-name">Group 3</div>
            <div class="group-item-members">3 members</div>
          </div>
        </div>
        <div class="group-item">
          <div class="group-item-info">
            <div class="group-item-name">Group 4</div>
            <div class="group-item-members">8 members</div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add to container
  container.appendChild(header);
  
  // Add click handler for select group button
  const selectGroupButton = header.querySelector('#select-group');
  if (selectGroupButton) {
    selectGroupButton.addEventListener('click', () => {
      const dropdown = document.getElementById('groupDropdown');
      const groupDropdown = document.querySelector('.group-dropdown');
      if (dropdown) {
        dropdown.classList.toggle('show');
        groupDropdown.classList.toggle('active');
      }
    });
  }
  
  // Add event listeners for dropdown
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('groupDropdown');
    const selectButton = document.getElementById('select-group');
    const groupDropdown = document.querySelector('.group-dropdown');
    
    if (!dropdown || !selectButton) return;
    
    if (selectButton.contains(e.target)) {
      dropdown.classList.toggle('show');
      groupDropdown.classList.toggle('active');
    } else if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('show');
      groupDropdown.classList.remove('active');
    }
  });
  
  // Add click handlers for group items
  const groupItems = document.querySelectorAll('.group-item');
  groupItems.forEach(item => {
    item.addEventListener('click', () => {
      const groupName = item.querySelector('.group-item-name').textContent;
      const dropdown = document.getElementById('groupDropdown');
      dropdown.classList.remove('show');
      showToast(`Switched to ${groupName}`);
    });
  });
}

// Set up group content
function setupGroupContent(container) {
  // Clear existing content
  const existingContent = container.querySelector('.main-content');
  if (existingContent) {
    existingContent.remove();
  }
  
  // Create main content
  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';
  container.appendChild(mainContent);
  
  // Get group data
  const groupData = getFromStorage('groupData');
  
  if (!groupData) {
    // No group data yet
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <svg viewBox="0 0 24 24" width="64" height="64">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
      <h2>No groups yet</h2>
      <p>Create or join a group to get started.</p>
      <button class="primary-button">Create Group</button>
    `;
    mainContent.appendChild(emptyState);
    return;
  }
  
  // Application section
  const applicationSection = document.createElement('div');
  applicationSection.className = 'section';
  applicationSection.innerHTML = `
    <div class="application-card">
      <div class="application-header">
        <div class="application-icon">
          <svg viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
          </svg>
        </div>
        <div>
          <h2 class="application-title">Flat Application</h2>
          <p>${groupData.application.address}</p>
        </div>
      </div>
      <div class="application-details">
        <div>
          <p>Status</p>
          <p class="application-status">${groupData.application.status}</p>
        </div>
        <div>
          <p>Applied</p>
          <p>${groupData.application.members} members</p>
        </div>
      </div>
    </div>
  `;
  mainContent.appendChild(applicationSection);
  
  // Members section
  const membersSection = document.createElement('div');
  membersSection.className = 'section';
  membersSection.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">${groupData.name} Members</h2>
      <button class="section-action" id="edit-members">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
        </svg>
      </button>
    </div>
    <div class="add-member-button">
      <button class="add-button" id="add-person">
        <svg viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
        </svg>
        Add person
      </button>
    </div>
  `;
  
  // Add members
  const membersContainer = document.createElement('div');
  membersContainer.className = 'members-container';
  
  groupData.members.forEach(member => {
    const memberCard = document.createElement('div');
    memberCard.className = 'member-card';
    
    // Determine status class
    let statusClass = '';
    if (member.status === 'Ready') {
      statusClass = 'status-ready';
    } else if (member.status === 'Pending') {
      statusClass = 'status-pending';
    } else {
      statusClass = 'status-notstarted';
    }
    
    memberCard.innerHTML = `
      <div class="member-avatar">
        <svg viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
        </svg>
      </div>
      <div class="member-info">
        <h3 class="member-name">${member.name}</h3>
        <p class="member-role">${member.role}</p>
      </div>
      <div class="member-status ${statusClass}">
        ${member.status}
      </div>
    `;
    
    membersContainer.appendChild(memberCard);
  });
  
  membersSection.appendChild(membersContainer);
  mainContent.appendChild(membersSection);
  
  // Group preferences
  const preferencesSection = document.createElement('div');
  preferencesSection.className = 'section';
  preferencesSection.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">Group Preferences</h2>
      <button class="icon-button" aria-label="Edit preferences">
        <svg viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
        </svg>
      </button>
    </div>
    <div class="preferences-grid">
      <div class="preference-card">
        <p class="preference-label">Budget</p>
        <p class="preference-value">${groupData.preferences.budget}</p>
      </div>
      <div class="preference-card">
        <p class="preference-label">Location</p>
        <p class="preference-value">${groupData.preferences.location}</p>
      </div>
      <div class="preference-card">
        <p class="preference-label">Bedrooms</p>
        <p class="preference-value">${groupData.preferences.bedrooms}</p>
      </div>
      <div class="preference-card">
        <p class="preference-label">Parking</p>
        <p class="preference-value">${groupData.preferences.parking}</p>
      </div>
    </div>
  `;
  mainContent.appendChild(preferencesSection);
  
  // Group chat
  const chatSection = document.createElement('div');
  chatSection.className = 'section';
  chatSection.innerHTML = `
    <div class="section-header">
      <h2 class="section-title">Group Chat</h2>
    </div>
    <div class="chat-container">
      <div class="chat-messages" id="chat-messages"></div>
      <div class="chat-input">
        <input type="text" placeholder="Type a message........" aria-label="Type a message">
        <button aria-label="Send message">
          <svg viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
          </svg>
        </button>
      </div>
    </div>
  `;
  mainContent.appendChild(chatSection);
  
  // Add chat messages
  const chatMessages = chatSection.querySelector('#chat-messages');
  if (chatMessages && groupData.chat) {
    groupData.chat.forEach(message => {
      const messageElement = document.createElement('div');
      messageElement.className = `message ${message.sender === 'Me' ? 'message-sent' : 'message-received'}`;
      messageElement.innerHTML = `
        <p>${message.message}</p>
        <p class="message-meta">${message.sender}, ${message.time}</p>
      `;
      chatMessages.appendChild(messageElement);
    });
  }
  
  // Add event listeners
  setupGroupEventListeners(mainContent, groupData);
}

// Set up event listeners for the group page
function setupGroupEventListeners(container, groupData) {
  // Edit members button
  const editMembersButton = container.querySelector('#edit-members');
  if (editMembersButton) {
    editMembersButton.addEventListener('click', () => {
      showToast('Edit members feature coming soon!');
    });
  }
  
  // Add person button
  const addPersonButton = container.querySelector('#add-person');
  if (addPersonButton) {
    addPersonButton.addEventListener('click', () => {
      showToast('Add person feature coming soon!');
    });
  }
  
  // Chat send button
  const chatInput = container.querySelector('.chat-input input');
  const chatSendButton = container.querySelector('.chat-input button');
  
  if (chatInput && chatSendButton) {
    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (message) {
        // Add message to chat
        const chatMessages = container.querySelector('#chat-messages');
        if (chatMessages) {
          const messageElement = document.createElement('div');
          messageElement.className = 'message message-sent';
          
          // Get current time
          const now = new Date();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const formattedHours = hours % 12 || 12;
          const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
          const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;
          
          messageElement.innerHTML = `
            <p>${message}</p>
            <p class="message-meta">Me, ${timeString}</p>
          `;
          chatMessages.appendChild(messageElement);
          
          // Scroll to bottom
          chatMessages.scrollTop = chatMessages.scrollHeight;
          
          // Add to storage
          const newMessage = {
            sender: 'Me',
            message: message,
            time: timeString
          };
          
          groupData.chat.push(newMessage);
          saveToStorage('groupData', groupData);
          
          // Clear input
          chatInput.value = '';
        }
      }
    };
    
    // Send on button click
    chatSendButton.addEventListener('click', sendMessage);
    
    // Send on Enter key
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
}