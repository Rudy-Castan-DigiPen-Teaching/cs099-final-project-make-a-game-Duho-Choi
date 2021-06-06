// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class spaceship
{
    constructor(starting_x,starting_y,team)
    {
        this.position = new Vec2(starting_x,starting_y);
        this.velocity = new Vec2(0,0);
        this.acceleration = new Vec2(0,0);

        this.team = team;
        this.hp = 50;
        this.fireDmg = 5;
        this.fireRate = 0.5;
        this.armor = 0;
        this.barrier = 0;
        this.speed_max = 3;
    }

    update()
    {
        this.position.addTo(this.velocity);
        if(this.velocity.getLength() < this.speed_max)
        {
            this.velocity.addTo(this.acceleration);
        }

        if(keyIsPressed)
        {
            // key w = move forward
            if(keyIsDown(87))
            {
                this.acceleration.x = 0.1;
            }
            // key a = turn left
            if(keyIsDown(65))
            {
                this.velocity.setAngle(this.velocity.getAngle() - 0.07);
            }
            // key d = turn right
            if(keyIsDown(68))
            {
                this.velocity.setAngle(this.velocity.getAngle() + 0.07);
            }
            // key space = shoot laser
            if(keyIsDown(32))
            {
                
            }
        }
    }

    draw()
    {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.getAngle());
        noStroke();
        triangle(20,0,-20,20,-20,-20);
        pop();
    }
}
