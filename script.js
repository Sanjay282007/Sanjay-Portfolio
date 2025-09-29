const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav a');

sections.forEach(s => {
  if (s.id !== 'about') {
    s.style.display = 'none';
  } else {
    s.style.display = 'block';
    s.classList.add('active'); 
  }
});

function updateActiveNav(id) {
    navLinks.forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`nav a[href="#${id}"]`);
    if (link) {
        link.classList.add('active');
    }
}

window.showSection = function(id, event) {
  if (event) event.preventDefault(); 

  sections.forEach(s => {
    s.classList.remove('active');
  });

  setTimeout(() => {
    sections.forEach(s => {
        s.style.display = 'none';
    });

    const sec = document.getElementById(id);
    if (sec) {
        sec.style.display = 'block';
        setTimeout(() => sec.classList.add('active'), 50); 
    }
  
    updateActiveNav(id);

    document.querySelector('main').scrollIntoView({ behavior: 'smooth' });

  }, 100); 
}

document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav('about');

    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            showSection(this.getAttribute('href').replace('#', ''), event);
        });
    });

    const exploreButton = document.querySelector('.header-buttons a[href="#about"]');
    if (exploreButton) {
        exploreButton.addEventListener('click', function(event) {
            showSection(this.getAttribute('href').replace('#', ''), event);
        });
    }
});


const btnTop = document.getElementById('btnTop');

window.addEventListener('scroll', () => { 
  if (btnTop) {
    btnTop.style.display = window.scrollY > 300 ? 'block' : 'none'; 
  }
});

if (btnTop) {
  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
