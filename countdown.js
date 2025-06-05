// Script para Contagem Regressiva de 45 Minutos

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do contador
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // Verificar se os elementos existem
    if (!hoursElement || !minutesElement || !secondsElement) {
        console.error('Elementos do timer não encontrados no DOM.');
        return;
    }

    // Definir a duração da contagem regressiva (45 minutos em milissegundos)
    const countdownDuration = 45 * 60 * 1000; // 45 minutos
    
    // Armazenar o tempo final no localStorage ou criar um novo
    let endTime;
    const savedEndTime = localStorage.getItem('countdownEndTime');
    
    if (savedEndTime && !isNaN(savedEndTime) && new Date().getTime() < parseInt(savedEndTime)) {
        // Usar o tempo salvo se ainda for válido
        endTime = parseInt(savedEndTime);
    } else {
        // Criar um novo tempo final (agora + 45 minutos)
        endTime = new Date().getTime() + countdownDuration;
        localStorage.setItem('countdownEndTime', endTime.toString());
    }

    // Função para atualizar o contador
    function updateTimer() {
        // Obter o tempo atual
        const now = new Date().getTime();
        
        // Calcular a distância entre agora e o tempo final
        const distance = endTime - now;

        // Se o tempo acabou
        if (distance <= 0) {
            // Limpar o intervalo
            clearInterval(timerInterval);
            
            // Definir todos os elementos para zero
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            
            // Opcional: Adicionar mensagem de tempo esgotado
            const timerContainer = document.querySelector('.countdown-timer p');
            if (timerContainer) {
                timerContainer.textContent = 'Oferta encerrada!';
            }
            
            // Limpar o localStorage
            localStorage.removeItem('countdownEndTime');
            
            return;
        }

        // Calcular horas, minutos e segundos
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Atualizar os elementos no DOM com formatação de dois dígitos
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
        
        // Debug para console
        console.log(`Contador: ${hours}h ${minutes}m ${seconds}s`);
    }

    // Inicializar o contador imediatamente
    updateTimer();
    
    // Atualizar a cada segundo
    const timerInterval = setInterval(updateTimer, 1000);
    
    // Garantir que o contador seja visível
    const countdownTimer = document.querySelector('.countdown-timer');
    if (countdownTimer) {
        countdownTimer.style.display = 'block';
    }
});
