function start() {
    
}

const cards = document.querySelectorAll('.card'); // é um array
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return; // impede que se clique duas vezes na mesma carta

    this.classList.add('flip');
    if(!hasFlippedCard) { // verifica se é falso
        hasFlippedCard = true;
        firstCard = this; // coloca this na primeira carta para depois comparar com a segunda se ela tem o mesmo this
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards(); // se as cartas forem iguais essa funçao é chamada
        return;
    }

    unflipCards(); 
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true; // tranca o jogo

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
}); // adiciona em todas as cartas, atraves da iteraçao do array cards, a funçao flipcard que é ativada com click