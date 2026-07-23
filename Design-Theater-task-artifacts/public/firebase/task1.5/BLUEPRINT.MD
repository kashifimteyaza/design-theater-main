
# Metro Health System Website Blueprint

## Overview

This document outlines the architecture and design for the Metro Health System website. The goal is to create a modern, accessible, and user-friendly website that serves a diverse audience, including patients, medical professionals, and individuals in need of emergency care.

## Information Architecture

The website's architecture is designed to prioritize user needs and provide clear pathways to critical information.

### Emergency First Approach

To address the immediate needs of users in a crisis, the website will feature a prominent and easily accessible **Emergency** section.

*   **Placement:** A high-contrast "Emergency" button will be placed in the top-right corner of the header, making it one of the first elements users see.
*   **Content:** This section will provide critical information at a glance, such as:
    *   Emergency contact numbers (911).
    *   Addresses and directions to the nearest emergency rooms.

    *   Guidance on what to do in a medical emergency.

### Main Navigation

The primary navigation will be organized around the main user journeys:

*   **Find a Doctor:** A comprehensive search feature to find physicians by specialty, location, and language.
*   **Services:** Detailed information about the medical services offered, categorized for clarity.
*   **Patients & Visitors:** Practical information for patients, including billing, insurance, and health education resources.
*   **Locations:** An interactive map and directory of all hospitals, clinics, and urgent care centers.
*   **For Medical Professionals:** Resources for referring physicians and career opportunities.

### Homepage Structure

The homepage will be divided into logical sections to guide users to the information they need:

1.  **Hero Section:** A welcoming message with a clear call-to-action for booking an appointment.
2.  **Find a Doctor:** A search bar to quickly find a physician.
3.  **Our Services:** An overview of the main medical specialties.
4.  **Emergency Information:** A clear and concise section for emergency situations.
5.  **Patient Resources:** Links to billing, insurance, and health education.
6.  **Careers:** A call-to-action for medical professionals.

## Technical Architecture

*   **Frontend:** A framework-less approach using modern HTML, CSS, and JavaScript.
*   **Web Components:** Reusable UI elements (e.g., doctor profiles, location cards) will be built as Web Components to ensure encapsulation and reusability.
*   **Modern CSS:** I will use modern CSS features like Container Queries, Cascade Layers, and CSS Variables for a responsive and maintainable design.
*   **Modern JavaScript:** ES Modules will be used for code organization, with async/await for any future API integrations.
*   **Accessibility (A11Y):** The site will adhere to WCAG 2.1 guidelines, with features like semantic HTML, ARIA attributes, and keyboard navigation.
*   **Multilingual Support:** A language switcher will be included in the header to toggle between English and Spanish.

## Current Task: Homepage Creation

My current task is to build the homepage for the Metro Health System website.

### Plan:

1.  **Create `index.html`:** Structure the homepage with semantic HTML, including the header, main sections, and footer.
2.  **Create `style.css`:** Implement the visual design with a modern, clean, and accessible stylesheet.
3.  **Create `main.js`:** Add interactivity, including a simple Web Component for a service card.
