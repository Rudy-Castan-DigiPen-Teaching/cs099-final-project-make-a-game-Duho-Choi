// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

// upgrade level
let spd_level = 0;
let dmg_level = 0;
let fire_rate_level = 0;
let hp_level = 0;
let armor_level = 0;

// level up gadget
let upgrade_list = [ 1, 2, 3, 4, 5, 6, 7, 8 ];
let upgrade1;
let upgrade2;

let barrier_on = false;

let player_upgrade = [4];

class spaceship
{
    constructor( starting_x, starting_y, length, lev = 1, enemy = 1 )
    {
        this.position = new Vec2( starting_x, starting_y );
        this.velocity = new Vec2( 0, 0 );
        this.velocity.setAngle( 0 );
        this.acceleration = new Vec2( 0, 0 );

        // 0 = player, 1 = enemy
        this.team = enemy;

        this.level = lev;
        this.exp = 0;
        this.max_exp = 30;
        this.coin = 100000;

        this.max_hp = 50 + lev * 40;
        this.hp = this.max_hp;

        this.fireDmg = 3;
        this.fireRate = 2;

        this.shooting_laser = false;

        this.armor = 0;

        this.speed_max = 3;
        this.angleOffset = 0.1;
        this.accel = 0.5;

        this.diameter = length;
    }

    update()
    {
        this.position.addTo( this.velocity );
        this.velocity.setLength( this.acceleration.getLength() + this.velocity.getLength() );

        if ( this.velocity.getLength() > this.speed_max )
        {
            this.velocity.setLength( this.speed_max );
        }
        else if ( this.velocity.getLength < 0.01 )
        {
            this.velocity.setLength( 0.01 );
        }
        
        // moving player
        if ( this.team == 0 && current_screen == game_screen )
        {
            // key w = move forward
            if ( keyIsDown( 87 ) )
            {
                this.acceleration.x = this.accel;
            }
            else
            {
                this.acceleration.x = 0;
                if ( this.velocity.getLength() > this.accel + 0.01 )
                    this.velocity.setLength( this.velocity.getLength() - this.accel );
            }
            // key a = turn left
            if ( keyIsDown( 65 ) )
            {
                this.velocity.setAngle( this.velocity.getAngle() - this.angleOffset );
            }
            // key d = turn right
            if ( keyIsDown( 68 ) )
            {
                this.velocity.setAngle( this.velocity.getAngle() + this.angleOffset );
            }
        }
    }

    draw()
    {
        // draw spaceship
        push();
        translate( this.position.x, this.position.y );
        rotate( this.velocity.getAngle() );
        noStroke();
        if ( this.team == 0 )
            image( player_spaceship_img, 0, 0, this.diameter * 8 / 3, this.diameter * 8 / 3 );
        else
            image( enemy_spaceship_img, 0, 0, this.diameter * 8 / 3, this.diameter * 8 / 3 );

        // booster
        if ( this.velocity.getLength() >= 1.8 )
        {
            imageMode( CENTER );
            if ( this.team == 0 )
            {
                image( boost_img, -this.diameter * 7 / 3, 0, 100, 40 );
            }
            else
            {
                image( enemy_boost_img, -this.diameter * 7 / 3, 0, 100, 40 );
            }
        }
        pop();

        // hit box
        push();
        noFill();
        strokeWeight( 3 );
        if ( this.team == 0 )
            stroke( "blue" );
        else
            stroke( "red" );
        circle( this.position.x, this.position.y, this.diameter * 2 );
        pop();

        // barrier
        if(this.team == 0 && barrier_on == true)
        {
            push();
            stroke(0,155,255,70);
            strokeWeight(5);
            fill(0,255,255,50);
            circle(this.position.x,this.position.y,this.diameter * 2.8);
            pop();
        }
    }

    draw_hp()
    {
        // hp bar
        push();
        noStroke();
        rectMode( CENTER );
        fill( 170 );
        rect( this.position.x, this.position.y + this.diameter * 2, 120, 15 );
        fill( 70, 255, 120 );
        rectMode( CORNER );
        rect( this.position.x - 60, this.position.y + this.diameter * 2 - 7.5, map( this.hp, 0, this.max_hp, 0,
            120 ), 15 );
        pop();
    }

    draw_interface()
    {
        push();
        noStroke();
        fill( 255 );
        textSize( 45 );
        textAlign( LEFT, CENTER );

        // coin
        image( coin_img, width / 20, height * 16 / 20, 150, 150 );
        text( ":  " + this.coin, width / 10, height * 16 / 20 );

        // level & exp bar
        text( "Lv : " + this.level, width / 30, height * 19 / 20 );
        rectMode( CENTER );
        fill( 170 );
        rect( width / 4, height * 19 / 20, 200, 30 );
        fill( 70, 255, 255 );
        rectMode( CORNER );
        rect( width / 4 - 100, height * 19 / 20 - 15, map( this.exp, 0, this.max_exp, 0, 200 ), 30 );
        push();
        fill( 0 );
        textAlign( CENTER, CENTER );
        textSize( 30 );
        text( this.exp + " / " + this.max_exp, width / 4, height * 19 / 20 );
        pop();

        // hp bar
        fill( 255 );
        text( "HP", width / 30, height * 17.5 / 20 );
        rectMode( CENTER );
        fill( 170 );
        rect( width / 4.5, height * 17.5 / 20, 270, 30 );
        fill( 70, 255, 120 );
        rectMode( CORNER );
        rect( width / 4.5 - 135, height * 17.5 / 20 - 15, map( this.hp, 0, this.max_hp, 0, 270 ), 30 );
        push();
        fill( 0 );
        textAlign( CENTER, CENTER );
        textSize( 30 );
        text( int(this.hp) + " / " + this.max_hp, width / 4.5, height * 17.5 / 20 );
        pop();

        // coordinate
        fill( 255 );
        textAlign( LEFT, CENTER );
        textSize( 20 );
        text( "X : " + int( this.position.x ) + "  Y : " + int( this.position.y ), width * 4 / 5, 20 );

        /*
        // times survived
        text("Times survived : " + second(), width * 3 / 5, 20);
        pop();
        */
        
        // aiming point
        push();
        stroke( "#00F3FF" );
        noFill();
        translate(mouseX,mouseY);
        circle(0,0,40);
        circle(0,0,20);
        line(-20,0,20,0);
        line(0,20,0,-20);
        pop();

    }

    IsHitByLaser( laser )
    {
        const distance = sqrt( ( this.position.x - laser.position.x ) * ( this.position.x - laser.position.x ) + (
            this.position.y - laser.position.y ) * ( this.position.y - laser.position.y ) );

        if ( distance < this.diameter && laser.collide == false && this.team != laser.team )
        {
            this.hp -= laser.dmg * ( ( 100 - this.armor ) / 100 );
            laser.collide = true;
            if(this.team == 0 && player_upgrade.includes(2) && barrier_on == true)
            {
                setTimeout(barrier_remove,2000);
            }
        }
    }

    reward( p )
    {
        p.coin += this.level * 15;
        p.exp += this.level * 20;
    }
}

// upgrade 2 - barrier
function barrier_deploy()
{
    barrier_on = true;
}

function barrier_remove()
{
    barrier_on = false;
    if(barrier_on == false)
        setTimeout(barrier_deploy,10000);
}
