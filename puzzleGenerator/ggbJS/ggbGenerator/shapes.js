import {appID} from '../../../main/parameters.js'
import {ggbObject,Point,Segment,Angle} from '../../../puzzleGenerator/ggbJS/ggbGenerator/basis.js'
import {toDeg,toRad,samePoints} from '../../../puzzleGenerator/ggbJS/ggbGenerator/functions.js'

export class Triangle extends ggbObject {
    constructor(seg1,seg2,angle=null,name=null,id=appID){
        super(name,id)
        /*seg1 is the segment which triangle appends to*/
        /*seg2 is other side of triangle or length in other context with starting point and angle*/
        this.points=[]
        this.seg1 = seg1
        if(seg2.type=='segment'){
            this.seg2 = seg2
            if(samePoints(this.seg1.start,this.seg2.start,this.round)){
                this.seg3 = new Segment(this.seg1.end,this.seg2.end)
                this.points.push(this.seg1.end,this.seg1.start,this.seg2.end)
            } else if(samePoints(this.seg1.start,this.seg2.end,this.round)){
                this.seg3 = new Segment(this.seg1.end,this.seg2.start)
                this.points.push(this.seg1.end,this.seg1.start,this.seg2.start)
            } else if(samePoints(this.seg1.end,this.seg2.start,this.round)){
                this.seg3 = new Segment(this.seg1.start,this.seg2.end)
                this.points.push(this.seg1.start,this.seg1.end,this.seg2.start)
            } else if(samePoints(this.seg1.end,this.seg2.end,this.round)){
                this.seg3 = new Segment(this.seg1.start,this.seg2.start)
                this.points.push(this.seg1.start,this.seg1.end,this.seg2.start)
            }
        } else if(seg2.type=='point' && angle.type=='point'){
            this.seg2 = new Segment(seg2,angle)
            if(samePoints(this.seg1.start,this.seg2.start,this.round)){
                this.seg3 = new Segment(this.seg1.end,this.seg2.end)
                this.points.push(this.seg1.end,this.seg1.start,this.seg2.end)
            } else if(samePoints(this.seg1.start,this.seg2.end,this.round)){
                this.seg3 = new Segment(this.seg1.end,this.seg2.start)
                this.points.push(this.seg1.end,this.seg1.start,this.seg2.start)
            } else if(samePoints(this.seg1.end,this.seg2.start,this.round)){
                this.seg3 = new Segment(this.seg1.start,this.seg2.end)
                this.points.push(this.seg1.start,this.seg1.end,this.seg2.start)
            } else if(samePoints(this.seg1.end,this.seg2.end,this.round)){
                this.seg3 = new Segment(this.seg1.start,this.seg2.start)
                this.points.push(this.seg1.start,this.seg1.end,this.seg2.start)
            }

        } else if(Array.isArray(seg2)==true){
            this.seg2 = new Segment(seg2[0],seg2[1],angle)
            if(samePoints(this.seg1.start,this.seg2.start,this.round)){
                this.seg3 = new Segment(this.seg1.end,this.seg2.end)
                this.points.push(this.seg1.end,this.seg1.start,this.seg2.end)
            } else if(samePoints(this.seg1.start,this.seg2.end,this.round)){
                this.seg3 = new Segment(this.seg1.end,this.seg2.start)
                this.points.push(this.seg1.end,this.seg1.start,this.seg2.start)
            } else if(samePoints(this.seg1.end,this.seg2.start,this.round)){
                this.seg3 = new Segment(this.seg1.start,this.seg2.end)
                this.points.push(this.seg1.start,this.seg1.end,this.seg2.start)
            } else if(samePoints(this.seg1.end,this.seg2.end,this.round)){
                this.seg3 = new Segment(this.seg1.start,this.seg2.start)
                this.points.push(this.seg1.start,this.seg1.end,this.seg2.start)
            }
        }
        
        /*not working when looking at global points array*/
        this.seg1.name = this.name+'Seg1'
        this.seg1.start.name = this.seg1.name+'Start'
        this.seg1.end.name = this.seg1.name+'End'
        this.seg2.name = this.name+'Seg2'
        this.seg2.start.name = this.seg2.name+'Start'
        this.seg2.end.name = this.seg2.name+'End'
        this.seg3.name = this.name+'Seg3'
        this.seg3.start.name = this.seg3.name+'Start'
        this.seg3.end.name = this.seg3.name+'End'
    }

