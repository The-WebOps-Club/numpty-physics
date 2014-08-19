var level= 1;
var PTM = 30;
//var fallingBall;
var world = null;
var verticesList=[];
var list =[];
var lining = null;
var circleShape=new Box2D.b2CircleShape();
var fixture = new Box2D.b2FixtureDef();
var body =new Box2D.b2BodyDef();
var shape =  new Box2D.b2PolygonShape();
var mouseJointGroundBody;
var canvas;
var context;
var requestId = null;
var myDebugDraw;        
var myQueryCallback;
var mouseJoint = null;        
var run = true;
var frameTime60 = 0;
var statusUpdateCounter = 0;
var showStats = false;        
var mouseDown = false;        
var mousePosPixel = {
    x: 0,
    y: 0
};
var prevMousePosPixel = {
    x: 0,
    y: 0
};        
var mousePosWorld = {
    x: 0,
    y: 0
};        
var canvasOffset = {
    x: 0,
    y: 0
};        
var viewCenterPixel = {
    x:600,
    y:300
};
var currentTest = null;

function myRound(val,places) {
    var c = 1;
    for (var i = 0; i < places; i++)
        c *= 10;
    return Math.round(val*c)/c;
}
        
function getWorldPointFromPixelPoint(pixelPoint) {
    return {                
        x: (pixelPoint.x - canvasOffset.x)/PTM,
        y: (pixelPoint.y - (canvas.height - canvasOffset.y))/PTM
    };
}

function updateMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    mousePosPixel = {
        x: evt.clientX - rect.left,
        y: canvas.height - (evt.clientY - rect.top)
    };
    mousePosWorld = getWorldPointFromPixelPoint(mousePosPixel);
}

function setViewCenterWorld(b2vecpos, instantaneous) {
    var currentViewCenterWorld = getWorldPointFromPixelPoint( viewCenterPixel );
    var toMoveX = b2vecpos.get_x() - currentViewCenterWorld.x;
    var toMoveY = b2vecpos.get_y() - currentViewCenterWorld.y;
    var fraction = instantaneous ? 1 : 0.25;
    canvasOffset.x -= myRound(fraction * toMoveX * PTM, 0);
    canvasOffset.y += myRound(fraction * toMoveY * PTM, 0);
}

function onMouseMove(canvas, evt) {
    prevMousePosPixel = mousePosPixel;
    updateMousePos(canvas, evt);
		//console.log('entered');
	    context.save();
		context.setTransform(1,0,0,1,0,0);
		if(lining){
			body.set_position(new b2Vec2(0,0));
			body.set_type(b2_dynamicBody);
			var x=evt.pageX-canvas.offsetLeft;
			var y=evt.pageY-canvas.offsetTop;
			verticesList.push({ x : mousePosWorld.x, y : mousePosWorld.y});
					}
					context.restore();           
}


function onMouseDown(canvas, evt) {  
				  lining = true;
   				  list=[];
				  verticesList=[];   
    updateMousePos(canvas, evt);
    mouseDown = true;
	
}

function onMouseUp(canvas, evt) {
    mouseDown = false;
    updateMousePos(canvas, evt);
	lining = false;
			   for(var count =0;count < verticesList.length;count = count +1){
					list.push(new b2Vec2(verticesList[count].x,verticesList[count].y));
				}
			  if(list.length >4){
				bodycreated=world.CreateBody(body);
				bodycreated.userData = {};
				for(var fixtureCount = 0;fixtureCount<list.length-1;fixtureCount++)
					{
					var width = 0.5*getDistance(list[fixtureCount],list[fixtureCount+1]);
					var height =0.045;
					var position = getPosition(list[fixtureCount],list[fixtureCount+1]);
					var angle =getAngle(list[fixtureCount],list[fixtureCount+1]);
					shape.SetAsBox(width,height,position,angle);
					fixture.set_shape(shape);
					 bodycreated.CreateFixture(fixture);
					}
			  
				bodycreated.userData.verticesList = verticesList;
				bodycreated.userData.color = getRandomColor();
				verticesList=[];
			  } 
}

function onMouseOut(canvas, evt) {
    mouseDown = false;
    updateMousePos(canvas, evt);
}

