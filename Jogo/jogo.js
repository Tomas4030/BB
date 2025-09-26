// jogo.js

document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('memoryBoard');
    const winMessage = document.getElementById('winMessage');

    // AS 6 IMAGENS QUE SERÃO DUPLICADAS PARA OS PARES
    const images = [
        'https://media.discordapp.net/attachments/1152005858721533962/1420979272151208080/AP1GczMYwVMRLajaX9slU5kKYDckVdPyJqusi34RLHXHGsCKXrwCnKyhFualjww1267-h953-s-no-gm.png?ex=68d75d92&is=68d60c12&hm=ec24cbc1332791e06e76b4e286716a71aeb754b186c8585ae80f8b6b7b3a9e1e&=&format=webp&quality=lossless&width=1149&height=864',
        'https://media.discordapp.net/attachments/1152005858721533962/1420979269793873970/AP1GczMMXddW9xd1br8ZEe7lF4Ka5b6AD3yqNMx_cJiWGcaGLsX1LQifPl3THgw429-h953-s-no-gm.png?ex=68d75d92&is=68d60c12&hm=23b0167fe6367adcad284901d1f2afaf64f54115121a8aac1fa1ec78779505e7&=&format=webp&quality=lossless&width=389&height=864',
        'https://media.discordapp.net/attachments/1152005858721533962/1420979271651954709/AP1GczN_tQGxHcXts9jGW3F8rFiWLbaJHHkFB_UCWONnNwk4CxCIekoMNOOWAQw1268-h953-s-no-gm.png?ex=68d75d92&is=68d60c12&hm=1172fd1a1d33ef2d79b14508db1445e03a2ec0c48e9ef7e128848f83add6082e&=&format=webp&quality=lossless&width=1150&height=864',
        'https://media.discordapp.net/attachments/1152005858721533962/1420979271199100978/AP1GczPmvvRMhgSePGw_Vx6Oqqg34RacMjxc9UnxDgqL-_Z_kP93lh2h05WDPww715-h953-s-no-gm.png?ex=68d75d92&is=68d60c12&hm=f42f5a5e6265f31681cd4d46b421a9c3bab72f537b773fece854abe6bd3209a5&=&format=webp&quality=lossless&width=648&height=864',
        'https://media.discordapp.net/attachments/1152005858721533962/1420979270704042185/AP1GczNt8pTI-lCNtGIwzEP8YeCGTD-mGSBRLiA5XJg4VoO3bmnC9vaKe5ee8gw1267-h953-s-no-gm.png?ex=68d75d92&is=68d60c12&hm=72b9eb43ad9e84be1c6083104147f6771c5b23520af93984b40e169f56c92204&=&format=webp&quality=lossless&width=1149&height=864',
        'https://media.discordapp.net/attachments/1152005858721533962/1420976165354475581/Screenshot_2025-09-26-04-31-32-388_com.whatsapp-edit.jpg?ex=68d75aae&is=68d6092e&hm=2cb7223b7cc41a44071b1f874811675ef3fff3fbc51e5fff06614c6e13c66405&=&format=webp&width=969&height=968'
    ];


    // Cria a lista de 12 cartões (6 pares)
    let cardArray = [...images, ...images]
        .map((image, index) => ({
            id: index,
            image: image,
            matchId: image
        }));

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = 0;
    let lockBoard = false;

    // Função para embaralhar o array
    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    // --- Cria o Tabuleiro no HTML ---
    function createBoard() {
        shuffle(cardArray);

        for (let i = 0; i < cardArray.length; i++) {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.setAttribute('data-id', cardArray[i].id);
            cardElement.setAttribute('data-match', cardArray[i].matchId);
            cardElement.addEventListener('click', flipCard);

            const front = document.createElement('div');
            front.classList.add('card-face', 'card-front');
            front.textContent = '?';

            const back = document.createElement('div');
            back.classList.add('card-face', 'card-back');
            back.style.backgroundImage = `url('${cardArray[i].image}')`;

            cardElement.appendChild(front);
            cardElement.appendChild(back);
            board.appendChild(cardElement);
        }
    }

    // --- Verifica se os dois cartões virados são um par ---
    function checkForMatch() {
        const [cardOneId, cardTwoId] = cardsChosenId;
        const isMatch = cardsChosen[0] === cardsChosen[1];

        if (isMatch) {
            // É um par!
            const cardElements = document.querySelectorAll(`[data-id="${cardOneId}"], [data-id="${cardTwoId}"]`);

            cardElements.forEach(card => {
                // 1. Remove 'flip' (evita a transição de volta)
                card.classList.remove('flip');
                // 2. Adiciona 'match' (aplica o estilo de acerto e o torna permanente)
                card.classList.add('match');
            });

            cardsWon++;

            // Verifica a vitória
            if (cardsWon === images.length) {
                setTimeout(() => {
                    board.style.display = 'none';
                    winMessage.style.display = 'block';
                }, 800);
            }

        } else {
            // Não é um par, vira de volta após um tempo
            setTimeout(() => {
                document.querySelector(`[data-id="${cardOneId}"]`).classList.remove('flip');
                document.querySelector(`[data-id="${cardTwoId}"]`).classList.remove('flip');
            }, 800);
        }

        cardsChosen = [];
        cardsChosenId = [];
        lockBoard = false;
    }

    // --- Ação de Virar o Cartão ---
    function flipCard() {
        if (lockBoard) return;
        // Se o cartão já está flipado OU já é um par, ignora o clique
        if (this.classList.contains('flip') || this.classList.contains('match')) return;

        this.classList.add('flip');

        const cardMatchId = this.getAttribute('data-match');
        const cardId = this.getAttribute('data-id');

        cardsChosen.push(cardMatchId);
        cardsChosenId.push(cardId);

        if (cardsChosen.length === 2) {
            lockBoard = true;
            checkForMatch();
        }
    }

    // Inicia o jogo
    createBoard();
});