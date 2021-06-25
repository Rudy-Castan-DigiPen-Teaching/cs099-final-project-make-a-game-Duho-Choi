// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class missile
{
    constructor( shooter, damage )
    {
        this.position = new Vec2( shooter.position.x, shooter.position.y );
        this.velocity = new Vec2( shooter.velocity.x, shooter.velocity.y );
        this.team = shooter.team;
        this.laser_spd = 20 + shooter.velocity.getLength();
        this.dir = atan2(mouseY,mouseX);
        this.dmg = damage * 1.5;
        this.collide = false;
    }

    update()
    {
        this.velocity.setAngle( this.dir );
        this.velocity.setLength( this.laser_spd );
        this.position.addTo( this.velocity );

        push();
        translate( this.position.x, this.position.y );
        rotate( this.velocity.getAngle() );
        image(upgrade_img[ 2 ],this.position.x,this.position.y,15,50);
        pop();
    }
}
