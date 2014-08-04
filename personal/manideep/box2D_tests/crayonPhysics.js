var verticesList=[];
var lining = null;
var circleShape=new Box2D.b2CircleShape();
var embox2dTest_crayonPhysics = function() {
    //constructor
}

embox2dTest_crayonPhysics.prototype.setNiceViewCenter = function() {
    //called once when the user changes to this test from another test
    PTM = 30;
    setViewCenterWorld( new b2Vec2(0,0), true );
}

embox2dTest_crayonPhysics.prototype.setup = function() {
    //set up the Box2D scene here - the world is already created
	vector = new b2Vec2(0,0);
    //setting static bodies
    {	
	var body = new b2BodyDef();
	body.set_type(b2_staticBody);
	body.set_position(new b2Vec2(0,0));
	body.set_angle(0.0);
	ground = world.CreateBody(body);
	shape =  new b2PolygonShape();
	shape.SetAsBox(2.5,0.2,new b2Vec2(-15,0),0);
	ground.CreateFixture(shape,1.0);
	shape.SetAsBox(20,0.5,new b2Vec2(0,-10),0);
	ground.CreateFixture(shape,1.0);
	shape.SetAsBox(0.1,2,new b2Vec2(18,-8),0);
	ground.CreateFixture(shape,1.0);
	shape.SetAsBox(2,0.1,new b2Vec2(16,-6),0);
	ground.CreateFixture(shape,1.0);
	
	}
	body.set_type(b2_dynamicBody);
	body.set_position(new b2Vec2(-15,1));
	circleShape.set_m_radius(1);
	ballBody =world.CreateBody(body);
	ballBody.CreateFixture(circleShape,0.01);
	ballBody.userData.color = 'yellow';
	ballBody.userData.id = 'ball';
	body.set_type(b2_dynamicBody);
	body.set_position(new b2Vec2(17,-7.5));
	circleShape.set_m_radius(0.5);
	ballBody = world.CreateBody(body);
	ballBody.userData.color = 'orange';
	ballBody.userData.id = 'star';
	ballBody.CreateFixture(circleShape,0.005);
	
	currentTest.setContactListener();
	canvas.onmousedown=function()
				{ 
				  console.log('mousedown');
				  lining = true;
   				  edgeshape=[];
				  verticesList=[];
               }	
	canvas.onmousemove=function(){
					context.save();
					context.setTransform(1,0,0,1,0,0);
					if(lining){
					  body.set_position(new b2Vec2(0,0));
					  body.set_type(b2_dynamicBody);
					  var x=event.pageX-canvas.offsetLeft;
					  var y=event.pageY-canvas.offsetTop;
					  verticesList.push({ x : mousePosWorld.x, y : mousePosWorld.y});
					  count = 0;
					 /*if(count%10==0){
						edgeshape.push(new b2Vec2(mousePosWorld.x,mousePosWorld.y));
						//}*/
						count++;
					}
					context.restore();
					}
	canvas.onmouseup=function(){
				lining = false;
				//edgeshape.push(new b2Vec2(mousePosWorld.x,mousePosWorld.y));
				//context.restore();
				console.log('mouseup');
			   //console.log('mouseup');
			   for(var count =0;count < verticesList.length;count = count +1){
					console.log('count :'+ count);
					edgeshape.push(new b2Vec2(verticesList[count].x,verticesList[count].y));
				}
			  if(edgeshape.length > 10){
			  //console.log(1);
				bodycreated=world.CreateBody(body);
				console.log('x : ' + bodycreated.GetPosition().get_x(),'y : ' +bodycreated.GetPosition().get_y());
				for(var fixtureCount = 0;fixtureCount<edgeshape.length-1;fixtureCount++)
					{
					var width = 0.5*getDistance(edgeshape[fixtureCount],edgeshape[fixtureCount+1]);
					var height =0.025;
					var position = getPosition(edgeshape[fixtureCount],edgeshape[fixtureCount+1]);
					//console.log('x :'+position.get_x() +'y : '+position.get_y());
					var angle =getAngle(edgeshape[fixtureCount],edgeshape[fixtureCount+1]);
					//console.log(angle);
					shape.SetAsBox(width,height,position,angle);
					 bodycreated.CreateFixture(shape,1.0);
					}
			  
				bodycreated.userData.verticesList = verticesList;
				bodycreated.userData.userDrawn = true;
				bodycreated.userData.group = 'drawn';
				//console.log(verticesList.length);
				verticesList=[];
			   
			  //console.log('doing');
			  } 
	}
	}

embox2dTest_crayonPhysics.prototype.step = function() {
    //this function will be called at the beginning of every time step
}

embox2dTest_crayonPhysics.prototype.setContactListener = function(){
	myContactListener = new b2ContactListener();
	Box2D.customizeVTable(myContactListener,[{
		original : Box2D.b2ContactListener.prototype.EndContact,
		replacement : function(thsPtr,contactPtr){
							var contact = Box2D.wrapPointer(contactPtr,b2Contact);
							 body1 = contact.GetFixtureA().GetBody();
							 body2 = contact.GetFixtureB().GetBody();
							console.log('listener');
							if(body1.userData.id == 'ball' && body2.userData.id == 'star'){
								world.DestroyBody(body2);
								body2 == null;
								}
							else if(body1.userData.id == 'star' && body2.userData.id == 'ball'){
								world.DestroyBody(body1);
								body1 ==null;
								}
			          }
			}])
		world.SetContactListener(myContactListener);
		}
							
	


