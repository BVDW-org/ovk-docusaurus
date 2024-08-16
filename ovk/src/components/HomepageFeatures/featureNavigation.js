// featureNavigation.js
document.addEventListener('DOMContentLoaded', function() {
  const featureContainers = document.querySelectorAll('.feature-container');

  featureContainers.forEach(container => {
    container.addEventListener('click', () => {
      const url = container.getAttribute('data-url');
      if (url) {
        window.location.href = url;
      }
    });
  });
});