// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

// camera
let player_camera;

// player & enemies
let player;
let player_laser = [];
let enemy = [];
let enemy_laser = [];

// shop
let shop_1;

let blast_interval;

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
    player = new spaceship(0,0,30);
    player.exp = 13;

    // enemy
    enemy.push(new spaceship(100,height/2,30,50));
}

function draw()
{
    background( 20 );
    switch(current_screen)
    {
        // main menu
        case main_menu:

            // Game title : Outlaw of the Galaxy
            push();
            textSize(100);
            textAlign(LEFT,TOP);
            noStroke();
            fill(255);
            text('Outlaw\nOf the Galaxy',70,70);
            pop();

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
            player.draw_interface();

            player_camera.beginDraw();

            // update player
            player.update();
            player.draw();

            // update enemies
            for(let enemies of enemy)
            {
                if(enemies.hp > 0)
                {
                    enemies.update();
                    enemies.draw();
                    enemies.team = 1;
                    if(enemies.hp < enemies.max_hp)
                        enemies.draw_hp();
                }
                else
                {
                    enemies.explode();
                    for(let i = enemy.length - 1; i >= 0; --i)
                    {
                        enemy.splice(i,1);
                    }
                }
            }
            
            // update player lasers
            for(let lasers of player_laser)
            {
                lasers.update();

                // enemy hit by laser
                for(let enemies of enemy)
                {
                    if(enemies.hp > 0)
                        enemies.hitByLaser(lasers);
                }
            }

            
            // if laser collide with object, delete laser
            for(let i = player_laser.length - 1; i >= 0; --i)
            {
                if(player_laser[i].collide == true)
                    player_laser.splice(i,1);
            }

            if(player.exp == player.max_exp)
            {

            }

            break;
        
        // level up screen
        case levelUp_screen:
            
            
            break;

        // shop screen
        case shop_screen:

            break;
    }

    push();
    
    pop();
    
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

function delete_from_array(arr)
{
    for(let i = arr.length - 1; i >= 0; --i)
    {
        arr.splice(i,1);
    }
}

// press space bar = shooting laser 
function keyPressed()
{
    let fireRate = 1000 / player.fireRate;
    if(keyCode == 32)
    {
        setTimeout(blast_laser,0);
        blast_interval = setInterval(blast_laser,fireRate);
    }
}

// release space bar = stop shooting laser
function keyReleased()
{
    if(keyCode == 32)
    {
        clearInterval(blast_interval);
    }
}
