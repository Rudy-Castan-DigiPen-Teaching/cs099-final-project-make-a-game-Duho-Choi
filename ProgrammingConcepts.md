# Programming Concepts

# 1. Shapes

## What is it?
---
Shapes are used to visualize basic shapes such as circle, rectangle, square, etc. With only typing simple information such as coordinates and size of shape, we can easily draw shapes on our canvas.

## Why is it important? 
---
In the game, visual is one of the most important part in the game. All we see in the game are made of combinations of shapes. Background, user interface, character, monsters and their skill effects... 
while we learn p5js, we sometimes brought and use external assets, but shapes are also often used and useful because it's easily use, and we don't need to think about licenses.

## How do we use it?
---
As I said, we can draw simple shapes and pictures without using external assets. When drawing simple shapes, all we need to decide is it's position and actual size of it. Shapes will usually used with Colors which is written in next.

### Code Snippet

I used shapes to visualize User Interfaces such as HP bar and EXP bar.

```js
From spaceship.js

    // level & exp bar
        rectMode( CENTER );
        rect( width / 4, height * 19 / 20, 200, 30 );
        rectMode( CORNER );
        rect( width / 4 - 100, height * 19 / 20 - 15, map( this.exp, 0, this.max_exp, 0, 200 ), 30 );

    // hp bar
        rectMode( CENTER );
        rect( width / 4.5, height * 17.5 / 20, 270, 30 );
        rectMode( CORNER );
        rect( width / 4.5 - 135, height * 17.5 / 20 - 15, map( this.hp, 0, this.max_hp, 0, 270 ), 30 );
```
---



# 2. Colors

## What is it?
---
Colors are used to decide colors of shapes. We can decide shape's colors by deciding RGB values, or typing only one value to interpret as a grayscale value. It can also decide transparency of shapes.

## Why is it important? 
---
As I said at Shapes, visual is one of the most important part in the game. Where there are shapes and pictures, there are colors. We can't draw shapes or pictures as we thought without pictures. Especially in game, color is more important because colors make player to identify the situation or objects. For instance, player can distinguish whether the object is ally's or enemy's, whether it is a safe road or danger zone with only colors.

## How do we use it?
---
We can decide colors when drawing shapes. 

### Code Snippet
---

I used colors to distinguish player's and enemys' lasers.
```js
From laser.js

        if ( this.team == 0 )
            stroke( "#00F3FF" );
        else
            stroke( "#E1411F" );
```

# 3. Variables

## What is it?
---
Variables are like a storage that keeps value in it. It can various kinds of variables, such as character, string, numbers, etc. We could change variables whenever we need. 

## Why is it important? 
---
When we learn programming at first, we usually learn variables as the first subject, which means it's one of the most important part of programming. In games, programs, or any softwares that runs in computer or electric devices, runs with their basic information. So in game, almost every informations are made with variables, and something that moves has various informations like position, velocity, and so on, and all of them are made with variables. Not only objects moves in game, almost all of information in the game are used to made with variables.

## How do we use it?
---


### Code snippet
---
I made variables that put player stat's level. player's 
```js
From spaceship.js

let spd_level = 0;
let dmg_level = 0;
let fire_rate_level = 0;
let hp_level = 0;
let armor_level = 0;
```

# 4. Conditional Statements

## What is it?
---
Conditional statements checks condition (in round bracket) that is right or wrong. If the condition fulfilled, conditional statement implements the codes we wrote down in braces. But if the condition is wrong wrong, the code will proceed skipping the codes in braces.

## Why is it important? 
---
Almost all of the actings in the game, including basic acts are worked according to the conditions. Situations like starting the game, finishing the game, also normally works with conditional statements. When player interacts to game, game executes written code that appropriate to condition. Like this way, in the game, and not only game but also programs that user can interacts to it, conditional statements are essential to them.

## How do we use it?
---
In real life, we can't walk through the wall normally. Likewise, when character encounters a wall while moving forward, then we need to wrote down conditional statements that checks character reaches the wall. When character reaches the wall, we have to character should stop moving forward.
Like this way, lots of basic situations could be implemented by conditional statements. And not only those like simple ones, complex conditions could also be implemented by using nested conditional statements, or with using comparison and logical operators too.

### Code snippet
---
I used conditional statements to adjust player's attack speed.

```js
From functions.js

function mousePressed()
{
    if ( mouseButton === LEFT && current_screen == game_screen )
    {
        let fireDelay = 1000 / player.fireRate;
    
        if ( fired == false )
        {
            fired = true;
            player_blastLaser();
            blast_interval = setInterval( player_blastLaser, fireDelay );
            setTimeout( function ()
            {
                fired = false;
            }, fireDelay );
        }
    }

    let missileDelay = 1000;

    if ( mouseButton === LEFT && player_upgrade.includes( 3 ) && current_screen == game_screen )
    {
        if ( missile_fired == false )
        {
            missile_fired = true;
            player_laser.push( new missile( player, player.fireDmg ) );
            missile_sound.play();

            missile_interval = setInterval( function ()
            {
                if ( current_screen == game_screen )
                {
                    player_laser.push( new missile( player, player.fireDmg ) );
                    missile_sound.play();
                }
            }, missileDelay );

            setTimeout( function ()
            {
                missile_fired = false
            }, missileDelay );
        }
    }
}
```

