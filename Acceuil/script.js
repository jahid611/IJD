document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollTop = scrollTop;
    });

    (function(){
        emailjs.init("nLIaoMpfDZayULE4y");  // Remplacez par votre User ID de EmailJS
    })();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Portfolio filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });


    document.addEventListener('DOMContentLoaded', function() {
        let currentIndex = 0;
        const items = document.querySelectorAll('.carousel-item');
        const itemCount = items.length;
    
        function showNextItem() {
            // Retirer la classe 'active' de l'élément actuel
            items[currentIndex].classList.remove('active');
            // Passer à l'élément suivant, ou revenir au début
            currentIndex = (currentIndex + 1) % itemCount;
            // Ajouter la classe 'active' au nouvel élément
            items[currentIndex].classList.add('active');
        }
    
        // Initialisation : active la première vidéo
        items[currentIndex].classList.add('active');
    
        // Défilement automatique toutes les 5 secondes
        const interval = setInterval(showNextItem, 5000);
    
        // Tester les erreurs dans la console
        console.log(`Initialisation du carrousel avec ${itemCount} éléments.`);
    
        // Fonction d'arrêt en cas de débogage (optionnel)
        window.stopCarousel = function() {
            clearInterval(interval);
            console.log('Carrousel arrêté');
        };
    });

    // Testimonial slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');

    function showTestimonial(index) {
        testimonials.forEach(item => item.style.display = 'none');
        testimonials[index].style.display = 'block';
    }

    prevButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    nextButton.addEventListener('click', function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });

    showTestimonial(currentTestimonial);

// Form validation and submission
const contactForm = document.getElementById('contact-form');
const confirmationMessage = document.getElementById('confirmation-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if (name && email && subject && message) {
        emailjs.send("service_2i1bz6x", "template_xrkf629", {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: "jahidsayad42@gmail.com"
        })
        .then(function(response) {
            console.log('Email envoyé avec succès!', response.status, response.text);
            // Cache le formulaire et montre le message de confirmation
            contactForm.style.display = 'none'; // Facultatif, pour cacher le formulaire
            confirmationMessage.innerHTML = "<p>Merci <strong>" + name + "</strong> pour votre message ! Nous vous contacterons bientôt.</p>";
            confirmationMessage.classList.add('show');
        }, function(error) {
            console.log('Erreur lors de l\'envoi de l\'email.', error);
            alert('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.');
        });
    } else {
        alert('Veuillez remplir tous les champs du formulaire.');
    }
});



    

    // Google Maps integration
    function initMap() {
        const mapOptions = {
            center: { lat: 48.8566, lng: 2.3522 }, // Paris coordinates
            zoom: 13
        };
        const map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
        const marker = new google.maps.Marker({
            position: { lat: 48.8566, lng: 2.3522 },
            map: map,
            title: 'IJM Développement Web'
        });
    }

    // Call initMap when the Google Maps API is loaded
    if (typeof google !== 'undefined') {
        google.maps.event.addDomListener(window, 'load', initMap);
    }

    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (animated) return;

        const windowHeight = window.innerHeight;
        const elementTop = stats[0].getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let count = 0;
                const increment = target / 200;

                function updateCount() {
                    if (count < target) {
                        count += increment;
                        stat.innerText = Math.ceil(count);
                        setTimeout(updateCount, 10);
                    } else {
                        stat.innerText = target;
                    }
                }

                updateCount();
            });

            animated = true;
        }
    }

    window.addEventListener('scroll', animateStats);

    // Cookie banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookiesAccepted')) {
        cookieBanner.classList.add('show');
    }

    acceptCookies.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.remove('show');
    });

    // Back to top button
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('hover'));
    document.addEventListener('mouseup', () => cursor.classList.remove('hover'));

    // Theme toggle
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        this.innerHTML = document.body.classList.contains('light-theme') 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    });

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    // Lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0
    };

    let observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        img.src = src;
    }

    // Add smooth reveal animation to sections
    const revealElements = document.querySelectorAll('.reveal');

    function reveal() {
        revealElements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', reveal);

    // Initialize AOS (Animate on Scroll) library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 200
    });
    document.addEventListener('DOMContentLoaded', function() {
        let currentIndex = 0;
        const items = document.querySelectorAll('.carousel-item');
        const itemCount = items.length;
    
        function showNextItem() {
            // Retirer la classe 'active' de l'élément actuel
            items[currentIndex].classList.remove('active');
            // Passer à l'élément suivant, ou revenir au début
            currentIndex = (currentIndex + 1) % itemCount;
            // Ajouter la classe 'active' au nouvel élément
            items[currentIndex].classList.add('active');
        }
    
        // Initialisation : active la première vidéo
        items[currentIndex].classList.add('active');
    
        // Défilement automatique toutes les 5 secondes
        const interval = setInterval(showNextItem, 5000);
    
        // Tester les erreurs dans la console
        console.log(`Initialisation du carrousel avec ${itemCount} éléments.`);
    
        // Fonction d'arrêt en cas de débogage (optionnel)
        window.stopCarousel = function() {
            clearInterval(interval);
            console.log('Carrousel arrêté');
        };
    });

    AOS.init({
        duration: 1200, // Durée de l'animation
        once: true, // Animation uniquement à la première apparition
    });

    
    
    
});