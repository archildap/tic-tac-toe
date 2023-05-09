const Gameboard = (() => {
    const gameboard = ['', '', '', '', '', '', '', '', ''];

    const render = () => {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => box.remove());
        const board = document.querySelector('.game-board');
        gameboard.map((item, index) => {
            const box = document.createElement('div');
            box.classList.add('box');
            box.setAttribute('id', `square-${index}`);
            box.textContent = item;
            board.appendChild(box);
            box.addEventListener('click', GameController.handleClick);
        });
    };

    const update = (index, mark) => {
        gameboard[index] = mark;
    };

    return { render, update, gameboard };
})();

const createPlayer = (name, mark) => ({
    name,
    mark,
});

const GameController = (() => {
    const nameSubmit = document.querySelector('.form-submit');
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');

    let players = [];

    let currentPlayer;
    let gameOver = false;

    const isGameOver = () => {
        const { gameboard } = Gameboard;
        for (let i = 0; i < 7; i += 3) {
            if (gameboard[i] === gameboard[i + 1] && gameboard[i] === gameboard[i + 2] && gameboard[i] !== '') {
                gameOver = true;
                document.querySelector('.turn').textContent = 'Game Over';
                if (gameboard[i] === players[0].mark) {
                    document.querySelector('.result').textContent = `${players[0].name} WON THE GAME!`;
                } else { document.querySelector('.result').textContent = `${players[1].name} WON THE GAME!`; }
            }
        }
        for (let i = 0; i < 3; i++) {
            if (gameboard[i] === gameboard[i + 3] && gameboard[i] === gameboard[i + 6] && gameboard[i] !== '') {
                gameOver = true;
                document.querySelector('.turn').textContent = 'Game Over';
                if (gameboard[i] === players[0].mark) {
                    document.querySelector('.result').textContent = `${players[0].name} WON THE GAME!`;
                } else { document.querySelector('.result').textContent = `${players[1].name} WON THE GAME!`; }
            }
        }
        for (let i = 0; i < 3; i += 2) {
            if (gameboard[i] === gameboard[i + 4] && gameboard[i] === gameboard[i + 8] && gameboard[i] !== '') {
                gameOver = true;
                document.querySelector('.turn').textContent = 'Game Over';
                if (gameboard[i] === players[0].mark) {
                    document.querySelector('.result').textContent = `${players[0].name} WON THE GAME!`;
                } else { document.querySelector('.result').textContent = `${players[1].name} WON THE GAME!`; }
            }
        }
        for (let i = 2; i < 3; i++) {
            if (gameboard[i] === gameboard[i + 2] && gameboard[i] === gameboard[i + 4] && gameboard[i] !== '') {
                gameOver = true;
                document.querySelector('.turn').textContent = 'Game Over';
                if (gameboard[i] === players[0].mark) {
                    document.querySelector('.result').textContent = `${players[0].name} WON THE GAME!`;
                } else { document.querySelector('.result').textContent = `${players[1].name} WON THE GAME!`; }
            } else {
                const emptyCells = gameboard.filter((cell) => (cell === ''));
                if (emptyCells.length < 1) {
                    gameOver = true;
                    document.querySelector('.turn').textContent = 'Game Over';
                    document.querySelector('.result').textContent = 'DRAW!';
                }
            }
        }
    };

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const handleNameSubmit = (event) => {
        event.preventDefault();
        if (player1.value !== '' && player2.value !== '') {
            document.querySelector('.start-btn').style.display = 'block';
            players = [
                createPlayer(player1.value, 'X'),
                createPlayer(player2.value, 'O'),
            ];
            document.getElementById('name-input').style.display = 'none';
        } else {
            document.querySelector('.input-title').textContent = 'You have not entered names!';
        }
    };
    nameSubmit.addEventListener('click', handleNameSubmit);

    const start = () => {
        document.querySelector('.restart-btn').style.display = 'block';
        document.querySelector('.start-btn').style.display = 'none';
        currentPlayer = players[0];
        document.querySelector('.turn').textContent = `${currentPlayer.name}'s turn`;
        gameOver = false;
        document.querySelector('.result').textContent = '';
        Gameboard.render();
    };

    const handleClick = (event) => {
        const index = parseInt(event.target.id.split('-')[1], 10);
        if (Gameboard.gameboard[index] === '' && gameOver === false) {
            Gameboard.update(index, currentPlayer.mark);
            Gameboard.render();
            switchPlayerTurn();
            document.querySelector('.turn').textContent = `${currentPlayer.name}'s turn`;
        }
        isGameOver();
    };

    const handleRestart = () => {
        Gameboard.gameboard.map((cell, index) => {
            Gameboard.gameboard[index] = '';
        });
        start();
    };

    return { start, handleClick, handleRestart };
})();

const restartBtn = document.querySelector('.restart-btn');
const startBtn = document.querySelector('.start-btn');

startBtn.addEventListener('click', GameController.start);
restartBtn.addEventListener('click', GameController.handleRestart);
