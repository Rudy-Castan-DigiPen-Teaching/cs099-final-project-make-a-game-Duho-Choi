// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class laser
{
    constructor(shooter)
    {
        this.position = new Vec2(shooter.position.x,shooter.position.y);
        this.velocity = new Vec2(shooter.velocity.x,shooter.velocity.y);
        this.team = shooter.team;
        this.bullet_spd = 6;
    }

    update()
    {
        this.velocity.setAngle(this.velocity.getAngle());
        this.velocity.setLength(this.bullet_spd);
        
        this.position.addTo(this.velocity);

        push();
        stroke(255);
        strokeWeight(2);
        line(this.position.x,this.position.y,this.position.x + this.velocity.x * 4,this.position.y + this.velocity.y * 4);
        strokeWeight(10);
        stroke(220);
        point(this.position.x + this.velocity.x * 4,this.position.y + this.velocity.y * 4);
        pop();
    }
}
