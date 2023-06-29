import {appID} from '../../../main/parameters.js'
import {toDeg,toRad,samePoints,getDistanceBetweenPoints} from '../../../puzzleGenerator/ggbJS/ggbGenerator/objectFunctions.js'

export class ggbObject{
    constructor(name=null,aux=false,id=appID){
        this.id=id
        this.name=name
        this.visible=true
        this.labelVisible=true
        this.round=4
        this.aux = aux
    }

    setVisible(visible=this.visible,view=1){
        if(visible==true){
            eval(`${this.id}.evalCommand('SetVisibleInView(${this.name},${view},true)')`)
        } else { 
            eval(`${this.id}.evalCommand('SetVisibleInView(${this.name},${view},false)')`)
        }
    }

    setLabelVisible(visible=this.labelVisible,mode=false){
        if(mode!=false){
            eval(`${this.id}.evalCommand('SetLabelMode(${this.name},${mode})')`)
        }
        if(visible==true){
            eval(`${this.id}.evalCommand('ShowLabel(${this.name},true)')`)
        } else { 
            eval(`${this.id}.evalCommand('ShowLabel(${this.name},false)')`)
        }
    }

    setCaption(string){
        //eval(`${this.id}.setCaption(${this.name},${string})`)
        eval(`${this.id}.evalCommand('SetCaption(${this.name},"${string}")')`)
    }

    getCaption(){
        var caption =  eval(`${this.id}.getCaption('${this.name}',false)`)
        console.log(caption)
    }


    remove(){
        eval(`${this.id}.evalCommand('Delete(${this.name})')`)
    }
}

export var importantPoints = []
export function resetImportantPoints(){
    importantPoints=[]
}

export class Point extends ggbObject{ 
    constructor(x,y,name=null,aux=false,id=appID){
        super(name,aux,id)
        this.x = Number(x.toFixed(this.round))
        //this.x = x
        this.y = Number(y.toFixed(this.round))
        //this.y = y
        this.type = 'point'
    }

    draw(){
        if(this.name==null) this.name=eval(`${this.id}.evalCommandGetLabels('(${this.x},${this.y})')`); 
        else eval(`${this.id}.evalCommand('${this.name}=Point({${this.x},${this.y}})')`); 
        /*update points array if not auxilary object*/
        if(this.aux==false) importantPoints.push({point:this.name,x:this.x,y:this.y})
            eval(`${this.id}.evalCommand('SetFixed(${this.name},true)')`)
    }

    setVisible(visible=this.visible,view=1){
        if(visible==true){
            eval(`${this.id}.evalCommand('SetVisibleInView(${this.name},${view},true)')`)
            //points.push({point:this.name,x:this.x,y:this.y})
        } else { 
            eval(`${this.id}.evalCommand('SetVisibleInView(${this.name},${view},false)')`)
            //points = points.filter(object => object.point != this.name)
        }
    }

    clone(x=this.y=this.y,name=this.name+'Clone'){
        var pointClone = new Point(x,y,name)
        return pointClone
    }


}

