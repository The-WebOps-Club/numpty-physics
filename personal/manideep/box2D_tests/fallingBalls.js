var fallingBall;
var embox2dTest_fallingBalls = function() {
    //constructor
}

embox2dTest_fallingBalls.prototype.setNiceViewCenter = function() {
    //called once when the user changes to this test from another test
    PTM = 30;
    setViewCenterWorld( new b2Vec2(0,canvas.height/(2*PTM)-0.5), true );
}
embox2dTest_fallingBalls.prototype.setup = function() {
    //set up the Box2D scene here - the world is already created
    // setting up the ground
	var body=new b2BodyDef();
		body.set_type(b2_staticBody);
		body.set_position(new b2Vec2(0,0));
		body.set_angle(0);
	var ground=world.CreateBody(body);
	var shape=new b2PolygonShape();
		shape.SetAsBox(canvas.width/(2),0.5);
	var fixture=new b2FixtureDef();
		fixture.set_shape(shape);
		fixture.set_restitution(1/Math.sqrt(2));
		fixture.set_density(10);
	ground.CreateFixture(fixture);
	console.log(ground.GetFixtureList().GetShape());
	canvas.onclick=function(){
		worldX=mousePosWorld.x;
		worldY=mousePosWorld.y;	
		var ball=new b2BodyDef();
			ball.set_type(b2_dynamicBody);
			ball.set_position(new b2Vec2(worldX,worldY));
			ball.set_angle(0.0);
		 fallingBall=world.CreateBody(ball);
		 console.log(fallingBall.GetFixtureList());
		shape = new b2CircleShape();
			shape.set_m_radius(1);
		fixture=new b2FixtureDef();
			fixture.set_restitution(1/Math.sqrt(2));
			fixture.set_shape(shape);
			fixture.set_density(2);
		fallingBall.CreateFixture(fixture);
	}
}

embox2dTest_fallingBalls.prototype.step = function() {
    //this function will be called at the beginning of every time step
	
	  if(fallingBall!=null)
		{    console.log(fallingBall);
	         if(Math.abs(fallingBall.GetPosition().get_x())>canvas.width/(2*PTM))
			 world.DestroyBody(fallingBall);
			 fallingBall=null;
        }
    }
embox2dTest_fallingBalls.prototype.onKeyDown = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is pressed
    }
}

embox2dTest_fallingBalls.prototype.onKeyUp = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is released
    }
}
