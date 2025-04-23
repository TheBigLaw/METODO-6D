// Script para funcionalidades interativas adicionais

document.addEventListener('DOMContentLoaded', function() {
    // Animação de elementos ao scroll
    setupScrollAnimations();
    
    // Validação do formulário de checkout
    setupFormValidation();
    
    // Simulação de envio do formulário
    setupFormSubmission();
    
    // Reprodução de vídeo
    setupVideoPlayback();
});

// Função para animar elementos ao scroll
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fase-card, .especialista-card, .resultado-card, .bonus-item');
    
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Função para animar elementos visíveis
    function animateVisibleElements() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Configurar estilo inicial dos elementos
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Executar animação no carregamento e no scroll
    animateVisibleElements();
    window.addEventListener('scroll', animateVisibleElements);
}

// Função para validar o formulário de checkout
function setupFormValidation() {
    const checkoutForm = document.querySelector('.checkout-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const cpfInput = document.getElementById('cpf');
    const checkoutButton = document.querySelector('.btn-checkout');
    
    if (!checkoutForm || !nameInput || !emailInput || !phoneInput || !cpfInput || !checkoutButton) return;
    
    // Função para validar email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Função para validar CPF (simplificada)
    function isValidCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, '');
        return cpf.length === 11;
    }
    
    // Função para validar telefone
    function isValidPhone(phone) {
        phone = phone.replace(/[^\d]/g, '');
        return phone.length >= 10;
    }
    
    // Função para mostrar erro
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        if (!formGroup.querySelector('.error-message')) {
            errorElement.className = 'error-message';
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = 'red';
    }
    
    // Função para limpar erro
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        
        input.style.borderColor = '';
    }
    
    // Eventos de validação em tempo real
    nameInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this, 'Nome é obrigatório');
        } else if (this.value.trim().split(' ').length < 2) {
            showError(this, 'Digite seu nome completo');
        } else {
            clearError(this);
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this, 'Email é obrigatório');
        } else if (!isValidEmail(this.value)) {
            showError(this, 'Email inválido');
        } else {
            clearError(this);
        }
    });
    
    phoneInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this, 'Telefone é obrigatório');
        } else if (!isValidPhone(this.value)) {
            showError(this, 'Telefone inválido');
        } else {
            clearError(this);
        }
    });
    
    cpfInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError(this, 'CPF é obrigatório');
        } else if (!isValidCPF(this.value)) {
            showError(this, 'CPF inválido');
        } else {
            clearError(this);
        }
    });
    
    // Máscaras para os campos
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 10) {
            this.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        } else if (value.length > 6) {
            this.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
        } else if (value.length > 2) {
            this.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length > 0) {
            this.value = `(${value}`;
        }
    });
    
    cpfInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 9) {
            this.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
        } else if (value.length > 6) {
            this.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
        } else if (value.length > 3) {
            this.value = `${value.slice(0, 3)}.${value.slice(3)}`;
        } else {
            this.value = value;
        }
    });
}

// Função para simular o envio do formulário
function setupFormSubmission() {
    const checkoutButton = document.querySelector('.btn-checkout');
    
    if (!checkoutButton) return;
    
    checkoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validar todos os campos
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const cpfInput = document.getElementById('cpf');
        
        let isValid = true;
        
        if (nameInput.value.trim() === '' || nameInput.value.trim().split(' ').length < 2) {
            isValid = false;
        }
        
        if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
            isValid = false;
        }
        
        if (phoneInput.value.replace(/\D/g, '').length < 10) {
            isValid = false;
        }
        
        if (cpfInput.value.replace(/\D/g, '').length !== 11) {
            isValid = false;
        }
        
        if (isValid) {
            // Simular processamento
            checkoutButton.textContent = 'Processando...';
            checkoutButton.disabled = true;
            
            setTimeout(function() {
                // Criar modal de sucesso
                const modal = document.createElement('div');
                modal.className = 'success-modal';
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.zIndex = '9999';
                
                const modalContent = document.createElement('div');
                modalContent.style.backgroundColor = '#fff';
                modalContent.style.padding = '40px';
                modalContent.style.borderRadius = '10px';
                modalContent.style.maxWidth = '500px';
                modalContent.style.textAlign = 'center';
                
                const icon = document.createElement('div');
                icon.innerHTML = '<i class="fas fa-check-circle"></i>';
                icon.style.fontSize = '60px';
                icon.style.color = '#27ae60';
                icon.style.marginBottom = '20px';
                
                const title = document.createElement('h3');
                title.textContent = 'Compra Realizada com Sucesso!';
                title.style.fontSize = '24px';
                title.style.marginBottom = '15px';
                
                const message = document.createElement('p');
                message.textContent = 'Parabéns! Você acaba de adquirir o Método Renda Imediata 6D. Enviamos um email com as instruções de acesso para o endereço informado.';
                message.style.marginBottom = '30px';
                
                const closeButton = document.createElement('button');
                closeButton.textContent = 'Fechar';
                closeButton.style.backgroundColor = '#ff6b00';
                closeButton.style.color = '#fff';
                closeButton.style.border = 'none';
                closeButton.style.padding = '12px 30px';
                closeButton.style.borderRadius = '5px';
                closeButton.style.cursor = 'pointer';
                closeButton.style.fontWeight = 'bold';
                
                closeButton.addEventListener('click', function() {
                    document.body.removeChild(modal);
                    
                    // Resetar formulário
                    document.querySelector('.checkout-form').reset();
                    checkoutButton.textContent = 'GARANTIR MINHA VAGA AGORA';
                    checkoutButton.disabled = false;
                });
                
                modalContent.appendChild(icon);
                modalContent.appendChild(title);
                modalContent.appendChild(message);
                modalContent.appendChild(closeButton);
                modal.appendChild(modalContent);
                
                document.body.appendChild(modal);
            }, 2000);
        } else {
            alert('Por favor, preencha todos os campos corretamente.');
        }
    });
}

// Função para configurar a reprodução de vídeo
function setupVideoPlayback() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    if (!videoPlaceholder) return;
    
    videoPlaceholder.addEventListener('click', function() {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.style.position = 'relative';
        videoContainer.style.paddingBottom = '56.25%'; // 16:9 aspect ratio
        videoContainer.style.height = '0';
        videoContainer.style.overflow = 'hidden';
        videoContainer.style.borderRadius = '10px';
        
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'; // Placeholder video URL
        iframe.frameBorder = '0';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        
        videoContainer.appendChild(iframe);
        
        // Substituir o placeholder pelo iframe
        this.parentNode.replaceChild(videoContainer, this);
    });
}
