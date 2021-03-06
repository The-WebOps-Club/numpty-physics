
function drawAxes(ctx) {
    ctx.strokeStyle = 'rgb(192,0,0)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(1, 0);
    ctx.stroke();
    ctx.strokeStyle = 'rgb(0,192,0)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 1);
    ctx.stroke();
}

function setColorFromDebugDrawCallback(color) {            
    var col = Box2D.wrapPointer(color, b2Color);
    var red = (col.get_r() * 255)|0;
    var green = (col.get_g() * 255)|0;
    var blue = (col.get_b() * 255)|0;
    var colStr = red+","+green+","+blue;
    context.fillStyle ="rgba("+colStr+",0.5)";
    context.strokeStyle = "rgb("+colStr+")"; 
}

function drawSegment(vert1, vert2) {
    var vert1V = Box2D.wrapPointer(vert1, b2Vec2);
    var vert2V = Box2D.wrapPointer(vert2, b2Vec2); 
    context.save();	
    context.beginPath();
    context.moveTo(vert1V.get_x(),vert1V.get_y());
    context.lineTo(vert2V.get_x(),vert2V.get_y());
	context.strokeStyle="white";
	context.lineWidth= 1/30;
	//console.log('entered');
    context.stroke();
	context.restore();
}

function drawPolygon(vertices, vertexCount, fill) {
    context.beginPath();
	context.save();
    for(tmpI=0;tmpI<vertexCount;tmpI++) {
        var vert = Box2D.wrapPointer(vertices+(tmpI*8), b2Vec2);
        if ( tmpI == 0 )
            context.moveTo(vert.get_x(),vert.get_y());
        else
            context.lineTo(vert.get_x(),vert.get_y());
    }
    context.closePath();
    if (fill)
	    {
		context.fillStyle='rgb(255,0,0)';
        context.fill();
		}
		context.strokeStyle="darksalmon";
    context.stroke();
	context.restore();
}

function drawCircle(center, radius, axis, fill) {                    
    var centerV = Box2D.wrapPointer(center, b2Vec2);
    var axisV = Box2D.wrapPointer(axis, b2Vec2);
    context.save();
	context.beginPath();
    context.arc(centerV.get_x(),centerV.get_y(), radius, 0, 2 * Math.PI, false);
	context.fillStyle='rgb(128,255,255)';
	//console.log(this);
    if (fill)
        {
		 context.fill();
         //console.log(context.fillStyle);
        }
	context.strokeStyle='black';	
	context.stroke();
    
    if (fill) {
        //render axis marker
        var vert2V = copyVec2(centerV);
        vert2V.op_add( scaledVec2(axisV, radius) );
        context.beginPath();
        context.moveTo(centerV.get_x(),centerV.get_y());
        context.lineTo(vert2V.get_x(),vert2V.get_y());
        context.stroke();
    }
	context.restore();
}
 
function drawTransform(transform) {
    var trans = Box2D.wrapPointer(transform,b2Transform);
    var pos = trans.get_p();
    var rot = trans.get_q();
    
    context.save();
    context.translate(pos.get_x(), pos.get_y());
    context.scale(0.5,0.5);
    context.rotate(rot.GetAngle());
    context.lineWidth *= 2;
    drawAxes(context);
    context.restore();
}

function drawCenterMarker(center,radius){
	var centerV=Box2D.wrapPointer(center,b2Vec2);
	context.save();
	context.translate(centerV.get_x(),centerV.get_y());
	context.beginPath();
	context.arc(0,0,(radius*3)/PTM,0,2*Math.PI,true);
    context.fillStyle='rgb(255,0,0)';
	context.fill();
	context.stroke();
	context.restore();
	}
function getCanvasDebugDraw() {
    var debugDraw = new Box2D.b2Draw();   
    Box2D.customizeVTable(debugDraw, [{
    original: Box2D.b2Draw.prototype.DrawSegment,
    replacement:
        function(ths, vert1, vert2, color) {                    
            //setColorFromDebugDrawCallback(color); 
			//console.log('entered');			
		   drawSegment(vert1, vert2);
        }
    }]);
    
    Box2D.customizeVTable(debugDraw, [{
    original: Box2D.b2Draw.prototype.DrawPolygon,
    replacement:
        function(ths, vertices, vertexCount, color) {                    
            //setColorFromDebugDrawCallback(color);
            drawPolygon(vertices, vertexCount, false); 			
        }
    }]);
    
    Box2D.customizeVTable(debugDraw, [{
    original: Box2D.b2Draw.prototype.DrawSolidPolygon,
    replacement:
        function(ths, vertices, vertexCount, color) {                    
            //setColorFromDebugDrawCallback(color);
            drawPolygon(vertices, vertexCount, true);
            //drawCenterMarker();			
        }
    }]);
    
    Box2D.customizeVTable(debugDraw, [{
    original: Box2D.b2Draw.prototype.DrawCircle,
    replacement:
        function(ths, center, radius, color) {                    
            //setColorFromDebugDrawCallback(color);
            var dummyAxis = b2Vec2(0,0);
            //drawCircle(center, radius, dummyAxis, false);
        }
    }]);
    
    Box2D.customizeVTable(debugDraw, [{
    original: Box2D.b2Draw.prototype.DrawSolidCircle,
    replacement:
        function(ths, center, radius, axis, color) {                    
            //setColorFromDebugDrawCallback(color);
			//pointer=Box2D.wrapPointer(ths,b2Draw);
			//object=Box2D.castObject(pointer,b2Body);
			//console.log(pointer);
			//console.log("angle : "+a.GetAngle()+";x :"+a.GetPosition().get_x()+";y : "+a.GetPosition().get_y()+"type : "+a.GetType());
			//console.log(a.GetUserData());
            drawCircle(center, radius, axis, true);
			drawCenterMarker(center,radius);
        }
    }]);
    
    Box2D.customizeVTable(debugDraw, [{
    original: Box2D.b2Draw.prototype.DrawTransform,
    replacement:
        function(ths, transform) {
            drawTransform(transform);
        }
    }]);
    
    return debugDraw;
}
