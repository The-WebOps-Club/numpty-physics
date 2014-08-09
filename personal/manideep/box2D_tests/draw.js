function canvasdraw(ctx){
	var  worldBody=null;
    worldBody=world.GetBodyList();
	
	var  fixtureList , shape, shapeType ;
	while(worldBody.a !== 0){
	    
		/*if(worldBody.userData.verticesList){
		    console.log(worldBody.userData.userDrawn);
		    console.log(worldBody.a);
		    fixtureList=worldBody.GetFixtureList();
			//if(fixtureList.a !==0){
		    shape=fixtureList.GetShape();
		    shapeType=shape.GetType(); console.log('chain');			// 0 for circleshape ;1-edgeshape; 2- polygonshape ;
			  if(shapeType == 2){
				drawChainPolygonShape(worldBody,ctx);
			  }
			//}
		}
		else*/ 
		{
			fixtureList = worldBody.GetFixtureList();
			next_fixturePointer = fixtureList.a;
				while (fixtureList.a !== 0){
				shape =fixtureList.GetShape();
				shapeType = shape.GetType();
				ctx.save();
				ctx.setTransform(1,0,0,1,0,0);
				ctx.translate(canvasOffset.x,canvasOffset.y);
				ctx.scale(1,-1);						 
				if(shapeType == 0){
					drawCircleShape(fixtureList,ctx);
					ctx.restore();
					}
				else if (shapeType == 1){
					drawEdgeShape();
					ctx.restore();
					}
				else if(shapeType ==2){
					drawPolygonShape(fixtureList,ctx);
					ctx.restore();
					}
				else
					ctx.restore();
				 

				 fixtureList=fixtureList.GetNext();	
				}
		}		
		worldBody=worldBody.GetNext();
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
		var x_coord = pos.get_x()*PTM;
		var y_coord = pos.get_y()*PTM;
		var radius =PTM*fixture.GetShape().get_m_radius();
		//ctx.save();
		//ctx.translate(x_coord,y_coord);
		ctx.beginPath();
		ctx.arc(x_coord,y_coord,radius,0,2*Math.PI,false);
		ctx.strokeStyle = 'green';
		ctx.fillStyle = fixture.GetBody().userData.color;
		ctx.fill();
		ctx.stroke();
		//ctx.drawImage(img,40,x_coord-radius,y_coord-radius,2*radius,2*radius);
		}
		
function drawEdgeShape(fixture,ctx){
	var pos=fixture.GetBody().GetPosition();
	var angle = fixture.GetBody().GetAngle();
    var x_coord = pos.get_x()*PTM;
	var y_coord = pos.get_y()*PTM; 
	ctx.translate(x_coord,y_coord);
	ctx.rotate(angle);
	var shape = Box2D.castObject(fixture.GetShape(),b2EdgeShape);
	}
function drawPolygonShape(fixture,ctx){
	
	var pos = fixture.GetBody().GetPosition();
	var angle = fixture.GetBody().GetAngle();
	//ctx.save();
	var x_coord = pos.get_x()*PTM;
	var y_coord = pos.get_y()*PTM;
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
		 x_coord = vertex.get_x()* PTM;
		 y_coord = vertex.get_y()* PTM;
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