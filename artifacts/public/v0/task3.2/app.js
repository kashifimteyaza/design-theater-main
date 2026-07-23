// ===== DATA MODELS =====

const tutors = [
    {
        id: 1,
        name: "Sarah Johnson",
        avatar: "👩‍🏫",
        subjects: ["SAT Prep", "English"],
        rating: 4.9,
        reviews: 47,
        bio: "I'm a certified SAT tutor with 8 years of experience helping students improve their scores. My students have averaged a 250+ point improvement.",
        experience: "8 years of tutoring experience. Former admissions consultant at top universities. Specializes in test prep strategies.",
        rate: 60,
        sessionTypes: [
            { name: "Trial Session", duration: 1, price: 25, description: "Get to know me and see if we're a good fit" },
            { name: "Standard Session", duration: 1, price: 60, description: "One-on-one focused tutoring" },
            { name: "Intensive", duration: 2, price: 100, description: "Deep dive into challenging topics" }
        ],
        reviews: [
            {
                author: "Alex M.",
                rating: 5,
                date: "Feb 5, 2026",
                text: "Sarah is amazing! She helped me understand the logic of SAT reading questions and my score went up 150 points."
            },
            {
                author: "Jamie L.",
                rating: 5,
                date: "Jan 28, 2026",
                text: "Very patient and knows exactly how to explain complex concepts. Highly recommend!"
            }
        ]
    },
    {
        id: 2,
        name: "Michael Chen",
        avatar: "👨‍🏫",
        subjects: ["Mathematics", "Calculus"],
        rating: 4.8,
        reviews: 62,
        bio: "MIT graduate specializing in mathematics education. I make calculus and advanced math accessible and interesting.",
        experience: "10 years teaching high school and college math. Published papers on math education methodology.",
        rate: 65,
        sessionTypes: [
            { name: "Trial Session", duration: 1, price: 30, description: "Get to know me and see if we're a good fit" },
            { name: "Standard Session", duration: 1, price: 65, description: "One-on-one focused tutoring" },
            { name: "Problem Set Review", duration: 1.5, price: 90, description: "Work through homework together" }
        ],
        reviews: [
            {
                author: "Morgan K.",
                rating: 5,
                date: "Feb 2, 2026",
                text: "Michael made calculus actually make sense. I went from struggling to acing my exams!"
            },
            {
                author: "Taylor S.",
                rating: 4,
                date: "Jan 20, 2026",
                text: "Great tutor, very organized. Helped me prepare for AP exam."
            }
        ]
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        avatar: "👩‍🔬",
        subjects: ["Science", "Chemistry", "Biology"],
        rating: 4.9,
        reviews: 35,
        bio: "Biochemistry PhD student passionate about making science fun and understandable. I use real-world examples to make concepts stick.",
        experience: "5 years tutoring. Research experience in molecular biology. AP Chemistry & Biology certified.",
        rate: 50,
        sessionTypes: [
            { name: "Trial Session", duration: 1, price: 20, description: "Get to know me and see if we're a good fit" },
            { name: "Standard Session", duration: 1, price: 50, description: "One-on-one focused tutoring" },
            { name: "Lab Prep", duration: 1.5, price: 75, description: "Prepare for lab practicals and experiments" }
        ],
        reviews: [
            {
                author: "Jordan P.",
                rating: 5,
                date: "Feb 3, 2026",
                text: "Emily made chemistry fun! I actually understand it now instead of just memorizing."
            }
        ]
    },
    {
        id: 4,
        name: "David Thompson",
        avatar: "👨‍✈️",
        subjects: ["Essay Writing", "English"],
        rating: 4.7,
        reviews: 28,
        bio: "Award-winning writer and editor. Help students develop their unique voice and craft compelling essays for college applications.",
        experience: "7 years professional writing. Editor for literary magazine. Helped 200+ students get into top schools.",
        rate: 55,
        sessionTypes: [
            { name: "Essay Feedback", duration: 1, price: 55, description: "Detailed feedback on your writing" },
            { name: "Writing Workshop", duration: 1.5, price: 80, description: "Develop your writing skills with guided practice" },
            { name: "Group Session", duration: 2, price: 30, description: "Learn with other students (up to 4 people)" }
        ],
        reviews: [
            {
                author: "Casey R.",
                rating: 5,
                date: "Jan 25, 2026",
                text: "David helped me write an essay that got me into my top choice school. He's incredible!"
            }
        ]
    },
    {
        id: 5,
        name: "Lisa Wang",
        avatar: "👩‍💼",
        subjects: ["SAT Prep", "Mathematics"],
        rating: 4.6,
        reviews: 41,
        bio: "High school math teacher turned tutor. I understand the frustration of struggling with math and use patient, creative methods.",
        experience: "12 years high school teacher. SAT prep specialist. ACT certified.",
        rate: 45,
        sessionTypes: [
            { name: "Trial Session", duration: 1, price: 20, description: "Get to know me and see if we're a good fit" },
            { name: "Standard Session", duration: 1, price: 45, description: "One-on-one focused tutoring" },
            { name: "Intensive", duration: 2, price: 80, description: "Deep dive into challenging topics" }
        ],
        reviews: [
            {
                author: "Blake T.",
                rating: 5,
                date: "Feb 1, 2026",
                text: "Lisa is so patient and breaks down complex problems. My SAT math score improved 180 points!"
            }
        ]
    },
    {
        id: 6,
        name: "James Park",
        avatar: "👨‍🎓",
        subjects: ["Science", "Physics"],
        rating: 4.8,
        reviews: 33,
        bio: "Physics enthusiast with a gift for explaining complex concepts simply. I love helping students see physics in the real world.",
        experience: "6 years tutoring. Physics degree from Stanford. AP Physics exam grader.",
        rate: 55,
        sessionTypes: [
            { name: "Trial Session", duration: 1, price: 25, description: "Get to know me and see if we're a good fit" },
            { name: "Standard Session", duration: 1, price: 55, description: "One-on-one focused tutoring" },
            { name: "Problem Intensive", duration: 2, price: 95, description: "Deep dive into problem solving" }
        ],
        reviews: [
            {
                author: "Quinn M.",
                rating: 5,
                date: "Jan 30, 2026",
                text: "Physics finally clicks! James made it interesting and relevant."
            }
        ]
    }
];

