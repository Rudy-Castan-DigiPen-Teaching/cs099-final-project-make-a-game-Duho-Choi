// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

// current screen
let current_screen = 0;

// camera
let player_camera;

// mouse
let mouseWasPressed = false;

// player & enemies
let player;
let player_laser = [];
let player_guard;
let enemy = [];
let enemy_laser = [];
let enemy_level = 1;
let max_enemy = 3;

// shop
let main_base;

let blast_interval;
let missile_interval;

let bgm_playing = false;

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

    levelup_button1 = new button( width / 3, height / 2 + 30, 300, 600 );
    levelup_button2 = new button( width * 2 / 3, height / 2 + 30, 300, 600 );

    for ( let i = 0; i < 5; i++ )
    {
        shop_button.push( new button( width / 3 + 60, height / 2 - 185 + 110 * i, 200, 70 ) );
    }
    shop_button.push( new button( width / 2, height * 9 / 10, 400, 60 ) );

    // camera
    player_camera = new Camera();

    // player
    player = new spaceship( -400, -300, 30, 1, 0 );
    player.hp = 100;

    player_guard = new guard( player );

    // base
    main_base = new base( 0, 0 );

    bgm.setVolume( 0.1 );
    laser_sound.setVolume( 0.1 );
    missile_sound.setVolume( 0.1 );
}

