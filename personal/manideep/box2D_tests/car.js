var direction = new Box2D.b2Vec2(0,0);
var CATEGORY_SCENERY=0x0001;
var embox2dTest_joints = function() {
    //constructor
}

embox2dTest_joints.prototype.setNiceViewCenter = function() {
    //called once when the user changes to this test from another test
    PTM = 30;
    setViewCenterWorld( new b2Vec2(0,7.5), true );
}

embox2dTest_joints.prototype.setup = function() {
    //set up the Box2D scene here - the world is already created
	//setting up the ground
	
	{
	 var body=new b2BodyDef();
	 ground=world.CreateBody(body);
	 var path=new b2Vec2(0,0);
	 var groundverts=[new b2Vec2(-19,20),new b2Vec2(-19,0),new b2Vec2(19,0),new b2Vec2(19,20)];
	 shape=createChainShape(groundverts);
	 fixture=new b2FixtureDef();
	 fixture.set_shape(shape);
	 ground.CreateFixture(fixture);
	}
	
	//setting up wheelbody1
	{
	body=new b2BodyDef();
	body.set_position(new b2Vec2(-15.5,5));
	body.set_angle(0);
	body.set_type(b2_dynamicBody);
	wheelbody1=world.CreateBody(body);
	wheelbody1.userData={
	                     id : 'wheel1'
						 };
	shape=new b2CircleShape();
	shape.set_m_radius(0.5);
	
	fixture=new b2FixtureDef();
	fixture.set_shape(shape);
	fixture.set_density(5.0);
	fixture.set_restitution(0.5);
	wheelbody1.CreateFixture(fixture);
	}
	//setting up wheelbody2
	{
	body=new b2BodyDef();
	body.set_position(new b2Vec2(-12.5,5));
	body.set_angle(0);
	body.set_type(b2_dynamicBody);
	wheelbody2=world.CreateBody(body);
	wheelbody2.userData={
	                     id : "wheel2"
						 };
	console.log(wheelbody2);
	console.log(wheelbody1);
	shape=new b2CircleShape();
	
	shape.set_m_radius(0.5);
	
	fixture=new b2FixtureDef();
	fixture.set_shape(shape);
	fixture.set_density(5.0);
	fixture.set_restitution(0.5);
	wheelbody2.CreateFixture(fixture);
	}
	
	//setting up car chasis
	{
	 var carVerts=[];
	 carVerts.push(new b2Vec2(-3,-1));
	 carVerts.push(new b2Vec2(3,-1));
	 carVerts.push(new b2Vec2(2.5,0));
	 carVerts.push(new b2Vec2(1.75,0));
	 carVerts.push(new b2Vec2(1,1));
	 carVerts.push(new b2Vec2(-3,1));
	 shape=new createPolygonShape(carVerts);
	 for(var j=0;j<carVerts.length;j++)
	   {
		//Box2D.Destroy(carVerts[j]);
	   }
	 body=new b2BodyDef();
	 body.set_type(b2_dynamicBody);
	 body.set_position(new b2Vec2(-13.5,6));
	 carbody=world.CreateBody(body);
	 carbody.userData={
	                   id : 'carbody'
					  };
	 carbody.CreateFixture(shape,1.0);
	 shape=new b2PolygonShape();
	 shape.SetAsBox(0.125/2,0.25,new b2Vec2(0,1.25),0);
	 carbody.CreateFixture(shape,1);
	}
	 //console.log('going');
	 //setting up gunbody
	{
	 gun=new b2BodyDef();
	 gun.set_position(new b2Vec2(carbody.GetPosition().get_x(),carbody.GetPosition().get_y()+1.25));
	 gun.set_angle(0*Math.PI);
	 gun.set_type(b2_dynamicBody);
	 gunbody=world.CreateBody(gun);
	 gunbody.userData={
	                   id : 'gun'
					   }
	 shape=new b2PolygonShape();
	 shape.SetAsBox(0.5,0.25);
	 gunbody.CreateFixture(shape,1);
	 shape=new b2PolygonShape();
	 shape.SetAsBox(1.25,0.125,new b2Vec2(1.75,0),0);
	 gunbody.CreateFixture(shape,1);
    }
	
	//setting up revolute joint
	{
	 /*weld=new b2WeldJointDef();
	 weld.set_bodyA(carbody);
	 weld.set_bodyB(gunbody);
	 weld.set_localAnchorA(carbody.GetLocalPoint(carbody.GetPosition()));
	 weld.set_localAnchorB(gunbody.GetLocalPoint(carbody.GetPosition()));
	 weldJoint=world.CreateJoint(weld);*/
	/* revolute=new b2RevoluteJointDef();
	 revolute.Initialize(carbody,gunbody,new b2Vec2(carbody.GetPosition().get_x(),carbody.GetPosition().get_y()+1.25));
	 revolute.set_collideConnected(true);
	 revolute.set_motorSpeed(5);
	 revolute.set_enableMotor(true);
	 revolute.set_maxMotorTorque(50);
	 revoluteJoint=Box2D.castObject(world.CreateJoint(revolute),b2RevoluteJoint);*/
	 
	}
	//setting up prismatic joint
		
	{
	 var prismatic=new b2PrismaticJointDef();
	 prismatic.Initialize(carbody,gunbody,gunbody.GetPosition(),new b2Vec2(0,1));
	 prismatic.set_lowerTranslation(0);
	 prismatic.set_upperTranslation(10);
	 prismatic.set_enableLimit(true);
	 prismatic.set_motorSpeed(0);
	 prismatic.set_maxMotorForce(50);
	 prismatic.set_enableMotor(true);
	 prismaticJoint= Box2D.castObject(world.CreateJoint(prismatic),b2PrismaticJoint);
	}
	//setting up wheeljoints

	{
	 var frontWheelJoint=new b2WheelJointDef();
	 frontWheelJoint.Initialize(carbody,wheelbody2,wheelbody2.GetPosition(),new b2Vec2(0,1));
	 frontJoint=Box2D.castObject(world.CreateJoint(frontWheelJoint),b2WheelJoint);
	 rearWheelJoint=new b2WheelJointDef();
	 rearWheelJoint.Initialize(carbody,wheelbody1,wheelbody1.GetPosition(),new b2Vec2(0,1));
	 rearWheelJoint.set_motorSpeed(0);
	 rearWheelJoint.set_maxMotorTorque(20);
	 rearWheelJoint.set_enableMotor(true);
     rearJoint=Box2D.castObject(world.CreateJoint(rearWheelJoint),b2WheelJoint);
	 }
	 canvas.addEventListener('keydown',currentTest.onKeyDown,false);
     canvas.addEventListener('click',currentTest.onClick,false);
     canvas.addEventListener('keyup',currentTest.onKeyUp,false);
     //adding contactListener
     currentTest.addContactListener();
	 currentTest.hangingBodies();
		
}

