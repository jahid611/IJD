/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); 
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);


/*==================== REDIRECTION 'CONTACTEZ-NOUS' ====================*/
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('quote-form');
    const closeModalButton = document.getElementById('closeModalButton'); // Bouton "OK"
    const modal = document.getElementById('pricingModal'); // Modale de sélection de plan

    // Sélection des boutons de plan
    const pricingButtons = document.querySelectorAll('.pricing__button');
    let selectedPlan = 'Essentiel'; // Plan par défaut
    let selectedPrice = 1000; // Prix par défaut

    // Gestion de la sélection des boutons de plan
    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe 'selected' de tous les boutons
            pricingButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Ajouter la classe 'selected' au bouton cliqué
            button.classList.add('selected');

            // Mettre à jour le plan et le prix associés
            selectedPlan = button.getAttribute('data-plan');
            selectedPrice = button.getAttribute('data-price') || 'Sur demande'; // Par défaut, 'Sur demande' si pas de prix

            // Mettre à jour le texte dans la modale
            document.getElementById('modalTitle').textContent = `Plan sélectionné : ${selectedPlan}`;
            document.getElementById('modalText').textContent = `Le prix de base est : ${selectedPrice}. Veuillez remplir le formulaire pour un devis personnalisé.`;

            // Afficher la modale
            modal.style.display = 'flex';
        });
    });

    // Gestion de la fermeture de la modale lorsque le bouton "OK" est cliqué
    closeModalButton.addEventListener('click', function () {
        modal.style.display = 'none';
        // Redirection vers la page d'accueil uniquement si le plan sélectionné est "Expert"
        if (selectedPlan === 'Expert') {
            window.location.href = "/Acceuil/index.html#contact";
        }
    });

    // Gestion de la soumission du formulaire pour générer le PDF
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            project: document.getElementById('project').value,
            message: document.getElementById('message').value,
            plan: selectedPlan,
            basePrice: selectedPrice
        };

        // Générer le PDF
        generateStyledPDF(formData);
    });
});


function generateStyledPDF(formData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // En-tête du PDF
    doc.setFillColor(255, 77, 77);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setFontSize(28);
    doc.setTextColor(255, 255, 255);
    doc.text('Devis IJM Web', 105, 25, null, null, 'center');
    doc.setFontSize(14);
    doc.text('Votre partenaire en développement web', 105, 32, null, null, 'center');
    
    // Informations du client et de l'entreprise
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text('Informations du client:', 20, 50);
    doc.setFont("helvetica", "normal");
    doc.text(`Nom: ${formData.name}`, 20, 60);
    doc.text(`Email: ${formData.email}`, 20, 66);
    doc.text(`Projet: ${formData.project}`, 20, 72);
    
    // Informations de l'entreprise
    doc.setFont("helvetica", "bold");
    doc.text('IJM Web', 140, 50);
    doc.setFont("helvetica", "normal");
    doc.text('123 Rue du Web', 140, 60);
    doc.text('75000 Paris, France', 140, 66);
    doc.text('SIRET: 123 456 789 00000', 140, 72);
    
    const basePrice = parseFloat(formData.basePrice);
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 90, 170, 10, 'F');
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text('Détails du devis', 25, 97);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Plan sélectionné: ${formData.plan}`, 20, 110);
    doc.text(`Prix de base: ${basePrice.toFixed(2)} €`, 20, 116);

    const tableTop = 140;
    doc.line(20, tableTop, 190, tableTop);
    doc.text('Description', 25, tableTop - 5);
    doc.text('Quantité', 100, tableTop - 5);
    doc.text('Prix', 170, tableTop - 5, { align: 'right' });
    doc.line(20, tableTop + 5, 190, tableTop + 5);

    doc.text(formData.plan, 25, tableTop + 15);
    doc.text('1', 105, tableTop + 15);
    doc.text(`${basePrice.toFixed(2)} €`, 170, tableTop + 15, { align: 'right' });

    doc.line(20, tableTop + 25, 190, tableTop + 25);

    const totalsTop = tableTop + 40;
    doc.setFont("helvetica", "bold");
    doc.text(`Total HT:`, 130, totalsTop);
    doc.text(`${basePrice.toFixed(2)} €`, 190, totalsTop, { align: 'right' });

    const tva = basePrice * 0.2;
    doc.text(`TVA (20%):`, 130, totalsTop + 10);
    doc.text(`${tva.toFixed(2)} €`, 190, totalsTop + 10, { align: 'right' });

    doc.setFont("helvetica", "bold");
    const totalTTC = basePrice + tva;
    doc.setTextColor(255, 77, 77);
    doc.text(`Total TTC:`, 130, totalsTop + 20);
    doc.text(`${totalTTC.toFixed(2)} €`, 190, totalsTop + 20, { align: 'right' });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.text('Message du client:', 20, 230);
    const splitMessage = doc.splitTextToSize(formData.message, 170);
    doc.text(splitMessage, 20, 240);

    doc.setFillColor(255, 77, 77);
    doc.rect(0, 270, 210, 20, 'F');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('IJM Web - www.ijmweb.com - contact@ijmweb.com - +33 6 12 34 56 78', 105, 280, null, null, 'center');
    doc.text('Ce devis est généré automatiquement et n\'est pas un engagement contractuel.', 105, 285, null, null, 'center');

    doc.save('devis-IJM-Web.pdf');
}

    


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