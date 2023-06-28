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


