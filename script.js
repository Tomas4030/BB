// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos HTML
    const passwordInputContainer = document.querySelector('.password-input-container');
    const lockIcon = document.querySelector('.lock-icon');
    const passwordDisplay = document.getElementById('passwordDisplay');
    const keypad = document.querySelector('.keypad');

    let currentPassword = '';
    const correctPassword = '123987';
    const REDIRECT_URL = './Menu/surpresa.html';

    let failedAttempts = 0;
    const failMessages = [
        "Quase lá... mas não é bem essa! 🤔💔   0",
        "Ainda não! Lembra-te... 🐈‍🥢👲🏻   01",
        "Ahah, enganaste-te! 🐒🍌   010",
        "Ai ai ai... outra vez errado! 🤦🏻‍♂️💔   0101",
        "Hmmm... não é hoje que acertas. 🙈🎯   01012",
        "Estou a ficar chateado! 😡 Tenta outra vez. Última Tentativa 🤫🔪   Pass: 010124",

        "AHAHAHAHHA Bananinha da madeira! 🍌 Espera que eu disse a pass? Tenta Outra Vez!",
        "Vá desito desculpa hahaha! o código é 😂👉 123987 porque? porque sim :)",
    ];

    function updateDisplay() {
        passwordDisplay.value = currentPassword.split('').join('');

        if (currentPassword.length === 6) {
            checkPassword();
        }

        if (currentPassword.length < 6 && passwordInputContainer.classList.contains('success-state')) {
            passwordInputContainer.classList.remove('success-state');
            lockIcon.textContent = '🔒';
        }
    }

    function checkPassword() {
        if (currentPassword === correctPassword) {
            alert("Bem jogado Bananinha da madeira! 🍌 ");
            keypad.style.pointerEvents = 'none';
            passwordInputContainer.classList.add('success-state');
            lockIcon.textContent = '🔓';
            setTimeout(() => {
                window.location.href = REDIRECT_URL;
            }, 1000);

        } else {
            let messageIndex = Math.min(failedAttempts, failMessages.length - 1);
            let message = failMessages[messageIndex];

            failedAttempts++;

            alert(message);

            setTimeout(() => {
                currentPassword = '';
                updateDisplay();
            }, 500);
        }
    }

    keypad.addEventListener('click', (event) => {
        const key = event.target;

        if (key.classList.contains('key')) {
            const keyValue = key.textContent.trim();

            if (keyValue >= '0' && keyValue <= '9') {
                if (currentPassword.length < 6) {
                    currentPassword += keyValue;
                }
            } else if (key.classList.contains('backspace')) {
                currentPassword = currentPassword.slice(0, -1);
            } else if (keyValue === '*') {
                return;
            }

            updateDisplay();
        }
    });

    passwordDisplay.value = '******';

});