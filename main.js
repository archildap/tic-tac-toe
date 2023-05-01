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
                    document.querySelector('.result').textContent = `${players[0].name} Won Congratulations!`;
                } else { document.querySelector('.result').textContent = `${players[1].name} Won Congratulations!`; }
            }
        }
        for (let i = 0; i < 3; i++) {
            if (gameboard[i] === gameboard[i + 3] && gameboard[i] === gameboard[i + 6] && gameboard[i] !== '') {
                gameOver = true;
                document.querySelector('.turn').textContent = 'Game Over';
                if (gameboard[i] === players[0].mark) {
                    document.querySelector('.result').textContent = `${players[0].name} Won Congratulations!`;
                } else { document.querySelector('.result').textContent = `${players[1].name} Won Congratulations!`; }
            }
        }
    };

    const switchPlayerTurn = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const start = () => {
        document.querySelector('.startBtn').disabled = true;
        players = [
            createPlayer('Player One', 'X'),
            createPlayer('Player Two', 'O'),
        ];
        currentPlayer = players[0];
        document.querySelector('.turn').textContent = `${currentPlayer.name}'s turn`;
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

    return { start, handleClick };
})();

const startBtn = document.querySelector('.startBtn');

startBtn.addEventListener('click', GameController.start);
