import {appID,appletSize,template,injectGeoGebraApplet,ggbSetBase64} from '../../../main/parameters.js'
import {breakpoint} from '../../../main/style.js'
import {delay,generateRandomNumberWithStep} from '../../../main/helper.js'
import {Point,Segment,Line,Angle} from '../../../puzzleGenerator/ggbJS/ggbGenerator/basis.js'
import {Triangle,Pgramm,Polygon,Rectangle} from '../../../puzzleGenerator/ggbJS/ggbGenerator/shapes.js'
import {toRad} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/objectFunctions.js'

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
    var name = 'Int'+object1.name+object2.name
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

export function getDistanceBetweenPoints(point1,point2){
    var deltaX = point1.x-point2.x
    var deltaY = point1.y-point2.y            
    var distance = Math.sqrt((deltaX)**2+(deltaY)**2)
    return distance
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

export function createPointOnLine(line,startPoint,distance){
    var newX = startPoint.x + distance * Math.cos(toRad(line.angle))
    var newY = startPoint.y + distance * Math.sin(toRad(line.angle))
    return new Point(newX,newY)
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

export function setPointStyle(obj,size=5,style=0){
    app.setPointSize(obj.name,size)
    app.setPointStyle(obj.name,style)
}

export function createRandomPolyFunctionString(degree, min, max){
    var functionString=''
    for(var i=0;i<degree;i++){
        var randomInt = math.randomInt(min,max)
        var part = '('+randomInt+'*x^'+i+')'
        functionString = functionString+'+'+part
    }
    var simpleFunctionString = math.simplify(functionString)
    return simpleFunctionString.toString()
}

export function createRandomLinearFunctionString(min,max,origin=false){
    var functionString=''
    var m = math.randomInt(min,max)
    if(m==0) m=m+1
    var c = 0
    if(origin==false){
        c = math.randomInt(min,max) 
    }
    var functionString = `${m}*x+${c}`
    return functionString
}

export function createParallelLine(line,distance,name){
    /*create a parallel line with distance --> (-) left side, (+) right side*/
    var segA = new Segment(line.start,distance,line.angle+90)
    segA.draw()
    segA.end.draw()
    segA.end.setVisible(false)
    segA.setVisible(false)
    var newLine = new Line(segA.end,line.angle)
    return newLine
}
