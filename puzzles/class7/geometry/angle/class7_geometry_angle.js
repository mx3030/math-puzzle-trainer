import {setCoordSystem} from '../../../../puzzleGenerator/ggbJS/ggbDisplay.js'
import {ggbSetBase64,template,toolbar} from '../../../../main/parameters.js'
import {delay} from '../../../../main/helper.js'
import {Point,Segment,Line,Angle,importantPoints,resetImportantPoints} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/basis.js'
import {Triangle,Pgramm,Polygon,Rectangle} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/shapes.js'
import {
    getDistance,
    setColor,
    getRandomColor,
    colorMap,
    getIntersection,
    startPuzzleConstructionMode,
    createMirrorPointOnLine
    } from '../../../../puzzleGenerator/ggbJS/ggbGenerator/constructionFunctions.js'

export async function class7_easy_geometry_angle_1(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var pointB = new Point(math.randomInt(-5,5),math.randomInt(-5,5),'B')
    var angle1 = math.randomInt(1,90)
    var angleDiff = math.randomInt(20,120)
    var angle2 = angle1+angleDiff
    var lineA = new Line(pointA,angle1,'lineA')
    var lineB = new Line(pointA,angle2,'lineB')
    lineA.draw()
    lineB.draw()
    //delay(1000)
    var pointC = getIntersection(lineA,lineB)
    var angle1 = new Angle(lineA.end,pointC,lineB.end,'angle1') 
    angle1.draw()
    angle1.setCaption(angleDiff.toString()+'°')
    angle1.setLabelVisible(true)
    setColor(angle1,getRandomColor())
    var pointD = createMirrorPointOnLine(lineA.start,lineA.end,'D')
    var pointE = createMirrorPointOnLine(lineA.start,lineB.end,'E')
    var angle2 = new Angle(pointD,pointC,pointE,'angle2')
    angle2.draw()
    angle2.setCaption('\u03B1')
    angle2.setLabelVisible(true)
    setColor(angle2,'red')

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = angleDiff 

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['geometry','angle'],
        difficulty : ['easy'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'puzzle',
        question : app.getBase64(),
        questionText : "Bestimme den Winkel $$\alpha$$.",
        scope : {
            '\\alpha':{sol:sol,unit:"°"}
        },
    }
    return puzzleData
}

export async function class7_easy_geometry_angle_2(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var pointB = new Point(math.randomInt(-5,5),math.randomInt(-5,5),'B')
    var angle1 = math.randomInt(1,90)
    var angleDiff = math.randomInt(20,120)
    var angle2 = angle1+angleDiff
    var lineA = new Line(pointA,angle1,'lineA')
    var lineB = new Line(pointA,angle2,'lineB')
    lineA.draw()
    lineB.draw()
    //delay(1000)
    var pointC = getIntersection(lineA,lineB)
    var angle1 = new Angle(lineA.end,pointC,lineB.end,'angle1') 
    angle1.draw()
    angle1.setCaption(angleDiff.toString()+'°')
    angle1.setLabelVisible(true)
    setColor(angle1,getRandomColor())
    var pointD = createMirrorPointOnLine(lineA.start,lineA.end,'D')
    var angle2 = new Angle(lineB.end,pointC,pointD,'angle2')
    angle2.draw()
    angle2.setCaption('\u03B1')
    angle2.setLabelVisible(true)
    setColor(angle2,'red')

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = 180-angleDiff 

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['geometry','angle'],
        difficulty : ['easy'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'puzzle',
        question : app.getBase64(),
        questionText : "Bestimme den Winkel $$\alpha$$.",
        scope : {
            '\\alpha':{sol:sol,unit:"°"}
        },
    }
    return puzzleData
}

export async function class7_easy_geometry_angle_3(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var pointB = new Point(math.randomInt(-5,5),math.randomInt(-5,5),'B')
    var angleA = math.randomInt(1,90)
    var angleDiff1 = math.randomInt(20,130)
    var angleB = angleA+angleDiff1
    var angleDiff2 = math.randomInt(angleDiff1,160)
    var angleC = angleA+angleDiff2
    var lineA = new Line(pointA,angleA,'lineA')
    var lineB = new Line(pointA,angleB,'lineB')
    var lineC = new Line(pointA,angleC,'lineC')
    lineA.draw()
    lineB.draw()
    lineC.draw()
    //delay(1000)
    var pointC = getIntersection(lineA,lineB)
    var angle1 = new Angle(lineA.end,pointC,lineB.end,'angle1') 
    angle1.draw()
    angle1.setCaption(angleDiff1.toString()+'°')
    angle1.setLabelVisible(true)
    setColor(angle1,getRandomColor())
    var pointD = createMirrorPointOnLine(lineA.start,lineA.end,'D')
    var angle2 = new Angle(lineB.end,pointC,pointD,'angle2')
    angle2.draw()
    angle2.setCaption('\u03B1')
    angle2.setLabelVisible(true)
    setColor(angle2,'red')

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = 180-angleDiff1 

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['geometry','angle'],
        difficulty : ['easy'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'puzzle',
        question : app.getBase64(),
        questionText : "Bestimme den Winkel $$\alpha$$.",
        scope : {
            '\\alpha':{sol:sol,unit:"°"}
        },
    }
    return puzzleData
}





