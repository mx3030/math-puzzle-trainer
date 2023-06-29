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

/*same function in constructionFunctions.js but maybe some problems with initialization in shapes.js ???*/
export function getDistanceBetweenPoints(point1,point2){
    var deltaX = point1.x-point2.x
    var deltaY = point1.y-point2.y            
    var distance = Math.sqrt((deltaX)**2+(deltaY)**2)
    return distance
}

