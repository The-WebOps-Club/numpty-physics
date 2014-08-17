var body= new Box2D.b2BodyDef();
var edgeshape=[];
var count=0;
var bodycreated;
var verticesList=[];
var embox2dTest_drawing = function() {
    //constructor
}

embox2dTest_drawing.prototype.setNiceViewCenter = function() {
    //called once when the user changes to this test from another test
    PTM = 30;
    setViewCenterWorld( new b2Vec2(0,0), true );
}

embox2dTest_drawing.prototype.setup = function() {
    //set up the Box2D scene here - the world is already created
			canvas.onmousedown=function()
				{
   				  edgeshape=[];
				  verticesList=[];
   				  context.save();
				  context.setTransform(1,0,0,1,0,0);
				var x=event.pageX-canvas.offsetLeft;
				var y=event.pageY-canvas.offsetTop;				
				context.beginPath();
				context.moveTo(x,y);
				body.set_position(new b2Vec2(0,0));
				body.set_type(b2_dynamicBody);
				canvas.onmousemove=function()
					{
					  var x=event.pageX-canvas.offsetLeft;
					  var y=event.pageY-canvas.offsetTop;
					  verticesList.push({ x : mousePosWorld.x, y : mousePosWorld.y});
					  context.strokeStyle='white';
					  //run= false;
					  context.lineWidth=1;
					  count++;
					  if(count%10==0){
					  
					    context.lineTo(x,y);
						context.stroke();
						edgeshape.push(new b2Vec2(mousePosWorld.x,mousePosWorld.y));
						}
					}
              }		
			canvas.onmouseup=function()
		      { 
			   context.restore();
			   //console.log('mouseup');
			   canvas.onmousemove=function()
					{ 
					 var x=mousePosPixel.x;
					 var y=mousePosPixel.y;
					}
			  if(edgeshape.length !== 0){
			  shape= new createChainShape(edgeshape,false);
			  console.log(shape);
			  bodycreated=world.CreateBody(body);
			  bodycreated.CreateFixture(shape,1.0);
			  bodycreated.userData={'verticesList' : verticesList};
			  console.log(verticesList.length);
			  }
			  for(var j in edgeshape){
				Box2D.destroy(edgeshape[j]);
			  }
			  }
}

embox2dTest_drawing.prototype.step = function() {
    //this function will be called at the beginning of every time step
}

embox2dTest_drawing.prototype.onKeyDown = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is pressed
    }
}

embox2dTest_drawing.prototype.onKeyUp = function(canvas, evt) {
    if ( evt.keyCode == 65 ) { // 'a'
        //do something when the 'a' key is released
    }
}
