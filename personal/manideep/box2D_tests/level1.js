var to_be_destroyed;
var embox2dTest_level1 = function() {
    //constructor
}

embox2dTest_level1.prototype.setNiceViewCenter = function() {
    //called once when the user changes to this test from another test
    PTM = 30;
    setViewCenterWorld( new b2Vec2(0,0), true );
}

embox2dTest_level1.prototype.setup = function() {
    //set up the Box2D scene here - the world is already created
	//vector = new b2Vec2(0,0);
    //setting static bodies
    {
    fixture.set_density(1);
	fixture.set_restitution(0.5);
	fixture.set_friction(0.3);	
    
	body.set_type(b2_staticBody);
	body.set_position(new b2Vec2(0,0));
	body.set_angle(0.0);
	var ground = world.CreateBody(body);
	
	shape.SetAsBox(2.5,0.2,new b2Vec2(-15,0),0);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	
	shape.SetAsBox(5,0.5,new b2Vec2(-10,-10),0);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	
	shape.SetAsBox(0.1,2,new b2Vec2(18,-8),0);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	
	shape.SetAsBox(2,0.1,new b2Vec2(16,-8),0);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	
	ground.userData = {};
	ground.userData.color='#89BFC9';
	
	}
	body.set_type(b2_dynamicBody);
	body.set_position(new b2Vec2(-15,1));
	
	fixture.set_restitution(0.5);
	fixture.set_friction(0.3);
	circleShape.set_m_radius(1);
	var ballBody =world.CreateBody(body);
	
    fixture.set_shape(circleShape);
    fixture.set_density(0.1);    
	ballBody.CreateFixture(fixture);
	ballBody.userData = {};
	ballBody.userData.color = 'rgba(192,57,43,0.8)';
	ballBody.userData.id = 'ball';
	
	body.set_type(b2_dynamicBody);
	body.set_position(new b2Vec2(17,-7.5));
	
	fixture.set_shape(circleShape);
	fixture.set_density(0.2);
	circleShape.set_m_radius(0.5);
	ballBody = world.CreateBody(body);       
	ballBody.userData = {};
	ballBody.userData.color = 'rgb(237,173,21)';
	ballBody.userData.id = 'star';
	ballBody.CreateFixture(fixture);
	
	fixture.set_density(10);
	fixture.set_restitution(0.2);
	fixture.set_friction(0.6);
	}

embox2dTest_level1.prototype.step = function() {
    //this function will be called at the beginning of every time step
	
	if(to_be_destroyed){
	    var body_reference = Box2D.wrapPointer(to_be_destroyed);
		world.DestroyBody(body_reference);
		//window.cancelAnimationFrame(requestId,5000);
		body_reference == null;
		//context.globalAlpha =0.5;
		to_be_destroyed = null;
		level=1;
		$("#transition").css("zIndex",1);
		//resetScene();
		}
	
}


							
	