# 5. Loops

## What is it?
---
Loops execute code in brace repeatedly when certain condition is satisfied. It can process same code repeatedly, and also it can give definitive change to code that it's executing it now. 

## Why is it important? 
---
Loops execute same code repeatedly, so loops make code more simply. It allows us to don't write unessential codes repeatedly, and like I said, it can also be used when you have to deal with one work that has constant changes.
Also, loops are essential to utilize arrays that I will explain, since arrays are usually used as aggregation of similar types of data, we can easily adjust all of contents in the array with using loops.

## How do we use it?
---
If there's code that we have to write a same code various times, we can just use loops and write it concisely. It doesn't matter there's slight changes in that loop. When using with conditional statements, you can use it not only repeating codes that has constant changes, but also can make various changes.

### Code snippet
---
Usually in this game, I used Loops to utilize arrays. In this code, I used it to utilise player's lasers.
```js
from sketch.js

    for ( let lasers of player_laser )
    {
        lasers.update();

        // enemy hit by laser
        for ( let i = 0; i < enemy.length; i++ )
        {
            if ( enemy[ i ].hp > 0 )
                enemy[ i ].IsHitByLaser( lasers );
        }
    }

```

# 6. Functions
---
## What is it?
---
Functions are kinda like aggregation of codes. We can easily use combined codes by just using a function. And it is useful to make our code more readable.

## Why is it important? 
---
When we make functions, it can perform same bundle of codes multiple times by just writing one code of function. So we could make function contains code that we would use often, and use them with only typing one function. And it's also good for showing what those codes work for, so using functions well can make code more simple. It makes code more readable, and it makes you don't need to use same code unnecessarily over and over again. Also, making functions can make code more readable, so it makes code more simple and understandable.

## How do we use it?
---
If we need to use same code lots of times, we can make function and use it so then we can use bundle of codes easily. Or not only that, we could use functions when we need to make our code more simple.

### Code snippet
---
I have lots of functions in my game. This is the function that upgrades player.

```js
from functions.js

function upgrade()
{
    player.max_hp = 100 + 150 * hp_level;

    // upgrade 7 : HP up
    if ( player_upgrade.includes( 7 ) )
        player.max_hp *= 2;

    player.fireDmg = 30 + 25 * dmg_level;

    // upgrade 1 : Damage up
    if ( player_upgrade.includes( 1 ) )
        player.fireDmg *= 1.3;

    // upgrade 5
    if ( player_upgrade.includes( 5 ) && current_screen == game_screen )
    {
        let crit = random( 10 );
        if ( crit >= 7 )
            player.fireDmg *= 2;
        else
            player.fireDmg = 30 + 25 * dmg_level;
    }

    player.fireRate = 3 + 0.7 * fire_rate_level;

    // upgrade 6
    player.speed_max = 5 + 1 * spd_level;
    if ( player_upgrade.includes( 6 ) )
        player.speed_max -= 3;

    // upgrade 2
    if ( player_upgrade.includes( 2 ) && barrier_on == true && current_screen == game_screen )
        player.armor = 100
    else
        player.armor = 5 * armor_level;
    if ( player_upgrade.includes( 6 ) && barrier_on == false )
        player.armor += 20;
}


```


# 7. Classes

## What is it?
---
Class is combinations of variables and functions. In class, it has variables for that class in it, and there are functions that uses variables we put when making class (I searched in google, and people call them method).

## Why is it important? 
---
In game, there are bunch of objects, and each objects has variables that saves their information. And each objects need some methods to make them do their behaviors such as moving, attacking, and we can put all of that kinds of works in one class so that we can make same kinds of classes and make to do same kinds of behaviors.

## How do we use it?
---
We can make classes for objects, and make methods for them to make move, attack, and other behaviors.

### Code snippet
---
I used class to make spaceships. Spaceships in my game each has various information.
```js
From spaceship.js

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

        this.hp = 50;
        this.max_hp = 50;

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
        pop();
        
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

        // missile delay

        // shockwave delay
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

```
# 8. Arrays

## What is it?
---
Array is an aggregation of variables. It can be various types of set of data, but usually we use with same or similar type of data.

## Why is it important? 
---
Array is useful to control similar data. There's kind of lots of similar data in game (such as monsters, or bullets), but since people can't make and control all of them in game manually, so we can make similar or same data and control all of them by putting in arrays.

## How do we use it?
---
When you need to use lots of similar data, you can put on various data on array. Like I said before, when using array with loops, we can easily control contents in the array since we can access all of contents in array by simply using loops. 

### Code Snippet
---
I used to deal with player's and enemy's laser. 
```js
From sketch.js & functions.js
let player_laser = [];

// if player laser collide with object, delete laser
for ( let i = player_laser.length - 1; i >= 0; --i )
{
    const distance_from_player = sqrt( ( player_laser[ i ].position.x - player.position.x ) * ( player_laser[
        i ].position.x - player.position.x ) + ( player_laser[ i ].position.y - player.position.y ) * (
        player_laser[ i ].position.y - player.position.y ) );
    if ( player_laser[ i ].collide == true )
        player_laser.splice( i, 1 );

    // if player laser far from player, delete 
    else if ( distance_from_player > 3000 )
        player_laser.splice( i, 1 );

}
```
