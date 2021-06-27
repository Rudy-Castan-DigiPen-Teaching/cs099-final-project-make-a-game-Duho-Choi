// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

// player shooting laser
function player_blastLaser()
{
    if ( current_screen == game_screen )
    {
        player_laser.push( new laser( player, player.fireDmg ) );
        laser_sound.play();
    }
}

// enemies shooting laser
function enemy_blastLaser( shooter )
{
    enemy_laser.push( new laser( enemy[ shooter ], enemy[ shooter ].fireDmg ) );
}

// enemies attacking
function enemy_attack()
{
    let enemy_fire = 3000;
    for ( let i = 0; i < enemy.length; i++ )
    {
        if ( enemy[ i ].shooting_laser == false )
        {
            enemy[ i ].shooting_laser = true;
            enemy_blastLaser( i );
            setTimeout( function ()
            {
                if ( enemy.length > i )
                {
                    enemy[ i ].shooting_laser = false;
                }
            }, enemy_fire );
        }
    }
}

// upgrade 3 : if keyboard space key pressed, shock wave
let shockwave_used = false;
let shockwave_effect = false;

function keyPressed()
{
    let shockwave_delay = 15000;

    if ( keyCode == 32 )
    {
        if ( player_upgrade.includes( 4 ) && current_screen == game_screen )
        {
            if ( shockwave_used == false )
            {
                shock_wave();
                shockwave_used = true;
                shockwave_effect = true;
                setTimeout( function ()
                {
                    shockwave_effect = false;
                }, 800 );
                setTimeout( function ()
                {
                    shockwave_used = false
                }, shockwave_delay );
            }
        }
    }
}

function keyReleased()
{

}

// if mouse left button pressed, shoot laser
// upgrade 4 :shoot missile with lasers

let fired = false;
let missile_fired = false;

function mousePressed()
{
    let fireDelay = 1000 / player.fireRate;

    if ( mouseButton === LEFT && current_screen == game_screen )
    {
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

// release mouse left = stop shooting laser & missile
function mouseReleased()
{
    mouseWasPressed = false;
    if ( mouseButton === LEFT || mouseButton === RIGHT )
    {
        clearInterval( blast_interval );
        clearInterval( missile_interval );
    }
}

// upgrade 4 : Shock Wave
function shock_wave()
{
    for ( let i = 0; i < enemy.length; i++ )
    {
        const distance = sqrt( ( player.position.x - enemy[ i ].position.x ) * ( player.position.x - enemy[ i ].position
            .x ) + (
            player.position.y - enemy[ i ].position.y ) * ( player.position.y - enemy[ i ].position.y ) );
        if ( distance <= 700 )
        {
            enemy[ i ].hp -= player.fireDmg * 3;
        }
    }
}

function shock_wave_effect()
{

}

// entering shop
function enter_shop()
{
    current_screen = shop_screen;
    player.position.x = main_base.x + main_base.width * 2;
    player.position.y = main_base.y;
    player.velocity.setLength( 0 );
    player.velocity.setAngle( 0 );
    player.acceleration.setLength( 0 );
}

// upgrade player
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

// upgrade enemies
function enemy_upgrade()
{
    for(let i = 0 ; i < enemy.length ; i++)
    {
        enemy[i].level = 1 + int(player.level / 3);
        if(i == 0)
            enemy_level = enemy[i].level;
        enemy[i].fireDmg = 4 + enemy[i].level * 3;
        enemy[i].max_hp = 50 + enemy[i].level * 40;
        enemy[i].speed_max = 3 + enemy[i].level * 1;
    }
}

// level up
function level_up()
{
    // heal player hp
    player.hp += player.max_hp / 5;

    player.level += 1;
    player.exp = 0;
    player.max_exp += 30;
    player.acceleration.setLength( 0 );

    // upgrade player every 3 levels
    if ( player.level % 3 == 0 && 0 in upgrade_list )
    {
        // set two upgrade options
        let levelup_1 = int( random( 1, upgrade_list.length - 0.01 ) );
        upgrade1 = upgrade_list[ levelup_1 ];
        levelup_button1.type = upgrade1;
        upgrade_list.splice( levelup_1, 1 );

        let levelup_2 = int( random( 1, upgrade_list.length - 0.01 ) );
        upgrade2 = upgrade_list[ levelup_2 ];
        levelup_button2.type = upgrade2;
        upgrade_list.splice( levelup_2, 1 );

        max_enemy++;
        current_screen = level_up_screen;
    }
}

// spawn enemy 2000 lengths away from player
function spawn_enemy()
{
    IsEnemySpawning = true;

    let position_x = int( random( player.position.x + 2000, player.position.x - 2000 ) );
    let y_random = random( 0, 10 );
    let y_pos;
    if ( y_random > 5 )
        y_pos = 1;
    else
        y_pos = -1;

    let position_y = int( y_pos * sqrt( 2000 * 2000 - position_x * position_x ) );

    if ( enemy.length < max_enemy )
        enemy.push( new spaceship( position_x, position_y, 30, enemy_level ) );
}

// enemies heading to player
function head_to_player()
{
    for ( let i = 0; i < enemy.length; i++ )
    {
        let direction = atan2( player.position.y - enemy[ i ].position.y, player.position.x - enemy[ i ].position.x );
        enemy[ i ].velocity.setAngle( direction );

        // if enemy is too close to player, slow down
        let dist = sqrt( ( player.position.x - enemy[ i ].position.x ) * ( player.position.x - enemy[ i ].position.x ) +
            ( player.position.y - enemy[ i ].position.y ) * ( player.position.y - enemy[ i ].position.y ) );

        if ( dist > 350 )
            enemy[ i ].velocity.setLength( enemy[ i ].speed_max );
        else
            enemy[ i ].velocity.setLength( 0.3 );
    }
}
