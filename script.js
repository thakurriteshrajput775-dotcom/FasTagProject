// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle - Fixed version
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    if (menuClose && mobileMenu) {
        menuClose.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close mobile menu when clicking on menu items
    const mobileMenuItems = document.querySelectorAll('.mobile-menu .login-box');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    });
    
    // Profile popup - Show same container for both wallet and profile
    const profileAvatars = document.querySelectorAll('.profile-avatar');
    const walletButtons = document.querySelectorAll('.wallet');
    const customProfilePopup = document.getElementById('customProfilePopup');
    const customClosePopup = document.getElementById('customClosePopup');
    
    // Function to show login popup with animation
    function showLoginPopup() {
        if (customProfilePopup) {
            customProfilePopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Add animation class for motion effect
            const popupContent = customProfilePopup.querySelector('.custom-popup-content');
            popupContent.classList.add('popup-animate');
            
            // Remove animation class after animation completes
            setTimeout(() => {
                popupContent.classList.remove('popup-animate');
            }, 500);
        }
    }
    
    // Profile avatar click
    profileAvatars.forEach(avatar => {
        avatar.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showLoginPopup();
        });
    });
    
    // Wallet button click
    walletButtons.forEach(wallet => {
        wallet.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showLoginPopup();
        });
    });
    
    // Close popup
    if (customClosePopup && customProfilePopup) {
        customClosePopup.addEventListener('click', function(e) {
            e.stopPropagation();
            customProfilePopup.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    if (customProfilePopup) {
        customProfilePopup.addEventListener('click', function(e) {
            if (e.target === customProfilePopup) {
                customProfilePopup.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
    
    // OTP popup
    const closeOtpPopup = document.getElementById('closeOtpPopup');
    const otpPopup = document.getElementById('otpPopup');
    
    if (closeOtpPopup && otpPopup) {
        closeOtpPopup.addEventListener('click', function(e) {
            e.stopPropagation();
            otpPopup.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    if (otpPopup) {
        otpPopup.addEventListener('click', function(e) {
            if (e.target === otpPopup) {
                otpPopup.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
    
    // FAQ toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('.icon');
            
            // Close all other FAQ answers
            document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
                if (otherAnswer !== answer) {
                    otherAnswer.classList.remove('active');
                }
            });
            
            // Update all other icons
            document.querySelectorAll('.faq-question .icon').forEach(otherIcon => {
                if (otherIcon !== icon) {
                    otherIcon.textContent = '+';
                }
            });
            
            // Toggle current answer
            answer.classList.toggle('active');
            icon.textContent = answer.classList.contains('active') ? '-' : '+';
        });
    });
    
    // OTP input navigation
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', function(e) {
            if (this.value.length === this.maxLength) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
    
    // Show loader on proceed button click
    const proceedBtn = document.getElementById('proceedBtn');
    const pageLoader = document.getElementById('pageLoader');
    const vehicleInput = document.getElementById('vehicleInput');
    
    if (proceedBtn && pageLoader && vehicleInput) {
        proceedBtn.addEventListener('click', function() {
            const vehicleNumber = vehicleInput.value.trim();
            if (!vehicleNumber) {
                alert('Please enter a vehicle number');
                return;
            }
            pageLoader.style.display = 'flex';
            
            // Simulate API call
            setTimeout(function() {
                pageLoader.style.display = 'none';
                alert('Proceeding with vehicle: ' + vehicleNumber);
                // Here you would typically redirect to the recharge page
                // window.location.href = '/recharge?vehicle=' + encodeURIComponent(vehicleNumber);
            }, 1500);
        });
    }
    
    // Show login popup when clicking login buttons in mobile menu
    const loginFormBtn = document.getElementById('LoginFormBtn');
    const loginBoxes = document.querySelectorAll('.login-box');
    
    if (loginFormBtn && customProfilePopup) {
        loginFormBtn.addEventListener('click', function() {
            showLoginPopup();
        });
    }
    
    loginBoxes.forEach(box => {
        box.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showLoginPopup();
        });
    });
    
    // Login form submission
    if (loginFormBtn) {
        loginFormBtn.addEventListener('click', function() {
            const loginEmail = document.getElementById('LoginEmail');
            if (!loginEmail) return;
            
            const email = loginEmail.value.trim();
            if (!email) {
                alert('Please enter your email');
                return;
            }
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Hide login popup and show OTP popup with animation
            if (customProfilePopup) {
                customProfilePopup.classList.remove('active');
            }
            if (otpPopup) {
                otpPopup.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add animation to OTP popup
                const otpPopupContent = otpPopup.querySelector('.custom-popup-content');
                otpPopupContent.classList.add('popup-animate');
                
                setTimeout(() => {
                    otpPopupContent.classList.remove('popup-animate');
                }, 500);
            }
        });
    }
    
    // OTP form submission
    const otpSubmitBtn = document.getElementById('otpSubmitBtn');
    
    if (otpSubmitBtn) {
        otpSubmitBtn.addEventListener('click', function() {
            const otpInputs = document.querySelectorAll('.otp-input');
            let otp = '';
            let isValid = true;
            
            otpInputs.forEach(input => {
                if (input.value === '') {
                    isValid = false;
                }
                otp += input.value;
            });
            
            if (!isValid) {
                alert('Please enter the complete OTP');
                return;
            }
            
            if (otp.length !== 4) {
                alert('Please enter a valid 4-digit OTP');
                return;
            }
            
            // Simulate OTP verification
            if (pageLoader) {
                pageLoader.style.display = 'flex';
            }
            
            setTimeout(function() {
                if (pageLoader) {
                    pageLoader.style.display = 'none';
                }
                if (otpPopup) {
                    otpPopup.classList.remove('active');
                    document.body.style.overflow = ''; // Restore scrolling
                }
                alert('Login successful! Welcome back.');
                
                // Here you would typically handle the successful login
                // For example, update UI, redirect, etc.
            }, 1500);
        });
    }
    
    // Resend OTP
    const resendOtp = document.getElementById('resendOtp');
    
    if (resendOtp) {
        resendOtp.addEventListener('click', function(e) {
            e.preventDefault();
            alert('OTP has been resent to your email');
            
            // Clear OTP inputs
            const otpInputs = document.querySelectorAll('.otp-input');
            otpInputs.forEach(input => {
                input.value = '';
            });
            
            // Focus on first OTP input
            if (otpInputs.length > 0) {
                otpInputs[0].focus();
            }
        });
    }
    
    // Close mobile menu when clicking outside - Improved version
    document.addEventListener('click', function(e) {
        // Close mobile menu when clicking outside
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        }
        
        // Close profile popup when clicking outside
        if (customProfilePopup && customProfilePopup.classList.contains('active')) {
            if (!customProfilePopup.contains(e.target) && 
                !e.target.closest('.profile-avatar') && 
                !e.target.closest('.wallet')) {
                customProfilePopup.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        }
        
        // Close OTP popup when clicking outside
        if (otpPopup && otpPopup.classList.contains('active')) {
            if (!otpPopup.contains(e.target)) {
                otpPopup.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        }
    });
    
    // Add keyboard support for OTP inputs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (customProfilePopup && customProfilePopup.classList.contains('active')) {
                customProfilePopup.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
            if (otpPopup && otpPopup.classList.contains('active')) {
                otpPopup.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        }
    });
    
    // Enhanced vehicle input validation
    if (vehicleInput) {
        vehicleInput.addEventListener('input', function(e) {
            // Convert to uppercase
            this.value = this.value.toUpperCase();
            
            // Basic validation for Indian vehicle numbers
            const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{1,4}$/;
            const isValidFormat = vehicleRegex.test(this.value.replace(/\s/g, ''));
            
            if (this.value.length > 0 && !isValidFormat) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = '#e2e8f0';
            }
        });
        
        // Allow pressing Enter in vehicle input
        vehicleInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (proceedBtn) {
                    proceedBtn.click();
                }
            }
        });
    }
    
    console.log('FASTag Recharge page initialized successfully!');
});