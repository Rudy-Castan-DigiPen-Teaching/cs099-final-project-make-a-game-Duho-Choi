// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class shop
{
    constructor(start_x,start_y)
    {
        this.x = start_x;
        this.y = start_y;
    }

    draw()
    {
        image(shop_img,this.x,this.y);
    }
}
