// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

// current screen
let current_screen = 0;

// camera
let player_camera;

// player & enemies
let player;
let player_laser = [];
let enemy = [];
let enemy_laser = [];

// shop
let main_shop;

let blast_interval;

function setup()
{
    createCanvas( 1200, 900 );
    imageMode( CENTER );

    // buttons
    start_button = new button( width / 2, height / 2 + 100, 300, 60 );
    play_button = new button( width / 2, height / 11, 300, 60 );
    options_button = new button( width / 2, height / 2 + 200, 300, 60 );
    credits_button = new button( width / 2, height / 2 + 300, 300, 60 );
    main_button = new button( width / 13, height / 12, 50, 50 );

    levelup_button1 = new button( width / 5, height / 2, 250, 450 );
    levelup_button2 = new button( width / 2, height / 2, 250, 450 );
    levelup_button3 = new button( width * 4 / 5, height / 2, 250, 450 );


    // camera
    player_camera = new Camera();

    // player
    player = new spaceship( 0, 0, 30 );

    // enemy
    enemy.push( new spaceship( 100, height / 2, 30, 50 ) );
    enemy.push( new spaceship( 400, height / 2 - 300, 30, 50 ) );

    main_shop = new shop( -500, -500 );
}

function draw()
{
    background( 20 );

    switch ( current_screen )
    {
        // main menu
    case main_menu:

        // Game title : Outlaw of the Galaxy
        push();
        textSize( 100 );
        textAlign( LEFT, TOP );
        noStroke();
        fill( 255 );
        //text('Outlaw\nOf the Galaxy',70,70);
        pop();

        // draw buttons
        start_button.draw( "START" );
        options_button.draw( "OPTIONS" );
        credits_button.draw( "CREDITS" );

        // change screens when button clicked
        if ( start_button.clicked() )
        {
            current_screen = help_screen;
        }
        else if ( options_button.clicked() )
        {
            current_screen = options_screen;
        }
        else if ( credits_button.clicked() )
        {
            current_screen = credits_screen;
        }

        break;

        // help screen
    case help_screen:

        // game play button
        play_button.draw( "Let\'s go!" );
        if ( play_button.clicked() )
        {
            current_screen = game_screen;
        }

        break;

        // options screen
    case options_screen:

        break;

        // credits screen
    case credits_screen:

        break;

        // game screen
    case game_screen:

        player_camera.x = player.position.x - width / 2;
        player_camera.y = player.position.y - height / 2;

        // update camera
        player_camera.beginDraw();

        // update shop
        main_shop.draw();

        // update enemies
        for ( let i = 0; i < enemy.length; i++ )
        {
            if ( enemy[ i ].hp > 0 )
            {
                enemy[ i ].team = 1;
                enemy[ i ].speed_max = 0;
                enemy[ i ].update();
                enemy[ i ].draw();
                if ( enemy[ i ].hp < enemy[ i ].max_hp )
                    enemy[ i ].draw_hp();
            }
            else if ( enemy[ i ].hp <= 0 )
            {
                enemy[ i ].explode();
                for ( let k = enemy.length - 1; k >= 0; --k )
                {
                    enemy.splice( k, -1 );
                }
            }
        }

        // update player lasers
        for ( let lasers of player_laser )
        {
            lasers.update();

            // enemy hit by laser
            for ( let i = 0; i < enemy.length; i++ )
            {
                if ( enemy[ i ].hp > 0 )
                    enemy[ i ].hitByLaser( lasers );
            }
        }

        // update enemy lasers
        for ( let lasers of enemy_laser )
        {
            lasers.update();

            // player hit by laser
            if ( player.hp > 0 )
                player.hitByLaser( lasers );
        }

        // if player laser collide with object, delete laser
        for ( let i = player_laser.length - 1; i >= 0; --i )
        {
            if ( player_laser[ i ].collide == true )
                player_laser.splice( i, 1 );
        }

        // if enemy laser collide with object, delete laser
        for ( let i = enemy_laser.length - 1; i >= 0; --i )
        {
            if ( enemy_laser[ i ].collide == true )
                enemy_laser.splice( i, 1 );
        }

        // draw player
        player.draw();

        // stop camera
        player_camera.stopDraw();

        // update player
        player.update();
        player.draw_interface();

        enter_shop();

        break;

        // level up screen
    case levelUp_screen:
        levelup_button1.draw();
        levelup_button2.draw();
        levelup_button3.draw();

        break;

        // shop screen
    case shop_screen:

        break;
    }


    // if current screen is not main menu and game screen, make main button
    if ( current_screen != main_menu && current_screen != game_screen )
    {
        main_button.draw( '◁' );
        if ( main_button.clicked() )
        {
            current_screen = main_menu;
        }
    }
}

function player_blastLaser()
{
    player_laser.push( new laser( player, player.fireDmg ) );
}

function enemy_blastLaser()
{
    for ( let i = 0; i < enemy.length; i++ )
    {
        if ( enemy[ i ].hp > 0 )
        {
            enemy_laser.push( new laser( enemy[ i ], enemy[ i ].fireDmg ) );
        }
    }
}

// press space bar = shooting laser 
function keyPressed()
{
    let fireRate = 1000 / player.fireRate;
    if ( keyCode == 32 )
    {
        setTimeout( player_blastLaser, 0 );
        blast_interval = setInterval( player_blastLaser, fireRate );

        setTimeout( enemy_blastLaser, 0 );
    }
}

// release space bar = stop shooting laser
function keyReleased()
{
    if ( keyCode == 32 )
    {
        clearInterval( blast_interval );
    }

    if ( keyCode == 87 )
    {
        player.backward();
    }
}

function enter_shop()
{
    if ( player.position.x > main_shop.x && player.position.x < main_shop.x + main_shop.width &&
        player.position.y > main_shop.y && player.position.y < main_shop.y + main_shop.height )
    {
        current_screen = shop_screen;
    }
}