// ===== STATE MANAGEMENT =====

let currentState = {
    selectedTutor: null,
    bookingStep: 1,
    selectedSessionType: null,
    selectedTimeSlot: null,
    currentWeek: 0,
    bookingData: {}
};

// ===== UTILITY FUNCTIONS =====

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

function getWeekDates(offset) {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1 + offset * 7);
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        dates.push(date);
    }
    return dates;
}

function formatWeekRange(offset) {
    const dates = getWeekDates(offset);
    const start = dates[0];
    const end = dates[6];
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
}

// ===== TUTOR BROWSING =====

function renderTutors() {
    const grid = document.getElementById('tutorsGrid');
    grid.innerHTML = '';

    const filteredTutors = filterTutors();

    filteredTutors.forEach(tutor => {
        const card = document.createElement('div');
        card.className = 'tutor-card';
        card.onclick = () => openTutorDetail(tutor);

        card.innerHTML = `
            <div class="tutor-card-image">${tutor.avatar}</div>
            <div class="tutor-card-content">
                <h3>${tutor.name}</h3>
                <div class="tutor-rating">
                    <span>⭐ ${tutor.rating}</span>
                    <span class="tutor-review-count">(${tutor.reviews.length} reviews)</span>
                </div>
                <div class="tutor-subjects">
                    ${tutor.subjects.map(s => `<span class="subject-tag">${s}</span>`).join('')}
                </div>
                <div class="tutor-rate">$${tutor.rate}/hr</div>
            </div>
            <div class="tutor-card-footer">
                <button class="btn-secondary" onclick="event.stopPropagation(); openTutorDetail(tutors[${tutors.findIndex(t => t.id === tutor.id)}])">View Profile</button>
            </div>
        `;

        grid.appendChild(card);
    });
}

function filterTutors() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const subject = document.getElementById('subjectFilter').value;
    const budget = document.getElementById('budgetFilter').value;

    return tutors.filter(tutor => {
        const matchesSearch = tutor.name.toLowerCase().includes(search);
        const matchesSubject = !subject || tutor.subjects.includes(subject);
        const matchesBudget = !budget || checkBudgetRange(tutor.rate, budget);
        return matchesSearch && matchesSubject && matchesBudget;
    });
}

