var embox2dTest_level3 = function() {
    //constructor
}

embox2dTest_level3.prototype.setNiceViewCenter = function() {
    //called once when the user changes to this test from another test
    PTM = 30;
    setViewCenterWorld( new b2Vec2(0,0), true );
}

embox2dTest_level3.prototype.setup = function() {
    //set up the Box2D scene here - the world is already created
	
	fixture.set_density(1);
	fixture.set_restitution(0.5);
	fixture.set_friction(0.3);	
    //body = new b2BodyDef();
	body.set_type(b2_staticBody);
	body.set_position(new b2Vec2(0,0));
	body.set_angle(0.0);
    ground = world.CreateBody(body);
	
	shape.SetAsBox(10,0.05,new b2Vec2(-10,-9),0);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	
	shape.SetAsBox(5,0.05,new b2Vec2(4.2,-6.5),Math.PI/6);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	
	shape.SetAsBox(1.5,0.05,new b2Vec2(15,-9),0);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	
	shape.SetAsBox(8,0.05,new b2Vec2(19,0),Math.PI/2);
	fixture.set_shape(shape);
	ground.CreateFixture(fixture);
	ground.userData={};
	ground.userData.color = 'darksalmon';
	
	body.set_type(b2_staticBody);
	body.set_position(new b2Vec2(-10,-2.5));
	var support1 =world.CreateBody(body);
	fixture.set_density(100);
	shape.SetAsBox(0.5,0.2,new b2Vec2(-8,3),0);
	fixture.set_shape(shape);
	support1.CreateFixture(fixture);
	support1.userData={};
	support1.userData.color = getRandomColor();
	
	body.set_type(b2_dynamicBody);
	body.set_position(new b2Vec2(-10,-6));
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
	body.set_position(new b2Vec2(15,-7.5));
	
	fixture.set_shape(circleShape);
	fixture.set_density(0.2);
	circleShape.set_m_radius(0.5);
	ballBody = world.CreateBody(body);       
	ballBody.userData = {};
	ballBody.userData.color = 'rgb(237,173,21)';
	ballBody.userData.id = 'star';
	ballBody.CreateFixture(fixture);
	currentTest.hangingBodies();
	}

embox2dTest_level3.prototype.step = function() {
    //this function will be called at the beginning of every time step
	if(to_be_destroyed){
	    var body_reference = Box2D.wrapPointer(to_be_destroyed);
		world.DestroyBody(body_reference);
		//window.cancelAnimationFrame(requestId,5000);
		body_reference == null;
		//context.globalAlpha =0.4;
		to_be_destroyed = null;
		level=3;
		$("transition").css("zIndex",1);
		}
    
}


embox2dTest_level3.prototype.hangingBodies=function(){
		Bodies=null;prevbody=ground;
		
		var jd=new b2RevoluteJointDef();
		var ropeJoint=new b2RopeJointDef();
		//for(var j=-10;j<=10;j=j+20)
		{ 
		  ropeJoint.set_localAnchorA(new b2Vec2(-10,1.0));
		  var hangingbody=new b2BodyDef();
			for(var i=12;i>1;i--)
				{
				hangingbody.set_position(new b2Vec2(-22+i,1.0));
				hangingbody.set_angle(Math.random());
				hangingbody.set_type(b2_dynamicBody);
				Bodies=world.CreateBody(hangingbody);
				anchor =new b2Vec2(1*i-22,1.0);
				jd.Initialize(prevbody,Bodies,anchor);
				
				/*shape=new b2PolygonShape();
				shape.SetAsBox(0.2,0.2);*/
				circleShape.set_m_radius(0.2);
				fixture = new b2FixtureDef();
				fixture.set_friction(1);
				fixture.set_shape(circleShape);
				fixture.set_restitution(0);
				fixture.set_density(6);
	           // fixture.get_filter().set_categoryBits(CATEGORY_SCENERY);
                //fixture.get_filter().set_maskBits(0);				
				Bodies.CreateFixture(fixture);
				Bodies.userData={};
				Bodies.userData.color = getRandomColor();;
				world.CreateJoint(jd);
				prevbody=Bodies;
				}
			    ropeJoint.set_localAnchorB(prevbody.GetPosition());
				ropeJoint.set_bodyA(ground);
				ropeJoint.set_bodyB(Bodies);
				ropeJoint.set_maxLength(1*14+0.01);
			    world.CreateJoint(ropeJoint);
       }
	   
	}
