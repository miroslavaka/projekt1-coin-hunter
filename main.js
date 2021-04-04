// toto budeš potřebovat později
/*
if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
    // panacek a mince se prekryvaji
}
*/

// sem začni psát svůj program
let panacek = document.querySelector('#panacek');
let mince = document.querySelector('#mince');
let obrazok = document.querySelector('img');
let skore = document.querySelector('#score');
let hudba = document.querySelector('#hudba');
let zvukmince = document.querySelector('#zvukmince');
let fanfara = document.querySelector('#zvukfanfara');
const panacekSirka = 64;
const panacekVyska = 70;
const minceSirka = 36;
const minceVyska = 36;
let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;
let panacekX, panacekY, minceX, minceY;

function loadPage() {
    panacek.style.left = maxWidth / 2 + 'px';
    panacek.style.top = maxHeight / 2 + 'px';
    obrazok.src = 'obrazky/panacek.png';
}

//nacitanie z klavesnice
function getKeyAndMove(event) {
    let keycode = event.keyCode;
    if (keycode == 37) {
        moveLeft();
    } else if (keycode == 38) {
        moveUp();
    } else if (keycode == 39) {
        moveRight();
    } else {
        moveDown();
    }
    checkCollision();
}

//pohyb hore, dole, doprava, dolava
function moveLeft() {
    let panacekleft = parseInt(panacek.style.left);
    obrazok.src = 'obrazky/panacek-vlevo.png';
    if (panacekleft > 0) {
        panacek.style.left = panacekleft - 5 + 'px';
    }
}

function moveUp() {
    let panacektop = parseInt(panacek.style.top);
    obrazok.src = 'obrazky/panacek-nahoru.png';
    if (panacektop > 0) {
        panacek.style.top = panacektop - 5 + 'px';
    }
}

function moveRight() {
    let panacekleft = parseInt(panacek.style.left);
    obrazok.src = 'obrazky/panacek-vpravo.png';
    if (panacekleft < maxWidth - panacekSirka - 5) {
        panacek.style.left = panacekleft + 5 + 'px';
    }
}

function moveDown() {
    let panacektop = parseInt(panacek.style.top);
    if (panacektop < maxHeight - panacekVyska - 5) {
        panacek.style.top = panacektop + 5 + 'px';
    }
}

//nahodna pozicia mince
function getRandomPosition() {
    let width = window.innerHeight - minceSirka;
    let height = window.innerWidth - minceVyska;
    let randWidth = Math.floor(Math.random() * width);
    let randHeight = Math.floor(Math.random() * height);
    mince.style.top = randWidth + 'px';
    mince.style.left = randHeight + 'px';
}
getRandomPosition();

//kolizia
let s = 0;

function checkCollision() {
    panacekX = panacek.offsetLeft;
    panacekY = panacek.offsetTop;
    minceX = mince.offsetLeft;
    minceY = mince.offsetTop;

    if (!(panacekX + panacekSirka < minceX ||
            minceX + minceSirka < panacekX ||
            panacekY + panacekVyska < minceY ||
            minceY + minceVyska < panacekY)) {
        zvukmince.play();
        s = s + 1;
        skore.innerHTML = s;

        if (s >= 5) {
            fanfara.play();
            s = 0;
            skore.innerHTML = s;
            alert('Vyhrávaš!');
            window.onload = loadPage();
        }
        getRandomPosition();
    }
}