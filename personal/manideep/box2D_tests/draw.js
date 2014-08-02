function canvasdraw(ctx){
	var  worldBody=null;
    worldBody=world.GetBodyList();
	var i =0;
	var prev_bodyPointer = null;
	var next_bodyPointer = worldBody.a;
	var prev_fixturePointer , next_fixturePointer, fixtureList , shape, shapeType ;
	while(prev_bodyPointer !== next_bodyPointer){
		/*if(worldBody.userData.userDrawn){
		    fixtureList=worldBody.GetFixtureList();
			//if(fixtureList.a !==0){
		    shape=fixtureList.GetShape();
		    shapeType=shape.GetType(); console.log('chain');			// 0 for circleshape ;1-edgeshape; 2- polygonshape ;
			  if(shapeType == 2){
				drawChainPolygonShape(worldBody,ctx);
			  }
			//}
		}
		else*/{
			fixtureList = worldBody.GetFixtureList();
			next_fixturePointer = fixtureList.a;
				while (prev_fixturePointer !== next_fixturePointer){
				shape =fixtureList.GetShape();
				shapeType = shape.GetType();
				ctx.save();
				ctx.setTransform(1,0,0,1,0,0);
				ctx.translate(canvasOffset.x,canvasOffset.y);
				ctx.scale(1,-1);
				if(shapeType == 0){
				//console.log('circle');
					drawCircleShape(fixtureList,ctx);
					}
				else if(shapeType ==2){
					//console.log(fixtureList.GetShape());
					drawPolygonShape(fixtureList,ctx);
					//console.log('rectangle');
					}
				else
					ctx.restore();
				 //ctx.restore();
				 fixtureList=fixtureList.GetNext();	
				 prev_fixturePointer = next_fixturePointer;
				 next_fixturePointer = fixtureList.a;
				}
		}		
		worldBody=worldBody.GetNext();
		prev_bodyPointer =next_bodyPointer;
		next_bodyPointer=worldBody.a;
		i++;
   }
}   
function drawChainPolygonShape(worldBody,ctx){
//console.log('entered');
	var position ={x : null,
				   y : null};
	var angle = null;
	position.x = worldBody.GetPosition().get_x();
	position.y = worldBody.GetPosition().get_y();
	//console.log(position.x +","+position.y );
	angle= worldBody.GetAngle();
	ctx.save();
	ctx.setTransform(1,0,0,1,0,0);
	ctx.translate(canvasOffset.x,canvasOffset.y);
	ctx.scale(1,-1);
	ctx.translate(position.x*30,position.y*30);
	ctx.rotate(angle);
	ctx.beginPath();
	for(var i in worldBody.userData.verticesList){
		if(i == 0){
		    //console.log('beginning path');
			ctx.moveTo(worldBody.userData.verticesList[i].x*30,worldBody.userData.verticesList[i].y*30);
		}
		else 
			ctx.lineTo(worldBody.userData.verticesList[i].x*30,worldBody.userData.verticesList[i].y*30);
		}
			ctx.lineWidth = 3;
			ctx.strokeStyle= 'blue';
	ctx.stroke();
	ctx.restore();
	}
	
function initialDraw(verticesList,ctx){
	ctx.save();
	ctx.setTransform(1,0,0,1,0,0);
	ctx.translate(canvas.width/2,canvas.height/2);
	ctx.scale(1,-1);
	for(var i in verticesList){
		if( i ==0){
			ctx.beginPath();
			ctx.moveTo(verticesList[i].x*30,verticesList[i].y*30);
		}
		else{
			ctx.lineTo(verticesList[i].x*30,verticesList[i].y*30);
		}
	}
		ctx.lineWidth=3.0;
		ctx.strokeStyle='green';
		ctx.stroke();
		ctx.restore();
	}
function drawCircleShape(fixture,ctx){
		var pos=fixture.GetBody().GetPosition();
		var x_coord = pos.get_x()*30;
		var y_coord = pos.get_y()*30;
		var radius =30*fixture.GetShape().get_m_radius();
		//ctx.save();
		//ctx.translate(x_coord,y_coord);
		ctx.beginPath();
		ctx.arc(x_coord,y_coord,radius,0,2*Math.PI,false);
		ctx.strokeStyle = 'green';
		ctx.fillStyle = 'blue';
		ctx.fill();
		ctx.stroke();
		//ctx.drawImage(img,40,x_coord-radius,y_coord-radius,2*radius,2*radius);
		ctx.restore();
		}
function drawPolygonShape(fixture,ctx){
	
	var pos = fixture.GetBody().GetPosition();
	var angle = fixture.GetBody().GetAngle();
	//ctx.save();
	var x_coord = pos.get_x()*30;
	var y_coord = pos.get_y()*30;
	//console.log('x : ' +x_coord +' ,y : ' +y_coord);
	ctx.translate(x_coord,y_coord);
	//ctx.beginPath();
	ctx.rotate(angle);
	var shape = Box2D.castObject(fixture.GetShape(),b2PolygonShape);
	//console.log('came here with vertex count = '+ shape.GetVertexCount());
	//console.log(shape);
	for(var vertexCount =0;vertexCount<shape.GetVertexCount();vertexCount++)
		{
		 var vertex = shape.GetVertex(vertexCount);
		 x_coord = vertex.get_x()* 30;
		 y_coord = vertex.get_y()* 30;
		 if(vertexCount == 0){
			ctx.beginPath();
			ctx.moveTo(x_coord,y_coord);
			}
		else{
		 ctx.lineTo(x_coord,y_coord);
		  }
		 }
		 ctx.strokeStyle = 'darkSalmon';
		 ctx.fillStyle = 'pink';
		 ctx.fill();
		 ctx.restore();
	}