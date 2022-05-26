var pos = 0;

var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    }
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}

    let velocity = setToRandom(10);
    let position = setToRandom(200);
    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = './images/PacMan1.png';
    newimg.pic_style = 0;
    newimg.width = 100;
    newimg.style.left = position.x;
    newimg.style.top = position.y;

    // add new Child image to game
    game.appendChild(newimg);
    // return details in an object
    return {
        position,
        velocity,
        newimg
    }
}

function update() {

    //loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        checkCollisions(item)
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    })
    setTimeout(update, 50);
}

function checkCollisions(item) {

    // check if PacMan is at the edge of the screen
    if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) {
        item.velocity.x = -item.velocity.x;
    }
    // check if PacMan is at the Top or bottom of the screen
    if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) {
        item.velocity.y = -item.velocity.y;
    }

    // check if PacMan is at the edge of the screen and picture is facing left also slowing mouth open/shut down to every 10 frames for visual effect
    if (item.velocity.x > 0) {
        if (item.newimg.pic_style <= 10) {
            item.newimg.src = './images/PacMan1.png';
            item.newimg.pic_style++;
        } else if (item.newimg.pic_style > 10 && item.newimg.pic_style <= 20) {
            item.newimg.src = './images/PacMan2.png';
            item.newimg.pic_style++;
        } else {
            item.newimg.src = './images/PacMan1.png';
            item.newimg.pic_style = 0;
        }
    } else {
        if (item.newimg.pic_style <= 10) {
            item.newimg.src = './images/PacMan3.png';
            item.newimg.pic_style++;
        } else if (item.newimg.pic_style > 10 && item.newimg.pic_style <= 20) {
            item.newimg.src = './images/PacMan4.png';
            item.newimg.pic_style++;
        } else {
            item.newimg.src = './images/PacMan3.png';
            item.newimg.pic_style = 0;
        }
    }
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}