    draw(){
        this.seg1.draw()
        this.seg2.draw()
        this.seg3.draw()
    }

    drawPoints(visible=true){
        //console.log(this.points)
        for(var i=0;i<this.points.length;i++){
            eval(`${this.id}.evalCommand('${this.points[i].name}=Point({${this.points[i].x},${this.points[i].y}})')`);
        }
        if(visible==false){
            for(var j=0;j<this.points.length;j++){
                this.points[j].setVisible(false)
                this.points[j].setLabelVisible(false)
            }
        } else if(visible==true){
            for(var j=0;j<this.points.length;j++){
                this.points[j].setVisible(true)
                this.points[j].setLabelVisible(true)
            }
        }
    }

    getOppositePoint(seg){
        for(var i=0;i<3;i++){
            if(samePoints(seg.start,this.points[i]) || samePoints(seg.end,this.points[i])) continue
            else return this.points[i]
        }
    }

    setLabelVisible(visible=this.labelVisible){
        if(visible==true){
            this.seg1.setLabelVisible(true)
            this.seg2.setLabelVisible(true)
            this.seg3.setLabelVisible(true)
        } else if(visible==false){
            this.seg1.setLabelVisible(false)
            this.seg2.setLabelVisible(false)
            this.seg3.setLabelVisible(false)
        }
    }

    drawPolygon(){
        var polygon = new Polygon(this.points)
        polygon.draw()
    }
}

export class Pgramm extends ggbObject {
    constructor(seg1,seg2,angle=null,name=null,id=appID){
        super(name,id)
        /*seg1 is the segment which pgramm should be appended to*/
        /*seg2 is other side of pgramm or lenght in combo with angle*/
        this.points=[]
        this.seg1 = seg1
        this.points.push(this.seg1.start)
        if(seg2.type=='segment'){
            if(samePoints(seg2.start,seg1.start,this.round)){
                console.log("pgramm 1")
                this.seg2 = seg2
                this.seg3 = seg1.clone(this.seg2.end)
                this.seg4 = seg2.clone(this.seg1.end)
                this.points.push(this.seg2.end)
                this.points.push(this.seg3.end)
                this.points.push(this.seg4.start)
            } else if(samePoints(seg2.start,seg1.end,this.round)){
                console.log("pgramm 2")
                this.seg2 = seg2
                this.seg4 = seg2.clone(this.seg1.start)
                this.seg3 = seg1.clone(this.seg4.end)
                this.points.push(this.seg2.start)
                this.points.push(this.seg3.end)
                this.points.push(this.seg4.end)
            } else if(samePoints(seg2.end,seg1.start,this.round)){
                console.log("pgramm 3")
                this.seg2 = seg2
                this.seg3 = seg1.clone(this.seg2.start)
                this.seg4 = seg2.clone(this.seg1.end)
                this.seg4.move(this.seg3.end)
                this.points.push(this.seg2.start)
                this.points.push(this.seg3.end)
                this.points.push(this.seg4.end)
            } else if(samePoints(seg2.end,seg1.end,this.round)){
                console.log("pgramm 4")
                this.seg2 = seg2.clone(this.seg1.end)
                this.seg4 = seg2.clone(this.seg1.start)
                this.seg3 = seg1.clone(this.seg4.end)
                this.points.push(this.seg2.end)
                this.points.push(this.seg3.end)
                this.points.push(this.seg4.end)
            } else {
                console.log("pgramm 5")
            }
        } else if(seg2.type=='point' && angle.type=='point'){
            /*input start point from seg1 (in this case seg2) and target point (in this case angle)*/
            this.seg2 = new Segment(seg2,angle)
            if(samePoints(this.seg2.start,this.seg1.start,this.round)){
                console.log("pgramm 6")
                this.seg3 = seg1.clone(this.seg2.end)
                this.seg4 = this.seg2.clone(seg1.end)
                this.points.push(this.seg2.end)
                this.points.push(this.seg3.end)
                this.points.push(this.seg4.start)
            } else if(samePoints(this.seg2.start,this.seg1.end,this.round)){
                console.log("pgramm 7")
                this.seg4 = this.seg2.clone(seg1.start)
                this.seg3 = seg1.clone(this.seg4.end)
                this.points.push(this.seg2.start)
                this.points.push(this.seg3.end)
                this.points.push(this.seg4.end)
            } 
        } else if(Array.isArray(seg2) && angle!=null){
            /*input seg2 is array containing starting point and length and angle is passed*/
            this.seg2 = new Segment(seg2[0],seg2[1],angle)
            if(samePoints(seg2[0],seg1.start,this.round)){
                console.log("pgramm 8")
                this.seg4 = this.seg2.clone(seg1.end)
                this.seg3 = seg1.clone(this.seg2.end)
                this.points.push(this.seg2.end)
                this.points.push(this.seg3.end)
                this.points.push(this.seg4.start)
            } else if(samePoints(seg2[0],seg1.end,this.round)){
                console.log("pgramm 9")
                this.seg4 = this.seg2.clone(seg1.start)
                this.seg3 = seg1.clone(this.seg2.end)
                this.points.push(this.seg2.start)
                this.points.push(this.seg3.end)
                this.points.push(this.seg4.end)
            }
        }

        this.seg1.name=this.name+'Seg1'
        this.seg1.start.name = this.seg1.name+'Start'
        this.seg1.end.name = this.seg1.name+'End'
        this.seg2.name=this.name+'Seg2'
        this.seg2.start.name = this.seg2.name+'Start'
        this.seg2.end.name = this.seg2.name+'End'
        this.seg3.name=this.name+'Seg3'
        this.seg3.start.name = this.seg3.name+'Start'
        this.seg3.end.name = this.seg3.name+'End'
        this.seg4.name=this.name+'Seg4'
        this.seg4.start.name = this.seg4.name+'Start'
        this.seg4.end.name = this.seg4.name+'End'
    }

