var torreImg, torre;
var portaImg, porta, grupoPorta;
var gradeImg, grade, grupoGrade;
var player, player_parado, player_pulando;
var grupoBlocoInvisivel, blocoInvisivel;
var estadoJogo = "jogar";
var somAssustador;
var playerparado;

function preload() {
    //carregar as imagens da torre, da grade e da porta
    torreImg = loadImage("torre.png");
    portaImg = loadImage("porta.png");
    gradeImg = loadImage("grade.png");

    //carregando as animações do fantasma
    player_parado = loadAnimation("fantasma parado.png");
    player_pulando = loadAnimation("fantasma pulando.png");

    //carregar som
    somAssustador = loadSound("uuu.wav");


    //criar os grupos das grades e das portas
    
    grupoGrade = new Group()
    grupoBlocoInvisivel = new Group()
    grupoPorta = new Group()

}

function setup() {
    createCanvas(600, 600);
    //criando a torre
    torre = createSprite(300, 300);
    torre.addImage("torre", torreImg);
    torre.velocityY = 1;

    //tocar o som em loop
    somAssustador.loop()
    //criando o player
    player = createSprite(200, 200, 50, 50);
    player.addAnimation("player parado", player_parado);
    player.addAnimation("player pulando", player_pulando)
    player.scale = 0.3;

    edges = createEdgeSprites();
}

function draw() {
    background(200);

    if (estadoJogo === "jogar") {
        player.changeAnimation("player parado");

        //código para controlar o jogador para cima
        if (keyDown("space") || touches.length>0) {
            player.velocityY = -10;
            player.changeAnimation("player pulando");
            touches = [];
        }

        //código para controlar o jogador para Esquerda
        if (keyDown("left")) {
            player.x -= 3;
            player.changeAnimation("player pulando");
        }

        //código para controlar o jogador para direita
        if (keyDown("right")) {
            player.x += 3;
            player.changeAnimation("player pulando");
        }

        //gravidade
        player.velocityY += 0.8;

        //Código para reiniciar a torre
        if (torre.y > height) {
            torre.y = height / 2;
        }

        //código para descansar na torre

       player.collide(grupoGrade)

        gerarPortas();
        drawSprites();

        //código para finalizar o jogo
        if (player.isTouching(grupoBlocoInvisivel) || player.y > height) {
            estadoJogo = "fim";
        }
    }
    if (estadoJogo === "fim") {
        background(0)
        fill("yellow")
        textSize(70)
        text("VOCÊ PERDEU", 30, 200);
    }

}


function gerarPortas() {

    if (frameCount % 240 === 0) {

        porta = createSprite(200, -50);
        porta.x = Math.round(random(120, 400))

        grade = createSprite(porta.x, 10);

        blocoInvisivel = createSprite(porta.x, 25, grade.width, 2);

        //fazer o bloco invisivel ser invisivel
        blocoInvisivel.visible = false;

        //código para adicionar as imagens nas sprites
        porta.addImage(portaImg);
        grade.addImage(gradeImg);

        blocoInvisivel.velocityY = 1;

        grade.velocityY = 1;
        porta.velocityY = 1;

        //tempo de vida das sprites
        blocoInvisivel.lifetime = 800;
        player.depth = porta.depth + 1;

        //adicionar nos grupos as sprites
        grupoBlocoInvisivel.add(blocoInvisivel);
        grupoGrade.add(grade);
        grupoPorta.add(porta);


    }


}