function draw()
{
    background( 20 );
    // keep playing bgm
    if ( bgm_playing == false )
    {
        //bgm.play();
        bgm_playing = true;
        setInterval( function ()
        {
            bgm_playing = false;
        }, 110000 );
    }

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
        options_button.draw( "HOW TO PLAY" );
        credits_button.draw( "CREDITS" );

        // change screens when button clicked
        if ( start_button.clicked() )
        {
            current_screen = game_screen;
        }
        else if ( options_button.clicked() )
        {
            current_screen = help_screen;
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
        text( "◁ This is your spaceship. You are now running \nout from cruel space empire. You have to\nsurvive from empire's spaceships' chase!",
            width / 5.8, height / 5 );
        image( keyboard_img, width * 1.9 / 3, height / 4 + 20, 100, 70 );
        text( "You can control your spaceship with keyboard", width * 2.35 / 4, height / 5 );
        text( "W,A and D.\nThrust with W,\nTurn left / right with A / D.",
            width * 2.85 / 4, height / 4.3 );
        text( "You can shoot laser and\nkill enemies with mouse\nleft button.",
            width * 2.85 / 4, height / 4.3 + 130 );
        image( mouse_img, width * 1.9 / 3, height / 4 + 150, 70, 90 );

        push();
        translate( width / 2.2, height / 2.7 );
        rotate( PI );
        image( enemy_spaceship_img, 0, 0, 110, 110 );
        pop();

        image( base_img, width * 1.9 / 3, height / 4 + 430, 170, 200 );
        image( coin_img, width * 1.9 / 3 + 170, height / 4 + 400, 180, 180 );
        text( "▷ That's enemy spaceship. It will keep\nfollowing you and blasting lasers. You have\nto shoot and kill them with your laser!",
            width / 15, height / 3 );
        text( "When killing enemies, you can get coins and exp.\nWhen you get enough exp, you can level up and freely\nheal a part of your HP. Every time you level up\nthree times, you can choose one of\ntwo random special skills.",
        width / 15, height / 3 + 150);
        image( UI_img, width / 15 + 200, height / 3 + 370);
        text( "This is your base. You can get to your base\nand upgrade your ship's ability whenever you want.\nYou need to pay coins when upgrading your ship",
            width / 2, height / 2 );
        textSize(30);
        text( "That's end of instruction. Good luck!",
                width / 2, height / 2 + 340 );
        pop();

        // game play button
        play_button.draw( "Let\'s go!" );
        if ( play_button.clicked() )
        {
            current_screen = game_screen;
        }

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

        // texts
        textAlign( LEFT, TOP );
        fill( 255 );
        textSize( 35 );
        text( "Director : Duho Choi\nLead Programmer : Duho Choi\nAnd everything else except some assets : Duho Choi\n\nDesigneers :\nImages by : Rawdanitsu, kotnaszynce, Kenney, Rallix,\nMillionthVector, Prinsu-Kun\nSounds by : celestialghost8, dklon, Michel Baradari\n(Assets brought from opengameart.org)\n\nSpecial thanks to : Our professor Rudy Castan, and all of\nour classmates and friends",
            width / 9, height / 5 );
        pop();

        break;

        // game screen
    case game_screen:

        // if player.hp < 0, game over
        if ( player.hp <= 0 )
        {
            current_screen = game_over_screen;
        }

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

        // spawn enemies
        setTimeout( spawn_enemy, 3000 );

        // update & upgrade enemies
        enemy_upgrade();

        for ( let i = 0; i < enemy.length; i++ )
        {
            if ( enemy[ i ].hp > 0 )
            {
                enemy[ i ].update();
                enemy[ i ].draw();
                if ( enemy[ i ].hp < enemy[ i ].max_hp )
                    enemy[ i ].draw_hp();
            }
            else if ( enemy[ i ].hp <= 0 )
            {
                enemy[ i ].reward( player );
                enemy[ i ].shooting_laser = true;
                if ( i > 0 )
                {
                    enemy[ i - 1 ].shooting_laser = enemy[ i ].shooting_laser;
                }
                enemy.splice( i, 1 );
            }
        }

        // enemies attack
        enemy_attack();

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
                    enemy[ i ].IsHitByLaser( lasers );
            }
        }

        // update enemy lasers
        for ( let lasers of enemy_laser )
        {
            lasers.update();

            // player hit by laser
            if ( player.hp > 0 )
            {
                player.IsHitByLaser( lasers );

                // upgrade 8 guard hit by laser
                if ( player_upgrade.includes( 8 ) )
                    player_guard.IsHitByLaser( lasers );
            }
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
            const distance_from_player = sqrt( ( enemy_laser[ i ].position.x - player.position.x ) * ( enemy_laser[
                i ].position.x - player.position.x ) + ( enemy_laser[ i ].position.y - player.position.y ) * (
                enemy_laser[ i ].position.y - player.position.y ) );

            if ( enemy_laser[ i ].collide == true )
                enemy_laser.splice( i, 1 );

            else if ( distance_from_player > 3000 )
                enemy_laser.splice( i, 1 );

        }

        // draw player
        player.draw();

        // update 4, when shockwave used, draw shockwave
        if ( keyIsPressed )
        {
            if ( player_upgrade.includes( 4 ) && current_screen == game_screen && shockwave_effect == true )
            {
                push();
                noStroke();
                fill( 50, 200, 255, 50 );
                circle( player.position.x, player.position.y, 1400 );
                pop();
            }
        }

        // upgrade 8, update & draw guard
        if ( player_upgrade.includes( 8 ) )
        {
            player_guard.update( player );
        }

        // stop camera
        player_camera.stopDraw();

        // upgrade player stat
        upgrade();

        // don't make player hp more than max hp
        if ( player.hp > player.max_hp )
            player.hp = player.max_hp;

        // update player & interface
        player.update();
        player.draw_interface();
        if ( player.position.x > main_base.x - main_base.width / 2 && player.position.x < main_base.x + main_base
            .width / 2 &&
            player.position.y > main_base.y - main_base.height / 2 && player.position.y < main_base.y + main_base
            .height / 2 && current_screen == game_screen )
            enter_shop();

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
        text( "Upgrade!!", width / 2, height / 20 );
        pop();

        // choose upgrade buttons
        levelup_button1.draw();
        levelup_button2.draw();

        // decide upgrade
        if ( levelup_button1.clicked() )
        {
            player_upgrade[ player_upgrade.length ] = upgrade1;
            if ( upgrade1 == 2 )
            {
                barrier_deploy();
            }
            else if ( upgrade1 == 7 )
            {
                player.hp += player.max_hp;
            }
            current_screen = game_screen;
        }
        else if ( levelup_button2.clicked() )
        {
            player_upgrade[ player_upgrade.length ] = upgrade2;
            if ( upgrade2 == 2 )
            {
                barrier_deploy();
            }
            else if ( upgrade2 == 7 )
            {
                player.hp += player.max_hp;
            }
            current_screen = game_screen;
        }
        break;

        // shop screen
    case shop_screen:

        main_base.draw_interface( player );

        // shop button clicked, then upgrade player stat
        for ( let i = 0; i < 6; i++ )
        {
            if ( shop_button[ i ].clicked() )
            {
                switch ( i )
                {
                case 0:
                    if ( player.coin >= ( 20 + 40 * hp_level ) && hp_level < 10 )
                    {
                        player.coin -= ( 20 + 40 * hp_level );
                        hp_level++;
                        player.hp += 150;
                    }
                    break;
                case 1:
                    if ( player.coin >= ( 20 + 40 * dmg_level ) && dmg_level < 10 )
                    {
                        player.coin -= ( 20 + 40 * dmg_level );
                        dmg_level++;
                    }
                    break;
                case 2:
                    if ( player.coin >= ( 20 + 40 * fire_rate_level ) && fire_rate_level < 10 )
                    {
                        player.coin -= ( 20 + 40 * fire_rate_level );
                        fire_rate_level++;
                    }
                    break;
                case 3:
                    if ( player.coin >= ( 20 + 40 * spd_level ) && spd_level < 10 )
                    {
                        player.coin -= ( 20 + 40 * spd_level );
                        spd_level++;
                    }
                    break;
                case 4:
                    if ( player.coin >= ( 20 + 40 * armor_level ) && armor_level < 10 )
                    {
                        player.coin -= ( 20 + 40 * armor_level );
                        armor_level++;
                    }
                    break;

                    // button 5 clicked, then repair
                case 5:
                    if ( player.coin >= int( ( player.max_hp - player.hp ) / 3 ) )
                    {
                        player.coin -= int( ( player.max_hp - player.hp ) / 3 );
                        player.hp += player.max_hp - player.hp;
                    }
                    break;
                }
            }
        }

        upgrade();
        break;

    case game_over_screen:

        push();

        fill( 150 );
        stroke( 130, 0, 0 );
        textSize( 100 );
        textAlign( CENTER, TOP );
        text( "Game Over!", width / 2, height / 3 );
        textSize( 60 );
        text( "You have caught to the empire\nand sentenced to life in prison.", width / 2, height * 2 / 3 );

        pop();
    }

    // if current screen is help screen or credits screen, 
    // draw return main menu button
    if ( current_screen >= help_screen && current_screen != game_over_screen )
    {
        return_main_button.draw( '◁' );
        if ( return_main_button.clicked() )
        {
            current_screen = main_menu;
        }
    }

    // if current screen is shop screen,
    // draw return game button
    else if ( current_screen > game_screen && current_screen != level_up_screen && current_screen != game_over_screen )
    {
        return_game_button.draw( '◁' );
        if ( return_game_button.clicked() )
        {
            current_screen = game_screen;
        }
    }

    mouseWasPressed = mouseIsPressed;
}