    draw(){
        this.seg1.draw()
        this.seg2.draw()
        this.seg3.draw()
        this.seg4.draw()
    }

    drawPoints(){
    
    }

    drawPolygon(){
        var polygon = new Polygon(this.points)
        polygon.draw()
    }

    setVisible(visible=this.visible){
        if(visible==true){
            this.seg1.setVisible(true)
            this.seg2.setVisible(true)
            this.seg3.setVisible(true)
            this.seg4.setVisible(true)
        } else if(visible==false){
            this.seg1.setVisible(false)
            this.seg2.setVisible(false)
            this.seg3.setVisible(false)
            this.seg4.setVisible(false)
        }
    }

    setLabelVisible(visible=this.labelVisible){
        if(visible==true){
            this.seg1.setLabelVisible(true)
            this.seg2.setLabelVisible(true)
            this.seg3.setLabelVisible(true)
            this.seg4.setLabelVisible(true)
        } else if(visible==false){
            this.seg1.setLabelVisible(false)
            this.seg2.setLabelVisible(false)
            this.seg3.setLabelVisible(false)
            this.seg4.setLabelVisible(false)
        }
    }
}

export class Rectangle extends Pgramm {
    constructor(segAppend,seg){

    }
}

export class Polygon extends ggbObject {
    constructor(points,name=null,id=appID){
        super(name,id)
        this.points = points
    }

    draw(){
        var pointsString=''
        for(var i=0;i<this.points.length;i++){
            if(i==0) pointsString=pointsString+'('+this.points[i].x.toFixed(this.round)+','+this.points[i].y.toFixed(this.round)+')'
            else pointsString=pointsString+','+'('+this.points[i].x.toFixed(this.round)+','+this.points[i].y.toFixed(this.round)+')'
        }
        var commandString='Polygon('+pointsString+')'
        if(this.name==null) this.name=eval(`${this.id}.evalCommandGetLabels('${commandString}')`)
            else eval(`${this.id}.evalCommand('${this.name}=${commandString}')`)
    }
}


