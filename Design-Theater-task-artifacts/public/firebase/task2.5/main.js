
const brandCards = document.querySelectorAll('.brand-card');

brandCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    });
});
