import {appID,appletSize} from '/main/parameters.js'

export function toDeg(angle){
    return angle*(180/Math.PI)
}

export function toRad(angle){
    return angle*(Math.PI/180)
}

export function samePoints(pointA,pointB,round=4){
    /*check if two points are the same*/
    if(pointA.x.toFixed(round)==pointB.x.toFixed(round) && pointA.y.toFixed(round)==pointB.y.toFixed(round)) return true
    else return false
}

function perpendicularSegment(seg,targetPoint){

}

export function getDistance(obj1,obj2,id=appID){
    var temp = eval(`${id}.evalCommandGetLabels('temp=Distance(${obj1.name},${obj2.name})')`)
    return eval(`${id}.getValue(${temp})`)
 }

 export function setColor(obj,color,id=appID){
    app.setColor(obj.name,...colorMap['red'])
 }

 var colorMap = { 
    'red' : [255,0,0],
 }





