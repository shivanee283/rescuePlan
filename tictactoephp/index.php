<?php
session_start();

if (!isset($_SESSION['gameState'])) {
    $_SESSION['gameState'] = ['', '', '', '', '', '', '', '', ''];
}

$winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWinner($gameState, $winningConditions) {
    foreach ($winningConditions as $condition) {
        if ($gameState[$condition[0]] && $gameState[$condition[0]] === $gameState[$condition[1]] && $gameState[$condition[1]] === $gameState[$condition[2]]) {
            return $gameState[$condition[0]];
        }
    }
    return '';
}

$response = ['success' => false];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action']) && $_POST['action'] === 'restart') {
        $_SESSION['gameState'] = ['', '', '', '', '', '', '', '', ''];
        $response['success'] = true;
        $response['gameState'] = $_SESSION['gameState'];
    } else if (isset($_POST['cellIndex'])) {
        $cellIndex = $_POST['cellIndex'];
        $currentPlayer = 'X'; // Implement logic to determine the current player based on session or move count

        if ($_SESSION['gameState'][$cellIndex] === '') {
            $_SESSION['gameState'][$cellIndex] = $currentPlayer;
            $winner = checkWinner($_SESSION['gameState'], $winningConditions);
            $response['success'] = true;
            $response['gameState'] = $_SESSION['gameState'];
            $response['winner'] = $winner ?: (in_array('', $_SESSION['gameState']) ? '' : 'Tie');
        }
    }
}

header('Content-Type: application/json');
echo json_encode($response);