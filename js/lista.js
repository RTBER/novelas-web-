
document.querySelectorAll('.chapter-title').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Cambiar la visibilidad del contenido
    content.classList.toggle('active', !isExpanded);
    button.setAttribute('aria-expanded', !isExpanded);
    content.setAttribute('aria-hidden', isExpanded);
  });
});
