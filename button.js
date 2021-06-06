// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class button
{
    constructor(x_pos,y_pos,width,height)
    {
        this.x = x_pos;
        this.y = y_pos;
        this.width = width;
        this.height = height;
        this.value = 0;
    }

    draw()
    {
        push();
        rectMode(CENTER);
        rect(this.x,this.y,this.width,this.height);
        pop();
    }

    click()
    {
        const mouseInButton = (mouseX > this.x && mouseX < this.x + this.width) && (mouseY > this.Y && mouseY < this.y + this.button);

        if(mouseIsPressed && mouseInButton && this.value == 0)
        {
            
        }
    }
}
