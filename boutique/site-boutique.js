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
const modalButton = document.querySelector('.pricing-modal-button'); // Bouton OK
const modal = document.getElementById('pricingModal');

// Fermer la modale
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modalButton.addEventListener('click', () => {
    modal.style.display = 'none';
    
    // Redirection vers une section spécifique de votre site après avoir fermé la modale
    window.location.href = '/boutique/site-boutique.html#contact'; // Remplacez par l'URL ou la section cible
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
                    basePrice = 1700;
                    break;
                case 'business':
                    basePrice = 2600;
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
    
        // Fonctions utilitaires pour le PDF
        function addBackground() {
            doc.setFillColor(240, 240, 240);
            doc.rect(0, 0, 210, 297, 'F');
        }
    
        function addHeader() {
            doc.setFillColor(255, 77, 77);
            doc.rect(0, 0, 210, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(28);
            doc.text('Devis IJM Web', 105, 25, null, null, 'center');
            doc.setFontSize(12);
            doc.text('Votre partenaire en développement web', 105, 35, null, null, 'center');
        }
    
        function addFooter() {
            doc.setFillColor(255, 77, 77);
            doc.rect(0, 277, 210, 20, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.text('IJM Web - www.ijmweb.com - contact@ijmweb.com - +33 6 12 34 56 78', 105, 287, null, null, 'center');
            doc.text('Ce devis est généré automatiquement et n\'est pas un engagement contractuel.', 105, 292, null, null, 'center');
        }
    
        function addClientInfo() {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text('Informations du client:', 20, 50);
            doc.setFont("helvetica", "normal");
            doc.text(`Nom: ${formData.name}`, 20, 60);
            doc.text(`Email: ${formData.email}`, 20, 70);
            doc.text(`Projet: ${formData.project}`, 20, 80);
        }
    
        function addCompanyInfo() {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text('IJM Web', 140, 50);
            doc.setFont("helvetica", "normal");
            doc.text('123 Rue du Web', 140, 60);
            doc.text('75000 Paris, France', 140, 70);
            doc.text('SIRET: 123 456 789 00000', 140, 80);
        }
    
        function addQuoteDetails() {
            doc.setFillColor(230, 230, 230);
            doc.rect(20, 100, 170, 10, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text('Détails du devis', 105, 107, null, null, 'center');
    
            doc.setFont("helvetica", "normal");
            doc.text(`Plan sélectionné: ${selectedPlan}`, 20, 120);
            doc.text(`Prix de base: ${basePrice} €`, 20, 130);
    
            // Tableau des services
            let yPos = 150;
            doc.line(20, yPos, 190, yPos);
            yPos += 10;
            doc.setFont("helvetica", "bold");
            doc.text('Description', 25, yPos);
            doc.text('Quantité', 100, yPos);
            doc.text('Prix', 150, yPos);
            doc.setFont("helvetica", "normal");
            yPos += 10;
            doc.line(20, yPos, 190, yPos);
            yPos += 10;
            doc.text(selectedPlan, 25, yPos);
            doc.text('1', 105, yPos);
            doc.text(`${basePrice} €`, 150, yPos);
            yPos += 10;
            doc.line(20, yPos, 190, yPos);
    
            // Total
            yPos += 20;
            doc.setFont("helvetica", "bold");
            doc.text('Total HT:', 125, yPos);
            doc.text(`${basePrice} €`, 150, yPos);
            yPos += 10;
            const tva = basePrice * 0.2;
            doc.text('TVA (20%):', 125, yPos);
            doc.text(`${tva.toFixed(2)} €`, 150, yPos);
            yPos += 10;
            doc.setTextColor(255, 77, 77);
            doc.text('Total TTC:', 125, yPos);
            doc.text(`${(basePrice + tva).toFixed(2)} €`, 150, yPos);
        }
    
        function addMessage() {
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text('Message du client:', 20, 230);
            doc.setFont("helvetica", "normal");
            const splitMessage = doc.splitTextToSize(formData.message, 170);
            doc.text(splitMessage, 20, 240);
        }
    
        // Génération du PDF
        addBackground();
        addHeader();
        addFooter();
        addClientInfo();
        addCompanyInfo();
        addQuoteDetails();
        addMessage();
    
        // Sauvegarder le fichier PDF
        doc.save('devis-IJM-Web.pdf');
    
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