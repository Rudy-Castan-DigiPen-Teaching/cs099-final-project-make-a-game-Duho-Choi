// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

let current_screen = 0;

// screens
const main_menu = 0;
const game_screen = 1;
const help_screen = 2;
const options_screen = 10;
const credits_screen = 11;

// images
let player_spaceship_img;

// buttons
let start_button;
let play_button;
let options_button;
let credits_button;
let main_button;

let player_camera;

// player & enemies
let player;
let player_laser = [];
let enemy;

let stars = [];

let blast_interval;

function preload()
{
    player_spaceship_img = loadImage('assets/spaceship_player.png')
}

function setup()
{
    createCanvas( 1200, 900 );

    // buttons
    start_button = new button(width/2, height/2 + 100, 300, 60);
    play_button = new button(width/2, height/11, 300, 60);
    options_button = new button(width/2, height/2 + 200, 300, 60);
    credits_button = new button(width/2, height/2 + 300, 300, 60);
    main_button = new button(width/13,height/12,50,50);

    // camera
    player_camera = new Camera();

    // player
    player = new spaceship(width/2,100,60);

    // enemy
    enemy = new spaceship(100,height/2,55,50);
    enemy.team = 1;
}

function draw()
{
    background( 20 );
    switch(current_screen)
    {
        // main menu
        case main_menu:

            // draw buttons
            start_button.draw('START');
            options_button.draw('OPTIONS');
            credits_button.draw('CREDITS');

            // change screens when button clicked
            if(start_button.clicked())
            {
                current_screen = help_screen;
            }
            else if(options_button.clicked())
            {
                current_screen = options_screen;
            }
            else if(credits_button.clicked())
            {
                current_screen = credits_screen;
            }

            break;

        // help screen
        case help_screen:

            // game play button
            play_button.draw('Let\'s go!');
            if(play_button.clicked())
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

            // update camera
            player_camera.x = player.position.x - width/2;
            player_camera.y = player.position.y - height/2;
            player_camera.beginDraw();

            // update player
            player.update();
            player.draw();

            if(enemy.hp > 0)
            {
                enemy.update();
                enemy.draw();
                if(enemy.hp < enemy.max_hp)
                    enemy.draw_hp();
            }
            else
                enemy = 0;
            
            //  update player lasers
            for(let lasers of player_laser)
            {
                lasers.update();
                
                if(enemy.hp > 0)
                {
                    enemy.hitByLaser(lasers);
                }
            }
            
            // if laser out from screen, delete laser
            for(let i = player_laser.length - 1; i >= 0; --i)
            {
                let particle = player_laser[i];
                if(particle.collide == true)
                    player_laser.splice(i,1);
            }
            break;
    }
    
    // if current screen is not main menu and game screen, make main button
    if(current_screen != main_menu && current_screen != game_screen)
    {
        main_button.draw('◁');
        if(main_button.clicked())
        {
            current_screen = main_menu;
        }
    }
}

function blast_laser()
{
    player_laser.push(new laser(player, player.fireDmg));
}

function keyPressed()
{
    let fireRate = 1000 / player.fireRate;
    if(keyCode == 32)
    {
        setTimeout(blast_laser,0);
        blast_interval = setInterval(blast_laser,fireRate);
    }
}

function keyReleased()
{
    if(keyCode == 32)
    {
        clearInterval(blast_interval);
    }
}
