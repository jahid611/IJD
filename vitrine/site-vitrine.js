/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== GENERATE PDF ====================*/
function generateStyledPDF(formData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Titre "DEVIS"
    doc.setFontSize(36);
    doc.setFont("helvetica", "bold");
    doc.text('DEVIS', 20, 30);

    // Numéro de devis
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Devis n°12345`, 20, 40);

    // Date de devis et validité
    const today = new Date().toLocaleDateString();
    doc.text(`Date du devis : ${today}`, 20, 50);
    doc.text(`Validité du devis : 1 mois`, 20, 56);

    // Section "CLIENT"
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text('CÉLIA NAUDIN', 20, 70); // Nom du client
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text('123-456-7890', 20, 78);
    doc.text('hello@reallygreatsite.com', 20, 84);
    doc.text('123 Anywhere St, Any City', 20, 90);

    // Section "DESTINATAIRE"
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text('À L\'ATTENTION DE', 150, 70); // Section droite
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text('Concordia', 150, 78);
    doc.text('123-456-7890', 150, 84);
    doc.text('Anywhere St, Any City', 150, 90);

    // Tableau des services
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text('DESCRIPTION', 20, 110);
    doc.text('PRIX', 120, 110);
    doc.text('QUANTITÉ', 140, 110);
    doc.text('TOTAL', 160, 110);

    // Contenu du tableau
    const services = [
        { description: 'Création de logo', prix: 300, quantite: 1, total: 300 },
        { description: 'Conception d\'un flyer', prix: 300, quantite: 1, total: 300 },
        { description: 'Carte de visite', prix: 300, quantite: 2, total: 600 },
        { description: 'Illustration personnalisée', prix: 200, quantite: 4, total: 800 }
    ];

    let startY = 120;
    services.forEach(service => {
        doc.setFont("helvetica", "normal");
        doc.text(service.description, 20, startY);
        doc.text(`${service.prix} €`, 120, startY);
        doc.text(`${service.quantite}`, 140, startY);
        doc.text(`${service.total} €`, 160, startY);
        startY += 10;
    });

    // Sous-total, TVA et total
    doc.setFont("helvetica", "bold");
    doc.text('Sous-total :', 120, startY + 10);
    doc.text('2300 €', 160, startY + 10);

    doc.text('TVA (20%) :', 120, startY + 20);
    doc.text('460 €', 160, startY + 20);

    doc.setFontSize(16);
    doc.setTextColor(255, 77, 77); // Rouge pour le total
    doc.text('TOTAL :', 120, startY + 35);
    doc.text('2760 €', 160, startY + 35);

    // Footer - Termes et conditions
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Termes et conditions', 20, startY + 50);
    doc.setFont("helvetica", "normal");
    doc.text('Le paiement est dû dans un mois', 20, startY + 55);
    doc.text('Un acompte de 25% est requis', 20, startY + 60);

    // Footer - signature
    doc.setFontSize(10);
    doc.text('Signature suivie de la mention "bon pour accord"', 20, startY + 70);

    // Footer - remerciements
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text('MERCI DE VOTRE CONFIANCE', 105, 280, null, null, 'center');

    // Sauvegarder le PDF
    doc.save('devis-IJM.pdf');
}

// Event listener pour le formulaire
document.getElementById('quote-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        project: document.getElementById('project').value,
        message: document.getElementById('message').value
    };
    generateStyledPDF(formData);
});



/*==================== PRICING CALCULATOR ====================*/
const pricingButtons = document.querySelectorAll('.pricing__button');

pricingButtons.forEach(button => {
    button.addEventListener('click', () => {
        const plan = button.getAttribute('data-plan');
        let basePrice;
        switch(plan) {
            case 'starter':
                basePrice = 2999;
                break;
            case 'business':
                basePrice = 4999;
                break;
            case 'enterprise':
                basePrice = 'Sur mesure';
                break;
        }
        alert(`Vous avez sélectionné le plan ${plan.charAt(0).toUpperCase() + plan.slice(1)}. ${typeof basePrice === 'number' ? `Le prix de base est de ${basePrice}€.` : basePrice} Veuillez remplir le formulaire de contact pour obtenir un devis personnalisé.`);
    });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .home__img, .features__content, .pricing__content, .contact__content',{}); 
sr.reveal('.home__data',{delay: 500}); 
sr.reveal('.home__img',{delay: 600}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.features__img, .contact__img',{origin: 'left'}); 
sr.reveal('.pricing__img, .contact__form',{origin: 'right'});

const navmenu = document.getElementById('nav-menu');
const navtoggle = document.getElementById('nav-toggle');
const navclose = document.getElementById('nav-close');

// Vérifiez l'existence des éléments
console.log(navMenu, navToggle, navClose);

// Ouvrir le menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    if (navMenu) {
      navMenu.classList.add('show-menu');
    }
  });
}

// Fermer le menu
if (navClose) {
  navClose.addEventListener('click', () => {
    if (navMenu) {
      navMenu.classList.remove('show-menu');
    }
  });
}