embox2dTest_joints.prototype.step = function() {
    //this function will be called at the beginning of every time step
	var futurepos=new b2Vec2(getWorldPointFromPixelPoint(viewCenterPixel).x+x,7.5);
	//console.log(wheelbody1.GetPosition().get_x());
	
}
	

embox2dTest_joints.prototype.onKeyDown = function(evt) {
   //do something
   //console.log('entered');
   event.preventDefault();
   {
	if ( evt.keyCode == 68 ) { // 'd'
        //do something when the 'd' key is pressed
      rearJoint.SetMotorSpeed(rearJoint.GetMotorSpeed()-10/60);
	  carbody.ApplyForce(new b2Vec2(100,0),carbody.GetPosition());
	}
  else if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is released
		rearJoint.SetMotorSpeed(rearJoint.GetMotorSpeed()+10/60);
		carbody.ApplyForce(new b2Vec2(-100,0),carbody.GetPosition());
    }
  else if(evt.keyCode == 32) {
	   //do something when the 'spacekey' is pressed.
	   rearJoint.SetMotorSpeed(0);
	   var breakImpulse=10*(carbody.GetLinearVelocity().get_x()>0 ?-1:1);
	   carbody.ApplyLinearImpulse(new b2Vec2(breakImpulse,0),carbody.GetPosition());
	   }	
   }
   if(evt.keyCode == 87) {
		//do something when 'w' key is pressed
		prismaticJoint.SetMotorSpeed(0.5);
		}
	if(evt.keyCode == 83){
	    prismaticJoint.SetMotorSpeed(-0.5)
		}
 }
