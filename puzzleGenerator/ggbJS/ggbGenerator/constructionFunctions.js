import {appID,appletSize,template,injectGeoGebraApplet,ggbSetBase64} from '../../../main/parameters.js'
import {breakpoint} from '../../../main/style.js'
import {delay,generateRandomNumberWithStep} from '../../../main/helper.js'
import {Point,Segment,Line,Angle} from '../../../puzzleGenerator/ggbJS/ggbGenerator/basis.js'
import {Triangle,Pgramm,Polygon,Rectangle} from '../../../puzzleGenerator/ggbJS/ggbGenerator/shapes.js'

export async function startPuzzleConstructionMode(templateFile,toolbarString){
    /*inject geogebra applet with algebra window*/
    await injectGeoGebraApplet(breakpoint,toolbarString,templateFile)
    /*without delay not working*/
    await delay(500)
}

export function getIntersection(object1,object2,id=appID){ 
    var intersectionPoint = eval(`${id}.evalCommandGetLabels('Intersect(${object1.name},${object2.name})')`)
    eval(`${id}.evalCommand('SetVisibleInView(${intersectionPoint},1,false)')`)
    var pointLabel = eval(`${id}.getValueString('${intersectionPoint}')`)
    var name = 'Intersection'+object1.name+object2.name
    var point = extractPointFromLabel(pointLabel,name)
    return point
}

function extractPointFromLabel(str,name){
    var startIndex = str.indexOf('(') + 1;
    var endIndex = str.indexOf(')');
    var values = str.substring(startIndex, endIndex).split(',').map(Number);
    var [x, y] = values;
    return new Point(x,y,name)
}

export function getDistance(obj1,obj2,id=appID){
    var temp = eval(`${id}.evalCommandGetLabels('temp=Distance(${obj1.name},${obj2.name})')`)
    return eval(`${id}.getValue(${temp})`)
}

export function createMirrorPointOnLine(point1,point2){
    /*mirror point2 to point1 on line*/
    var distX = point2.x - point1.x
    var distY = point2.y - point1.y
    var xNew = point1.x-distX
    var yNew = point1.y-distY
    var newPoint = new Point(xNew,yNew,point2.name+'Mirror')
    return newPoint
}

export function createTwoRandomPointsOnLine(m,c,min=-5,max=5,step=1){
    /*create two points for specific linear function y=mx+c*/
    var p1x = generateRandomNumberWithStep(min,max,step)
    var p2x = generateRandomNumberWithStep(min,max,step)
    if(p1x==p2x) p2x = generateRandomNumberWithStep(min,max,step)
    var p1y = m*p1x+c
    var p2y = m*p2x+c
    var point1 = new Point(p1x,p1y)
    var point2 = new Point(p2x,p2y)
    return [point1,point2]
}

export function getMaxAbsYCoordValue(listOfPoints){
    /*get the maximum absolute y value from listOfPoints*/
    var absYCoords = []
    for(var i=0;i<listOfPoints.length;i++){
        absYCoords.push(Math.abs(listOfPoints[i].y))
    }
    return math.max(absYCoords)
}

export function setColor(obj,color,id=appID){
    app.setColor(obj.name,...colorMap[color])
}

export function getRandomColor(colorsToRemove=['red']){
    var colors = Object.keys(colorMap)
    var filteredColors = colors.filter(color => !colorsToRemove.includes(color));
    var randomColor = filteredColors[math.randomInt(0,filteredColors.length)]
    return randomColor
}

export var colorMap = { 
    'red' : [255,0,0],
    'green':[0,128,0],
    'darkgreen':[0,100,0],
    'blue':[0,0,255],
    'dodgerblue':[30,144,255],
    'orange':[255,165,0],
    'darkorange':[255,140,0],
    'gold':[255,215,0],
    'purple':[128,0,128]
}
