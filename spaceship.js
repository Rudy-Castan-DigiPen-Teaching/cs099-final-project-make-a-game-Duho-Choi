// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class spaceship
{
    constructor(starting_x,starting_y,length,health = 50)
    {
        this.position = new Vec2(starting_x,starting_y);
        this.velocity = new Vec2(0,0);
        this.acceleration = new Vec2(0,0);

        // 0 = player, 1 = enemy
        this.team = 0;

        this.level = 1;
        this.max_hp = health;
        this.hp = health;
        this.fireDmg = 5;
        this.fireRate = 4;
        this.armor = 0;
        this.barrier = 0;
        this.speed_max = 3;
        this.diameter = length;
    }

    update()    
    {
        this.position.addTo(this.velocity);
        if(this.velocity.getLength() < this.speed_max)
        {
            this.velocity.addTo(this.acceleration);
        }

        if(keyIsPressed && this.team == 0)
        {
            // key w = move forward
            if(keyIsDown(87))
            {
                this.acceleration.x = 0.1;
            }
            // key a = turn left
            if(keyIsDown(65))
            {
                this.velocity.setAngle(this.velocity.getAngle() - 0.05);
            }
            // key d = turn right
            if(keyIsDown(68))
            {
                this.velocity.setAngle(this.velocity.getAngle() + 0.05);
            }
        }
    }

    draw()
    {
        // draw spaceship
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.getAngle());
        noStroke();
        imageMode(CENTER);
        image(player_spaceship_img,0,0,130,120);
        pop();

        // hit box
        push();
        noFill();
        strokeWeight(3);
        stroke('red');
        circle(this.position.x,this.position.y,this.diameter * 2);
        pop();
    }

    draw_hp()
    {
        // hp box
        push();
        noStroke();
        rectMode(CENTER);
        fill(170);
        rect(this.position.x,this.position.y + this.diameter * 3/2,150,20);
        fill(70,255,120);
        rectMode(CORNER);
        rect(this.position.x - 75,this.position.y + this.diameter * 3/2 - 10,map(this.hp,0,this.max_hp,0,150),20)
        pop();
    }

    hitByLaser(laser)
    {
        const distance = sqrt((this.position.x - laser.position.x) * (this.position.x - laser.position.x) + (this.position.y - laser.position.y) * (this.position.y - laser.position.y));

        if(distance < this.diameter && laser.collide == false && this.team != laser.team)
        {
            this.hp -= laser.dmg;
            laser.collide = true;
        }
    }
}
