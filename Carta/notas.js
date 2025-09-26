// notas.js

document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const letterOverlay = document.getElementById('letterOverlay');
    const closeButton = document.getElementById('closeButton');
    const clickPrompt = document.getElementById('clickPrompt');

    // --- Animação de Abertura ---
    envelope.addEventListener('click', () => {
        // Simula a abertura: Esconde o envelope
        envelope.style.opacity = '0';
        envelope.style.pointerEvents = 'none'; // Impede cliques repetidos
        clickPrompt.style.opacity = '0'; // Esconde a mensagem de clique

        // Opcional: Animação de giro ou explosão para simular o GIF
        // envelope.style.transform = 'rotateY(180deg) scale(0)'; 

        // Mostra a carta com o efeito de deslize
        setTimeout(() => {
            letterOverlay.classList.add('active');
        }, 500); // Meio segundo de atraso para simular o tempo de abertura do envelope
    });

    // --- Fechar a Carta ---
    closeButton.addEventListener('click', () => {
        // Desliza a carta para fora da tela
        letterOverlay.classList.remove('active');
        
        // Reaparece o envelope (para poder ver novamente, se desejar)
        setTimeout(() => {
            envelope.style.opacity = '1';
            envelope.style.pointerEvents = 'auto';
            clickPrompt.style.opacity = '1';
            // envelope.style.transform = 'rotateY(0deg) scale(1)'; // Se usou a animação de giro
        }, 1500); // Espera o tempo da transição da carta para redefinir o envelope
    });
});