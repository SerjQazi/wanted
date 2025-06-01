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
    const crim = document.querySelector('.crim');
    hitbox.innerHTML = '';
    crim.innerHTML = '';

    const areaWidth = hitbox.offsetWidth;
    const areaHeight = hitbox.offsetHeight;

    const randomCrim = Math.floor(Math.random() * imgBoard.length);

    // function to set the crim image

        function setCrim() {
            const img = document.createElement('img');
            img.src = imgBoard[randomCrim];
            console.log(imgBoard[randomCrim]);
            img.className = 'crim-image';
            crim.appendChild(img);
        }

    // for loop to populate the hitbox with images
    const imageSize = 30;
    let crimAdded = false;
    const crimSlot = Math.floor(Math.random() * 100); // one slot for the criminal

    for (let i = 0; i < 100; i++) {
        const randomIndex = Math.floor(Math.random() * imgSelect.length);
        const img = document.createElement('img');
        img.src = imgSelect[randomIndex];
        img.className = 'target-image';


        // assign a random slot for the crim
        if (i === crimSlot) {
            img.src = imgSelect[randomCrim];
            img.style.zIndex = 200;
            crimAdded = true;
        } else {
            // if not the crim slot, assign a random image
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * imgSelect.length);
            } while (randomIndex === randomCrim); // make sure it's NOT the criminal
            img.src = imgSelect[randomIndex];
        }

        // check to see if the randomIndex === randomCrim

        // {problem! --> the target image is always on the top row.}

        // if (randomIndex === randomCrim) {
        // // If the criminal image is already added, skip this iteration
        //     if (crimAdded) {
        //     continue; // Skip this image if we've already added the criminal
        //     } else {
        //         img.style.zIndex = 200;
        //         crimAdded = true;
        //     }
        // }

        // Random position (with mild spacing)
        // const x = Math.random() * (areaWidth - imageSize);
        // const y = Math.random() * (areaHeight - imageSize);


        // advanced Scatter using grid with randomness
        const gridSize = 10;
        const cellWidth = areaWidth / gridSize;
        const cellHeight = areaHeight / gridSize;

        const row = Math.floor(i / gridSize);
        const col = i % gridSize;

        const x = col * cellWidth + Math.random() * (cellWidth - imageSize);
        const y = row * cellHeight + Math.random() * (cellHeight - imageSize);


        // random rotation for a messy look
        const rotation = (Math.random() * 40) - 20; // -20° to 20°

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transform = `rotate(${rotation}deg)`;

        hitbox.appendChild(img);
    }
    
    // set the crim image after the loop has completed
    setCrim();
}

   