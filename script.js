// EA991 Driving Academy - Interactive Features
class DrivingAcademyApp {
    constructor() {
        this.initializeApp();
        this.bindEvents();
    }

    initializeApp() {
        // Mobile navigation
        this.setupMobileNav();
        
        // Course comparison functionality
        this.setupCourseComparison();
        
        // Form handling
        this.setupForms();
        
        // Instructor matching
        this.setupInstructorMatching();
        
        // Quick course finder
        this.setupCourseFinder();
    }

    bindEvents() {
        // Window events
        window.addEventListener('load', () => this.handlePageLoad());
        window.addEventListener('resize', () => this.handleResize());
        
        // Navigation events
        document.addEventListener('click', (e) => this.handleNavigation(e));
    }

    // Mobile Navigation
    setupMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close menu when clicking on links
            navMenu.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        }
    }

    // Course Comparison Tool
    setupCourseComparison() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseRows = document.querySelectorAll('#courseTable tbody tr');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                this.filterCourses(filter, courseRows);
            });
        });
    }

    filterCourses(filter, rows) {
        rows.forEach(row => {
            if (filter === 'all') {
                row.style.display = '';
            } else {
                const category = row.getAttribute('data-category');
                row.style.display = category === filter ? '' : 'none';
            }
        });
    }

    // Course Selection and Details
    selectCourse(courseType) {
        const courseData = this.getCourseData(courseType);
        
        // Store selection in sessionStorage
        sessionStorage.setItem('selectedCourse', JSON.stringify(courseData));
        
        // Show confirmation or redirect to booking
        this.showCourseSelection(courseData);
    }

    showDetails(courseType) {
        const courseData = this.getCourseData(courseType);
        const detailsSection = document.getElementById('courseDetails');
        const titleElement = document.getElementById('detailsTitle');
        const contentElement = document.getElementById('detailsContent');

        if (detailsSection && titleElement && contentElement) {
            titleElement.textContent = courseData.name;
            contentElement.innerHTML = this.generateCourseDetailsHTML(courseData);
            detailsSection.style.display = 'block';
            
            // Scroll to details
            detailsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    closeDetails() {
        const detailsSection = document.getElementById('courseDetails');
        if (detailsSection) {
            detailsSection.style.display = 'none';
        }
    }

    getCourseData(courseType) {
        const courses = {
            basic: {
                name: 'Basic Learner Course',
                duration: '4-6 weeks',
                lessons: 20,
                cost: 2500,
                description: 'Perfect for complete beginners, this comprehensive course covers all fundamentals of safe driving.',
                includes: [
                    'Theory lessons covering road rules and signs',
                    'Practical driving instruction with certified instructors',
                    'Vehicle safety and maintenance basics',
                    'Mock driving tests and preparation',
                    'Certificate upon completion'
                ],
                requirements: [
                    'Valid ID document',
                    'Learner\'s permit (we can assist with application)',
                    'Medical certificate if required',
                    'Comfortable closed shoes for driving'
                ]
            },
            standard: {
                name: 'Standard Course',
                duration: '3-4 weeks',
                lessons: 15,
                cost: 2000,
                description: 'Designed for those with some driving experience who need structured training and test preparation.',
                includes: [
                    'Initial skill assessment',
                    'Focused training on weak areas',
                    'Advanced maneuvers and parking',
                    'Test route familiarization',
                    'Final assessment and certification'
                ],
                requirements: [
                    'Valid learner\'s permit',
                    'Some prior driving experience',
                    'Valid ID document',
                    'Comfortable driving attire'
                ]
            },
            intensive: {
                name: 'Intensive Course',
                duration: '2 weeks',
                lessons: 'Daily',
                cost: 3500,
                description: 'Fast-track option for those who need to get their license quickly with daily intensive training.',
                includes: [
                    'Daily driving lessons (Monday-Friday)',
                    'Priority booking for driving test',
                    'Comprehensive theory review',
                    'Express certification process',
                    'One-on-one instruction'
                ],
                requirements: [
                    'Valid learner\'s permit',
                    'Availability for daily lessons',
                    'Basic driving knowledge',
                    'Commitment to intensive schedule'
                ]
            },
            refresher: {
                name: 'Refresher Course',
                duration: '1-2 weeks',
                lessons: 8,
                cost: 1200,
                description: 'Perfect for drivers returning to the road after a break or those wanting to update their skills.',
                includes: [
                    'Skill evaluation and assessment',
                    'Updated road rules training',
                    'Confidence building exercises',
                    'Modern driving techniques',
                    'Refresher certification'
                ],
                requirements: [
                    'Previous driving experience',
                    'Valid or expired license',
                    'Valid ID document',
                    'Assessment appointment'
                ]
            },
            commercial: {
                name: 'Commercial License Course',
                duration: '6-8 weeks',
                lessons: 30,
                cost: 4500,
                description: 'Professional training for commercial vehicle operation including trucks and buses.',
                includes: [
                    'Heavy vehicle operation training',
                    'Commercial regulations and compliance',
                    'Advanced safety protocols',
                    'Load management and inspection',
                    'Commercial license test preparation'
                ],
                requirements: [
                    'Valid Class B license',
                    'Medical certificate',
                    'Clean driving record',
                    'Age requirement (21+ for some categories)'
                ]
            }
        };

        return courses[courseType] || null;
    }

    generateCourseDetailsHTML(course) {
        return `
            <div class="course-detail-content">
                <p><strong>Duration:</strong> ${course.duration}</p>
                <p><strong>Lessons:</strong> ${course.lessons}</p>
                <p><strong>Cost:</strong> P${course.cost}</p>
                
                <h4>Course Description</h4>
                <p>${course.description}</p>
                
                <h4>What's Included</h4>
                <ul>
                    ${course.includes.map(item => `<li>${item}</li>`).join('')}
                </ul>
                
                <h4>Requirements</h4>
                <ul>
                    ${course.requirements.map(item => `<li>${item}</li>`).join('')}
                </ul>
                
                <div class="course-actions">
                    <button class="btn btn-primary" onclick="app.selectCourse('${course.name.toLowerCase().replace(/\s+/g, '')}')">
                        Select This Course
                    </button>
                    <a href="contact.html" class="btn btn-secondary">Get More Information</a>
                </div>
            </div>
        `;
    }

    // Quick Course Finder (Homepage)
    setupCourseFinder() {
        window.findCourse = () => {
            const experience = document.getElementById('experience')?.value;
            const budget = document.getElementById('budget')?.value;
            const resultDiv = document.getElementById('course-recommendation');

            if (!experience || !budget || !resultDiv) return;

            const recommendation = this.getRecommendation(experience, budget);
            
            resultDiv.innerHTML = `
                <div class="recommendation-card">
                    <h3>Recommended for You</h3>
                    <div class="recommended-course">
                        <h4>${recommendation.name}</h4>
                        <p>${recommendation.description}</p>
                        <div class="course-details">
                            <span><strong>Duration:</strong> ${recommendation.duration}</span>
                            <span><strong>Cost:</strong> P${recommendation.cost}</span>
                        </div>
                        <div class="recommendation-actions">
                            <a href="courses.html" class="btn btn-primary">View All Courses</a>
                            <a href="contact.html" class="btn btn-secondary">Book Now</a>
                        </div>
                    </div>
                </div>
            `;
            
            resultDiv.style.display = 'block';
        };
    }

    getRecommendation(experience, budget) {
        const recommendations = {
            'beginner-basic': {
                name: 'Basic Learner Course',
                description: 'Perfect for beginners with comprehensive training and support.',
                duration: '4-6 weeks',
                cost: 2500
            },
            'beginner-standard': {
                name: 'Standard Course',
                description: 'Good balance of training and cost for beginners.',
                duration: '3-4 weeks',
                cost: 2000
            },
            'some-standard': {
                name: 'Standard Course',
                description: 'Build on your existing experience with focused training.',
                duration: '3-4 weeks',
                cost: 2000
            },
            'some-premium': {
                name: 'Intensive Course',
                description: 'Fast-track your learning with intensive daily lessons.',
                duration: '2 weeks',
                cost: 3500
            },
            'refresher-basic': {
                name: 'Refresher Course',
                description: 'Get back on the road with confidence-building sessions.',
                duration: '1-2 weeks',
                cost: 1200
            }
        };

        const key = `${experience}-${budget}`;
        return recommendations[key] || recommendations['beginner-standard'];
    }

    // Instructor Matching System
    setupInstructorMatching() {
        const matchForm = document.getElementById('instructorMatchForm');
        
        if (matchForm) {
            matchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.findMatchingInstructor(matchForm);
            });
        }

        // Individual instructor contact
        window.contactInstructor = (instructorName) => {
            this.showInstructorContact(instructorName);
        };
    }

    findMatchingInstructor(form) {
        const formData = new FormData(form);
        const preferences = formData.getAll('preferences');
        const experience = formData.get('experience');
        const courseType = formData.get('course-type');

        const match = this.matchInstructor(experience, courseType, preferences);
        const resultDiv = document.getElementById('matchResult');

        if (resultDiv) {
            resultDiv.innerHTML = this.generateMatchResultHTML(match);
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        }
    }

    matchInstructor(experience, courseType, preferences) {
        const instructors = {
            john: {
                name: 'John Morake',
                specialties: ['beginner', 'advanced', 'commercial', 'intensive'],
                personality: ['patient', 'experienced', 'professional'],
                rating: 4.9,
                experience: 12
            },
            sarah: {
                name: 'Sarah Keboneilwe',
                specialties: ['beginner', 'nervous', 'refresher', 'standard'],
                personality: ['patient', 'understanding', 'female'],
                rating: 4.8,
                experience: 8
            },
            david: {
                name: 'David Molomo',
                specialties: ['intensive', 'advanced', 'standard'],
                personality: ['efficient', 'structured', 'flexible'],
                rating: 4.9,
                experience: 6
            },
            grace: {
                name: 'Grace Tsheko',
                specialties: ['beginner', 'standard', 'theory'],
                personality: ['thorough', 'methodical', 'patient'],
                rating: 4.7,
                experience: 5
            }
        };

        // Simple matching algorithm
        let bestMatch = null;
        let highestScore = 0;

        Object.values(instructors).forEach(instructor => {
            let score = 0;

            // Experience match
            if (instructor.specialties.includes(experience)) score += 3;
            
            // Course type match
            if (instructor.specialties.includes(courseType)) score += 3;
            
            // Preference matches
            preferences.forEach(pref => {
                if (pref === 'nervous' && instructor.specialties.includes('nervous')) score += 5;
                if (pref === 'female-instructor' && instructor.personality.includes('female')) score += 5;
                if (pref === 'patient' && instructor.personality.includes('patient')) score += 2;
                if (pref === 'flexible' && instructor.personality.includes('flexible')) score += 2;
            });

            // Rating bonus
            score += instructor.rating;

            if (score > highestScore) {
                highestScore = score;
                bestMatch = instructor;
            }
        });

        return bestMatch;
    }

    generateMatchResultHTML(instructor) {
        return `
            <div class="match-result-card">
                <h3>Perfect Match Found!</h3>
                <div class="matched-instructor">
                    <h4>${instructor.name}</h4>
                    <div class="instructor-match-stats">
                        <span><i class="fas fa-star"></i> ${instructor.rating}/5 Rating</span>
                        <span><i class="fas fa-clock"></i> ${instructor.experience} Years Experience</span>
                    </div>
                    <p>Based on your preferences, ${instructor.name} would be an excellent instructor for you!</p>
                    <div class="match-actions">
                        <button class="btn btn-primary" onclick="app.bookWithInstructor('${instructor.name}')">
                            Book with ${instructor.name.split(' ')[0]}
                        </button>
                        <a href="instructors.html" class="btn btn-secondary">View All Instructors</a>
                    </div>
                </div>
            </div>
        `;
    }

    showInstructorContact(instructorName) {
        const contactInfo = this.getInstructorContact(instructorName);
        
        // Create modal or redirect to contact page with pre-filled form
        const contactUrl = `contact.html?instructor=${encodeURIComponent(instructorName)}`;
        window.location.href = contactUrl;
    }

    bookWithInstructor(instructorName) {
        // Store instructor preference and redirect to booking
        sessionStorage.setItem('preferredInstructor', instructorName);
        window.location.href = 'contact.html#booking';
    }

    // Form Handling
    setupForms() {
        // Booking form
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmission(bookingForm);
            });
        }

        // Inquiry form
        const inquiryForm = document.getElementById('inquiryForm');
        if (inquiryForm) {
            inquiryForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleInquirySubmission(inquiryForm);
            });
        }

        // Pre-fill forms based on URL parameters or stored preferences
        this.prefillForms();
    }

    prefillForms() {
        const urlParams = new URLSearchParams(window.location.search);
        const instructor = urlParams.get('instructor');
        const selectedCourse = sessionStorage.getItem('selectedCourse');

        // Pre-fill instructor preference
        if (instructor) {
            const instructorSelect = document.getElementById('instructor');
            if (instructorSelect) {
                const option = Array.from(instructorSelect.options).find(opt => 
                    opt.text.includes(instructor)
                );
                if (option) option.selected = true;
            }
        }

        // Pre-fill course selection
        if (selectedCourse) {
            try {
                const course = JSON.parse(selectedCourse);
                const courseSelect = document.getElementById('course');
                if (courseSelect) {
                    // Map course name to select value
                    const courseMapping = {
                        'Basic Learner Course': 'basic',
                        'Standard Course': 'standard',
                        'Intensive Course': 'intensive',
                        'Refresher Course': 'refresher',
                        'Commercial License Course': 'commercial'
                    };
                    const value = courseMapping[course.name];
                    if (value) courseSelect.value = value;
                }
            } catch (e) {
                console.error('Error parsing selected course:', e);
            }
        }
    }

    handleBookingSubmission(form) {
        const formData = new FormData(form);
        const bookingData = Object.fromEntries(formData.entries());

        // Validate required fields
        if (!this.validateBookingForm(bookingData)) {
            return;
        }

        // Show loading state
        this.showFormLoading(form);

        // Simulate API call
        setTimeout(() => {
            this.showBookingSuccess(bookingData);
            this.hideFormLoading(form);
            form.reset();
        }, 2000);
    }

    handleInquirySubmission(form) {
        const formData = new FormData(form);
        const inquiryData = Object.fromEntries(formData.entries());

        // Validate required fields
        if (!this.validateInquiryForm(inquiryData)) {
            return;
        }

        // Show loading state
        this.showFormLoading(form);

        // Simulate API call
        setTimeout(() => {
            this.showInquirySuccess(inquiryData);
            this.hideFormLoading(form);
            form.reset();
        }, 2000);
    }

    validateBookingForm(data) {
        const required = ['firstName', 'lastName', 'phone', 'email', 'course'];
        const missing = required.filter(field => !data[field]);

        if (missing.length > 0) {
            this.showValidationError(`Please fill in all required fields: ${missing.join(', ')}`);
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showValidationError('Please enter a valid email address');
            return false;
        }

        return true;
    }

    validateInquiryForm(data) {
        const required = ['name', 'email', 'subject', 'message'];
        const missing = required.filter(field => !data[field]);

        if (missing.length > 0) {
            this.showValidationError(`Please fill in all required fields: ${missing.join(', ')}`);
            return false;
        }

        return true;
    }

    showFormLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        }
        form.classList.add('loading');
    }

    hideFormLoading(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = submitBtn.dataset.originalText || 'Submit';
        }
        form.classList.remove('loading');
    }

    showBookingSuccess(data) {
        this.showNotification(
            'Booking Request Received!',
            `Thank you ${data.firstName}! We've received your booking request for ${data.course}. We'll contact you within 24 hours to confirm your lesson schedule.`,
            'success'
        );
    }

    showInquirySuccess(data) {
        this.showNotification(
            'Inquiry Sent!',
            `Thank you ${data.name}! We've received your inquiry about ${data.subject}. We'll respond to your email within 24 hours.`,
            'success'
        );
    }

    showValidationError(message) {
        this.showNotification('Validation Error', message, 'error');
    }

    showNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);

        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }

    // Utility Functions
    handlePageLoad() {
        // Add fade-in animation to elements
        const elements = document.querySelectorAll('.feature-card, .service-card, .instructor-card');
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fade-in');
            }, index * 100);
        });
    }

    handleResize() {
        // Handle responsive adjustments
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    }

    handleNavigation(e) {
        // Smooth scrolling for anchor links
        if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

// Quick Action Functions (called from contact page)
window.downloadBrochure = function() {
    app.showNotification(
        'Download Started',
        'Your EA991 Driving Academy brochure is being prepared for download.',
        'info'
    );
    // In a real implementation, this would trigger a PDF download
};

window.openCalculator = function() {
    window.location.href = 'courses.html#comparison';
};

window.checkAvailability = function() {
    app.showNotification(
        'Checking Availability',
        'Redirecting to our booking system to check available time slots.',
        'info'
    );
    setTimeout(() => {
        window.location.href = 'contact.html#booking';
    }, 1500);
};

window.getDirections = function() {
    // In a real implementation, this would open Google Maps
    app.showNotification(
        'Opening Directions',
        'Opening map directions to EA991 Driving Academy in Gaborone.',
        'info'
    );
};

window.openMap = function() {
    getDirections();
};

// Global function access
window.selectCourse = function(courseType) {
    app.selectCourse(courseType);
};

window.showDetails = function(courseType) {
    app.showDetails(courseType);
};

window.closeDetails = function() {
    app.closeDetails();
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DrivingAcademyApp();
});

// Add notification styles to head
const notificationStyles = `
    <style>
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        padding: 1rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-heavy);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    }
    
    .notification-success {
        background: var(--success-color);
        color: white;
    }
    
    .notification-error {
        background: var(--error-color);
        color: white;
    }
    
    .notification-info {
        background: var(--primary-color);
        color: var(--bg-primary);
    }
    
    .notification-content {
        position: relative;
    }
    
    .notification-close {
        position: absolute;
        top: 0;
        right: 0;
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.25rem;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);
