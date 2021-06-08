// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

const main_menu = 0;
const game_screen = 1;
const help_screen = 2;
const options_screen = 11;
const credits_screen = 12;

let current_screen = 0;

let start_button;
let options_button;
let credits_button;
let main_button;

let player;
let player_laser = [];

let timer = 0;
let shoot_timer;
let do_not_shoot = false;

function preload()
{

}

function setup()
{
    createCanvas( 1200, 900 );

    // buttons
    start_button = new button(width/2, height/2 + 100, 300, 60);
    options_button = new button(width/2, height/2 + 200, 300, 60);
    credits_button = new button(width/2, height/2 + 300, 300, 60);
    main_button = new button(width/13,height/12,50,50);

    // player & enemies
    player = new spaceship(width/2, height/2, 0);
    
}

function draw()
{
    background( 20 );
    switch(current_screen)
    {
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
        case help_screen:

            break;
        case options_screen:

            break;
        case credits_screen:

            break;
        case game_screen:
            player.update();
            player.draw();

            if(keyIsDown(32))
            {
                if(((floor(millis()/10) - shoot_timer) % 20 == 0) && do_not_shoot == false)
                {
                player_laser.push(new laser(player));
                }
            }
            else
            {
                
            }
            
            // player lasers update
            for(let bullet of player_laser)
            {
                bullet.update();
            }
            
            
            for(let i = player_laser.length - 1; i >= 0; --i)
            {
                let particle = player_laser[i]
                if(particle.position.x > width || particle.position.x < 0 ||
                    particle.position.y > height || particle.position.y < 0)
                {
                    player_laser.splice(i,1);
                }
            }
            break;

    }

    if(current_screen != main_menu && current_screen != game_screen)
    {
        main_button.draw('◁');
        if(main_button.clicked())
        {
            current_screen = main_menu;
        }
    }
}

function keyPressed()
{
    if(keyCode == 32)
    {
        shoot_timer = floor(millis()/10);
    }
}
