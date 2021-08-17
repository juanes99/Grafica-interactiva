
var game = new Phaser.Game(1200, 800, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render  });

function preload() {

//Archivos cargados para utilizarlos en el mapa
    game.load.image('fondo', 'Imagenes/Mapcom.png');
    game.load.image('ubi','Imagenes/ubi.png');
    game.load.image('atras','Imagenes/atras.png');
    game.load.spritesheet('sprite', 'Imagenes/knigth.png', 80, 80);
    game.load.audio('music','audios/Menu.mp3');

}


//Variables usadas
var cursors;
var fondo;
var sprite;
var walk;
var sword;
var stopButton;
var atackButton;
var music;


function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
   fondo = game.add.tileSprite(0, 0,3400, 2300, 'fondo');
          game.world.setBounds(0, 0, 3400, 2300);



//Agrega y reproduce la música
  music =  game.add.audio('music');
  music.play('', 0, 1, true);

//Agregar el sprite y sus animaciones
  sprite= game.add.sprite(game.world.centerX, game.world.centerY, 'sprite');
   walk = sprite.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8 ]);
   sword = sprite.animations.add('sword', [49, 50, 51, 52, 53, 54, 55, 56, 57 ]);

//Crear los botones con los hipervinculos
   makeButton('https://hollowknight.fandom.com/wiki/Dirtmouth', 1470, 431);
   makeButton('https://hollowknight.fandom.com/wiki/Howling_Cliffs', 957, 236);
   makeButton('https://hollowknight.fandom.com/wiki/Greenpath', 1056, 695);
   makeButton('https://hollowknight.fandom.com/wiki/City_of_Tears', 1750, 1005);
   makeButton('https://hollowknight.fandom.com/wiki/Forgotten_Crossroads', 1759, 870);
   makeButton('https://hollowknight.fandom.com/wiki/Crystal_Peak',1964, 456);
   makeButton('https://hollowknight.fandom.com/wiki/Resting_Grounds', 2528, 721);
   makeButton('https://hollowknight.fandom.com/wiki/Kingdom%27s_Edge', 3087, 1245);
   makeButton('https://hollowknight.fandom.com/wiki/Hive', 2892, 1764);
   makeButton('https://hollowknight.fandom.com/wiki/Royal_Waterways', 1854, 1534);
   makeButton('https://hollowknight.fandom.com/wiki/Ancient_Basin', 1904, 1664);
   makeButton('https://hollowknight.fandom.com/wiki/Deepnest', 886, 1359);
   makeButton('https://hollowknight.fandom.com/wiki/Queen%27s_Gardens', 706, 1255);
   makeButton('https://hollowknight.fandom.com/wiki/Fog_Canyon', 906, 1015);
   makeButton('https://hollowknight.fandom.com/wiki/Fungal_Wastes', 1490, 1230);

//Libreria de fisicas
       game.physics.startSystem(Phaser.Physics.P2JS);
       game.physics.p2.enable(sprite);
       sprite.body.fixedRotation = true;

//Se agregan los botones del teclado para mover el sprite
       cursors = game.input.keyboard.createCursorKeys();
       atackButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
       stopButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

//La camara sigue el sprite creado
       game.camera.follow(sprite)
       game.camera.follow(sprite, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

}
function update() {

    sprite.body.setZeroVelocity();//velocidad inicial del sprite

    if (cursors.up.isDown)//Flecha hacia arriba
    {
        sprite.animations.play('walk', 15, true);
        sprite.body.moveUp(300)
    }
    else if (cursors.down.isDown)//Flecha hacia abajo
    {
        sprite.animations.play('walk', 15, true);
        sprite.body.moveDown(300);
    }

    if (cursors.left.isDown)//Flecha hacia la izquierda
    {
        sprite.animations.play('walk', 15, true);
        sprite.scale.x = -1;
        sprite.body.velocity.x = -300;
    }
    else if (cursors.right.isDown)//Flecha hacia la derecha
    {
        sprite.animations.play('walk', 15, true);
        sprite.scale.x = 1;
        sprite.body.moveRight(300);
    }

    if (atackButton.isDown)//Tecla para animacion de espada
        {
         sprite.animations.play('sword', 12, true);
        }

    if (stopButton.isDown)//Tecla para detener animacion
        {
          sprite.animations.stop('walk', 12, true);
          sprite.animations.stop('sword', 12, true);
        }
}

function render() {

//Texto colocado en la esquina superior izquierda con las instrucciones de uso

      game.debug.text("Arrows to move.", 32, 32);
      game.debug.text("Space to sword animation.", 32, 44);
      game.debug.text("Enter to stop animation.", 32, 56);
      game.debug.text("Click on the zones names to go to it's wiki.", 32, 68);
      game.debug.spriteCoords(sprite, 32, 500);

}

function makeButton(name, x, y) {//Función para crear los botones

    var button = game.add.button(x, y, 'ubi', click, this);
    button.name = name;
    button.anchor.setTo(0.5); // centra las coordenadas del objeto
    button.scale.setTo(0.7); // cambia el tamaño del botón
    button.alpha = 0.4; // cambia la transparencia del botón
}


function click(button) {//Funcion para ir a las otras paginas

  window.open(button.name, "_blank");

}
