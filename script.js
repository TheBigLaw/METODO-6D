// Script principal para o site Método Renda Imediata 6D

document.addEventListener('DOMContentLoaded', function() {
    // Contador regressivo
    startCountdown();
    
    // Navegação mobile
    setupMobileMenu();
    
    // FAQ accordion
    setupFaqAccordion();
    
    // Slider de depoimentos
    setupTestimonialSlider();
    
    // Opções de checkout
    setupCheckoutOptions();
    
    // Scroll suave para links de âncora
    setupSmoothScroll();
    
    // Botão flutuante
    setupFloatingButton();
});

// Função para iniciar o contador regressivo
function startCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    let hours = parseInt(hoursElement.textContent);
    let minutes = parseInt(minutesElement.textContent);
    let seconds = parseInt(secondsElement.textContent);
    
    setInterval(function() {
        seconds--;
        
        if (seconds < 0) {
            seconds = 59;
            minutes--;
            
            if (minutes < 0) {
                minutes = 59;
                hours--;
                
                if (hours < 0) {
                    hours = 23;
                }
            }
        }
        
        hoursElement.textContent = hours < 10 ? '0' + hours : hours;
        minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
    }, 1000);
}

// Função para configurar o menu mobile
function setupMobileMenu() {
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const header = document.querySelector('header');
    
    if (!mobileMenuIcon || !header) return;
    
    mobileMenuIcon.addEventListener('click', function() {
        header.classList.toggle('mobile-menu-open');
    });
}

// Função para configurar o accordion do FAQ
function setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alterna o estado do item atual
            item.classList.toggle('active');
        });
    });
}

// Função para configurar o slider de depoimentos
function setupTestimonialSlider() {
    const testimonials = document.querySelectorAll('.depoimento');
    const prevButton = document.querySelector('.depoimento-prev');
    const nextButton = document.querySelector('.depoimento-next');
    
    if (testimonials.length <= 1 || !prevButton || !nextButton) return;
    
    let currentIndex = 0;
    
    // Esconde todos os depoimentos exceto o primeiro
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });
    
    // Função para mostrar um depoimento específico
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    // Evento para o botão anterior
    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    });
    
    // Evento para o botão próximo
    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    });
}

// Função para configurar as opções de checkout
function setupCheckoutOptions() {
    const paymentOptions = document.querySelectorAll('.checkout-option');
    const priceOptions = document.querySelectorAll('.price-option');
    
    // Configurar opções de pagamento
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
    
    // Configurar opções de preço
    priceOptions.forEach(option => {
        option.addEventListener('click', function() {
            priceOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });
}

// Função para configurar o scroll suave para links de âncora
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile se estiver aberto
                document.querySelector('header').classList.remove('mobile-menu-open');
            }
        });
    });
}

// Função para configurar o botão flutuante
function setupFloatingButton() {
    const floatingButton = document.querySelector('.floating-cta');
    
    if (!floatingButton) return;
    
    // Mostra o botão flutuante após rolar 300px
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            floatingButton.style.display = 'block';
        } else {
            floatingButton.style.display = 'none';
        }
    });
}
