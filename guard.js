// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class guard
{
    constructor( shooter )
    {
        this.position = new Vec2( shooter.position.x + 90, shooter.position.y );
        this.velocity = new Vec2( 0, 75 );
        this.diameter = 20;
    }

    update( shooter )
    {
        this.rotate( shooter );
        this.draw();
    }

    rotate( shooter )
    {
        this.position.x = shooter.position.x + this.velocity.x;
        this.position.y = shooter.position.y + this.velocity.y;
        this.velocity.setAngle(this.velocity.getAngle() + deltaTime * radians(360/1500));
    }

    draw()
    {
        push();
        translate( this.position.x, this.position.y );
        rotate( this.velocity.getAngle() );
        imageMode( CENTER );
        image( upgrade_img[ 7 ], 0, 0, this.diameter + 15, this.diameter + 5 );
        pop();

        // hit box
        push();
        noFill();
        strokeWeight( 3 );
        stroke( "blue" );
        circle( this.position.x, this.position.y, this.diameter * 2 );
        pop();
    }

    IsHitByLaser( laser )
    {
        const distance = sqrt( ( this.position.x - laser.position.x ) * ( this.position.x - laser.position.x ) + (
            this.position.y - laser.position.y ) * ( this.position.y - laser.position.y ) );

        if ( distance < this.diameter && laser.collide == false && 0 != laser.team )
        {
            laser.collide = true;
        }
    }
}