export class Segment extends ggbObject {
    constructor(pointA,pointB,angle=null,name=null,aux=false,id=appID){
        super(name,aux,id)
        this.type='segment'
        this.start = pointA;
        this.angle=angle
        if(this.angle==null){
            //draw segment from two points
            this.end=pointB
            var deltaX = this.end.x-this.start.x
            var deltaY = this.end.y-this.start.y            
            this.length = Math.sqrt((deltaX)**2+(deltaY)**2)
            var temp=(deltaY)/(deltaX)
            temp = Math.atan(temp)
            if(deltaX>=0 && deltaY>=0){
                this.angle=toDeg(temp)
            } else if(deltaX<0) {
                this.angle=toDeg(temp+Math.PI)
            } else if(deltaX>=0 && deltaY<0){
                this.angle=toDeg(temp+2*Math.PI)
            }
        } else {
            //draw segment from length and angle
            this.length = pointB
            if(this.angle<=90){
                var temp=this.angle
                var angleRad = toRad(temp)
                var deltaX = this.length*Math.cos(angleRad)
                var deltaY = this.length*Math.sin(angleRad)
            } else if(this.angle<=180 && this.angle>90){ 
                var temp= 180-this.angle
                var angleRad = toRad(temp)
                var deltaX = -this.length*Math.cos(angleRad)
                var deltaY = this.length*Math.sin(angleRad)
            } else if(this.angle<=270 && this.angle>180) {
                var temp=this.angle-180
                var angleRad = toRad(temp)
                var deltaX = -this.length*Math.cos(angleRad)
                var deltaY = -this.length*Math.sin(angleRad)
            } else {
                var temp=360-this.angle
                var angleRad = toRad(temp)
                var deltaX = this.length*Math.cos(angleRad)
                var deltaY = -this.length*Math.sin(angleRad)
            }
            var endX = pointA.x+deltaX
            var endY = pointA.y+deltaY
            this.end = new Point(endX,endY)
        }

        this.start.name = this.name+'Start'
        this.end.name = this.name+'End'
    }

    getLength(start=this.start,end=this.end){
        var deltaX = start.x-end.x
        var deltaY = start.y-end.y            
        var length = Math.sqrt((deltaX)**2+(deltaY)**2)
        return length
    }

    add(toStart,toEnd){
        /*add length toStart to startPoint and add length toEnd to endPoint*/
        console.log("add length to segement")
        console.log(this.angle)
        if(this.angle<=90){
            var temp=this.angle
            var angleRad = toRad(temp)
            var deltaXstart = toStart*Math.cos(angleRad)
            var deltaYstart = toStart*Math.sin(angleRad)
            var deltaXend = toEnd*Math.cos(angleRad)
            var deltaYend = toEnd*Math.sin(angleRad)
        } else if(this.angle<=180 && this.angle>90){ 
            var temp= 180-this.angle
            var angleRad = toRad(temp)
            var deltaXstart = -toStart*Math.cos(angleRad)
            var deltaYstart = toStart*Math.sin(angleRad)
            var deltaXend = -toEnd*Math.cos(angleRad)
            var deltaYend = toEnd*Math.sin(angleRad)
        } else if(this.angle<=270 && this.angle>180) {
            var temp=this.angle-180
            var angleRad = toRad(temp)
            var deltaXstart = -toStart*Math.cos(angleRad)
            var deltaYstart = -toStart*Math.sin(angleRad)
            var deltaXend = -toEnd*Math.cos(angleRad)
            var deltaYend = -toEnd*Math.sin(angleRad)

        } else {
            var temp=360-this.angle
            var angleRad = toRad(temp)
            var deltaXstart = toStart*Math.cos(angleRad)
            var deltaYstart = -toStart*Math.sin(angleRad)
            var deltaXend = toEnd*Math.cos(angleRad)
            var deltaYend = -toEnd*Math.sin(angleRad)
        }

        var tempEnd = this.end
        var tempStart = this.start

        var newStartX=this.start.x+deltaXstart
        var newStartY=this.start.y+deltaYstart
        var tempNewStartPoint = new Point(newStartX,newStartY)
        var tempLength=this.getLength(tempNewStartPoint,tempEnd)
        if((toStart>0 && tempLength<this.length)||(toStart<0 && tempLength>this.length)){
            newStartX=this.start.x-deltaXstart
            newStartY=this.start.y-deltaYstart
            this.start = new Point(newStartX,newStartY)
        } else {
            this.start = tempNewStartPoint
        }

        var newEndX=this.end.x+deltaXend
        var newEndY=this.end.y+deltaYend
        var tempNewEndPoint = new Point(newEndX,newEndY)
        tempLength=this.getLength(tempStart,tempNewEndPoint)
        if((toEnd>0 && tempLength<this.length)||(toEnd<0 && tempLength>this.length )){
            newEndX=this.end.x-deltaXend
            newEndY=this.end.y-deltaYend
            this.end = new Point(newEndX,newEndY)
        } else {
            this.end = tempNewEndPoint
        }
        this.length=this.getLength(this.start,this.end)
    }

