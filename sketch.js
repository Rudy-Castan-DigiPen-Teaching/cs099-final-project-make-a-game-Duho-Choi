// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

const main_menu = 0;
const game_screen = 1;

let current_screen = 0;

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
    createCanvas( 1200, 800 );
    player = new spaceship(width/2, height/2, 0);
}

function draw()
{
    background( 20 );
    player.update();
    player.draw();

    if(keyIsDown(32))
    {
        if((millis() / 1000 - timer) % 2 == 0)
        {
        player_laser.push(new laser(player));
        }
    }
    else
    {
        
    }

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
}

function keyPressed()
{
    if(keyCode == 32)
    {
        timer = millis() / 1000;
    }
}
