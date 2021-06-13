// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

// upgrade level
let spd_level = 0;
let dmg_level = 0;
let rate_level = 0;
let hp_level = 0;
let armor_level = 0;
let barrier_level = 1;

class shop
{
    constructor( start_x, start_y )
    {
        this.x = start_x;
        this.y = start_y;
        this.width = 140;
        this.height = 240;
    }

    draw()
    {
        image( shop_img, this.x, this.y );
        push();
        noFill();
        stroke( "red" );
        strokeWeight( 5 );
        rect( this.x - this.width / 2, this.y - this.height / 2, this.width, this.height );
        pop();
    }

    draw_interface( player )
    {
        push();
        noStroke();
        fill( 255 );
        image( coin_img, width / 4, height / 15, 150, 150 );
        textAlign( LEFT, CENTER );
        textSize( 50 );
        text( ": " + player.coin, width * 2 / 7, height / 15 );
        pop();

        
    }

    upgrade( player )
    {

    }
}
