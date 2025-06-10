// Top-level setup (run once)
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const hitbox = document.querySelector('.hitbox');

startBtn.addEventListener('click', () => {
	
  resetHitboxStyle();  // <- remove scary western styles
  startBtn.disabled = true;
  startBtn.style.display = 'none';
  restartBtn.style.display = 'none';
  startGame();
});

restartBtn.addEventListener('click', () => {
	resetHitboxStyle(); // <- remove scary western styles
  restartBtn.style.display = 'none';
  startBtn.disabled = true;
  startBtn.style.display = 'none';
  startGame();
});

	function resetHitboxStyle() {
		hitbox.style.color = '';
		hitbox.style.fontFamily = '';
		hitbox.style.fontSize = '';
		hitbox.style.textShadow = '';
		hitbox.style.border = '';
		hitbox.style.backgroundColor = '';
		hitbox.style.padding = '';
		hitbox.style.borderRadius = '';
	}

function startGame() {
	hitbox.style = '';
	
  const imgBoard = [
    './images/luigi-board.png',
    './images/mario-board.png',
    './images/wario-board.png',
    './images/yoshi-board.png',
  ];

  const imgSelect = [
    './images/luigi.png',
    './images/mario.png',
    './images/wario.png',
    './images/yoshi.png',
  ];

  const crim = document.querySelector('.crim');
  const point = document.querySelector('.points');
  const timerDisplay = document.querySelector('.time');
  const alertMessage = document.querySelector('.win_lose');

  hitbox.innerHTML = '';
  crim.innerHTML = '';
  alertMessage.innerHTML = '';

  const areaWidth = hitbox.offsetWidth;
  const areaHeight = hitbox.offsetHeight;

  let randomCrim = Math.floor(Math.random() * imgBoard.length);
  const imageSize = 30;

  let score = 0;
  let timeLeft = 30;
  timerDisplay.textContent = `${timeLeft}s`;
  point.textContent = `Score: ${score}`;

  // Clear any existing intervals
  if (window.timerInterval) {
    clearInterval(window.timerInterval);
  }

  function setCrim() {
    const img = document.createElement('img');
    img.src = imgBoard[randomCrim];
    img.className = 'crim-image';
    crim.innerHTML = '';
    crim.appendChild(img);
  }

  function pickNewCrim() {
    randomCrim = Math.floor(Math.random() * imgBoard.length);
    setCrim();
  }

  function setTarget() {
    const crimSlot = Math.floor(Math.random() * 100);
    hitbox.innerHTML = '';

    for (let i = 0; i < 100; i++) {
      const img = document.createElement('img');
      img.className = 'target-image';

      if (i === crimSlot) {
        img.src = imgSelect[randomCrim];
        img.style.zIndex = 200;
        img.classList.add('is-crim');
      } else {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * imgSelect.length);
        } while (randomIndex === randomCrim);
        img.src = imgSelect[randomIndex];
      }

      img.addEventListener('click', () => {
        if (i === crimSlot) {
          hitbox.innerHTML = 'Correct! 1 Point!';
          styleMessage('green');
          point.textContent = `Score: ${++score}`;
          setTimeout(() => {
            hitbox.innerHTML = '';
            crim.innerHTML = '';
            pickNewCrim();
            setTarget();
          }, 1000);
        } else {
          hitbox.innerHTML = 'Wrong! -1 Point!';
          styleMessage('red');
          point.textContent = `Score: ${--score}`;
          setTimeout(() => {
            hitbox.innerHTML = '';
            crim.innerHTML = '';
            setTarget();
          }, 1000);
        }
      });

      const gridSize = 10;
      const cellWidth = areaWidth / gridSize;
      const cellHeight = areaHeight / gridSize;
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;

      const x = col * cellWidth + Math.random() * (cellWidth - imageSize);
      const y = row * cellHeight + Math.random() * (cellHeight - imageSize);
      const rotation = (Math.random() * 40) - 20;

      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.transform = `rotate(${rotation}deg)`;
      img.style.animationDuration = `${2 + Math.random() * 2}s`;
      img.style.animationDelay = `${Math.random() * 2}s`;

      hitbox.appendChild(img);
    }

    setCrim();
  }

  function styleMessage(color) {
    hitbox.style.display = 'flex';
    hitbox.style.justifyContent = 'center';
    hitbox.style.alignItems = 'center';
    hitbox.style.fontSize = '2rem';
    hitbox.style.color = color;
  }

	function styleScaryWesternMessage() {
		hitbox.style.display = 'flex';
		hitbox.style.justifyContent = 'center';
		hitbox.style.alignItems = 'center';
		hitbox.style.fontSize = '2rem';
		hitbox.style.color = 'darkred';
		hitbox.style.fontFamily = '"Special Elite", monospace';
		hitbox.style.textShadow = '2px 2px 0 black, -2px -2px 0 black';
		hitbox.style.letterSpacing = '2px';
		hitbox.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
		hitbox.style.padding = '10px';
		hitbox.style.border = '2px double darkred';
		hitbox.style.borderRadius = '8px';
	}


  window.timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(window.timerInterval);
      hitbox.innerHTML = 'Time is up! Game over!';
      styleScaryWesternMessage();


      // Show restart button
      restartBtn.style.display = 'inline-block';
    }
  }, 1000);

  setTarget();
}
