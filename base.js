// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class base
{
    constructor( start_x, start_y )
    {
        this.x = start_x;
        this.y = start_y;
        this.width = 140;
        this.height = 240;
    }

    draw()
    {
        // base
        push();
        imageMode( CENTER );
        image( base_img, this.x, this.y );
        pop();
    }

    draw_interface( player )
    {
        // player coin
        push();
        noStroke();
        fill( 255 );
        image( coin_img, width / 4, height / 15, 150, 150 );
        textAlign( LEFT, CENTER );
        textSize( 50 );
        text( ": " + player.coin, width * 2 / 7, height / 15 );
        pop();

        // upgrade stats
        push();
        rectMode( CORNER );

        // texts
        noStroke();
        fill( 255 );
        textSize( 32 );
        textAlign( LEFT, TOP );
        text( "HP  Lv. " + hp_level + "\nCurrent Status : " + player.max_hp, width / 40, height / 2 - 220 );
        text( "Attack DMG  Lv. " + dmg_level + "\nCurrent Status : " + player.fireDmg, width / 40, height / 2 -
            110 );
        text( "Fire Rate  Lv. " + fire_rate_level + "\nCurrent Status : " + player.fireRate, width / 40, height / 2 );
        text( "Max Speed  Lv. " + spd_level + "\nCurrent Status : " + player.speed_max, width / 40, height / 2 +
            110 );
        text( "Armor  Lv. " + armor_level + "\nCurrent Status : " + player.armor + "%", width / 40, height / 2 + 220 );

        // current upgrade
        strokeWeight( 5 );
        stroke( "#58D68D" );
        fill( "#28B463" );
        // hp
        for ( let i = 0; i < hp_level; i++ )
        {
            rect( width / 2 + 20 + 55 * i, height / 2 - 220, 35, 70 );
        }
        // damage
        for ( let i = 0; i < dmg_level; i++ )
        {
            rect( width / 2 + 20 + 55 * i, height / 2 - 110, 35, 70 );
        }
        // fire rate
        for ( let i = 0; i < fire_rate_level; i++ )
        {
            rect( width / 2 + 20 + 55 * i, height / 2 + 0, 35, 70 );
        }
        // speed
        for ( let i = 0; i < spd_level; i++ )
        {
            rect( width / 2 + 20 + 55 * i, height / 2 + 110, 35, 70 );
        }
        // armor
        for ( let i = 0; i < armor_level; i++ )
        {
            rect( width / 2 + 20 + 55 * i, height / 2 + 220, 35, 70 );
        }
        for ( let i = 0; i < armor_level; i++ )
        {
            rect( width / 2 + 20 + 55 * i, height / 2 + 330, 35, 70 );
        }

        // upgrade capacity
        stroke( "#ffcc66" );
        fill( "#ff9933" );
        for ( let j = hp_level; j < 10; j++ )
        {
            rect( width / 2 + 20 + 55 * j, height / 2 - 220, 35, 70 );
        }
        for ( let j = dmg_level; j < 10; j++ )
        {
            rect( width / 2 + 20 + 55 * j, height / 2 - 110, 35, 70 );
        }
        for ( let j = fire_rate_level; j < 10; j++ )
        {
            rect( width / 2 + 20 + 55 * j, height / 2, 35, 70 );
        }
        for ( let j = spd_level; j < 10; j++ )
        {
            rect( width / 2 + 20 + 55 * j, height / 2 + 110, 35, 70 );
        }
        for ( let j = armor_level; j < 10; j++ )
        {
            rect( width / 2 + 20 + 55 * j, height / 2 + 220, 35, 70 );
        }
        for ( let j = armor_level; j < 10; j++ )
        {
            rect( width / 2 + 20 + 55 * j, height / 2 + 330, 35, 70 );
        }
        pop();

        // upgrade buttons
        for(let i = 0 ; i < 6 ; i ++)
        {
            switch(i)
            {
                case 0:
                    shop_button[i].draw("Upgrade\nCost : ",28);
                    break;
                case 1:
                    shop_button[i].draw("Upgrade\nCost : ",28);
                    break;
                case 2:
                    shop_button[i].draw("Upgrade\nCost : ",28);
                    break;
                case 3:
                    shop_button[i].draw("Upgrade\nCost : ",28);
                    break;
                case 4:
                    shop_button[i].draw("Upgrade\nCost : ",28);
                    break;
                case 5:
                    shop_button[i].draw("Upgrade\nCost : ",28);
                    break;
            }
        }

    }
}
