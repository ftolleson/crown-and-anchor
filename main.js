document.addEventListener("DOMContentLoaded", function(event){
  const button = document.querySelector('button');
  const bankEl = document.querySelector('.bank');
  const squares = document.querySelectorAll('.square');
  const resultDisplay = document.querySelector('.result');
  const state = {"👽": 0, "🦁": 0, "💩": 0, "😻": 0, "🤖": 0, "🤡": 0}
  let bank = 10;

  button.addEventListener('click', randomSquare);
  squares.forEach(square => square.addEventListener('click', (e) => {
    placeBet(e);
  }));

  function placeBet(e) {
    var face = e.target.firstElementChild.innerText;

    if(bank > 0) {
      addBet(e, face)
      balanceBank();
    }
  }

  function addBet(e, face) {
    state[face] += 1
    e.target.lastElementChild.innerHTML = state[face];
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
    resultDisplay.innerHTML = hand;
    winnings(hand);
  }

  function rand(m, n) {
    return m + Math.floor((n - m + 1) * Math.random());
  }

  function winnings(hand) {
    var winnings = 0;
    for (var die = 0; die < hand.length; die++) {
      var face = hand[die];
      // Find amount for face
      var betAmount = state[face];
      // If > 0 add value to bank total

      if (betAmount > 0) {
        bank += betAmount;
        bankEl.innerText = bank;
      }
    }
    // Reset tiles to 0
    Object.keys(state).forEach( key => state[key] = 0 )
    squares.forEach(square => square.lastElementChild.innerText = 0)
  }

});
