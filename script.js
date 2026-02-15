// Navigation and Section Management
const sections = {
    home: document.getElementById('homeSection'),
    register: document.getElementById('registerSection'),
    verify: document.getElementById('verifySection'),
    login: document.getElementById('loginSection'),
    dashboard: document.getElementById('dashboardSection')
};

const navLinks = document.getElementById('navLinks');

// Show specific section
function showSection(sectionName) {
    Object.values(sections).forEach(section => section.classList.remove('active'));
    sections[sectionName].classList.add('active');
    window.scrollTo(0, 0);
}

// Setup navigation click handlers
function setupNavigationHandlers() {
    const loginLinks = document.querySelectorAll('.nav-login');
    const registerLinks = document.querySelectorAll('.nav-register');
    const logoutLinks = document.querySelectorAll('.nav-logout');
    
    loginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('login');
        });
    });
    
    registerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('register');
        });
    });
    
    logoutLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    });
}

// Update navigation based on login status
function updateNavigation() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        navLinks.innerHTML = `
            <a href="javascript:void(0);" class="nav-login">Login</a>
            <a href="javascript:void(0);" class="nav-register">Register</a>
        `;
        navLinks.innerHTML = `
            <span style="color: white; margin-right: 1rem;">Welcome, ${userName}!</span>
            <a href="javascript:void(0);" class="nav-logout">Logout</a>
        `;
    } else {
        navLinks.innerHTML = `
            <a href="javascript:void(0);" class="nav-login">Login</a>
            <a href="javascript:void(0);" class="nav-register">Register</a>
        `;
    }
    
    // Re-setup handlers after updating navigation
    setupNavigationHandlers();
}

// Home Section
document.getElementById('getStartedBtn').addEventListener('click', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        showSection('dashboard');
    } else {
        showSection('register');
    }
});

// Register Section
document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    // Validate inputs
    if (!firstName || !lastName || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Store user data in localStorage
    const userData = {
        firstName,
        lastName,
        email,
        password,
        verified: false
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('pendingEmail', email);
    
    // Show verify section
    document.getElementById('sentEmail').textContent = email;
    showSection('verify');
    
    // Reset form
    document.getElementById('registerForm').reset();
});

document.getElementById('cancelRegister').addEventListener('click', () => {
    showSection('home');
    document.getElementById('registerForm').reset();
});

// Verify Email Section
document.getElementById('simulateVerify').addEventListener('click', () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        userData.verified = true;
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    
    // Show success message on login page
    document.getElementById('verifiedAlert').style.display = 'block';
    showSection('login');
    
    // Pre-fill email
    const pendingEmail = localStorage.getItem('pendingEmail');
    if (pendingEmail) {
        document.getElementById('loginEmail').value = pendingEmail;
    }
});

document.getElementById('goToLoginFromVerify').addEventListener('click', () => {
    showSection('login');
});

// Login Section
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const userData = JSON.parse(localStorage.getItem('userData'));
    
    if (!userData) {
        alert('No user found. Please register first.');
        showSection('register');
        return;
    }
    
    if (!userData.verified) {
        alert('Please verify your email first.');
        return;
    }
    
    if (userData.email === email && userData.password === password) {
        // Successful login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
        }));
        
        // Update dashboard
        document.getElementById('userName').textContent = `${userData.firstName} ${userData.lastName}`;
        
        showSection('dashboard');
        updateNavigation();
        
        // Reset form and hide verified alert
        document.getElementById('loginForm').reset();
        document.getElementById('verifiedAlert').style.display = 'none';
    } else {
        alert('Invalid email or password.');
    }
});

document.getElementById('cancelLogin').addEventListener('click', () => {
    showSection('home');
    document.getElementById('loginForm').reset();
    document.getElementById('verifiedAlert').style.display = 'none';
});

// Dashboard Section
document.getElementById('logoutBtn').addEventListener('click', logout);

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    updateNavigation();
    showSection('home');
}

// Initialize app
function initApp() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            document.getElementById('userName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
            showSection('dashboard');
        } else {
            showSection('home');
        }
    } else {
        showSection('home');
    }
    
    updateNavigation();
}

// Run initialization when page loads
window.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Also run immediately in case DOMContentLoaded already fired
initApp();
