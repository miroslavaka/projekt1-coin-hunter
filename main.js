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
let panacekSirka = 64;
let panacekVyska = 70;
let minceSirka = 36;
let minceVyska = 36;


function loadPage() {
    let maxHeight = window.innerHeight;
    let maxWidth = window.innerWidth;
    panacek.style.top = maxHeight / 2 + 'px';
    panacek.style.left = maxWidth / 2 + 'px';
    obrazok.src = 'obrazky/panacek.png';
}


//nacitanie z klavesnice
function getKeyAndMove(event) {
    let keycode = event.keyCode;
    //console.log(keycode);
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

let width1 = window.innerWidth - panacekSirka;
let height1 = window.innerHeight - panacekVyska;

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
    panacek.style.left = panacekleft + 5 + 'px';
    obrazok.src = 'obrazky/panacek-vpravo.png';
    if (panacekleft > width1) {
        panacek.style.left = width1 + 'px';
    }

    //if (panacekleft < width1) {
    //panacek.style.left = panacekleft + 5 + 'px';
    //}
}

function moveDown() {
    let panacektop = parseInt(panacek.style.top);
    panacek.style.top = panacektop + 5 + 'px';
    if (panacektop > height1) {
        panacek.style.top = height1 + 'px';
    }

    //if (panacektop < height1) {
    //    panacek.style.top = panacektop + 5 + 'px';
    //}
}

//nahodna pozicia mince
function getRandomPosition() {
    let width2 = window.innerHeight - minceSirka;
    let height2 = window.innerWidth - minceVyska;
    let randWidth = Math.floor(Math.random() * width2);
    let randHeight = Math.floor(Math.random() * height2);

    mince.style.top = randWidth + 'px';
    mince.style.left = randHeight + 'px';

}
getRandomPosition();

//kolizia
let s = 0;

function checkCollision() {
    //let panacekX = panacek.getBoundingClientRect().left;
    //let panacekY = panacek.getBoundingClientRect().top;
    let panacekX = panacek.offsetLeft;
    console.log(panacekX);
    let panacekY = panacek.offsetTop;

    //let minceX = mince.getBoundingClientRect().left;
    //let minceY = mince.getBoundingClientRect().top;
    let minceX = mince.offsetLeft;
    let minceY = mince.offsetTop;

    if (!(panacekX + panacekSirka < minceX ||
            minceX + minceSirka < panacekX ||
            panacekY + panacekVyska < minceY ||
            minceY + minceVyska < panacekY)) {
        //alert('collision');
        zvukmince.play();
        s = s + 1;
        skore.innerHTML = s;

        if (s >= 5) {
            fanfara.play();
            s = 0;
            skore.innerHTML = s;
            window.onload = loadPage();
        }
        getRandomPosition();
    }
}