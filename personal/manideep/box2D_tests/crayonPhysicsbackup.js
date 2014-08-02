var verticesList=[];
var CATEGORY_GROUND = 0x0001;
var CATEGORY_CHAIN = 0x0002;
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
	
	
	canvas.onmousedown=function()
				{
   				  edgeshape=[];
				  verticesList=[];
   				  context.save();
				  context.setTransform(1,0,0,1,0,0);
				  console.log('here');
				var x=event.pageX-canvas.offsetLeft;
				var y=event.pageY-canvas.offsetTop;				
				context.beginPath();
				context.moveTo(x,y);
				body.set_position(new b2Vec2(0,0));
				body.set_type(b2_dynamicBody);
				canvas.addEventListener('mousemove',function()
					{ console.log('entered');
					  var x=event.pageX-canvas.offsetLeft;
					  var y=event.pageY-canvas.offsetTop;
					  verticesList.push({ x : mousePosWorld.x, y : mousePosWorld.y});
					  if(count%10==0){
						//console.log('entered');
					    context.lineTo(x,y);
						context.stroke();
						edgeshape.push(new b2Vec2(mousePosWorld.x,mousePosWorld.y));
						}
					count++;
					},false);
              }		
			canvas.onmouseup=function()
		      { 
				edgeshape.push(new b2Vec2(mousePosWorld.x,mousePosWorld.y));
			   context.restore();
			   console.log('mouseup');
			   //canvas.onmousemove=function()
					{ 
					 var x=mousePosPixel.x;
					 var y=mousePosPixel.y;
					}
			  if(edgeshape.length > 1){
			  shape= new b2PolygonShape();
			  bodycreated=world.CreateBody(body);
			  for(var fixtureCount = 0;fixtureCount<edgeshape.length-1;fixtureCount++)
				{
				 var width = 0.5*getDistance(edgeshape[fixtureCount],edgeshape[fixtureCount+1]);
				 var height =0.05;
				 var position = getPosition(edgeshape[fixtureCount],edgeshape[fixtureCount+1]);
				 console.log('x :'+position.get_x() +'y : '+position.get_y());
				 var angle =getAngle(edgeshape[fixtureCount],edgeshape[fixtureCount+1]);
				 console.log(angle);
				 shape.SetAsBox(width,height,position,angle);
				 bodycreated.CreateFixture(shape,1.0);
				}
			  
			  bodycreated.userData={'verticesList' : verticesList};
			  bodycreated.userDrawn= true;
			  verticesList=[];
			 // bodycreated.GetFixtureList().GetFilterData().set_categoryBits(CATEGORY_CHAIN);
			 // bodycreated.GetFixtureList().GetFilterData().set_maskBits(0);
			 // bodycreated.GetFixtureList().GetFilter
			  }
			  for(var j in edgeshape){
				Box2D.destroy(edgeshape[j]);
			  }
			  }
	//setting 
	}

embox2dTest_crayonPhysics.prototype.step = function() {
    //this function will be called at the beginning of every time step
}

embox2dTest_crayonPhysics.prototype.onKeyDown = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is pressed
    }
}

embox2dTest_crayonPhysics.prototype.onKeyUp = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is released
    }
}