// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class Camera
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
    }

    beginDraw()
    {
        translate( -this.x, -this.y );
    }

    stopDraw()
    {
        translate( this.x, this.y );
    }
}
