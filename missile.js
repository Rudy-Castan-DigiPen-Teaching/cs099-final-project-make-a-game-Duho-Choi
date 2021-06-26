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
        this.accel = new Vec2( 0.7, 0 );
        this.team = shooter.team;
        this.dir = atan2( mouseY - 450, mouseX - 600 );
        this.dmg = damage * 2;
        this.collide = false;
    }

    update()
    {
        this.velocity.setAngle( this.dir );
        this.velocity.setLength( this.accel.getLength() + this.velocity.getLength() );
        this.position.addTo( this.velocity );

        push();
        translate( this.position.x, this.position.y );
        rotate( this.velocity.getAngle() );
        if ( player.position.getAngle() != this.position.getAngle() && player.position.getAngle() != this.position
            .getAngle() - PI && player.position.getAngle() != this.position.getAngle() + PI )
        {
            image( boost_img, -50, 0, 60, 20 );
            rotate( PI / 2 );
            image( upgrade_img[ 2 ], 0, 0, 25, 50 );
        }
        strokeWeight( 10 );
        stroke( 255 );
        point( 0, 0 );
        pop();
    }
}
