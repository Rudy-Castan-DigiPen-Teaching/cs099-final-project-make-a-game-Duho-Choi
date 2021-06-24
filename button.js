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
let levelup_button3;

let shop_button = [];

class button
{
    // type 0 = normal button
    // type 1~10 = upgrade button
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

            // upgrade 1 ~ 10
            // upgrade 1 : Double Shot
        case 1:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            imageMode(CENTER);
            image(upgrade_img[0],this.x-10,this.y - 160,200,200);
            textAlign( CENTER, TOP );
            textSize( 45 );
            text( "Double Shot", this.x, this.y-50 );
            textSize( 22 );
            text("Shoot two lasers at once.",this.x,this.y);
            pop();

            break;

            // upgrade 2 : Barrier
        case 2:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            imageMode(CENTER);
            image(upgrade_img[1],this.x,this.y - 160,200,200);
            textAlign( CENTER, TOP );
            textSize( 50 );
            text( "Barrier", this.x, this.y - 55 );
            textSize(22);
            text("Protect player from attack.\nCharge barrier again when ",this.x,this.y);
            pop();

            break;

            // upgrade 3 : Missile turret
        case 3:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            textAlign( CENTER, TOP );
            textSize( 20 );
            text( "3", this.x, this.y );
            pop();

            break;

            // upgrade 4 : Invincibility
        case 4:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            textAlign( CENTER, TOP );
            textSize( 20 );
            text( "4", this.x, this.y );
            pop();

            break;

            // upgrade 5 : Critical Shot ( chance : 30%, dmg : 200% )
        case 5:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            textAlign( CENTER, TOP );
            textSize( 20 );
            text( "5", this.x, this.y );
            pop();

            break;

            // upgrade 6 : Guardian
        case 6:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            textAlign( CENTER, TOP );
            textSize( 20 );
            text( "6", this.x, this.y );
            pop();

            break;

            // upgrade 7 : Laser cannon
        case 7:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            textAlign( CENTER, TOP );
            textSize( 20 );
            text( "7", this.x, this.y );
            pop();

            break;

            // upgrade 8 : 
        case 8:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            textAlign( CENTER, TOP );
            textSize( 20 );
            text( "8", this.x, this.y );
            pop();

            break;

            // upgrade 9 : 
        case 9:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            textAlign( CENTER, TOP );
            textSize( 20 );
            text( "9", this.x, this.y );
            pop();

            break;

        case 10:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            textAlign( CENTER, TOP );
            textSize( 20 );
            text( "10", this.x, this.y );
            pop();

            break;

        case 11:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            textAlign( CENTER, TOP );
            textSize( 20 );
            text( "11", this.x, this.y );
            pop();

            break;

        case 12:
            this.draw_button();

            push();
            noStroke();
            fill( 0 );
            textAlign( CENTER, TOP );
            textSize( 20 );
            text( "12", this.x, this.y );
            pop();

            break;

        }

        pop();
    }

    clicked()
    {
        const mouseInButton = ( mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 ) && ( mouseY >
            this.y - this.height / 2 && mouseY < this.y + this.height / 2 );

        if ( mouseIsPressed && mouseInButton )
            return true;
        else
            return false;
    }
}
