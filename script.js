const sections = document.querySelectorAll('#main-portfolio main section');
	const navLinks = document.querySelectorAll('.nav-links a');
	const btnTop = document.getElementById('btnTop');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    const parallaxBg = document.querySelector('.parallax-bg');

	// Function to update which navigation link is active
	function updateActiveNav(id) {
		navLinks.forEach(l => l.classList.remove('active'));
		const link = document.querySelector(`.nav-links a[href="#${id}"]`);
		if (link) {
			link.classList.add('active');
		}
	}

	// Function to show a specific section in the main portfolio view
	window.showSection = function(id, event) {
		if (event) event.preventDefault();

		if (navMenu.classList.contains('open')) {
			toggleMenu();
		}

		// Smoothly hide all sections first
		sections.forEach(s => {
			s.classList.remove('active');
		});

		// Use a short timeout to allow the fade-out transition to start before switching content
		setTimeout(() => {
			sections.forEach(s => {
				s.style.display = 'none';
			});

			const sec = document.getElementById(id);
			if (sec) {
				sec.style.display = 'block';
				// Force reflow to restart transition
				void sec.offsetWidth;
				setTimeout(() => sec.classList.add('active'), 10);
			}

			updateActiveNav(id);
			// Scroll to the top of the main content area (just below the fixed navbar)
			const mainContent = document.querySelector('main');
			if (mainContent) {
                const navHeight = document.querySelector('nav').offsetHeight || 70;
                window.scrollTo({
                    top: mainContent.offsetTop - navHeight, 
                    behavior: 'smooth'
                });
            }

		}, 200); // Wait for 200ms before switching content
	}


	// Function to switch between landing page and main portfolio
	window.showPage = function(pageId) {
		const landingPage = document.getElementById('landing-page');
		const mainPortfolio = document.getElementById('main-portfolio');

		if (pageId === 'landing-page') {
			landingPage.style.display = 'flex';
			mainPortfolio.style.display = 'none';
			window.scrollTo({ top: 0, behavior: 'smooth' });
            // Re-run the typing animation when returning to the landing page
            setTimeout(startTypingAnimation, 500); 
		} else if (pageId === 'main-portfolio') {
			landingPage.style.display = 'none';
			mainPortfolio.style.display = 'block';
			window.scrollTo({ top: 0, behavior: 'smooth' });
			// Ensure the 'about' section is shown when entering the main portfolio
			showSection('about');
		}
	}

	// Function to toggle mobile navigation menu
	window.toggleMenu = function() {
		navMenu.classList.toggle('open');
		const icon = menuToggle.querySelector('i');
		icon.classList.toggle('fa-bars');
		icon.classList.toggle('fa-times');
	}

    // --- Typing Effect Logic ---
    const rolesText = document.getElementById('dynamic-roles');
    const roles = ["Problem Solver . . .", "Python Developer . . .", "Java Developer . . .", "Web Developer . . .", "AI/ML Enthusiast . . .", "Prompt Engineer . . ."];
    let roleIndex = 0;
    let charIndex = 0;
    const typingSpeed = 70; // ms per character
    const erasingSpeed = 40; // ms per character
    const delayBetweenRoles = 1500; // ms before erasing/typing next role

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
            setTimeout(type, 500); // Short delay before typing next role
        }
    }

    function startTypingAnimation() {
        rolesText.textContent = ''; // Clear previous text
        charIndex = 0;
        // Keep the current index unless it's the first time
        if (roleIndex === 0) {
            roleIndex = Math.floor(Math.random() * roles.length);
        }
        type();
    }
    // --- End Typing Effect Logic ---

    // --- Parallax Effect Logic ---
    function handleParallax() {
        const scrolled = window.scrollY;
        // Calculate a slight movement for the background image
        const bgY = scrolled * 0.2; 
        parallaxBg.style.transform = `translateY(${bgY}px)`;
    }
    // --- End Parallax Effect Logic ---


	document.addEventListener('DOMContentLoaded', function() {
		// Set initial state to landing page
		showPage('landing-page');
        startTypingAnimation(); // Start the typing effect on load

		// Set up event listeners for navigation links
		navLinks.forEach(link => {
			link.addEventListener('click', function (event) {
				showSection(this.getAttribute('href').replace('#', ''), event);
			});
		});

		// Set up event listener for the main "View Full Profile" button
		const viewProfileBtn = document.getElementById('view-profile-btn');
		if (viewProfileBtn) {
			viewProfileBtn.addEventListener('click', function(e) {
				e.preventDefault();
				showPage('main-portfolio');
			});
		}

		// Scroll and Parallax logic
		window.addEventListener('scroll', () => {
			const isLandingPage = document.getElementById('landing-page').style.display !== 'none';

            if (isLandingPage) {
                handleParallax();
            }

			if (btnTop) {
				const mainPortfolio = document.getElementById('main-portfolio');
				if (mainPortfolio.style.display === 'block') {
					// IMPORTANT: Use 'flex' here to correctly center the arrow icon
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
