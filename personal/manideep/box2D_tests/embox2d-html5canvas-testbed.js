
var PTM = 30;
//var fallingBall;
var world = null;
var mouseJointGroundBody;
var canvas;
var context;
var myDebugDraw;        
var myQueryCallback;
var mouseJoint = null;        
var run = true;
var frameTime60 = 0;
var statusUpdateCounter = 0;
var showStats = false;        
var mouseDown = false;
var shiftDown = false;        
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
    if ( shiftDown ) {
        canvasOffset.x += (mousePosPixel.x - prevMousePosPixel.x);
        canvasOffset.y -= (mousePosPixel.y - prevMousePosPixel.y);
        draw();
    }
}


function onMouseDown(canvas, evt) {  
   // console.log('mouse down 2');          
    updateMousePos(canvas, evt);
    mouseDown = true;
	
}

function onMouseUp(canvas, evt) {
    mouseDown = false;
    updateMousePos(canvas, evt);
}

function onMouseOut(canvas, evt) {
    onMouseUp(canvas,evt);
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
    else if ( evt.keyCode == 16 ) {//shift
        shiftDown = true;
    }
    
    if ( currentTest && currentTest.onKeyDown )
        currentTest.onKeyDown(canvas, evt);
    
    draw();
}

function onKeyUp(canvas, evt) {
    if ( evt.keyCode == 16 ) {//shift
        shiftDown = false;
    }
    
    if ( currentTest && currentTest.onKeyUp )
        currentTest.onKeyUp(canvas, evt);
}

function zoomIn() {
    var currentViewCenterWorld = getWorldPointFromPixelPoint( viewCenterPixel );
    PTM *= 1.1;
    var newViewCenterWorld = getWorldPointFromPixelPoint( viewCenterPixel );
    canvasOffset.x += (newViewCenterWorld.x-currentViewCenterWorld.x) * PTM;
    canvasOffset.y -= (newViewCenterWorld.y-currentViewCenterWorld.y) * PTM;
    draw();
}

function zoomOut() {
    var currentViewCenterWorld = getWorldPointFromPixelPoint( viewCenterPixel );
    PTM /= 1.1;
    var newViewCenterWorld = getWorldPointFromPixelPoint( viewCenterPixel );
    canvasOffset.x += (newViewCenterWorld.x-currentViewCenterWorld.x) * PTM;
    canvasOffset.y -= (newViewCenterWorld.y-currentViewCenterWorld.y) * PTM;
    draw();
}
        
function init() {
    
    canvas = document.getElementById("canvas");
    context = canvas.getContext( '2d' );
    canvasOffset.x = canvas.width/2;
    canvasOffset.y = canvas.height/2;
    
    canvas.addEventListener('mousemove', function(evt) {
        onMouseMove(canvas,evt);
    }, false);
    
    canvas.addEventListener('mousedown', function(evt) {
        onMouseDown(canvas,evt);
    }, false);
    
    canvas.addEventListener('mouseup', function(evt) {
        onMouseUp(canvas,evt);
    }, false);
    
    canvas.addEventListener('mouseout', function(evt) {
        onMouseOut(canvas,evt);
    }, false);
    
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
    myDebugDraw = getCanvasDebugDraw();
myDebugDraw.SetFlags(e_shapeBit);
    if ( world != null ) 
        Box2D.destroy(world);
        
    world = new b2World( new b2Vec2(0.0, -10.0) );
	
    world.SetDebugDraw(myDebugDraw);
   
    mouseJointGroundBody = world.CreateBody( new b2BodyDef() );
    
    var e = document.getElementById("testSelection");
    var v = e.options[e.selectedIndex].value;
    
    eval( "currentTest = new "+v+"();" );
    
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
		
		world.DrawDebugData();
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
        requestAnimationFrame( animate );
    step();
}

function pause() {
    run = !run;
    if (run)
        animate();
}
