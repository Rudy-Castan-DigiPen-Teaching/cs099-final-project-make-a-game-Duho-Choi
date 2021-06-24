// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

// current screen
let current_screen = 2;

// camera
let player_camera;

// player & enemies
let player;
let player_laser = [];
let player_upgrade = [];
let enemy = [];
let enemy_laser = [];
const max_enemy = 7;

// shop
let main_base;

let blast_interval;

function setup()
{
    createCanvas( 1200, 900 );
    imageMode( CENTER );

    // buttons
    start_button = new button( width * 4 / 5, height / 2 + 150, 300, 60 );
    play_button = new button( width / 2, height / 11, 300, 60 );
    options_button = new button( width * 4 / 5, height / 2 + 250, 300, 60 );
    credits_button = new button( width * 4 / 5, height / 2 + 350, 300, 60 );

    return_main_button = new button( width / 13, height / 12, 50, 50 );
    return_game_button = new button( width / 13, height / 12, 50, 50 );

    levelup_button1 = new button( width / 5, height / 2 + 30, 300, 600 );
    levelup_button2 = new button( width / 2, height / 2 + 30, 300, 600 );
    levelup_button3 = new button( width * 4 / 5, height / 2 + 30, 300, 600 );

    for ( let i = 0; i < 6; i++ )
    {
        shop_button.push( new button( width / 3 + 60, height / 2 - 185 + 110 * i, 200, 70 ) );
    }

    // camera
    player_camera = new Camera();

    // player
    player = new spaceship( 0, 0, 30, 1, 0 );
    player.fireDmg = 30;

    // base
    main_base = new base( -500, -500 );

    // spawn enemies
    setTimeout( spawn_enemy, 5000 );
}

