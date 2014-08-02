var embox2dTest_ball=function(){
}
embox2dTest_ball.prototype.setNiceViewCenter = function() {
    PTM = 20;
    setViewCenterWorld( new b2Vec2(0,7.5), true );
}
embox2dTest_ball.prototype.setup=function() {
        var ground = world.CreateBody(new b2BodyDef());
        var shape = new b2EdgeShape();
        shape.Set(new b2Vec2(-40.0, 0.0), new b2Vec2(40.0, 0.0));
        var fixture=new b2FixtureDef();
		fixture.set_shape(shape);
		fixture.set_restitution(1/Math.sqrt(2));
		fixture.set_density(10);
	ground.CreateFixture(fixture);
{
var ball=new Box2D.b2BodyDef();
	ball.set_type(Box2D.b2_dynamicBody);
	ball.set_angle(0.0);
	ball.set_position(new Box2D.b2Vec2(0,10));
	console.log(world);
shape = new Box2D.b2CircleShape();
	shape.set_m_radius(1);
	//shape.set_position(new b2Vec2(0.0, 5.0));
	ballBody=world.CreateBody(ball);
fixture=new b2FixtureDef();
			fixture.set_restitution(1/Math.sqrt(2));
			fixture.set_shape(shape);
			fixture.set_density(2);
		ballBody.CreateFixture(fixture);
	}
	}
embox2dTest_ball.prototype.onKeyDown = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is pressed
    }
}

embox2dTest_ball.prototype.onKeyUp = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is released
    }
}
