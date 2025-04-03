// ==========================================
// Function 1: Toggle Navbar for Mobile View
// ==========================================
function toggleNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    
    if (navbar && hamburger) {
        navbar.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// ==========================================
// Function 2: Highlight Current Page Link
// ==========================================
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-list li a, .navbar ul li a');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        if (linkHref === currentPage) {
            link.classList.add('current-page');
            
            // If this is inside a dropdown, highlight the parent too
            let parent = link.closest('.has-dropdown');
            if (parent) {
                parent.querySelector('> a').classList.add('current-page');
            }
        }
    });
}

// ==========================================
// Function 3: Scroll Navbar Inside Hamburger
// ==========================================
function scrollNavbar(direction) {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const scrollAmount = 50;
        if (direction === 'up') {
            navbar.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        } else if (direction === 'down') {
            navbar.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    }
}

// ==========================================
// Function 4: Handle Contact Form Submission
// ==========================================
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// ==========================================
// Function 5: Testimonial Slider
// ==========================================
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showTestimonial(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = n;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextTestimonial() {
    currentSlide = (currentSlide + 1) % slides.length;
    showTestimonial(currentSlide);
}

function prevTestimonial() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showTestimonial(currentSlide);
}

// Auto slide testimonials
function startTestimonialSlider() {
    if (slides.length > 0) {
        setInterval(nextTestimonial, 5000);
    }
}

// ==========================================
// Function 6: Close dropdowns when clicking outside
// ==========================================
function setupDropdownCloseBehavior() {
    document.addEventListener('click', (event) => {
        const dropdowns = document.querySelectorAll('.has-dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                dropdown.querySelector('.dropdown-content').style.display = 'none';
            }
        });
    });
}

function showTestimonial(n) {
    console.log("currentSlide:", n, "slides.length:", slides.length, "dots.length:", dots.length);
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = n;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

// ==========================================
// Initialize All Functions on Page Load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    highlightCurrentPage();
    setupContactForm();
    startTestimonialSlider();
    setupDropdownCloseBehavior();
    
    // Add click handler for dropdown toggles
    document.querySelectorAll('.has-dropdown > a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = e.target.closest('.has-dropdown');
            const content = dropdown.querySelector('.dropdown-content');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});