    move(target=this.start,source=this.start){
        var moveVecX = target.x-source.x
        var moveVecY = target.y-source.y
        var newStartPoint = new Point(this.start.x+moveVecX,this.start.y+moveVecY)
        var newEndPoint = new Point(this.end.x+moveVecX,this.end.y+moveVecY)
        this.start = newStartPoint
        this.end = newEndPoint
    }

    draw(){
        if(this.name==null) this.name=eval(`${this.id}.evalCommandGetLabels('Segment((${this.start.x},${this.start.y}),(${this.end.x},${this.end.y}))')`);
        else eval(`${this.id}.evalCommand('${this.name}=Segment((${this.start.x},${this.start.y}),(${this.end.x},${this.end.y}))')`);
        if(this.aux==false){
            importantPoints.push({point:this.start.name,x:this.start.x,y:this.start.y})
            importantPoints.push({point:this.end.name,x:this.end.x,y:this.end.y})
        }
        eval(`${this.id}.evalCommand('SetFixed(${this.name},true)')`)
    }

    drawPoints(){
        eval(`${this.id}.evalCommand('${this.start.name}=Point({${this.start.x},${this.start.y}})')`);
        eval(`${this.id}.evalCommand('${this.end.name}=Point({${this.end.x},${this.end.y}})')`);
    }

    setVisible(visible=this.visible,view=1){
        if(visible==true){
            eval(`${this.id}.evalCommand('SetVisibleInView(${this.name},${view},true)')`)
            //points.push({point:this.start.name,x:this.start.x,y:this.start.y})
            //points.push({point:this.end.name,x:this.end.x,y:this.end.y})
        } else { 
            eval(`${this.id}.evalCommand('SetVisibleInView(${this.name},${view},false)')`)
            //points = points.filter(object => object.point != this.start.name)
            //points = points.filter(object => object.point != this.end.name)
        }
    }

    point(distance=this.length/2){
        var moveUnitVecX = (this.end.x - this.start.x)/this.length
        var moveUnitVecY = (this.end.y - this.start.y)/this.length
        var moveDistVecX = moveUnitVecX*distance
        var moveDistVecY = moveUnitVecY*distance
        var newPoint = new Point(this.start.x+moveDistVecX,this.start.y+moveDistVecY)
        return newPoint
    }

    clone(target=this.start,name=this.name+'Clone'){
        var segClone = new Segment(target,this.length,this.angle,name)
        return segClone
    }
}

export class Line extends ggbObject{
    constructor(pointA,pointB,name=null,aux=false,id=appID){
        super(name,aux,id)
        this.type='line'
        this.start=pointA
        /*line can be drawn be two points or one point+angle*/
        if(pointB.type=='point'){
            /*generate line by two points*/
            this.end=pointB
            var deltaX = this.end.x-this.start.x
            var deltaY = this.end.y-this.start.y            
            var temp=(deltaY)/(deltaX)
            temp = Math.atan(temp)
            if(deltaX>=0 && deltaY>=0){
                this.angle=toDeg(temp)
            } else if(deltaX<0) {
                this.angle=toDeg(temp+Math.PI)
            } else if(deltaX>=0 && deltaY<0){
                this.angle=toDeg(temp+2*Math.PI)
            }
        } else {
            /*generate line by point + angle*/
            this.angle=pointB
            /*length not important*/
            this.length = 1
            if(this.angle<=90){
                var temp=this.angle
                var angleRad = toRad(temp)
                var deltaX = this.length*Math.cos(angleRad)
                var deltaY = this.length*Math.sin(angleRad)
            } else if(this.angle<=180 && this.angle>90){ 
                var temp= 180-this.angle
                var angleRad = toRad(temp)
                var deltaX = -this.length*Math.cos(angleRad)
                var deltaY = this.length*Math.sin(angleRad)
            } else if(this.angle<=270 && this.angle>180) {
                var temp=this.angle-180
                var angleRad = toRad(temp)
                var deltaX = -this.length*Math.cos(angleRad)
                var deltaY = -this.length*Math.sin(angleRad)
            } else {
                var temp=360-this.angle
                var angleRad = toRad(temp)
                var deltaX = this.length*Math.cos(angleRad)
                var deltaY = -this.length*Math.sin(angleRad)
            }
            var endX = pointA.x+deltaX
            var endY = pointA.y+deltaY
            this.end = new Point(endX,endY)
        }

        this.start.name = this.name+'Start'
        this.end.name = this.name+'End'
    }

