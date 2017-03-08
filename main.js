document.addEventListener("DOMContentLoaded", function(event){
  const button = document.querySelector('button');
  const bank = document.querySelector('.bank');
  const squares = document.querySelectorAll('.square');
  const resultDisplay = document.querySelector('.result');

  button.addEventListener('click', randomSquare);
  squares.forEach(square => square.addEventListener('click', (e) => {
    bet(e);
  }));

  function bet(e) {
    var bankBalance = parseInt(bank.innerText);

    if(bankBalance == 0) {
      return;
    } else {
      addBet(e)
      balanceBank();
    }
  }

  function addBet(e) {
    var amount = parseInt(e.target.lastElementChild.innerHTML);
    amount += 1;
    e.target.lastElementChild.innerHTML = amount;
  }

  function balanceBank() {
    var bankBalance = parseInt(bank.innerText);
    bankBalance -= 1;
    bank.innerText = bankBalance;
  }


  function randomSquare() {
    const result = [];
    for (var i = 0; i < 3; i++) {
      var index = Math.floor(Math.random() * squares.length);
      var randomSquare = squares[index].firstElementChild.innerHTML;
      result.push(randomSquare);
    }
    resultDisplay.innerHTML = result;
  }



});
