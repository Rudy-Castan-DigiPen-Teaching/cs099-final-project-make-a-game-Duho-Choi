// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

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

}