function draw()
{
    background( 20 );

    switch ( current_screen )
    {
        // main menu
    case main_menu:

        // background image
        push();
        imageMode( CENTER );
        image( background_img, width / 2, height / 2, width, height );
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

        // background image
        push();
        imageMode( CENTER );
        image( background_img, width / 2, height / 2, width, height );
        pop();

        // text box
        push();
        rectMode( CENTER );
        imageMode( CENTER );
        noStroke();
        fill( 0, 200 );
        rect( width / 2, height / 2 + 40, width * 9 / 10, height * 4 / 5, 50 );

        // text
        fill( 255 );
        textAlign( LEFT, TOP );
        textSize( 19 );
        image( player_spaceship_img, width / 8.5, height / 4, 110, 110 );
        text( "◁ This is your spaceship. You are now running \nout from cruel space empire. You have to\nsurvive from empire's spacecrafts' chase!",
            width / 5.8, height / 5 );
        image( keyboard_img, width * 1.85 / 3, height / 4, 220 );
        text( "You can control your spaceship with keyboard", width * 2.35 / 4, height / 5 );
        text( "W,A,D and SpaceKey.\nThrust with W,\nTurn left / right with A / D,\nand shoot laser with Space key.",
            width * 2.85 / 4, height / 4.3 );
        push();
        translate( width / 2.2, height / 2.7 );
        rotate( PI );
        image( enemy_spaceship_img, 0, 0, 110, 110 );
        pop();
        text( "▷ That's enemy spaceship. It will keep\nfollowing you and blasting lasers. You have\nto shoot and kill them with your laser!",
            width / 15, height / 3 );
        text( "This is your base. You can get to your base\nand upgrade your ship's ability whenever you want.\nYou need to pay coins when upgrading your ship",
            width / 2, height / 2 );
        pop();

        // game play button
        play_button.draw( "Let\'s go!" );
        if ( play_button.clicked() )
        {
            current_screen = game_screen;
        }

        break;

        // options screen
    case options_screen:

        // background image
        push();
        imageMode( CENTER );
        image( background_img, width / 2, height / 2, width, height );
        pop();

        // text box
        push();
        rectMode( CENTER );
        noStroke();
        fill( 0, 200 );
        rect( width / 2, height / 2 + 30, width * 9 / 10, height * 4 / 5, 50 );
        pop();

        break;

        // credits screen
    case credits_screen:

        // background image
        push();
        imageMode( CENTER );
        image( background_img, width / 2, height / 2, width, height );

        // text box
        rectMode( CENTER );
        noStroke();
        fill( 0, 200 );
        rect( width / 2, height / 2 + 30, width * 9 / 10, height * 4 / 5, 50 );
        pop();

        push();

        break;

        // game screen
    case game_screen:

        player_camera.x = player.position.x - width / 2;
        player_camera.y = player.position.y - height / 2;

        // update camera
        player_camera.beginDraw();

        // background image
        push();
        imageMode( CENTER );
        image( game_background_img, 0, 0, 20000, 20000 );
        rectMode( CENTER );
        fill( 0, 130 );
        rect( 0, 0, 20000, 20000 );
        pop();

        // update shop
        main_base.draw();

        // update enemies
        for ( let i = 0; i < enemy.length; i++ )
        {
            if ( enemy[ i ].hp > 0 )
            {
                enemy[ i ].update();
                enemy[ i ].draw();
                enemy[ i ].speed_max = 3;
                if ( enemy[ i ].hp < enemy[ i ].max_hp )
                    enemy[ i ].draw_hp();
            }
            else if ( enemy[ i ].hp <= 0 )
            {
                enemy[ i ].reward( player );
                enemy.splice( i, 1 );
            }
        }

        // enemies heading to player
        head_to_player();

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
            const distance_from_player = sqrt( ( player_laser[ i ].position.x - player.position.x ) * ( player_laser[
                i ].position.x - player.position.x ) + ( player_laser[ i ].position.y - player.position.y ) * (
                player_laser[ i ].position.y - player.position.y ) );
            if ( player_laser[ i ].collide == true )
                player_laser.splice( i, 1 );

            // if player laser far from player, delete 
            else if ( distance_from_player > 3000 )
                player_laser.splice( i, 1 );

        }

        // if enemy laser collide with object, delete laser
        for ( let i = enemy_laser.length - 1; i >= 0; --i )
        {
            if ( enemy_laser[ i ].collide == true )
                enemy_laser.splice( i, 1 );

            // if player laser far from player, delete laser
            const distance_from_player = sqrt( ( enemy_laser[ i ].position.x - player.position.x ) * ( enemy_laser[
                i ].position.x - player.position.x ) + ( enemy_laser[ i ].position.y - player.position.y ) * (
                enemy_laser[ i ].position.y - player.position.y ) )
            if ( distance_from_player > 3000 )
                enemy_laser.splice( i, 1 );
        }

        // draw player
        player.draw();

        // stop camera
        player_camera.stopDraw();

        // update player & interface
        player.update();
        player.draw_interface();
        if ( player.position.x > main_base.x - main_base.width / 2 && player.position.x < main_base.x + main_base
            .width / 2 &&
            player.position.y > main_base.y - main_base.height / 2 && player.position.y < main_base.y + main_base
            .height / 2 && current_screen == game_screen )
            enter_shop();

        // upgrade player stat
        upgrade();

        // player level up
        if ( player.exp >= player.max_exp )
        {
            level_up();
        }

        break;

        // level up screen
    case level_up_screen:

        push();
        textAlign( CENTER, TOP );
        noStroke();
        fill( 255 );
        textSize( 70 );
        text( "Level Up!!", width / 2, height / 20 );
        pop();

        // choose upgrade buttons
        levelup_button1.type = 5;
        levelup_button2.type = 6;
        levelup_button3.type = 4;
        levelup_button1.draw();
        levelup_button2.draw();
        levelup_button3.draw();

        // decide upgrade
        if ( levelup_button1.clicked() )
        {
            player_upgrade[ player_upgrade.length ] = upgrade1;
            current_screen = game_screen;
        }
        else if ( levelup_button2.clicked() )
        {
            player_upgrade[ player_upgrade.length ] = upgrade2;
            current_screen = game_screen;
        }
        else if ( levelup_button3.clicked() )
        {
            player_upgrade[ player_upgrade.length ] = upgrade3;
            current_screen = game_screen;
        }

        break;

        // shop screen
    case shop_screen:

        main_base.draw_interface( player );

        break;
    }

    // if current screen is help screen, options screen or credits screen, 
    // draw return main menu button
    if ( current_screen >= help_screen )
    {
        return_main_button.draw( '◁' );
        if ( return_main_button.clicked() )
        {
            current_screen = main_menu;
        }
    }

    // if current screen is shop screen,
    // draw return game button
    else if ( current_screen > game_screen && current_screen != level_up_screen )
    {
        return_game_button.draw( '◁' );
        if ( return_game_button.clicked() )
        {
            current_screen = game_screen;
        }
    }

}

