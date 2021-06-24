// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class laser
{
    constructor( shooter, damage )
    {
        this.position = new Vec2( shooter.position.x, shooter.position.y );
        this.velocity = new Vec2( shooter.velocity.x, shooter.velocity.y );
        this.team = shooter.team;
        this.laser_spd = 10 + shooter.velocity.getLength();
        this.dmg = damage;
        this.collide = false;
    }

    update()
    {
        this.velocity.setAngle( this.velocity.getAngle() );
        this.velocity.setLength( this.laser_spd );
        this.position.addTo( this.velocity );

        push();
        translate( this.position.x, this.position.y );
        rotate( this.velocity.getAngle() );
        if ( this.team == 0 )
            stroke( "#00F3FF" );
        else
            stroke( "#E1411F" );
        strokeWeight( 2.5 );
        line( 10, 0, -35, 0 );
        pop();
    }

}
