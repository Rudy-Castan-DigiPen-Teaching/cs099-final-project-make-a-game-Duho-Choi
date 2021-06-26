// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

// images
let keyboard_img;
let player_spaceship_img;
let enemy_spaceship_img;
let boost_img;
let enemy_boost_img;
let base_img;
let coin_img;
let upgrade_img = [];
let background_img;
let game_background_img;

// sounds
let bgm;
let laser_sound;
let levelup_sound;

function preload()
{
    // images
    keyboard_img = loadImage( 'assets/keyboard_keys.png' );
    player_spaceship_img = loadImage( 'assets/spaceship_player.png' );
    enemy_spaceship_img = loadImage( 'assets/spaceship_enemy.png' );
    base_img = loadImage( 'assets/station.png' );
    coin_img = loadImage( 'assets/coin.png' );
    boost_img = loadImage( 'assets/boost_flame.png' );
    enemy_boost_img = loadImage( 'assets/enemy_boost_flame.png' );
    upgrade_img[ 0 ] = loadImage( 'assets/DoubleShot.png' );
    upgrade_img[ 1 ] = loadImage( 'assets/Barrier.png' );
    upgrade_img[ 2 ] = loadImage( 'assets/playerMissile.png' );
    upgrade_img[ 4 ] = loadImage( 'assets/Critical.png' );
    upgrade_img[ 5 ] = loadImage( 'assets/HeavyArmor.png' );
    upgrade_img[ 6 ] = loadImage( 'assets/HPup.png' );
    upgrade_img[ 7 ] = loadImage( 'assets/guard.png' );

    background_img = loadImage( 'assets/Background-0.jpg' );
    game_background_img = loadImage( 'assets/Background-2.jpg' );

    // sound
    bgm = loadSound( 'assets/bgm.mp3' );
    laser_sound = loadSound( 'assets/laser4.wav' );
}
