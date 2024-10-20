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










/*==================== PRICING MODAL BEHAVIOR ====================*/
const closeBtn = document.querySelector('.close-btn');
const modalButton = document.querySelector('.pricing-modal-button');
const modal = document.getElementById('pricingModal');

// Fermer la modale
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fermer la modale si l'utilisateur clique en dehors du contenu de la modale
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});






document.addEventListener('DOMContentLoaded', function () {
    // Variables pour le plan et le prix sélectionné
    let selectedPlan = 'Starter';  // Valeur par défaut
    let basePrice = 2999;          // Prix par défaut

    // Sélectionner tous les boutons liés aux plans
    const pricingButtons = document.querySelectorAll('.pricing__button');

    // Ajouter un événement pour chaque bouton de plan
    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedPlan = button.getAttribute('data-plan');
            switch (selectedPlan) {
                case 'starter':
                    basePrice = 2999;
                    break;
                case 'business':
                    basePrice = 4999;
                    break;
                case 'enterprise':
                    window.location.href = '/Acceuil/index.html#contact'; // Rediriger vers la page d'accueil
                    return;
            }

            // Affichage du plan et du prix dans une modale ou sur la page
            document.getElementById('modalTitle').textContent = `Plan sélectionné : ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}`;
            document.getElementById('modalText').textContent = `Le prix de base est de ${typeof basePrice === 'number' ? `${basePrice}€` : basePrice}. Veuillez remplir le formulaire pour un devis personnalisé.`;
            document.getElementById('pricingModal').style.display = 'flex';
        });
    });

    // Gestion de la soumission du formulaire pour générer le PDF
    const form = document.getElementById('quote-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            project: document.getElementById('project').value,
            message: document.getElementById('message').value
        };

        // Générer le PDF avec les informations du formulaire et du plan sélectionné
        generateStyledPDF(formData, selectedPlan, basePrice);
    });

    // Fonction pour générer le PDF avec un design spécifique
    function generateStyledPDF(formData, selectedPlan, basePrice) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // En-tête du devis
        doc.setFillColor(207, 18, 18);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setFontSize(36);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('Devis n° 0123', 20, 30);

        // Informations du client
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Client:', 20, 50);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`${formData.name}`, 20, 60);
        doc.text(`${formData.email}`, 20, 66);
        doc.text(`${formData.project}`, 20, 72);

        // Informations de l'entreprise
        doc.setFont('helvetica', 'bold');
        doc.text('IJM Développement Web', 140, 50);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text('123 Anywhere St, Any City', 140, 60);
        doc.text('+123-456-7890', 140, 66);
        doc.text('contact@ijmweb.com', 140, 72);

        // Tableau des services
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Description', 20, 90);
        doc.text('Prix unitaire', 100, 90);
        doc.text('Quantité', 140, 90);
        doc.text('Total HT', 170, 90);

        // Contenu du tableau
        doc.setFont('helvetica', 'normal');
        let startY = 100;
        doc.text(selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1), 20, startY);
        doc.text(`${basePrice} €`, 100, startY);
        doc.text('1', 140, startY);
        doc.text(`${basePrice} €`, 170, startY);

        // Sous-total et TVA
        startY += 20;
        doc.setFont('helvetica', 'bold');
        doc.text('Subtotal :', 140, startY);
        doc.text(`${basePrice} €`, 170, startY);
        startY += 10;
        const tva = basePrice * 0.2;
        doc.text('TVA (20%) :', 140, startY);
        doc.text(`${tva.toFixed(2)} €`, 170, startY);

        // Total
        startY += 20;
        doc.setFontSize(16);
        doc.setTextColor(207, 18, 18);
        doc.text('TOTAL :', 140, startY);
        doc.text(`${(basePrice + tva).toFixed(2)} €`, 170, startY);

        // Informations de paiement et footer
        startY += 30;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Informations de paiement', 20, startY);
        startY += 10;
        doc.setFont('helvetica', 'normal');
        doc.text('Paiement par virement bancaire', 20, startY);
        doc.text('Compte : 0123 4567 8901', 20, startY + 6);

        startY += 20;
        doc.setFont('helvetica', 'bold');
        doc.text('Termes & conditions', 20, startY);
        doc.setFont('helvetica', 'normal');
        doc.text('Le paiement est dû dans un mois à compter de la date d\'émission.', 20, startY + 6);

        // Sauvegarder le fichier PDF
        doc.save('devis-IJM.pdf');
    }
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