function checkBudgetRange(rate, range) {
    if (range === '0-30') return rate <= 30;
    if (range === '30-50') return rate >= 30 && rate <= 50;
    if (range === '50+') return rate > 50;
    return true;
}

// ===== TUTOR DETAIL =====

function openTutorDetail(tutor) {
    currentState.selectedTutor = tutor;
    
    document.getElementById('tutorImage').src = '';
    document.getElementById('tutorImage').textContent = tutor.avatar;
    document.getElementById('tutorImage').style.fontSize = '80px';
    document.getElementById('tutorName').textContent = tutor.name;
    document.getElementById('tutorRating').textContent = `⭐ ${tutor.rating}`;
    document.getElementById('reviewCount').textContent = `(${tutor.reviews.length} reviews)`;
    document.getElementById('tutorSubjects').textContent = tutor.subjects.join(', ');
    document.getElementById('tutorBio').textContent = tutor.bio;
    document.getElementById('tutorExperience').textContent = tutor.experience;

    // Render session types
    const sessionTypesDiv = document.getElementById('sessionTypes');
    sessionTypesDiv.innerHTML = tutor.sessionTypes.map(st => `
        <div class="session-type-item">
            <h4>${st.name}</h4>
            <p><strong>${st.duration} hour${st.duration > 1 ? 's' : ''}</strong> • <strong class="session-option-price">$${st.price}</strong></p>
            <p class="session-type-item-desc">${st.description}</p>
        </div>
    `).join('');

    // Render reviews
    const reviewsDiv = document.getElementById('reviews');
    if (tutor.reviews && tutor.reviews.length > 0) {
        reviewsDiv.innerHTML = tutor.reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-author">${review.author}</span>
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
                <p class="review-text">${review.text}</p>
            </div>
        `).join('');
    } else {
        reviewsDiv.innerHTML = '<p>No reviews yet</p>';
    }

    openModal('tutorModal');
}

function closeTutorModal() {
    closeModal('tutorModal');
}

// ===== BOOKING WORKFLOW =====

function startBooking() {
    closeTutorModal();
    currentState.bookingStep = 1;
    currentState.selectedSessionType = null;
    currentState.selectedTimeSlot = null;
    currentState.currentWeek = 0;
    currentState.bookingData = {};
    
    renderBookingStep(1);
    openModal('bookingModal');
}

function renderBookingStep(step) {
    // Update progress
    document.querySelectorAll('.progress-step').forEach((el, index) => {
        el.classList.remove('active', 'completed');
        if (index + 1 < step) {
            el.classList.add('completed');
        } else if (index + 1 === step) {
            el.classList.add('active');
        }
    });

    // Update progress bar
    const progressPercentage = (step - 1) / 3 * 100;
    document.getElementById('progressFill').style.width = progressPercentage + '%';

    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(el => el.classList.remove('active'));

    // Show current step
    const stepId = `booking-step-${step}`;
    const stepElement = document.getElementById(stepId);
    if (stepElement) {
        stepElement.classList.add('active');
    }

    // Step-specific rendering
    if (step === 1) {
        renderSessionOptions();
    } else if (step === 2) {
        renderAvailabilityCalendar();
    } else if (step === 3) {
        renderPaymentSummary();
    } else if (step === 4) {
        renderConfirmation();
    }
}

function renderSessionOptions() {
    if (!currentState.selectedTutor) return;

    const container = document.getElementById('sessionOptions');
    container.innerHTML = currentState.selectedTutor.sessionTypes.map((st, index) => `
        <label class="session-option">
            <input type="radio" name="sessionType" value="${index}" ${currentState.selectedSessionType === index ? 'checked' : ''}>
            <div class="session-option-header">
                <span class="session-option-label">${st.name}</span>
                <span class="session-option-price">$${st.price}</span>
            </div>
            <p class="session-option-desc">${st.duration} hour${st.duration > 1 ? 's' : ''} • ${st.description}</p>
        </label>
    `).join('');

    // Add change listeners
    document.querySelectorAll('input[name="sessionType"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            currentState.selectedSessionType = parseInt(e.target.value);
        });
    });
}

function renderAvailabilityCalendar() {
    if (!currentState.selectedTutor) return;

    // Update week display
    document.getElementById('currentWeek').textContent = formatWeekRange(currentState.currentWeek);

    // Generate time slots
    const weekDates = getWeekDates(currentState.currentWeek);
    const container = document.getElementById('availabilityCalendar');
    container.innerHTML = '';

    // Generate 3 slots per day
    const times = ['9:00 AM', '2:00 PM', '6:00 PM'];
    
    weekDates.forEach(date => {
        times.forEach(time => {
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isPast = date < new Date();
            const disabled = isWeekend || isPast;

            const slotKey = `${date.toLocaleDateString()}-${time}`;
            const isSelected = currentState.selectedTimeSlot === slotKey;

            const slot = document.createElement('div');
            slot.className = `time-slot ${disabled ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`;
            slot.innerHTML = `
                <span class="time-slot-time">${time}</span>
                <span class="time-slot-date">${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            `;

            if (!disabled) {
                slot.onclick = () => selectTimeSlot(slotKey);
            }

            container.appendChild(slot);
        });
    });

    // Enable continue button if time slot is selected
    const continueBtn = document.getElementById('continueStep2');
    continueBtn.disabled = !currentState.selectedTimeSlot;
}

function selectTimeSlot(slotKey) {
    currentState.selectedTimeSlot = slotKey;
    renderAvailabilityCalendar();
    document.getElementById('continueStep2').disabled = false;
}

function prevWeek() {
    currentState.currentWeek--;
    renderAvailabilityCalendar();
}

function nextWeek() {
    currentState.currentWeek++;
    renderAvailabilityCalendar();
}

function renderPaymentSummary() {
    if (!currentState.selectedTutor || currentState.selectedSessionType === null) return;

    const tutor = currentState.selectedTutor;
    const sessionType = tutor.sessionTypes[currentState.selectedSessionType];

    document.getElementById('summaryTutor').textContent = tutor.name;
    document.getElementById('summarySession').textContent = sessionType.name;
    document.getElementById('summaryTime').textContent = currentState.selectedTimeSlot || 'Not selected';
    document.getElementById('summaryRate').textContent = `$${sessionType.price}`;
    document.getElementById('summaryTotal').textContent = `$${sessionType.price}`;
}

function renderConfirmation() {
    if (!currentState.selectedTutor || currentState.selectedSessionType === null) return;

    const tutor = currentState.selectedTutor;
    const sessionType = tutor.sessionTypes[currentState.selectedSessionType];

    document.getElementById('confirmTutor').textContent = tutor.name;
    document.getElementById('confirmTime').textContent = currentState.selectedTimeSlot || 'TBD';
    document.getElementById('confirmDuration').textContent = `${sessionType.duration} hour${sessionType.duration > 1 ? 's' : ''}`;
    
    // Generate meeting URL
    const meetingId = Math.random().toString(36).substring(7);
    const meetingUrl = `https://educonnect.video/${meetingId}`;
    document.getElementById('confirmUrl').textContent = meetingUrl;

    // Update session dashboard with this booking
    updateSessionDashboard(tutor, sessionType, currentState.selectedTimeSlot);

    currentState.bookingData = {
        tutor: tutor.name,
        sessionType: sessionType.name,
        timeSlot: currentState.selectedTimeSlot,
        price: sessionType.price,
        meetingUrl: meetingUrl,
        duration: sessionType.duration
    };
}

function updateSessionDashboard(tutor, sessionType, timeSlot) {
    const dateStr = timeSlot.split('-')[0];
    const timeStr = timeSlot.split('-')[1];
    
    const [month, day, year] = dateStr.split('/');
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    document.getElementById('sessionDate').textContent = formattedDate;
    document.getElementById('sessionTime').textContent = timeStr;
    document.getElementById('sessionDuration').textContent = `${sessionType.duration} hour${sessionType.duration > 1 ? 's' : ''}`;
}

function nextBookingStep() {
    if (currentState.bookingStep < 4) {
        currentState.bookingStep++;
        renderBookingStep(currentState.bookingStep);
    }
}

function prevBookingStep() {
    if (currentState.bookingStep > 1) {
        currentState.bookingStep--;
        renderBookingStep(currentState.bookingStep);
    }
}

function closeBooking() {
    closeModal('bookingModal');
    currentState.selectedSessionType = null;
    currentState.selectedTimeSlot = null;
}

function viewSessionDashboard() {
    closeModal('bookingModal');
    openModal('dashboardModal');

    // Check if session is upcoming (within 24 hours)
    const now = new Date();
    const sessionTime = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 hours from now for demo
    
    const hoursUntilSession = (sessionTime - now) / (1000 * 60 * 60);
    const joinButton = document.getElementById('joinButton');
    if (hoursUntilSession < 24 && hoursUntilSession > 0) {
        joinButton.style.display = 'block';
    } else {
        joinButton.style.display = 'none';
    }
}

// ===== SESSION MANAGEMENT =====

function closeDashboard() {
    closeModal('dashboardModal');
}

function joinSession() {
    closeDashboard();
    startSessionTimer();
    openModal('videoModal');
}

function endSession() {
    closeModal('videoModal');
    openModal('dashboardModal');
    showSessionComplete();
}

function showSessionComplete() {
    const upcomingCard = document.querySelector('.session-card.upcoming');
    const newCompletedCard = upcomingCard.cloneNode(true);
    newCompletedCard.classList.remove('upcoming');
    newCompletedCard.classList.add('completed');
    
    // Update status
    newCompletedCard.querySelector('.session-status').textContent = 'Completed';
    newCompletedCard.querySelector('.session-status').classList.add('completed');
    
    // Update content
    const feedback = document.createElement('div');
    feedback.className = 'session-feedback';
    feedback.innerHTML = `
        <h4>Feedback from Tutor</h4>
        <p>"Great work today! You're making excellent progress on SAT math strategies. Keep practicing the techniques we discussed."</p>
    `;
    newCompletedCard.querySelector('.session-card-body').appendChild(feedback);
    
    // Update footer
    const footer = newCompletedCard.querySelector('.session-card-footer');
    footer.innerHTML = `
        <button class="btn-secondary" onclick="leaveReview()">Leave Review</button>
        <button class="btn-secondary" onclick="bookFollow()">Book Follow-up</button>
    `;
    
    // Add to sessions list
    document.querySelector('.sessions-list').appendChild(newCompletedCard);
    
    // Hide join button from upcoming card
    upcomingCard.style.display = 'none';
}

function cancelSession() {
    if (confirm('Are you sure you want to cancel this session? You will receive a full refund.')) {
        const upcomingCard = document.querySelector('.session-card.upcoming');
        upcomingCard.style.display = 'none';
        alert('Session cancelled. A full refund will be processed within 2-3 business days.');
    }
}

function leaveReview() {
    openModal('reviewModal');
}

function closeReview() {
    closeModal('reviewModal');
}

function submitReview() {
    const rating = document.querySelector('input[name="rating"]:checked');
    const reviewText = document.querySelector('.form-textarea').value;

    if (!rating) {
        alert('Please select a rating');
        return;
    }

    if (!reviewText.trim()) {
        alert('Please write a review');
        return;
    }

    alert('Thank you for your review! It helps tutors improve and helps other students find great tutors.');
    closeReview();
    
    // Clear form
    document.querySelector('.form-textarea').value = '';
    document.querySelectorAll('input[name="rating"]').forEach(r => r.checked = false);
}

function bookFollow() {
    startBooking();
}

function startSessionTimer() {
    let seconds = 0;
    setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        document.getElementById('sessionTimer').textContent = 
            `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
}

// ===== EVENT LISTENERS =====

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderTutors();

    // Search and filter listeners
    document.getElementById('searchInput').addEventListener('input', renderTutors);
    document.getElementById('subjectFilter').addEventListener('change', renderTutors);
    document.getElementById('budgetFilter').addEventListener('change', renderTutors);

    // Modal close on background click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Payment method toggle
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const cardForm = document.getElementById('cardForm');
            if (e.target.value === 'card') {
                cardForm.style.display = 'grid';
            } else {
                cardForm.style.display = 'none';
            }
        });
    });
});

// ===== NAVIGATION =====

function showLogin() {
    alert('Login functionality would be implemented with authentication service');
}

function showSignup() {
    alert('Signup functionality would be implemented with user registration system');
}
