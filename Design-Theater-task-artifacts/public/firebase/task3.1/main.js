
class ReservationForm extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'form-container');

    const style = document.createElement('style');
    style.textContent = `
      .form-container {
        max-width: 500px;
        margin: 0 auto;
        padding: 2rem;
        background-color: var(--light-background, #fff);
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        border-radius: 8px;
      }
      .form-group {
        margin-bottom: 1.5rem;
      }
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: var(--secondary-color, #333);
      }
      input, select {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 1rem;
      }
      button {
        width: 100%;
        padding: 1rem;
        background-color: var(--primary-color, #c8a464);
        color: var(--light-background, #fff);
        border: none;
        border-radius: 5px;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      }
      button:hover {
        background-color: #b38e52;
      }
      .feedback {
        margin-top: 1rem;
        padding: 1rem;
        border-radius: 5px;
        display: none;
      }
      .feedback.success {
        background-color: #d4edda;
        color: #155724;
        display: block;
      }
      .feedback.error {
        background-color: #f8d7da;
        color: #721c24;
        display: block;
      }
    `;

    const form = document.createElement('form');
    form.innerHTML = `
      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" id="date" name="date" required>
      </div>
      <div class="form-group">
        <label for="time">Time</label>
        <select id="time" name="time" required>
          <option value="17:00">5:00 PM</option>
          <option value="18:00">6:00 PM</option>
          <option value="19:00">7:00 PM</option>
          <option value="20:00">8:00 PM</option>
          <option value="21:00">9:00 PM</option>
        </select>
      </div>
      <div class="form-group">
        <label for="party-size">Party Size (1-8)</label>
        <input type="number" id="party-size" name="party-size" min="1" max="8" value="2" required>
      </div>
      <div class="form-group">
        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input type="tel" id="phone" name="phone">
      </div>
      <button type="submit">Book Your Table</button>
      <div class="feedback"></div>
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(form);
    
    // Set min date to today
    const dateInput = form.querySelector('#date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleReservation(form);
    });
  }

  handleReservation(form) {
    const feedbackEl = form.querySelector('.feedback');
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';

    const reservation = {
      id: Date.now(),
      date: form.querySelector('#date').value,
      time: form.querySelector('#time').value,
      partySize: form.querySelector('#party-size').value,
      name: form.querySelector('#name').value,
      email: form.querySelector('#email').value,
      phone: form.querySelector('#phone').value,
      status: 'confirmed'
    };

    // Validation
    const reservationDate = new Date(`${reservation.date}T${reservation.time}`);
    if (reservationDate < new Date()) {
        this.showFeedback('Please select a future date and time.', 'error', feedbackEl);
        return;
    }

    try {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        
        // Check for table availability (20 tables total)
        const existingReservationsOnDate = reservations.filter(r => r.date === reservation.date && r.time === reservation.time && r.status === 'confirmed');
        const tablesBooked = existingReservationsOnDate.reduce((acc, r) => acc + Math.ceil(r.partySize / 4), 0); // Assuming avg table seats 4

        if (tablesBooked >= 20) {
            this.showFeedback('We are fully booked for this time slot. Please choose another time.', 'error', feedbackEl);
            return;
        }
        
        reservations.push(reservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        
        this.showFeedback(`Thank you, ${reservation.name}! Your reservation for ${reservation.partySize} at ${reservation.time} on ${reservation.date} is confirmed.`, 'success', feedbackEl);
        form.reset();
        // Reset date min
        const dateInput = form.querySelector('#date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);

    } catch (error) {
        console.error('Failed to save reservation:', error);
        this.showFeedback('There was an issue processing your reservation. Please try again.', 'error', feedbackEl);
    }
  }

  showFeedback(message, type, element) {
      element.textContent = message;
      element.className = `feedback ${type}`;
  }
}

customElements.define('reservation-form', ReservationForm);