function onKeyDown(canvas, evt) {
    //console.log(evt.keyCode);
    if ( evt.keyCode == 80 ) {//p
        pause();
    }
    else if ( evt.keyCode == 82 ) {//r
        resetScene();
    }
    else if ( evt.keyCode == 83 ) {//s
        step();
    }
    else if ( evt.keyCode == 88 ) {//x
        zoomIn();
    }
    else if ( evt.keyCode == 90 ) {//z
        zoomOut();
    }
    else if ( evt.keyCode == 37 ) {//left
        canvasOffset.x += 32;
    }
    else if ( evt.keyCode == 39 ) {//right
        canvasOffset.x -= 32;
    }
    else if ( evt.keyCode == 38 ) {//up
        canvasOffset.y += 32;
    }
    else if ( evt.keyCode == 40 ) {//down
        canvasOffset.y -= 32;
    }
    
    if ( currentTest && currentTest.onKeyDown )
        currentTest.onKeyDown(canvas, evt);
    
    draw();
}

function onKeyUp(canvas, evt) {
    
    if ( currentTest && currentTest.onKeyUp )
        currentTest.onKeyUp(canvas, evt);
}
 
//main start
 
function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext( '2d' );
    canvasOffset.x = canvas.width/2;
    canvasOffset.y = canvas.height/2;
    
   /* canvas.addEventListener('mousemove', function(evt) {
        onMouseMove(canvas,evt);
    }, false);
    
    canvas.addEventListener('mousedown', function(evt) {
        onMouseDown(canvas,evt);
    }, false);
    
    canvas.addEventListener('mouseup', function(evt) {
        onMouseUp(canvas,evt);
    }, false);*/
    
    canvas.addEventListener('mouseout', function(evt) {
        onMouseOut(canvas,evt);
    }, false);
	$("canvas").bind("mousedown touchstart",function(evt){onMouseDown(canvas,evt);});
    $("canvas").bind("mousemove touchmove",function(evt){onMouseMove(canvas,evt);});
	$("canvas").bind("mouseup touchend",function(evt){onMouseUp(canvas,evt)});
    canvas.addEventListener('keydown', function(evt) {
        onKeyDown(canvas,evt);
    }, false);
    
    canvas.addEventListener('keyup', function(evt) {
        onKeyUp(canvas,evt);
    }, false);
	
}

function changeTest() {    
    resetScene();
    if ( currentTest && currentTest.setNiceViewCenter )
	   {
        currentTest.setNiceViewCenter();
	   }
    draw();
}

function createWorld() {
    if ( world != null ) 
        Box2D.destroy(world);
        
    world = new b2World( new b2Vec2(0.0, -10.0) );//the latter number fixes gravity
	
    mouseJointGroundBody = world.CreateBody( new b2BodyDef() );
    setContactListener();
    var e = document.getElementById("testSelection");
   // var v = e.options[e.selectedIndex].value;
    eval( "currentTest = new embox2dTest_level"+level+"();" );
   // currentTest = new embox2dTest_level3();
    currentTest.setup();
}

function resetScene() {
    createWorld();
    draw();
}

function step(timestamp) {
    
    if ( currentTest && currentTest.step ) 
        currentTest.step();
    
    if ( ! showStats ) {
        world.Step(1/60, 3, 2);
        draw();
        return;
    }
    
    var current = Date.now();
    world.Step(1/60, 3, 2);
    var frametime = (Date.now() - current);
    frameTime60 = frameTime60 * (59/60) + frametime * (1/60);
    
    draw();
    }


function draw() {   
    context.save(); 
        context.setTransform(1,0,0,1,0,0);
        context.drawImage(img,0,0,canvas.width,canvas.height);		
        context.translate(canvasOffset.x, canvasOffset.y);                
        context.scale(PTM,-PTM);
        context.lineWidth /= PTM;
      
        if(verticesList.length !== 0 ){
			initialDraw(verticesList,context);
		}
        context.fillStyle = 'rgb(255,255,0)';
		
		//world.DrawDebugData();
        canvasdraw(context);
		context.restore();        
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
})();

function animate() {
    if ( run )
        requestId = window.requestAnimFrame( animate );
    step();
}

function pause() {
    run = !run;
    if (run)
        animate();
}
