increment =0;
var embox2dTest_level2 = function() {
    //constructor
}

embox2dTest_level2.prototype.setNiceViewCenter = function() {
    //called once when the user changes to this test from another test
    PTM = 30;
    setViewCenterWorld( new b2Vec2(0,0), true );
}

embox2dTest_level2.prototype.setup = function() {
    //set up the Box2D scene here - the world is already created
	
    //setting static bodies
    	
	fixture.set_density(1);
	fixture.set_restitution(0.5);
	fixture.set_friction(0.3);	
    //body = new b2BodyDef();
	body.set_type(b2_staticBody);
	body.set_position(new b2Vec2(0,0));
	body.set_angle(0.0);
	var ground = world.CreateBody(body);
	
	shape.SetAsBox(2,0.25,new b2Vec2(-15,-2),0);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	
	shape.SetAsBox(1.5,0.25,new b2Vec2(8,4),0);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	ground.userData={};
	shape.SetAsBox(1.5,0.1,new b2Vec2(-10,-6),-Math.PI/4);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	ground.userData={};
	ground.userData.color = getRandomColor();
	
	body.set_type(b2_dynamicBody);
	body.set_position(new b2Vec2(-15,0));
	
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
	body.set_position(new b2Vec2(8,6));
	
	fixture.set_shape(circleShape);
	fixture.set_density(0.1);
	circleShape.set_m_radius(0.5);
	ballBody = world.CreateBody(body);       
	ballBody.userData = {};
	ballBody.userData.color = 'rgb(237,173,21)';
	ballBody.userData.id = 'star';
	ballBody.CreateFixture(fixture);
	
	body.set_type(b2_dynamicBody);
	body.set_position(new b2Vec2(0,-6));
	body.set_angle(0.0);
	shape.SetAsBox(3,0.25,new b2Vec2(0,0),0);
	sledge = world.CreateBody(body);
	sledge.CreateFixture(shape,1.0);
	sledge.userData={};
	var joint = new b2PrismaticJointDef();
	joint.Initialize(ground,sledge,ground.GetPosition(),new b2Vec2(0,1));
    joint.set_lowerTranslation(0);
    joint.set_upperTranslation(15);
	joint.set_enableLimit(true);
	joint.set_motorSpeed(3);
	joint.set_maxMotorForce(50);
	joint.set_enableMotor(true);
	prismaticJoint= Box2D.castObject(world.CreateJoint(joint),b2PrismaticJoint);
	currentTest.setContactListener();
	}

embox2dTest_level2.prototype.step = function() {
    //this function will be called at the beginning of every time step
	increment = increment +1/360;
		prismaticJoint.SetMotorSpeed(6*Math.sin(2*Math.PI *increment));
		if(to_be_destroyed){
	    var body_reference = Box2D.wrapPointer(to_be_destroyed);
		world.DestroyBody(body_reference);
		//window.cancelAnimationFrame(requestId,5000);
		body_reference == null;
		context.globalAlpha =0.4;
		to_be_destroyed = null;
		level = 2;
		$("#transition").css("zIndex",1);
		}
}

embox2dTest_level2.prototype.onKeyDown = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is pressed
    }
}

embox2dTest_level2.prototype.onKeyUp = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is released
    }
	}
	embox2dTest_level2.prototype.setContactListener = function(){
	myContactListener = new b2ContactListener();
	Box2D.customizeVTable(myContactListener,[{
		original : Box2D.b2ContactListener.prototype.BeginContact,
		replacement : function(thsPtr,contactPtr){
							var contact = Box2D.wrapPointer(contactPtr,b2Contact);
							var body1 = contact.GetFixtureA().GetBody();
							var body2 = contact.GetFixtureB().GetBody();
							// console.log(body1.a +'   ' + body2.a);
							//console.log('listener');
							//console.log(' body1 ' + body1.userData.id +' body2 ' +body2.userData.id);
							
							if(body1.userData.id == 'ball' && body2.userData.id == 'star'){
								to_be_destroyed = body2.a;
								//console.log(to_be_destroyed);
								}
							else if(body1.userData.id == 'star' && body2.userData.id == 'ball'){
								to_be_destroyed = body1.a;
								}
			          }
			}])
		world.SetContactListener(myContactListener);
		}