embox2dTest_joints.prototype.onKeyUp=function(evt){
	if(evt.keyCode==68 ||evt.keyCode==65){
		rearJoint.SetMotorSpeed(0)
		}
		
	if(evt.keyCode==87){
		prismaticJoint.SetMotorSpeed(0);
	}
	if(evt.kyCode == 83){
		prismaticJoint.SetMotorSpeed(0);
	}
 }
 
embox2dTest_joints.prototype.onClick=function(){
	
	/*if(direction.y>0){
	var targetAngle=Math.atan(-direction.x/direction.y);
	}
	else if(direction.y<0){
	var targetAngle=Math.atan(-direction.x/direction.y);
	}
	console.log(targetAngle);*/
	//var targetAngle=Math.atan(direction.get_y()/direction.get_x());
	//var angle=revoluteJoint.GetBodyB().GetAngle();
	//while(Math.abs(angle-targetAngle)>0.01)
		/*{
		 console.log('entered');
		 angle=revoluteJoint.GetBodyB().GetAngle();
		console.log("angle :"+angle);
		 console.log("targetAngle :" +targetAngle);
		 //console.log(Math.abs(targetAngle-angle))
		 //revoluteJoint.EnableMotor(true);
		revoluteJoint.SetMotorSpeed(10);
		console.log(revoluteJoint.GetMotorSpeed());
		 }*/
	//revoluteJoint.GetBodyB().SetAngle(targetAngle);
	
	var x=gunbody.GetPosition().get_x()+3.2*Math.cos(gunbody.GetAngle());
	var y=gunbody.GetPosition().get_y()+3.2*Math.sin(gunbody.GetAngle());
	direction.set_x(mousePosWorld.x-x);
	direction.set_y(mousePosWorld.y-y);
	direction.Normalize();
	bullet=new b2BodyDef();
	bullet.set_position(new b2Vec2(x,y));
	//bullet.set_angle(targetAngle);
	bullet.set_type(b2_dynamicBody);
	bullet.set_gravityScale(2);
	bulletBody=world.CreateBody(bullet);
	bulletBody.userData={
	                     id : "bullet"
						 };
	//bulletBody.SetId('bullet');
	bulletShape=new b2CircleShape();
	bulletShape.set_m_radius(0.15);
	bulletBody.CreateFixture(bulletShape,10);
	bulletBody.ApplyLinearImpulse(new b2Vec2(100*direction.get_x(),100*direction.get_y()),bulletBody.GetWorldCenter());
   }
   embox2dTest_joints.prototype.addContactListener=function(){
        //console.log('entered');
		var listener=new b2ContactListener();
		console.log(listener)
		Box2D.customizeVTable(listener,[{
		original : Box2D.b2ContactListener.prototype.EndContact,
		replacement : function(thsPtr,contactPtr){
		    var contact=Box2D.wrapPointer(contactPtr,b2Contact);
			var bodyA=contact.GetFixtureA().GetBody();
			var bodyB=contact.GetFixtureB().GetBody();
			console.log(bodyA);
			if(bodyA.userData)
			  console.log(bodyA.userData.id);
			if(bodyB.userData)
			  console.log(bodyB.userData.id);  
			}
	}])
	world.SetContactListener(listener);
	}
	embox2dTest_joints.prototype.hangingBodies=function(){
		Bodies=null;prevbody=ground;
		
		var jd=new b2RevoluteJointDef();
		var ropeJoint=new b2RopeJointDef();
		//for(var j=-10;j<=10;j=j+20)
		{ 
		  ropeJoint.set_localAnchorA(new b2Vec2(j,1*15.5));
		  var hangingbody=new b2BodyDef();
			for(var i=15;i>1;i--)
				{
				hangingbody.set_position(new b2Vec2(15-i,1*15.5));
				hangingbody.set_angle(Math.random());
				hangingbody.set_type(b2_dynamicBody);
				Bodies=world.CreateBody(hangingbody);
				anchor =new b2Vec2(-1*i+15,1*15.5);
				jd.Initialize(prevbody,Bodies,anchor);
				
				shape=new b2PolygonShape();
				shape.SetAsBox(0.2,0.2);
				fixture = new b2FixtureDef();
				fixture.set_shape(shape);
				fixture.set_density(1);
	            fixture.get_filter().set_categoryBits(CATEGORY_SCENERY);
                fixture.get_filter().set_maskBits(0);				
				Bodies.CreateFixture(fixture);
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
	/*Box2D.b2Body.prototype.userData={
								 color : 'blue',
								 userDrawn : false
								}*/