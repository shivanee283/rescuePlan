document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const gameOverPanel = document.getElementById('game-over');
    const winnerMessage = document.getElementById('winner-message');
    const restartButton = document.getElementById('restart-button');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    function handleCellClick(event) {
      const cellIndex = event.target.getAttribute('data-cell-index');
      if (gameState[cellIndex] !== '' || !gameActive) {
        return;
      }
  
      gameState[cellIndex] = currentPlayer;
      event.target.innerHTML = currentPlayer;
  
      checkResult();
    }
  
    function checkResult() {
      let roundWon = false;
  
      for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
          continue;
        }
        if (a === b && b === c) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        announceWinner(currentPlayer);
        gameActive = false;
        return;
      }
  
      if (!gameState.includes('')) {
        announceWinner('Tie');
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    function announceWinner(winner) {
      if (winner === 'Tie') {
        winnerMessage.innerHTML = `It's a Tie!`;
      } else {
        winnerMessage.innerHTML = `Player ${winner} Wins!`;
      }
      gameOverPanel.style.display = 'flex';
    }
  
    function restartGame() {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      gameOverPanel.style.display = 'none';
      cells.forEach(cell => cell.innerHTML = '');
    }
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
  });