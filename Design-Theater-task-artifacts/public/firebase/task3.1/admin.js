document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const reservationsContainer = document.getElementById('reservations-container');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const reservationList = document.getElementById('reservation-list');

    // Hardcoded password for this example
    const ADMIN_PASSWORD = 'bella'; 

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (passwordInput.value === ADMIN_PASSWORD) {
            loginContainer.style.display = 'none';
            reservationsContainer.style.display = 'block';
            loadReservations();
        } else {
            alert('Incorrect password.');
        }
    });

    function loadReservations() {
        const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        reservationList.innerHTML = ''; // Clear the list

        if (reservations.length === 0) {
            reservationList.innerHTML = '<p>No reservations found.</p>';
            return;
        }

        reservations.sort((a,b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));

        reservations.forEach(res => {
            const listItem = document.createElement('li');
            listItem.className = 'reservation-list-item';
            if (res.status === 'cancelled') {
                listItem.style.opacity = '0.6';
                listItem.style.borderLeftColor = '#ccc';
            }

            listItem.innerHTML = `
                <div class="reservation-list-item-details">
                    <p><strong>Name:</strong> ${res.name}</p>
                    <p><strong>Date:</strong> ${res.date} at ${res.time}</p>
                    <p><strong>Party Size:</strong> ${res.partySize}</p>
                    <p><strong>Contact:</strong> ${res.email} / ${res.phone}</p>
                    <p><strong>Status:</strong> ${res.status}</p>
                </div>
                ${res.status !== 'cancelled' ? `<button class="cancel-btn" data-id="${res.id}">Cancel</button>` : ''}
            `;
            reservationList.appendChild(listItem);
        });
    }

    reservationList.addEventListener('click', (e) => {
        if (e.target.classList.contains('cancel-btn')) {
            const reservationId = e.target.getAttribute('data-id');
            cancelReservation(reservationId);
        }
    });

    function cancelReservation(id) {
        let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
        const resIndex = reservations.findIndex(r => r.id == id);

        if(resIndex !== -1) {
            reservations[resIndex].status = 'cancelled';
            localStorage.setItem('reservations', JSON.stringify(reservations));
            loadReservations(); // Refresh the list
        }
    }
});
