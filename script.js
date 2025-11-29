const sections = document.querySelectorAll('#main-portfolio main section');
const navLinks = document.querySelectorAll('.nav-links a');
const btnTop = document.getElementById('btnTop');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');
const parallaxBg = document.querySelector('.parallax-bg');

const profileImages = [
    'picture (84).png',
	'picture (59).png'
	'pic.png'
];

function preloadProfileImages() {
    profileImages.forEach(src => {
        new Image().src = src;
    });
}
preloadProfileImages();

let currentImageIndex = 0;

function rotateProfilePhoto() {
    const imgElement = document.getElementById('profilePhoto');
    
    if (imgElement) {
        imgElement.classList.add('fade-out');

        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % profileImages.length;
            imgElement.src = profileImages[currentImageIndex];
            imgElement.classList.remove('fade-out');
        }, 500); 
        
    } else {
        console.warn("Profile photo element not found. Please ensure your <img> has id='profilePhoto'.");
    }
}

rotateProfilePhoto();
setInterval(rotateProfilePhoto, 1700); 

function updateActiveNav(id) {
	navLinks.forEach(l => l.classList.remove('active'));
	const link = document.querySelector(`.nav-links a[href="#${id}"]`);
	if (link) {
		link.classList.add('active');
	}
}

window.showSection = function(id, event) {
	if (event) event.preventDefault();

	if (navMenu.classList.contains('open')) {
		toggleMenu();
	}

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
			void sec.offsetWidth;
			setTimeout(() => sec.classList.add('active'), 10);
		}

		updateActiveNav(id);
		const mainContent = document.querySelector('main');
		if (mainContent) {
			const navHeight = document.querySelector('nav').offsetHeight || 70;
			window.scrollTo({
				top: mainContent.offsetTop - navHeight, 
				behavior: 'smooth'
			});
		}

	}, 200);
}


window.showPage = function(pageId) {
	const landingPage = document.getElementById('landing-page');
	const mainPortfolio = document.getElementById('main-portfolio');

	if (pageId === 'landing-page') {
		landingPage.style.display = 'flex';
		mainPortfolio.style.display = 'none';
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setTimeout(startTypingAnimation, 500); 
	} else if (pageId === 'main-portfolio') {
		landingPage.style.display = 'none';
		mainPortfolio.style.display = 'block';
		window.scrollTo({ top: 0, behavior: 'smooth' });
		showSection('about');
	}
}

window.toggleMenu = function() {
	navMenu.classList.toggle('open');
	const icon = menuToggle.querySelector('i');
	icon.classList.toggle('fa-bars');
	icon.classList.toggle('fa-times');
}

const rolesText = document.getElementById('dynamic-roles');
const roles = ["Problem Solver . . .", "Python Developer . . .", "Java Developer . . .", "Web Developer . . .", "AI/ML Enthusiast . . .", "Prompt Engineer . . ."];
let roleIndex = 0;
let charIndex = 0;
const typingSpeed = 70;
const erasingSpeed = 40;
const delayBetweenRoles = 1500;

function type() {
	if (charIndex < roles[roleIndex].length) {
		rolesText.textContent += roles[roleIndex].charAt(charIndex);
		charIndex++;
		setTimeout(type, typingSpeed);
	} else {
		setTimeout(erase, delayBetweenRoles);
	}
}

function erase() {
	if (charIndex > 0) {
		rolesText.textContent = roles[roleIndex].substring(0, charIndex - 1);
		charIndex--;
		setTimeout(erase, erasingSpeed);
	} else {
		roleIndex = (roleIndex + 1) % roles.length;
		setTimeout(type, 500);
	}
}

function startTypingAnimation() {
	rolesText.textContent = '';
	charIndex = 0;
	if (roleIndex === 0) {
		roleIndex = Math.floor(Math.random() * roles.length);
	}
	type();
}

function handleParallax() {
	const scrolled = window.scrollY;
	const bgY = scrolled * 0.2; 
	parallaxBg.style.transform = `translateY(${bgY}px)`;
}


document.addEventListener('DOMContentLoaded', function() {
	showPage('landing-page');
	startTypingAnimation();

	navLinks.forEach(link => {
		link.addEventListener('click', function (event) {
			showSection(this.getAttribute('href').replace('#', ''), event);
		});
	});

	const viewProfileBtn = document.getElementById('view-profile-btn');
	if (viewProfileBtn) {
		viewProfileBtn.addEventListener('click', function(e) {
			e.preventDefault();
			showPage('main-portfolio');
		});
	}

	window.addEventListener('scroll', () => {
		const isLandingPage = document.getElementById('landing-page').style.display !== 'none';

		if (isLandingPage) {
			handleParallax();
		}

		if (btnTop) {
			const mainPortfolio = document.getElementById('main-portfolio');
			if (mainPortfolio && mainPortfolio.style.display === 'block') {
				btnTop.style.display = window.scrollY > 300 ? 'flex' : 'none'; 
			} else {
				btnTop.style.display = 'none';
			}
		}
	});

	if (btnTop) {
		btnTop.addEventListener('click', () => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	}
});





