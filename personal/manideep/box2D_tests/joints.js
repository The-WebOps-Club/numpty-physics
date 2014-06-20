var body1,body2,ground;
var fixture,shape,body;
var embox2dTest_joints = function() {
    //constructor
}

embox2dTest_joints.prototype.setNiceViewCenter = function() {
    //called once when the user changes to this test from another test
    PTM = 30;
    setViewCenterWorld( new b2Vec2(0,0), true );
}

embox2dTest_joints.prototype.setup = function() {
    //set up the Box2D scene here - the world is already created
	//setting up the incline
	a=Date.now();
	 body=new b2BodyDef();
		body.set_position(new b2Vec2(0,0));
		body.set_angle(0);
		body.set_type(b2_staticBody);
	 ground=world.CreateBody(body);
	 shape=new b2PolygonShape();
		shape.SetAsBox(25,0.25);
	 fixture=new b2FixtureDef();
		fixture.set_shape(shape);
		fixture.set_density(10.0);
		fixture.set_restitution(0.5);
	ground.CreateFixture(fixture);
	//setting up body1
	body=new b2BodyDef();
		body.set_position(new b2Vec2(-15,5));
		body.set_angle(-Math.PI/6);
		body.set_type(b2_dynamicBody);
	 body1=world.CreateBody(body);
	shape=new b2CircleShape();
		shape.set_m_radius(1.5);
		fixture=new b2FixtureDef();
		fixture.set_shape(shape);
		fixture.set_density(5.0);
		fixture.set_restitution(0.5);
	body1.CreateFixture(fixture);
	//setting up body2
	 body=new b2BodyDef();
		body.set_position(new b2Vec2(-12,5));
		body.set_angle(-Math.PI/6);
		body.set_type(b2_dynamicBody);
	 body2=world.CreateBody(body);
	 shape=new b2CircleShape();
	shape.set_m_radius(0.75);
		fixture=new b2FixtureDef();
		fixture.set_shape(shape);
		fixture.set_density(5.0);
		fixture.set_restitution(0.5);
	body2.CreateFixture(fixture);
	//Setting up a support rod
	body=new  b2BodyDef();
		body.set_position(new b2Vec2(-13.5,5));
	    body.set_type(b2_dynamicBody);
		body.set_userData({
		                    color:'red'});
	rod=world.CreateBody(body);
	shape=new b2PolygonShape();
		shape.SetAsBox(1.5,0.05);
    fixture=new b2FixtureDef();
		fixture.set_shape(shape);
		fixture.set_density(2.5);
	rod.CreateFixture(fixture);
	//setting up a joint
	joint1=new b2RevoluteJointDef();
		joint1.Initialize(body1,rod,body1.GetWorldCenter());
		//console.log(joint1);
		joint1.set_maxMotorTorque(10);
		joint1.set_motorSpeed(1);
		joint1.set_enableMotor(true);
		rearJoint=Box2D.castObject(world.CreateJoint(joint1),b2RevoluteJoint);
	joint2=new b2RevoluteJointDef();
		joint2.Initialize(body2,rod,body2.GetWorldCenter());
		joint2.set_maxMotorTorque(5);
		joint2.set_motorSpeed(1);
		joint2.set_enableMotor(true);
		frontJoint=Box2D.castObject(world.CreateJoint(joint2),b2RevoluteJointDef);
		
		//console.log(body1.GetUserData());
		
}

embox2dTest_joints.prototype.step = function() {
    //this function will be called at the beginning of every time step
	if(body1.GetPosition().get_x()-1.5>=20)
		   {  
		     //world.DestroyJoint(rearJoint);
			 //world.DestroyJoint(frontJoint);
		     /*world.DestroyBody(body1);
			 world.DestroyBody(body2);*/
		     //console.log(body1);
             //console.log(body1.GetPosition().get_x());			 
			 //currentTest.setup();
		   }
	rearJoint.SetMotorSpeed(rearJoint.GetMotorSpeed()+1/60);
}

embox2dTest_joints.prototype.onKeyDown = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is pressed
    }
}

embox2dTest_joints.prototype.onKeyUp = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is released
    }
}