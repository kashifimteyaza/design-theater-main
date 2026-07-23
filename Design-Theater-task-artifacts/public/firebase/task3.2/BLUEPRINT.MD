# EduConnect Platform Blueprint


## 1. Project Overview


**Purpose:** EduConnect is an online tutoring platform designed to connect high school students with qualified tutors for various subjects. It provides a seamless marketplace for tutors to offer their services and for students to find and book academic help.


**Target Audience:** High school students and their parents, and qualified tutors.


## 2. Design and Style Guide


*   **Aesthetics:** Modern, clean, and encouraging. The design will be visually balanced, using ample whitespace, professional typography, and a vibrant yet trustworthy color palette.
*   **Layout:** Responsive and mobile-first, built on a flexible grid system.
*   **Color Palette:**
    *   Primary: `#007BFF` (A trustworthy blue)
    *   Secondary: `#4CAF50` (A positive green for success/confirmation)
    *   Accent: `#FFC107` (A warm yellow for attention)
    *   Neutral: `#F8F9FA` (Light gray for backgrounds), `#343A40` (Dark gray for text)
*   **Typography:**
    *   Headings: A clean, sans-serif font like 'Poppins' or 'Montserrat'.
    *   Body: A highly readable sans-serif font like 'Lato' or 'Open Sans'.
*   **Iconography:** SVG icons for clarity and scalability.
*   **Effects:**
    *   **Texture:** A subtle noise texture on the main background for a premium feel.
    *   **Shadows:** Multi-layered drop shadows on cards and interactive elements to create depth and a "lifted" feel.
    *   **Interactivity:** Buttons and links will have smooth transitions and a "glow" effect on hover/focus.


## 3. Implemented Features


*This section will be updated as features are built.*


### Core Structure
- **`index.html`**: Main entry point of the application.
- **`style.css`**: Contains all styling, structured with CSS Cascade Layers.
- **`main.js`**: Main JavaScript file, responsible for defining custom Web Components and handling interactivity.


### Web Components
- **`nav-bar`**: The main navigation bar for the site.
- **`hero-section`**: The top section of the homepage with a call-to-action.
- **`tutor-card`**: A reusable card to display tutor information.


## 4. Current Plan: Homepage and Booking Workflow Design


**Objective:** Create the initial homepage and define the user booking flow.


**Steps:**


1.  **Create `index.html`:**
    *   Set up the basic HTML structure.
    *   Link to `style.css` and `main.js`.
    *   Define the main sections: Header (`<nav-bar>`), Hero (`<hero-section>`), "How it Works", Featured Tutors, and Footer.
    *   Use semantic HTML for accessibility.


2.  **Create `style.css`:**
    *   Import fonts from Google Fonts.
    *   Define CSS Custom Properties (variables) for the color palette and fonts.
    *   Implement the base styles and the noise texture background.
    *   Style the individual sections and components, applying the modern CSS principles (Flexbox, Grid, shadows, transitions).
    *   Use `@layer` to structure the CSS logically (e.g., base, components, utilities).


3.  **Create `main.js`:**
    *   Define the custom elements (`nav-bar`, `hero-section`, `tutor-card`) using ES6 classes.
    *   Use the Shadow DOM to encapsulate component styles and structure, preventing global CSS conflicts.
    *   Populate the "Featured Tutors" section by dynamically creating `tutor-card` components from a mock data array.


4.  **Detail the Booking Workflow:**
    *   **Discovery:** Users find tutors on the homepage or a dedicated search page (to be built later).
    *   **Profile View:** Clicking a `tutor-card` will lead to a detailed tutor profile page (to be built later). This page will feature a calendar for booking.
    *   **Booking:** The user selects a time slot. A confirmation modal appears, summarizing the booking details.
    *   **Virtual Session:** Post-booking, the session appears on a user dashboard (to be built later) with a link to join the virtual session. This would integrate with a WebRTC solution or a third-party video API, managed via a Firebase backend.
    *   **Firebase Integration:** Firestore would store user profiles, availability, and bookings. Firebase Authentication would handle user sign-in. Firebase Functions would manage notifications and payment logic.

