document.addEventListener('DOMContentLoaded', function () {
  // ====================== DARK MODE TOGGLE ======================
  const toggleButton = document.getElementById('toggle-dark-mode');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  document.body.classList.toggle('light-mode', savedTheme === 'light');
  updateButton(savedTheme);

  toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    updateButton(theme);
  });

  function updateButton(theme) {
    const icon = theme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    const text = theme === 'dark' ? 'Modo Oscuro' : 'Modo Claro';
    toggleButton.innerHTML = `${icon} ${text}`;
  }

  // ====================== BUSCADOR DE ARTÍCULOS ======================
  const searchInput = document.getElementById('search');
  const articles = document.querySelectorAll('#articulos .card');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const term = this.value.toLowerCase();
      articles.forEach(article => {
        const title = article.querySelector('.card-title').textContent.toLowerCase();
        const text = article.querySelector('.card-text').textContent.toLowerCase();
        article.style.display = (title.includes(term) || text.includes(term)) ? 'block' : 'none';
      });
    });
  }

  // ====================== NEWSLETTER ANIMADO ======================
  const newsletterForm = document.getElementById('subscribe-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('subscribe-email').value;
      
      if (validateEmail(email)) {
        this.classList.add('submitting');
        setTimeout(() => {
          this.reset();
          this.classList.remove('submitting');
          showSuccessAlert(email);
        }, 1500);
      }
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function showSuccessAlert(email) {
    const alertBox = document.createElement('div');
    alertBox.className = 'newsletter-alert alert-success';
    alertBox.innerHTML = `
      <i class="fas fa-check-circle"></i>
      ¡Gracias ${email.split('@')[0]}! Revisa tu email para confirmar.
    `;
    
    document.querySelector('.newsletter-content').prepend(alertBox);
    setTimeout(() => alertBox.remove(), 5000);
  }

  // ====================== OCULTAR NEWSLETTER FLOTANTE AL SUSCRIBIRSE ======================
  const newsletterFloating = document.querySelector('.newsletter-floating');
  document.getElementById('subscribe-form')?.addEventListener('submit', function() {
    if (newsletterFloating) newsletterFloating.style.display = 'none';
  });
});

document.getElementById('toggle-dark-mode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});


document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-dark-mode");
    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
        });
    } else {
        console.error("El botón de modo oscuro no se encontró.");
    }
});
