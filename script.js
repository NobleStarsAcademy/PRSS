// Initialize Lucide Icons
lucide.createIcons();

// pupil Database - Configure your Google Drive links here
// Format: 'SURNAME-CLASS': 'https://drive.google.com/your-link-here'
const pupilDatabase = {
    // Example entries - Replace with your actual pupil data
    'FOLARIN-Primary4': 'https://drive.google.com/file/d/1tFUMuEwZ68_ML-UJVCaxp2e8KxKwdK_f/view?usp=drive_link',
    'EGBUNA-Primary4': 'https://drive.google.com/file/d/1low-m8nB0TdWVH8k-abcujgU604K-NRZ/view?usp=drive_link',
    'OYEBODE-Primary2': 'https://drive.google.com/file/d/1jsNIbgoA8Vgi06yE6wfP1mG2fUpZLgka/view?usp=drive_link',
    'ADEWUMI-Primary2': 'https://drive.google.com/file/d/1ZUTx8yYSKw4394_BaZhgCE3bXleYe2nR/view?usp=drive_link',
    'ABIDOYE-Primary2': 'https://drive.google.com/file/d/1qQfLylMx5VjSWn33YO7Lt2jbTGMUo2Y0/view?usp=drive_link',
    'RAJI-Primary2': 'https://drive.google.com/file/d/1PhL88_I754iTef7nbWlOTbPbTKOPaqpG/view?usp=drive_link',
    'OKUNOLA-Primary2': 'https://drive.google.com/file/d/1gxNdWdQi3CznLAhzhHrbwxOFah4fYLoT/view?usp=drive_link',
    'OYEBODE-Primary4': 'https://drive.google.com/file/d/12CuwGz1YE4rMiPjA_VBh1os_wgFZHv8L/view?usp=drive_link',
    'ADEOSUN-Primary2': 'https://drive.google.com/file/d/1otYzToeV8AnnVdwk-kCzxvKpSDW65BvI/view?usp=drive_link',
    'IYIOLA-Primary4': 'https://drive.google.com/file/d/1fCn02UPNUznsc87NAbYMxkb6YFpjyhK1/view?usp=drive_link',
    'ADEKUNLE-Primary4': 'https://drive.google.com/file/d/119F9Sy9Q-XSUpwHOUwTsi-CW4JLyml1a/view?usp=drive_link',
    'ROLLAND-Primary4': 'https://drive.google.com/file/d/139GZ6n-cjyT29qaA_ygwWZyoa1S4jH9S/view?usp=drive_link',
    'OBI-Primary3': 'https://drive.google.com/file/d/17mNVnIbnHzK8jZJYD1Wvsvt_qSGO8ZR2/view?usp=drive_link',
    'ADEKOYA-Primary4': 'https://drive.google.com/file/d/1E72ReXKaYwlQwdHBI2hEIWHGDRfXyeIh/view?usp=drive_link'
};

// DOM Elements
const form = document.getElementById('loginForm');
const surnameInput = document.getElementById('surname');
const classSelect = document.getElementById('classSelect');
const accessBtn = document.getElementById('accessBtn');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');
const btnLoader = document.getElementById('btnLoader');
const surnameError = document.getElementById('surnameError');
const classError = document.getElementById('classError');
const messageContainer = document.getElementById('messageContainer');
const messageText = document.getElementById('messageText');

// Utility Functions
function showError(element, show) {
    if (show) {
        element.classList.remove('hidden');
        element.classList.add('flex');
    } else {
        element.classList.add('hidden');
        element.classList.remove('flex');
    }
}

function setLoading(isLoading) {
    if (isLoading) {
        btnText.classList.add('opacity-0');
        btnIcon.classList.add('opacity-0');
        btnLoader.classList.remove('hidden');
        accessBtn.disabled = true;
        accessBtn.classList.add('cursor-not-allowed');
    } else {
        btnText.classList.remove('opacity-0');
        btnIcon.classList.remove('opacity-0');
        btnLoader.classList.add('hidden');
        accessBtn.disabled = false;
        accessBtn.classList.remove('cursor-not-allowed');
    }
}

function showMessage(message, type = 'error') {
    messageContainer.classList.remove('hidden');
    messageText.textContent = message;
    
    if (type === 'success') {
        messageContainer.className = 'mt-4 p-4 rounded-xl bg-green-500/20 border border-green-400/30 text-center animate-fade-in';
        messageText.className = 'text-green-100 text-sm font-medium';
    } else {
        messageContainer.className = 'mt-4 p-4 rounded-xl bg-red-500/20 border border-red-400/30 text-center animate-fade-in';
        messageText.className = 'text-red-100 text-sm font-medium';
    }
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        messageContainer.classList.add('hidden');
    }, 5000);
}

