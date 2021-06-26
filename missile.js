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
        this.dmg = damage * 2.5;
        this.collide = false;
    }

    update()
    {
        let closest_enemy;
        let min_distance;
        for ( let i = 0; i < enemy.length; i++ )
        {
            let distance = sqrt( ( enemy[ i ].position.x - player.position.x ) * ( enemy[ i ].position.x - player
                .position.x ) - ( enemy[ i ].position.y - player.position.y ) * ( enemy[ i ].position.y -
                player.position.y ) );
            if ( i == 0 )
                min_distance = distance;
            if ( min_distance > distance )
            {
                min_distance = distance;
                closest_enemy = i;
            }
        }

        let dir = atan2( enemy[ closest_enemy ].position.y - player.position.y, enemy[ closest_enemy ].position.x -
            player.position.x );
        this.velocity.setAngle( dir );
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
