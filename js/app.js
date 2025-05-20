// Import all modules
import { initStorage, getFromStorage, saveToStorage } from './storage.js';
import { initUI, showPage } from './ui.js';
import { populateMainPage } from './pages/main.js';
import { populateLikedPage } from './pages/liked.js';
import { populateGroupPage } from './pages/group.js';
import { populateAccountPage } from './pages/account.js';

// Initialize the app
function initApp() {
  console.log('Initializing FlatMate app...');
  
  // Initialize local storage
  initStorage();
  
  // Initialize UI components
  initUI();
  
  // Load initial data
  loadInitialData();
  
  // Set up navigation
  setupNavigation();
  
  // Load the first page (main)
  showPage('main');
}

// Load initial sample data if not already in storage
function loadInitialData() {
  // Check if we have properties data
  const properties = getFromStorage('properties');
  if (!properties || properties.length === 0) {
    // Sample property data to use when JSON file is not available
    const sampleProperties = [
      {
        id: 1,
        title: '35 Queen Street, North Dunedin',
        price: '$250 per room/week',
        address: 'North Dunedin',
        image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.1,
        features: {
          beds: 5,
          showers: 2,
          parking: 2
        },
        tags: ['Un-furnished', 'Large backyard', 'Students'],
        agency: 'Edinburgh'
      },
      {
        id: 2,
        title: '123 Castle Street, North Dunedin',
        price: '$220 per room/week',
        address: 'North Dunedin',
        image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 3.8,
        features: {
          beds: 4,
          showers: 1,
          parking: 1
        },
        tags: ['Furnished', 'Pets allowed', 'Students'],
        agency: 'Cutlers'
      },
      {
        id: 3,
        title: '45 Dundas Street, North Dunedin',
        price: '$280 per room/week',
        address: 'North Dunedin',
        image: 'https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.5,
        features: {
          beds: 6,
          showers: 3,
          parking: 2
        },
        tags: ['Un-furnished', 'Newly renovated', 'Students'],
        agency: 'Edinburgh'
      },
      {
        id: 7,
        title: '82 Howe Street, North Dunedin',
        price: '$255 per room/week',
        address: 'North Dunedin',
        image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.2,
        features: {
          beds: 5,
          showers: 2,
          parking: 1
        },
        tags: ['Furnished', 'Fiber internet', 'Students'],
        agency: 'Cutlers'
      },
      {
        id: 8,
        title: '134 Forth Street, North Dunedin',
        price: '$270 per room/week',
        address: 'North Dunedin',
        image: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.4,
        features: {
          beds: 7,
          showers: 3,
          parking: 3
        },
        tags: ['Un-furnished', 'Heat pump', 'Students'],
        agency: 'Edinburgh'
      },
      {
        id: 9,
        title: '56 London Street, North Dunedin',
        price: '$240 per room/week',
        address: 'North Dunedin',
        image: 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.0,
        features: {
          beds: 4,
          showers: 2,
          parking: 1
        },
        tags: ['Furnished', 'Double glazed', 'Students'],
        agency: 'Cutlers'
      }
    ];

    // Try to fetch the JSON file, but use sample data if it fails
    fetch('data/sample-properties.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Sample properties file not found');
        }
        return response.json();
      })
      .then(data => {
        saveToStorage('properties', data);
        populateMainPage();
      })
      .catch(error => {
        console.log('Using default sample properties:', error);
        saveToStorage('properties', sampleProperties);
        populateMainPage();
      });
  }
  
  // Check if we have liked properties
  const likedProperties = getFromStorage('likedProperties');
  if (!likedProperties) {
    // Create sample liked properties
    const sampleLikedProperties = [
      {
        id: 4,
        title: '97 Dundas Street, North Dunedin',
        price: '$245 per room/week',
        address: 'North Dunedin',
        image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.3,
        features: {
          beds: 5,
          showers: 2,
          parking: 2
        },
        tags: ['Furnished', 'Heat pump', 'Students'],
        agency: 'Edinburgh'
      },
      {
        id: 5,
        title: '156 Leith Street, North Dunedin',
        price: '$265 per room/week',
        address: 'North Dunedin',
        image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.7,
        features: {
          beds: 6,
          showers: 3,
          parking: 3
        },
        tags: ['Un-furnished', 'Double glazed', 'Students'],
        agency: 'Cutlers'
      },
      {
        id: 6,
        title: '24 Albany Street, North Dunedin',
        price: '$235 per room/week',
        address: 'North Dunedin',
        image: 'https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        rating: 4.2,
        features: {
          beds: 4,
          showers: 2,
          parking: 2
        },
        tags: ['Furnished', 'Fiber internet', 'Students'],
        agency: 'Edinburgh'
      }
    ];
    saveToStorage('likedProperties', sampleLikedProperties);
  }
  
  // Check if we have group data
  const groupData = getFromStorage('groupData');
  if (!groupData) {
    // Create sample group data
    const sampleGroupData = {
      name: 'Group 1',
      members: [
        {
          name: 'Gabe Cook-Bonney',
          role: 'Survey Student',
          status: 'Ready',
          statusText: 'Documents uploaded'
        },
        {
          name: 'Edward Sunderland',
          role: 'Survey Student',
          status: 'Ready',
          statusText: 'Documents uploaded'
        },
        {
          name: 'George Clark',
          role: 'Masters of Teaching',
          status: 'Ready',
          statusText: 'Documents uploaded'
        },
        {
          name: 'William McCutcheon',
          role: 'Civil Engineering',
          status: 'Pending',
          statusText: 'Waiting on references'
        },
        {
          name: 'Sam Cosgrove',
          role: 'Survey Student',
          status: 'Pending',
          statusText: 'Waiting on ID & Proof'
        },
        {
          name: 'Patrick Ward',
          role: 'Survey Student',
          status: 'Not Started',
          statusText: ''
        }
      ],
      preferences: {
        budget: '$800 - $1200',
        location: 'North Dunedin',
        bedrooms: '2-3',
        parking: '2-3'
      },
      application: {
        address: '97 C Clyde Street, North Dunedin',
        status: 'In Progress',
        members: '3/6'
      },
      chat: [
        {
          sender: 'Gabe',
          message: 'Hi Everyone! I found this flat we should check it out',
          time: '12:41 AM'
        },
        {
          sender: 'Me',
          message: 'Keen as, looks mean',
          time: '12:43 AM'
        }
      ]
    };
    saveToStorage('groupData', sampleGroupData);
  }
  
  // Check if we have user profile
  const userProfile = getFromStorage('userProfile');
  if (!userProfile) {
    // Create sample user profile
    const sampleUserProfile = {
      name: 'Gabriel Cook-Bonney',
      location: 'Dunedin, New Zealand',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      contact: {
        email: 'COOGA953@student.otago.ac.nz',
        phone: '028 404 2300',
        university: 'University of Otago - Year 4'
      },
      documents: {
        cv: {
          name: 'Gabe_Cook_CV.pdf',
          date: '1 day ago'
        },
        references: [
          {
            name: 'Prof. James May',
            affiliation: 'University of Otago'
          }
        ],
        identification: [
          {
            name: 'Passport_NZ.pdf',
            date: '1 month ago'
          },
          {
            name: 'Studylink_contract.pdf',
            date: '1 month ago'
          }
        ],
        flattingHistory: [
          {
            address: '530 Leith Street',
            agency: 'Cutlers Realty'
          }
        ],
        signature: true
      }
    };
    saveToStorage('userProfile', sampleUserProfile);
  }
}

// Set up navigation between pages
function setupNavigation() {
  // Get navigation items
  const navItems = document.querySelectorAll('.nav-item');
  
  // Add click event listeners
  navItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the page to show
      const page = this.getAttribute('data-page');
      
      // Show the page
      showPage(page);
      
      // Update active nav item
      navItems.forEach(navItem => {
        navItem.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Listen for install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show the install button if it exists
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'block';
    
    installButton.addEventListener('click', () => {
      // Show the prompt
      deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
      });
    });
  }
});