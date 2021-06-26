// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

// buttons
let start_button;
let play_button;
let options_button;
let credits_button;
let return_main_button;
let return_game_button;

let levelup_button1;
let levelup_button2;

let shop_button = [];

class button
{
    // type 0 = normal button
    // type 1~8 = upgrade button
    constructor( x_pos, y_pos, width, height, typ = 0 )
    {
        this.x = x_pos;
        this.y = y_pos;
        this.width = width;
        this.height = height;
        this.type = typ;
    }

    draw_button()
    {
        push();
        strokeWeight( 5 );
        rectMode( CENTER );
        rect( this.x, this.y, this.width, this.height );
        pop();
    }

    draw( txt, size = this.height * 3 / 4 )
    {
        const mouseInButton = ( mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 ) && ( mouseY >
            this.y - this.height / 2 && mouseY < this.y + this.height / 2 );

        // decide button color, if mouseInButton, change color
        if ( mouseInButton == true )
        {
            stroke( "#ffcc66" );
            fill( "#ff9933" );
        }
        else
        {
            stroke( "#ff9933" );
            fill( "#ffcc66" );
        }

        // make buttons
        push();
        imageMode( CENTER );

        switch ( this.type )
        {
            // normal button
        case 0:
            this.draw_button();

            push();
            fill( 0 );
            noStroke();
            textAlign( CENTER, CENTER );
            textSize( size );
            text( txt, this.x, this.y );
            pop();

            break;

            // upgrade 1 ~ 8
            // upgrade 1 : Double Shot
        case 1:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            imageMode( CENTER );
            image( upgrade_img[ 0 ], this.x - 10, this.y - 160, 200, 200 );
            textAlign( CENTER, TOP );
            textSize( 45 );
            text( "Double Shot", this.x, this.y - 30 );
            textSize( 22 );
            text( "Shoot two lasers at once\nTwo lasers will move in\n parallel.", this.x, this.y + 100 );
            pop();

            break;

            // upgrade 2 : Barrier
        case 2:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            imageMode( CENTER );
            image( upgrade_img[ 1 ], this.x, this.y - 160, 200, 200 );
            textAlign( CENTER, TOP );
            textSize( 45 );
            text( "Barrier", this.x, this.y - 30 );
            textSize( 22 );
            text( "Protect player from attack \nfor 2 seconds after damaged\nWhen barrier broken,\ncharge barrier again\nafter 10 seconds",
                this.x, this.y + 80 );
            pop();

            break;

            // upgrade 3 : Missile turret
        case 3:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            imageMode( CENTER );
            image( upgrade_img[ 2 ], this.x, this.y - 160, 90, 200 );
            textAlign( CENTER, TOP );
            textSize( 45 );
            text( "Missile Turret", this.x, this.y - 30 );
            textSize( 22 );
            text( "Shooting missile when\nmouse left button is pressed\nMissile has 2.5X damage\nof your laser damage\n(Cooldown : 1 second)",
                this.x, this.y + 90 );
            pop();

            break;

            // upgrade 4 : Shock Wave
        case 4:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            imageMode( CENTER );
            image( upgrade_img[ 2 ], this.x, this.y - 160, 200, 200 );
            textAlign( CENTER, TOP );
            textSize( 50 );
            text( "Shock Wave", this.x, this.y - 30 );
            textSize( 22 );
            text( "When mouse middle button\nclicked, use shock wave\nDamages all nearby enemies\nShock wave has 3X Damage\nof your laser\n(Cooldown : 20 sec)",
                this.x, this.y + 65 );
            pop();

            break;

            // upgrade 5 : Critical Shot ( chance : 30%, dmg : 200% )
        case 5:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            imageMode( CENTER );
            image( upgrade_img[ 4 ], this.x - 10, this.y - 160, 200, 200 );
            textAlign( CENTER, TOP );
            textSize( 50 );
            text( "Critical Shot", this.x, this.y - 30 );
            textSize( 22 );
            text( "Deals double damage\noccasionally when shooting\nenemy (30% Chance)", this.x, this.y + 100 );
            pop();

            break;

            // upgrade 6 : Heavy Armor
        case 6:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            imageMode( CENTER );
            image( upgrade_img[ 5 ], this.x, this.y - 160, 200, 200 );
            textAlign( CENTER, TOP );
            textSize( 48 );
            text( "Heavy Armor", this.x, this.y - 30 );
            textSize( 22 );
            text( "Gain additional armor, but\nbecome slower\n(+20 armor, -2.5 speed)", this.x, this.y + 100 );
            pop();

            break;

            // upgrade 7 : Double HP
        case 7:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            imageMode( CENTER );
            image( upgrade_img[ 6 ], this.x, this.y - 160, 200, 200 );
            textAlign( CENTER, TOP );
            textSize( 45 );
            text( "HP up", this.x, this.y - 30 );
            textSize( 22 );
            text( "Double your maximum HP", this.x, this.y + 120 );
            pop();

            break;

            // upgrade 8 : Guard
        case 8:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            imageMode( CENTER );
            image( upgrade_img[ 7 ], this.x, this.y - 160, 180, 150 );
            textAlign( CENTER, TOP );
            textSize( 45 );
            text( "Guard Angel", this.x, this.y - 30 );
            textSize( 22 );
            text( "Spawn little Guard Angel,\nrotates around player and \nguards approaching lasers", this
                .x, this.y + 120 );
            pop();

            break;
        }

        pop();
    }

    clicked()
    {
        const mouseInButton = ( mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 ) && ( mouseY >
            this.y - this.height / 2 && mouseY < this.y + this.height / 2 );

        if ( mouseIsPressed && mouseInButton && mouseWasPressed == false && mouseButton == LEFT )
        {
            mouseWasPressed = true;
            return true;
        }
        else
            return false;
    }
}
