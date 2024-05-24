document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart-button');
  
    function handleCellClick(event) {
      const cellIndex = event.target.getAttribute('data-cell-index');
      makeMove(cellIndex);
    }
  
    function makeMove(cellIndex) {
      fetch('game.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `cellIndex=${cellIndex}`
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          updateBoard(data.gameState);
          if (data.winner) {
            announceWinner(data.winner);
          }
        }
      })
      .catch(error => console.error('Error:', error));
    }
  
    function updateBoard(gameState) {
      gameState.forEach((cell, index) => {
        cells[index].textContent = cell;
      });
    }
  
    function announceWinner(winner) {
      alert(winner === 'Tie' ? "It's a Tie!" : `Player ${winner} Wins!`);
      // Implement additional logic to show the winner on the UI
    }
  
    function restartGame() {
      fetch('game.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'action=restart'
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          updateBoard(data.gameState);
        }
      })
      .catch(error => console.error('Error:', error));
    }
  
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
  });