let fired = false;

function player_blastLaser()
{
    player_laser.push( new laser( player, player.fireDmg ) );
}

function enemy_blastLaser( i )
{
    enemy_laser.push( new laser( enemy[ i ], enemy[ i ].fireDmg ) );
}

// press space bar = shooting laser 
function keyPressed()
{
    let fireRate = 1000 / player.fireRate;

    if ( keyCode == 32 && current_screen == game_screen )
    {
        if ( fired == false )
        {
            setTimeout( player_blastLaser, 0 );
        }
        blast_interval = setInterval( player_blastLaser, fireRate );
    }
}

// release space bar = stop shooting laser
function keyReleased()
{
    if ( keyCode == 32 )
    {
        clearInterval( blast_interval );
    }

}

// entering shop
function enter_shop()
{
    current_screen = shop_screen;
    player.position.x = main_base.x + main_base.width * 2;
    player.position.y = main_base.y;
    player.velocity.setLength( 0 );
    player.velocity.setAngle( 0 );
    player.acceleration.setLength( 0 );
}

// upgrade player
function upgrade()
{
    player.max_hp = 50 + 150 * hp_level;
    player.fireDmg = 30 + 25 * dmg_level;
    player.fireRate = 4 + 0.6 * fire_rate_level;
    player.speed_max = 5 + 1 * spd_level;
    player.armor = 5 * armor_level;
}

// upgrade enemies
function enemy_upgrade()
{

}

// level up
function level_up()
{
    player.level += 1;
    player.exp = 0;
    player.max_exp += 30;
    player.acceleration.setLength( 0 );

    // set three upgrade options
    let levelup_1 = int( random( 1, upgrade_list.length - 0.01 ) );
    upgrade1 = upgrade_list[ levelup_1 ];
    levelup_button1.type = upgrade1;
    upgrade_list.splice( levelup_1, 1 );

    let levelup_2 = int( random( 1, upgrade_list.length - 0.01 ) );
    upgrade2 = upgrade_list[ levelup_2 ];
    levelup_button2.type = upgrade2;
    upgrade_list.splice( levelup_2, 1 );

    let levelup_3 = int( random( 1, upgrade_list.length - 0.01 ) );
    upgrade3 = upgrade_list[ levelup_3 ];
    levelup_button3.type = upgrade3;
    upgrade_list.splice( levelup_3, 1 );

    current_screen = level_up_screen;
}

// spawn enemy 1200 lengths away from player
function spawn_enemy()
{
    let position_x = random( player.position.x + 1200, player.position.y - 1200 );

    let y_random = random( 0, 10 );
    let y_pos;
    if ( y_random > 5 )
        y_pos = 1;
    else
        y_pos = -1;

    let position_y = y_pos * sqrt( 1200 * 1200 - position_x * position_x );

    if ( enemy.length < max_enemy )
        enemy.push( new spaceship( position_x, position_y, 30, 1 ) );

    // spawn enemy again
    setTimeout( spawn_enemy, 1000 );
}

// enemies heading to player
function head_to_player()
{
    for ( let i = 0; i < enemy.length; i++ )
    {
        let direction = atan2( player.position.y - enemy[ i ].position.y, player.position.x - enemy[ i ].position.x );
        enemy[ i ].velocity.setAngle( direction );

        // if enemy is too close to player, slow down
        let dist = sqrt( ( player.position.x - enemy[ i ].position.x ) * ( player.position.x - enemy[ i ].position.x ) +
            ( player.position.y - enemy[ i ].position.y ) * ( player.position.y - enemy[ i ].position.y ) );

        if ( dist > 350 )
            enemy[ i ].velocity.setLength( enemy[ i ].speed_max );
        else
            enemy[ i ].velocity.setLength( 0.3 );
    }
}
