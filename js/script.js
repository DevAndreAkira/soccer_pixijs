const app = new PIXI.Application({
    backgroundColor: 0x050512,
    backgroundAlpha: 1,
    opacity: .5,
    antialias: true,
    width: 850,
    height: 650
});
document.body.appendChild(app.view);

// ? SOUND
const opening = PIXI.sound.Sound.from('./sound/gol_sound.mp3');
opening.volume = 0.25;
const openingClickPlay = () => {
    opening.play();
}

const music = PIXI.sound.Sound.from('./sound/skank.mp3');
music.volume = 0.1;
const musicClickPlay = () => {
    music.play(({
        loop: true,
    }));
}

const kick = PIXI.sound.Sound.from('./sound/kick.mp3');
kick.volume = 1;
const kickClickPlay = () => {
    kick.play();
}

const lose = PIXI.sound.Sound.from('./sound/lose.ogg');
lose.volume = 0.25;
const loseClickPlay = () => {
    lose.play();
}

document.body.style.cursor = "none";

var background = PIXI.Sprite.from('./images/gol.jpg');
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

const startText = PIXI.Sprite.from('./images/titulo.png');
startText.anchor.set(0.5);
startText.x = app.screen.width / 2;
startText.y = app.screen.height / 2;
startText.interactive = true;
startText.buttonMode = true;
startText.scale.set(.5)
startText.on('pointerdown', onClick1);
app.stage.addChild(startText);

function onClick1() {
    app.stage.removeChild(startText);
    setTimeout(() => {
        startGame()
    }, 150);
}

function startGame() {
    musicClickPlay();

    const goleiroSprite = PIXI.Sprite.from('./images/goleiro.png');
    goleiroSprite.anchor.set(0.5);
    goleiroSprite.x = app.screen.width / 2;
    goleiroSprite.y = app.screen.height - 185;
    goleiroSprite.scale.set(.5);
    app.stage.addChild(goleiroSprite);

    let final = false;

    app.ticker.add((delta) => {
        if (final === true) {
            goleiroSprite.x -= 2 * delta;
            if (goleiroSprite.x < 290) {
                final = false;
            }
        }
        else if (final === false) {
            goleiroSprite.x += 2 * delta;
            if (goleiroSprite.x > 550) {
                final = true;
            }
        }
    });

    const protagonista = PIXI.Sprite.from('./images/target.png');
    protagonista.anchor.set(0.5);
    protagonista.width = 50;
    protagonista.height = 50;
    protagonista.x = app.screen.width / 2;
    protagonista.y = app.screen.height / 2;
    app.stage.addChild(protagonista);

    const life = PIXI.Sprite.from('./images/ball.png');
    life.anchor.set(0.5);
    life.width = 50;
    life.height = 50;
    life.x = app.screen.width / 2 - 50;
    life.y = 25;
    app.stage.addChild(life);

    const life2 = PIXI.Sprite.from('./images/ball.png');
    life2.anchor.set(0.5);
    life2.width = 50;
    life2.height = 50;
    life2.x = app.screen.width / 2;
    life2.y = 25;
    app.stage.addChild(life2);

    const life3 = PIXI.Sprite.from('./images/ball.png');
    life3.anchor.set(0.5);
    life3.width = 50;
    life3.height = 50;
    life3.x = app.screen.width / 2 + 50;
    life3.y = 25;
    app.stage.addChild(life3);

    let arrayLife = [life, life2, life3]
    let gols = 0;
    let contador = 3;

    const ball = PIXI.Sprite.from('./images/ball.png');
    ball.anchor.set(0.5);
    ball.width = 250;
    ball.height = 250;
    ball.x = app.screen.width / 2;
    ball.y = app.screen.height;
    app.stage.addChild(ball);

    // const chancesText = new PIXI.Text('Chances', {
    //     fill: '0x000000',
    //     stroke: '#fff',
    //     fontSize: 26,
    //     align: 'center'
    // });
    // chancesText.anchor.set(0.5);
    // chancesText.x = 75;
    // chancesText.y = 75;
    // app.stage.addChild(chancesText);

    const winText = PIXI.Sprite.from('./images/ganhou.png');
    winText.anchor.set(0.5);
    winText.x = app.screen.width / 2;
    winText.y = app.screen.height / 2;
    winText.interactive = true;
    winText.buttonMode = true;
    winText.scale.set(.5)
    winText.on('pointerdown', onClick);

    const loseText = PIXI.Sprite.from('./images/perdeu.png');
    loseText.anchor.set(0.5);
    loseText.x = app.screen.width / 2;
    loseText.y = app.screen.height / 2;
    loseText.interactive = true;
    loseText.buttonMode = true;
    loseText.scale.set(.5)
    loseText.on('pointerdown', onClick);
    function onClick() {
        window.location.reload();
    }

    app.stage.interactive = true;
    app.stage.on("pointermove", movePlayer);

    function movePlayer(e) {
        let pos = e.data.global;
        protagonista.x = pos.x;
        protagonista.y = pos.y;
    }

    // onclick = function () {

    onpointerdown = (event) => {
        if (gols < 3) {
            if (contador > 0) {
                kickClickPlay();
                console.log('x: ' + protagonista.x + ' ' + 'y: ' + protagonista.y);
                console.log('x: ' + goleiroSprite.x + ' ' + 'y: ' + goleiroSprite.y);
                if (protagonista.x >= 258.5 && protagonista.x <= 596.5 && protagonista.y >= 361.5 && protagonista.y <= 528.5) {
                    if (protagonista.x <= goleiroSprite.x + 101 && protagonista.x >= goleiroSprite.x - 101 &&
                        protagonista.y <= goleiroSprite.y + 151 && protagonista.y >= goleiroSprite.y - 151) {
                        console.log("%cGoleiro", 'background: red;')
                        contador = contador - 1;
                        app.stage.removeChild(arrayLife[contador]);
                        if (contador <= 0) {
                            console.log("Perdeu");
                            loseClickPlay();
                            app.stage.removeChild(ball);
                            app.stage.addChild(loseText);
                        }
                    }
                    else {
                        console.log("Gol!!!");
                        openingClickPlay();
                        gols = gols + 1;
                        if (gols >= 3) {
                            console.log("Ganhou");
                            app.stage.removeChild(ball);
                            app.stage.addChild(winText);
                        }
                    }
                }
                else {
                    contador = contador - 1;
                    app.stage.removeChild(arrayLife[contador]);
                    if (contador <= 0) {
                        console.log("Perdeu");
                        loseClickPlay();
                        app.stage.removeChild(ball);
                        app.stage.addChild(loseText);
                    }
                }

                const myInterval = setInterval(myTimer, 5);

                function myTimer() {
                    ball.x = protagonista.x;
                    ball.y = protagonista.y;
                    ball.width = ball.width - 5;
                    ball.height = ball.height - 5;
                    if (ball.width <= 30) {
                        myStopFunction();
                    }
                }

                function myStopFunction() {
                    clearInterval(myInterval);
                    ball.anchor.set(0.5);
                    ball.width = 250;
                    ball.height = 250;
                    ball.x = app.screen.width / 2;
                    ball.y = app.screen.height;
                }
            }
        }
    }
}