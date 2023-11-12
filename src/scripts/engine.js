const emojis = [
  '🐵',
  '🐵',
  '🐶',
  '🐶',
  '🐱',
  '🐱',
  '🦁',
  '🦁',
  '🐼',
  '🐼',
  '🦄',
  '🦄',
  '🐔',
  '🐔',
  '🐸',
  '🐸',
];

let showCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

// auto-run function
const init = (function autorun(){
  for (let index = 0; index < emojis.length; index++) {
    let box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = shuffleEmojis[index];
    box.onclick = handleClick;
    
    document.querySelector('.game').appendChild(box)
  }

  return autorun; // return itself to reference
}());

async function reset() {
  const gameBoard = document.querySelector('.game');
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.lastChild);
  }
}

async function handleClick() {
  if (showCards.length < 2) {
    this.classList.add('boxShow');
    showCards.push(this);
  }
  
  if (showCards.length === 2) {
    setTimeout(checkMatch, 500);
  }
}

async function checkMatch() {
  if (showCards[0].innerHTML === showCards[1].innerHTML) {
    showCards[0].classList.add('boxMatch');
    showCards[1].classList.add('boxMatch');
  } else {
    showCards[0].classList.remove('boxShow');
    showCards[1].classList.remove('boxShow');
  }
  showCards = [];

  // end game
  if (document.querySelectorAll('.boxMatch').length === emojis.length) {
    alert('You WIN!');
    await reset();
    init();
  }
}