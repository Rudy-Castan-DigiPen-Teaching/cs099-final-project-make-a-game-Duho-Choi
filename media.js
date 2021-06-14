// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

// images
let player_spaceship_img;
let enemy_spaceship_img;
let shop_img;
let coin_img;

// sounds
let bgm;

function preload()
{
    // images
    player_spaceship_img = loadImage( 'assets/spaceship_player.png' );
    enemy_spaceship_img = loadImage( 'assets/spaceship_enemy.png' );
    shop_img = loadImage( 'assets/shopStation.png' );
    coin_img = loadImage( 'assets/coin.png' );

    // sound
    soundFormats('mp3', 'ogg');
    bgm = loadSound( 'assets/bgm.mp3' );
}
