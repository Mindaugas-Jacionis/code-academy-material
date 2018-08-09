(function IIFE() {
  const combos = [
    // row combos
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],

    // columns combos
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],

    // diagonale
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];
  const gameData = [...Array(3)].map(item => [...Array(3)]);
  const app = document.querySelector('#app');
  const cross = '😈';
  const circle = '😇';
  let winner = null;
  let turn = 0;

  const create = ({ tag, classList, textContent, events = {} }) => {
    const element = document.createElement(tag);
    element.classList = classList;
    element.textContent = textContent;

    Object.entries(events).forEach(([key, value]) =>
      element.addEventListener(key, value)
    );

    return element;
  };

  const clearApp = () => {
    const children = [...app.children];
    children.forEach(child => app.removeChild(child));
  };

  const currentPlayer = () => (turn % 2 === 0 ? cross : circle);

  const checkWinner = () => {
    const isWinner = combos.some(combo =>
      combo.every(([row, box]) => gameData[row][box] === currentPlayer())
    );

    winner = isWinner ? currentPlayer() : null;
  };

  const addGameData = (row, box) => {
    gameData[row][box] = currentPlayer();
    checkWinner();

    if (!winner) {
      turn = turn + 1;
    }

    render();
  };

  const render = () => {
    clearApp();
    gameData.forEach((rowData, rowIndex) => {
      const row = create({ tag: 'div', classList: 'row' });

      rowData.forEach((boxData, boxIndex) => {
        const allowClick = !!gameData[rowIndex][boxIndex] || !!winner;
        const box = create({
          tag: 'div',
          classList: 'box',
          textContent: boxData,
          events: {
            click: () => (allowClick ? null : addGameData(rowIndex, boxIndex)),
          },
        });
        row.appendChild(box);
      });

      app.appendChild(row);
    });
  };

  const initApp = () => {
    const startButton = create({
      tag: 'button',
      classList: 'primary-button',
      textContent: 'Start',
      events: { click: render },
    });
    app.appendChild(startButton);
  };

  document.addEventListener('DOMContentLoaded', initApp);
})();
