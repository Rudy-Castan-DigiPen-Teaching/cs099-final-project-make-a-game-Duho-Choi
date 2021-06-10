// Name       : Duho Choi
// Assignment : make_a_game
// Course     : CS099
// Spring 2021

class Vec2
{
    // x and y parameters will set the vector's this.x and this.y fields.
    // The parameters are optional and default to zero.
    constructor(x=0,y=0)
    {
        this.x = x;
        this.y = y;
    }

    // Returns the calculated angle of the vector utilizing atan2().
    // Note that this vector's x and y is left unchanged.
    getAngle()
    {
        const angle = atan2(this.y,this.x);
        return angle;
    }

    // Preserving the current length of the vector, 
    // make this vector point in a direction based off of angle_in_radians.
    setAngle(angle_in_radians)
    {
        const length = this.getLength();
        this.x = cos(angle_in_radians) * length;
        this.y = sin(angle_in_radians) * length;
    }

    // Returns the calculated length of the vector utilizing Pythagoreans Theorem.
    // Note that this vector's x and y is left unchanged.
    getLength()
    {
        const length = sqrt(this.x * this.x + this.y * this.y);
        return length;
    }

    // Preserving the current direction of the vector,
    // make this vector have a new length specified by the length parameter.
    setLength(length)
    {
        const angle_in_radians = this.getAngle();
        this.x = cos( angle_in_radians ) * length;
        this.y = sin( angle_in_radians ) * length;
    }

    // Returns a new vector that is the sum of this vector and vector v2.
    // Mathematically equivalent to v̄1 + v̄2.
    // Note that this vector's x and y is left unchanged.
    add(v2)
    {
        const new_x = this.x + v2.x;
        const new_y = this.y + v2.y;
        return new Vec2(new_x,new_y);
    }

    // Modifies this vector by adding the vector v2 into itself.
    // It is logically like doing v1 = v1 + v2;
    addTo(v2)
    {
        this.x += v2.x;
        this.y += v2.y;
    }

    // Returns a new vector that is the difference of this vector and vector v2.
    // Mathematically equivalent to v̄1 - v̄2.
    // Note that this vector's x and y is left unchanged.
    subtract(v2)
    {
        const new_x = this.x - v2.x;
        const new_y = this.y - v2.y;
        return new Vec2(new_x,new_y);
    }

    // Modifies this vector by subtracting the vector v2 from itself.
    // It is logically like doing v1 = v1 - v2;
    subtractFrom(v2)
    {
        this.x -= v2.x;
        this.y -= v2.y;
    }

    // Returns a new vector that is the scaled version of this vector.
    // Mathematically equivalent to sv̄= (sx,sy). Note that this vector's x and y is left unchanged.
    multiply(scalar)
    {
        const new_x = scalar * this.x;
        const new_y = scalar * this.y;
        return new Vec2(new_x,new_y);
    }

    // Modifies this vector by scaling it's x and y components. 
    // It is logically like doing v = s*v;
    multiplyBy(scalar)
    {
        this.x *= scalar;
        this.y *= scalar;
    }

    // Returns a new vector that is the scaled version of this vector.
    // Mathematically equivalent to v̄/s = (x/s, y/s).
    // Note that this vector's x and y is left unchanged.
    divide(scalar)
    {
        const new_x = this.x / scalar;
        const new_y = this.y / scalar;
        return new Vec2(new_x,new_y);
    }

    // Modifies this vector by scaling it's x and y components.
    // It is logically like doing v = v/s;
    divideBy(scalar)
    {
        this.x /= scalar;
        this.y /= scalar;
    }
}