    draw(){
        if(this.name==null) this.name=eval(`${this.id}.evalCommandGetLabels('Line((${this.start.x},${this.start.y}),(${this.end.x},${this.end.y}))')`);
        else eval(`${this.id}.evalCommand('${this.name}=Line((${this.start.x},${this.start.y}),(${this.end.x},${this.end.y}))')`);
        eval(`${this.id}.evalCommand('SetFixed(${this.name},true)')`)
    }
 
}

export class Angle extends ggbObject {
    constructor(seg1,seg2,point3=null,name=null,id=appID){
        super(name,id)
        if(seg1.type=='segment' && seg2.type=='segment'){
            /*get angle between two segments*/
            if(samePoints(seg1.start,seg2.start)){
                this.point1 = seg1.point(seg1.length/6)
                this.point2 = seg1.start
                this.point3 = seg2.point(seg2.length/6)
            } else if(samePoints(seg1.start,seg2.end)){
                this.point1 = seg1.point(seg1.length/6)
                this.point2 = seg1.start
                this.point3 = seg2.point(seg2.length/6)
            } else if(samePoints(seg1.end,seg2.start)){
                this.point1 = seg1.point(seg1.length/6)
                this.point2 = seg1.end
                this.point3 = seg2.point(seg1.length/6)
            } else if(samePoints(seg1.end,seg2.end)){
                this.point1 = seg1.point(seg1.length/6)
                this.point2 = seg1.end
                this.point3 = seg2.point(seg2.length/6)
            }
        } else if(seg1.type=='point' && seg2.type=='point' && point3.type=='point'){
            /*get angle between three points*/
            this.point1 = seg1
            this.point2 = seg2
            this.point3 = point3
        }

    }

    mirror(){
        var temp = this.point1
        this.point1 = this.point3
        this.point3 = temp
    }

    draw(){
        //if(this.name==null) this.name=eval(`${this.id}.evalCommandGetLabels('Angle((${this.point1.x},${this.point1.y}),(${this.point2.x},${this.point2.y}),(${this.point3.x},${this.point3.y}))')`);
        //else eval(`${this.id}.evalCommand('${this.name}=Angle((${this.point1.x},${this.point1.y}),(${this.point2.x},${this.point2.y}),(${this.point3.x},${this.point3.y}))')`);
        //var angleRad = eval(`${this.id}.getValue('${this.name}')`)
        //this.angle = Number(toDeg(angleRad).toFixed(this.round))
        //console.log(this.angle)
        this.name = eval(`${this.id}.evalCommandGetLabels('CircularSector((${this.point2.x},${this.point2.y}),(${this.point1.x},${this.point1.y}),(${this.point3.x},${this.point3.y}))')`)
    }
    getValue(){
        var dist21 = getDistanceBetweenPoints(this.point2,this.point1)
        var dist23 = getDistanceBetweenPoints(this.point2,this.point3)
        var dist13 = getDistanceBetweenPoints(this.point1,this.point3)
        var value = Math.acos((dist21**2+dist23**2-dist13**2)/(2*dist21*dist23))
        var valueDeg = toDeg(value)
        return valueDeg
    }
}
