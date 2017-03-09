document.addEventListener("DOMContentLoaded", function(event){
  const button = document.querySelector('button');
  const bankEl = document.querySelector('.bank');
  const squares = document.querySelectorAll('.square');
  const bet = document.querySelectorAll('.amount');
  const resultDisplay = document.querySelector('.result');
  const state = {"🙊": 0, "🦁": 0, "💩": 0, "🦄": 0, "🤖": 0, "🤡": 0}
  let bank = 10;

  button.addEventListener('click', randomSquare);
  squares.forEach(square => square.addEventListener('click', placeBet, true));

  function placeBet(e) {
    var face = this.firstElementChild.innerText;

    if(bank > 0) {
      this.lastElementChild.classList.add('coin');
      addBet(this, face)
      balanceBank();
    }
  }

  function addBet(square, face) {
    state[face] += 1
    square.lastElementChild.innerText = state[face];
  }

  function balanceBank() {
    bank -= 1;
    bankEl.innerText = bank;
  }

  function randomSquare() {
    const hand = [];
    for (var roll = 0; roll < 3; roll++) {
      var index = rand(0, 5);
      var square = squares[index].firstElementChild.innerText;
      hand.push(square);
    }
    resultDisplay.innerHTML = hand.join(' ');
    winnings(hand);
  }

  function rand(m, n) {
    return m + Math.floor((n - m + 1) * Math.random());
  }

  function winnings(hand) {
    var set = new Set();
    for (var die = 0; die < hand.length; die++) {
      var face = hand[die];
      var betAmount = state[face];
      if (betAmount > 0) {
        set.add(face);
        bank += betAmount;
      }
    }

    set.forEach(function(value) {
      bank += state[value];
    });

    bankEl.innerText = bank;
    Object.keys(state).forEach( key => state[key] = 0 );
    squares.forEach(square => square.lastElementChild.innerText = 0);
    squares.forEach(square => square.lastElementChild.classList.remove("coin"));
  }

});