function normalizeInput(surname) {
    return surname.trim().toUpperCase().replace(/\s+/g, '');
}

function constructKey(surname, className) {
    return `${normalizeInput(surname)}-${className}`;
}

// Form Validation
function validateForm() {
    let isValid = true;
    
    // Validate Surname
    if (!surnameInput.value.trim()) {
        showError(surnameError, true);
        surnameInput.classList.add('border-red-400', 'focus:border-red-400', 'focus:ring-red-400/20');
        surnameInput.classList.remove('border-transparent', 'focus:border-fuchsia-500', 'focus:ring-fuchsia-500/20');
        isValid = false;
    } else {
        showError(surnameError, false);
        surnameInput.classList.remove('border-red-400', 'focus:border-red-400', 'focus:ring-red-400/20');
        surnameInput.classList.add('border-transparent', 'focus:border-fuchsia-500', 'focus:ring-fuchsia-500/20');
    }
    
    // Validate Class
    if (!classSelect.value) {
        showError(classError, true);
        classSelect.classList.add('border-red-400', 'focus:border-red-400', 'focus:ring-red-400/20');
        classSelect.classList.remove('border-transparent', 'focus:border-fuchsia-500', 'focus:ring-fuchsia-500/20');
        isValid = false;
    } else {
        showError(classError, false);
        classSelect.classList.remove('border-red-400', 'focus:border-red-400', 'focus:ring-red-400/20');
        classSelect.classList.add('border-transparent', 'focus:border-fuchsia-500', 'focus:ring-fuchsia-500/20');
    }
    
    return isValid;
}

// Handle Form Submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    messageContainer.classList.add('hidden');
    
    // Validate
    if (!validateForm()) {
        // Shake animation for error feedback
        form.classList.add('animate-pulse');
        setTimeout(() => form.classList.remove('animate-pulse'), 500);
        return;
    }
    
    // Get values
    const surname = surnameInput.value;
    const pupilClass = classSelect.value;
    const key = constructKey(surname, pupilClass);
    
    // Show loading state
    setLoading(true);
    
    // Simulate network delay for security perception
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check database
    if (pupilDatabase[key]) {
        // Success - Show success message briefly then redirect
        showMessage('Access granted! Redirecting to your report...', 'success');
        
        setTimeout(() => {
            // Open Google Drive link in new tab
            window.open(pupilDatabase[key], '_blank');
            setLoading(false);
            
            // Reset form after successful access
            setTimeout(() => {
                form.reset();
                messageContainer.classList.add('hidden');
            }, 2000);
        }, 1000);
        
    } else {
        // Not found - For demo, allow access to generic link or show error
        // In production, you might want to strictly show error
        
        // Option 1: Strict mode (uncomment for production)
        showMessage('Pupil record not found. Please check your surname and class selection.', 'error');
        setLoading(false);
        
        // Option 2: Demo mode - Allow access to placeholder with warning
        //showMessage('Demo Mode: Opening sample report...', 'success');
        //setTimeout(() => {
        //    window.open('https://drive.google.com/drive/my-drive', '_blank');
        //    setLoading(false);
        //}, 1000);
    }
});

// Real-time Validation
surnameInput.addEventListener('input', () => {
    if (surnameInput.value.trim()) {
        showError(surnameError, false);
        surnameInput.classList.remove('border-red-400', 'focus:border-red-400', 'focus:ring-red-400/20');
        surnameInput.classList.add('border-transparent', 'focus:border-fuchsia-500', 'focus:ring-fuchsia-500/20');
    }
});

classSelect.addEventListener('change', () => {
    if (classSelect.value) {
        showError(classError, false);
        classSelect.classList.remove('border-red-400', 'focus:border-red-400', 'focus:ring-red-400/20');
        classSelect.classList.add('border-transparent', 'focus:border-fuchsia-500', 'focus:ring-fuchsia-500/20');
    }
});

// Keyboard Accessibility - Allow Enter key to submit
form.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        accessBtn.click();
    }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Console greeting for developers
console.log('%c🏫 Noble Stars Academy Portal', 'color: #4169E1; font-size: 20px; font-weight: bold;');
console.log('%cBasic Digital Literacy 2025/2026', 'color: #FF1493; font-size: 14px;');
console.log('%c🔒 Secure Pupil Report Sheet System', 'color: #666; font-size: 12px;');