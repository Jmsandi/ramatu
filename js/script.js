// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle the 'hidden' class on the mobile menu
            mobileMenu.classList.toggle('hidden');
            
            // Toggle animation of the hamburger icon
            const bars = mobileMenuButton.querySelectorAll('path');
            if (bars.length && !mobileMenu.classList.contains('hidden')) {
                bars.forEach(bar => {
                    bar.style.transition = 'transform 0.3s ease';
                });
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else if (bars.length) {
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            // Check if click is outside the mobile menu and the mobile menu button
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                
                // Reset hamburger icon
                const bars = mobileMenuButton.querySelectorAll('path');
                if (bars.length) {
                    bars.forEach(bar => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                }
            }
        }
    });

    // Donation amount toggle on get-involved page
    const customAmountToggle = document.querySelector('input[name="amount"][value="other"]');
    const customAmountField = document.getElementById('custom-amount');
    
    if (customAmountToggle && customAmountField) {
        // Check all amount radio buttons
        const amountRadios = document.querySelectorAll('input[name="amount"]');
        
        amountRadios.forEach(function(radio) {
            radio.addEventListener('change', function() {
                if (customAmountToggle.checked) {
                    customAmountField.classList.remove('hidden');
                    customAmountField.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    customAmountField.classList.add('hidden');
                    customAmountField.style.animation = '';
                }
            });
        });
    }

    // Highlight active navigation link
    const highlightNavLink = () => {
        const navLinks = document.querySelectorAll('nav a');
        const currentPath = window.location.pathname;
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath.substring(currentPath.lastIndexOf('/') + 1)) {
                link.classList.add('underline');
            } else {
                link.classList.remove('underline');
            }
        });
    };
    
    highlightNavLink();

    // Volunteer form functionality - For the volunteer application form
    const volunteerRoleSelect = document.getElementById('volunteerRole');
    const otherRoleDiv = document.getElementById('otherRoleDiv');
    const volunteerForm = document.getElementById('volunteerForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    if (volunteerRoleSelect && otherRoleDiv) {
        volunteerRoleSelect.addEventListener('change', function() {
            if (this.value === 'Other') {
                otherRoleDiv.style.display = 'block';
            } else {
                otherRoleDiv.style.display = 'none';
            }
        });
    }
    
    if (volunteerForm && formSuccess && formError) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const requiredFields = volunteerForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                // Show success message
                volunteerForm.reset();
                formSuccess.classList.remove('hidden');
                formError.classList.add('hidden');
                
                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Show error message
                formError.classList.remove('hidden');
                formSuccess.classList.add('hidden');
                
                // Scroll to error message
                formError.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset for the sticky header
                    behavior: 'smooth'
                });
                
                // Close mobile menu after clicking
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    
                    // Reset hamburger icon
                    const bars = mobileMenuButton.querySelectorAll('path');
                    if (bars.length) {
                        bars.forEach(bar => {
                            bar.style.transform = 'none';
                            bar.style.opacity = '1';
                        });
                    }
                }
            }
        });
    });

    // Form submission handlers with basic validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const formInputs = form.querySelectorAll('input, textarea, select');
        
        // Add focus animation to form fields
        formInputs.forEach(input => {
            const formGroup = input.parentElement;
            const label = formGroup.querySelector('label');
            
            if (label) {
                input.addEventListener('focus', () => {
                    label.style.transform = 'translateY(-12px) scale(0.85)';
                    label.style.color = '#7c3aed';
                    label.style.transition = 'transform 0.3s, color 0.3s';
                    formGroup.style.position = 'relative';
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value.trim()) {
                        label.style.transform = '';
                        label.style.color = '';
                    }
                });
                
                // Initialize if field already has value
                if (input.value.trim()) {
                    label.style.transform = 'translateY(-12px) scale(0.85)';
                    label.style.color = '#7c3aed';
                }
            }
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            // Basic validation
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add shake animation for invalid fields
                    field.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
                    field.addEventListener('animationend', () => {
                        field.style.animation = '';
                    });
                } else {
                    field.classList.remove('border-red-500');
                }
                
                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value.trim())) {
                        isValid = false;
                        field.classList.add('border-red-500');
                        
                        // Add shake animation for invalid fields
                        field.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both';
                        field.addEventListener('animationend', () => {
                            field.style.animation = '';
                        });
                    }
                }
            });
            
            if (isValid) {
                // Show a success message (in a real implementation, you'd send data to a server)
                const successMessage = document.createElement('div');
                successMessage.className = 'bg-green-100 text-green-700 p-4 rounded-lg mt-4';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                successMessage.innerText = 'Thank you for your submission! We will get back to you soon.';
                
                // Remove any existing success message
                const existingMessage = form.querySelector('.bg-green-100');
                if (existingMessage) {
                    form.removeChild(existingMessage);
                }
                
                form.appendChild(successMessage);
                form.reset();
                
                // Animate the success message
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 50);
                
                // Reset form labels
                formInputs.forEach(input => {
                    const label = input.parentElement.querySelector('label');
                    if (label) {
                        label.style.transform = '';
                        label.style.color = '';
                    }
                });
                
                // Scroll to the success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // FAQ accordions on contact page
    const faqItems = document.querySelectorAll('.bg-gray-50.p-6.rounded-lg.shadow-sm');
    
    faqItems.forEach(item => {
        const heading = item.querySelector('h3');
        const content = item.querySelector('p');
        
        if (heading && content) {
            // Initial state
            content.style.maxHeight = '0';
            content.style.overflow = 'hidden';
            content.style.transition = 'max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease';
            content.style.opacity = '0';
            content.style.transform = 'translateY(-10px)';
            
            // Add click event to the heading
            heading.addEventListener('click', function() {
                // Toggle expanded state
                const isExpanded = heading.classList.contains('text-purple-900');
                
                heading.classList.toggle('text-purple-900');
                
                if (!isExpanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                    content.classList.remove('hidden');
                } else {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(-10px)';
                    // Only add hidden class after animation completes
                    setTimeout(() => {
                        content.classList.add('hidden');
                    }, 500);
                }
            });
        }
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add the animate-on-scroll class to elements we want to animate
    document.querySelectorAll('section > div > h2').forEach(heading => {
        heading.classList.add('animate-on-scroll');
    });
    
    // Add staggered animation to cards
    const cardContainers = document.querySelectorAll('.grid');
    
    cardContainers.forEach(container => {
        const cards = container.querySelectorAll('.bg-white, .bg-purple-50, .shadow-md');
        
        cards.forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.style.transitionDelay = index * 0.1 + 's';
        });
    });
    
    // Add animation to images
    document.querySelectorAll('img:not([class*="h-10"])').forEach(img => {
        img.classList.add('animate-on-scroll');
    });
    
    // Trigger animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .hover-pulse:hover {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Add pulse effect to call-to-action buttons
    document.querySelectorAll('.bg-purple-600, .bg-white.text-purple-700, .bg-white.text-purple-800').forEach(button => {
        button.classList.add('hover-pulse');
    });
}); 