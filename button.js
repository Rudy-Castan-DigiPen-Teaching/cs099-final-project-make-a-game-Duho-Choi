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
    }

    draw(txt)
    {
        const mouseInButton = (mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2) && (mouseY > this.y - this.height / 2 && mouseY < this.y + this.height / 2);

        push();
        rectMode(CENTER);
        if(mouseInButton == true)
        {
            stroke('#ffcc66');
            fill('#ff9933');
        }
        else
        {
            stroke('#ff9933');
            fill('#ffcc66');
        }
        strokeWeight(5);
        rect(this.x,this.y,this.width,this.height);
        pop();
        push();
        textAlign(CENTER,CENTER);
        textSize(this.height * 3/4);
        text(txt,this.x,this.y);
        pop();
    }

    clicked()
    {
        const mouseInButton = (mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2) && (mouseY > this.y - this.height / 2 && mouseY < this.y + this.height / 2);
        
        if(mouseIsPressed && mouseInButton)
        {
            return true;
        }
        else{
            return false;
        }
    }
}
