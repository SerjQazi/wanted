function startGame () {

    // an array of image paths to list the images from
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

    const hitbox = document.querySelector('.hitbox');
    hitbox.innerHTML = '';

    const areaWidth = hitbox.offsetWidth;
    const areaHeight = hitbox.offsetHeight;

    // console.log('Hitbox dimensions:', areaWidth, areaHeight);

    const imageSize = 30;

    for (let i = 0; i < 100; i++) {
        const img = document.createElement('img');
        const randomIndex = Math.floor(Math.random() * imgSelect.length);
        img.src = imgSelect[randomIndex];
        img.className = 'target-image';

        // Random position (with mild spacing)
        const x = Math.random() * (areaWidth - imageSize);
        const y = Math.random() * (areaHeight - imageSize);

        // Mild random rotation for a messy look
        const rotation = (Math.random() * 40) - 20; // -20° to 20°

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        // img.style.border = '1px solid transparent';
        img.style.transform = `rotate(${rotation}deg)`;

        hitbox.appendChild(img);
    }

    function setCrim() {
        const crim = document.querySelector('.crim');
        crim.innerHTML = '';

        const randomCrim = Math.floor(Math.random() * imgBoard.length);
        
        const img = document.createElement('img');
        img.src = imgBoard[randomCrim];
        console.log(imgBoard[randomCrim]);
        img.className = 'crim-image';
        crim.appendChild(img);
    }

    setCrim();
}

   