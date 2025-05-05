// Load navbar
fetch('navbar.html')
.then(response => response.text())
.then(data => {
    document.getElementById('navbar').innerHTML = data;
});

// Load home content
fetch('home.html')
.then(response => response.text())
.then(data => {
    document.getElementById('home').innerHTML = data;
    // initialize slider after home content is loaded
    initSlider();
});

// Load footer
fetch('footer.html')
.then(response => response.text())
.then(data => {
    document.getElementById('footer').innerHTML = data;
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // reset previous error states
            clearErrors();
            
            // validate fields
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            if (!subject.value.trim()) {
                showError(subject, 'Subject is required');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                alert('Thank you for your message. We will get back to you soon.');
                form.reset();
            }
        });
    }
});

// Helper functions for form validation
function showError(input, message) {
    const formGroup = input.parentElement;
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    input.classList.add('error');
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Cards slider
function initSlider() {
    const slider = document.querySelector('.hero-cards');
    if (!slider) return;

    const cards = Array.from(slider.querySelectorAll('.hero-card'));
    const total = cards.length;
    let start = 0;

    // controls
    const controls = document.createElement('div');
    controls.className = 'slider-controls';

    const prev = document.createElement('button');
    prev.className = 'slider-prev';
    prev.innerHTML = '&#10094;';

    const next = document.createElement('button');
    next.className = 'slider-next';
    next.innerHTML = '&#10095;';

    controls.appendChild(prev);
    controls.appendChild(next);
    // place controls after the slider, not as a child
    slider.parentElement.insertBefore(controls, slider.nextSibling);

    function showCards() {
        cards.forEach((card, i) => {
            card.style.display = (i >= start && i < start + 3) ? 'flex' : 'none';
        });
    }

    prev.onclick = function() {
        start = (start - 1 + total) % total;
        if (start > total - 3) start = total - 3;
        showCards();
    };

    next.onclick = function() {
        start = (start + 1) % total;
        if (start > total - 3) start = 0;
        showCards();
    };

    showCards();
}
