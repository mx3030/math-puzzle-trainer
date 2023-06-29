import {setCoordSystem} from '../../../../puzzleGenerator/ggbJS/ggbDisplay.js'
import {ggbSetBase64,template,toolbar} from '../../../../main/parameters.js'
import {delay,generateRandomNumberWithStep} from '../../../../main/helper.js'
import {Point,Segment,Line,Angle,importantPoints,resetImportantPoints} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/basis.js'
import {Triangle,Pgramm,Polygon,Rectangle} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/shapes.js'
import {
    getDistance,
    setColor,
    getRandomColor,
    colorMap,
    getIntersection,
    startPuzzleConstructionMode,
    createMirrorPointOnLine,
    createParallelLine,
    createPointOnLine,
    getDistanceBetweenPoints
    } from '../../../../puzzleGenerator/ggbJS/ggbGenerator/constructionFunctions.js'

export async function class7_easy_geometry_angle_1(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
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
    app.setRounding("10s")
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
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var pointB = new Point(math.randomInt(-5,5),math.randomInt(-5,5),'B')
    var angleA = math.randomInt(1,90)
    var angleDiff1 = generateRandomNumberWithStep(20,130,5)
    var angleB = angleA+angleDiff1
    var angleDiff2 = generateRandomNumberWithStep(angleDiff1,160,5)
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
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    var pointD = createMirrorPointOnLine(lineA.start,lineA.end,'D')
    var angle2 = new Angle(lineC.end,pointC,pointD,'angle2')
    angle2.draw()
    angle2.setCaption((180-angleDiff2).toString()+'°')
    angle2.setLabelVisible(true)
    setColor(angle2,getRandomColor(['red',angle1color]))
    var angle3 = new Angle(lineB.end,pointC,lineC.end,'angle3')
    angle3.draw()
    angle3.setCaption('\u03B1')
    angle3.setLabelVisible(true)
    setColor(angle3,'red')

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = angleDiff2 - angleDiff1

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

export async function class7_easy_geometry_angle_4(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(0,90,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,180,10)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    var pointC = createPointOnLine(lineA,pointA,distanceAB*0.3)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineC,pointA,distanceAB*0.3)
    pointD.draw()
    pointD.setVisible(false)
    var angle1 = new Angle(pointC,pointA,pointD,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointE = createPointOnLine(lineB,pointB,distanceAB*0.3)
    pointE.draw()
    pointE.setVisible(false)
    var pointF = createPointOnLine(lineC,pointB,distanceAB*0.3)
    pointF.draw()
    pointF.setVisible(false)
    var angle2 = new Angle(pointE,pointB,pointF,'angle2')
    angle2.draw()
    setColor(angle2,'red')
    angle2.setCaption('\u03B1')
    angle2.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = Math.round(angle2.getValue()) 

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

export async function class7_easy_geometry_angle_5(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(0,180,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,180,5)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    var pointC = createPointOnLine(lineA,pointA,distanceAB*0.3)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineC,pointA,distanceAB*0.3)
    pointD.draw()
    pointD.setVisible(false)
    var angle1 = new Angle(pointC,pointA,pointD,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointE = createPointOnLine(lineB,pointB,-distanceAB*0.3)
    pointE.draw()
    pointE.setVisible(false)
    var pointF = createPointOnLine(lineC,pointB,-distanceAB*0.3)
    pointF.draw()
    pointF.setVisible(false)
    var angle2 = new Angle(pointE,pointB,pointF,'angle2')
    angle2.draw()
    setColor(angle2,'red')
    angle2.setCaption('\u03B1')
    angle2.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = Math.round(angle2.getValue()) 

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

export async function class7_easy_geometry_angle_6(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(0,180,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,180,5)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    var pointC = createPointOnLine(lineA,pointA,distanceAB*0.3)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineC,pointA,distanceAB*0.3)
    pointD.draw()
    pointD.setVisible(false)
    var angle1 = new Angle(pointC,pointA,pointD,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointE = createPointOnLine(lineB,pointB,distanceAB*0.3)
    pointE.draw()
    pointE.setVisible(false)
    var pointF = createPointOnLine(lineC,pointB,-distanceAB*0.3)
    pointF.draw()
    pointF.setVisible(false)
    var angle2 = new Angle(pointF,pointB,pointE,'angle2')
    angle2.draw()
    setColor(angle2,'red')
    angle2.setCaption('\u03B1')
    angle2.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = Math.round(angle2.getValue()) 

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

export async function class7_easy_geometry_angle_7(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(0,180,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,180,5)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    var pointC = createPointOnLine(lineA,pointA,-distanceAB*0.3)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineC,pointA,-distanceAB*0.3)
    pointD.draw()
    pointD.setVisible(false)
    var angle1 = new Angle(pointC,pointA,pointD,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointE = createPointOnLine(lineB,pointB,distanceAB*0.3)
    pointE.draw()
    pointE.setVisible(false)
    var pointF = createPointOnLine(lineC,pointB,-distanceAB*0.3)
    pointF.draw()
    pointF.setVisible(false)
    var angle2 = new Angle(pointF,pointB,pointE,'angle2')
    angle2.draw()
    setColor(angle2,'red')
    angle2.setCaption('\u03B1')
    angle2.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = Math.round(angle2.getValue()) 

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

export async function class7_easy_geometry_angle_8(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(1,180,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,180,5)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    var pointC = createPointOnLine(lineA,pointA,-distanceAB*0.3)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineC,pointA,-distanceAB*0.3)
    pointD.draw()
    pointD.setVisible(false)
    var angle1 = new Angle(pointC,pointA,pointD,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointE = createPointOnLine(lineB,pointB,-distanceAB*0.3)
    pointE.draw()
    pointE.setVisible(false)
    var pointF = createPointOnLine(lineC,pointB,-distanceAB*0.3)
    pointF.draw()
    pointF.setVisible(false)
    var angle2 = new Angle(pointF,pointB,pointE,'angle2')
    angle2.draw()
    setColor(angle2,'red')
    angle2.setCaption('\u03B1')
    angle2.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = 360-Math.round(angle2.getValue()) 
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

export async function class7_easy_geometry_angle_9(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(1,180,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,180,5)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    var pointC = createPointOnLine(lineA,pointA,-distanceAB*0.3)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineC,pointA,-distanceAB*0.3)
    pointD.draw()
    pointD.setVisible(false)
    var angle1 = new Angle(pointC,pointA,pointD,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointE = createPointOnLine(lineB,pointB,-distanceAB*0.3)
    pointE.draw()
    pointE.setVisible(false)
    var pointF = createPointOnLine(lineC,pointB,+distanceAB*0.3)
    pointF.draw()
    pointF.setVisible(false)
    var angle2 = new Angle(pointE,pointB,pointF,'angle2')
    angle2.draw()
    setColor(angle2,'red')
    angle2.setCaption('\u03B1')
    angle2.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = 360-Math.round(angle2.getValue()) 
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

export async function class7_easy_geometry_angle_10(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(1,180,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,180,5)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    var pointC = createPointOnLine(lineA,pointA,-distanceAB*0.3)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineC,pointA,-distanceAB*0.3)
    pointD.draw()
    pointD.setVisible(false)
    var angle1 = new Angle(pointC,pointA,pointD,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointE = createPointOnLine(lineB,pointB,+distanceAB*0.3)
    pointE.draw()
    pointE.setVisible(false)
    var pointF = createPointOnLine(lineC,pointB,+distanceAB*0.3)
    pointF.draw()
    pointF.setVisible(false)
    var angle2 = new Angle(pointE,pointB,pointF,'angle2')
    angle2.draw()
    setColor(angle2,'red')
    angle2.setCaption('\u03B1')
    angle2.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = Math.round(angle2.getValue()) 
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

export async function class7_medium_geometry_angle_1(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)
    
    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(1,90,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,120,5)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    /*use 20% of distance for angle*/
    var angleDist = distanceAB*0.2
    var lineDangle = lineCangle+generateRandomNumberWithStep(30,70,5)
    var lineD = new Line(pointB,lineDangle,'lineD')
    lineD.draw()
    var pointC = getIntersection(lineA,lineD)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineA,pointA,angleDist)
    pointD.draw()
    pointD.setVisible(false)
    var pointE = createPointOnLine(lineC,pointA,angleDist)
    pointE.draw()
    pointE.setVisible(false)
    var angle1 = new Angle(pointD,pointA,pointE,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointF = createPointOnLine(lineC,pointB,-angleDist)
    pointF.draw()
    pointF.setVisible(false)
    var pointG = createPointOnLine(lineD,pointB,-angleDist)
    pointG.draw()
    pointG.setVisible(false)
    var angle2 = new Angle(pointF,pointB,pointG,'angle2')
    angle2.draw()
    var angle2color = getRandomColor(['red',angle1color])
    setColor(angle2,angle2color)
    angle2.setCaption(Math.round(angle2.getValue()).toString()+'°')
    angle2.setLabelVisible(true)
    var pointH = createPointOnLine(lineA,pointC,-angleDist)
    pointH.draw()
    pointH.setVisible(false)
    var pointI = createPointOnLine(lineD,pointC,angleDist)
    pointI.draw()
    pointI.setVisible(false)
    var angle3 = new Angle(pointI,pointC,pointH,'angle3')
    angle3.draw()
    setColor(angle3,'red')
    angle3.setCaption('\u03B1')
    angle3.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,2)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = Math.round(angle3.getValue()) 
    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['geometry','angle'],
        difficulty : ['medium'],
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

export async function class7_medium_geometry_angle_2(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)
    
    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(1,90,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,120,5)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    var angleDist = distanceAB*0.2
    var lineDangle = lineCangle+generateRandomNumberWithStep(30,50,5)
    var lineD = new Line(pointB,lineDangle,'lineD')
    lineD.draw()
    var pointC = getIntersection(lineA,lineD)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineA,pointA,-angleDist)
    pointD.draw()
    pointD.setVisible(false)
    var pointE = createPointOnLine(lineC,pointA,-angleDist)
    pointE.draw()
    pointE.setVisible(false)
    var angle1 = new Angle(pointD,pointA,pointE,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointF = createPointOnLine(lineC,pointB,-angleDist)
    pointF.draw()
    pointF.setVisible(false)
    var pointG = createPointOnLine(lineD,pointB,-angleDist)
    pointG.draw()
    pointG.setVisible(false)
    var angle2 = new Angle(pointF,pointB,pointG,'angle2')
    angle2.draw()
    var angle2color = getRandomColor(['red',angle1color])
    setColor(angle2,angle2color)
    angle2.setCaption(Math.round(angle2.getValue()).toString()+'°')
    angle2.setLabelVisible(true)
    var pointH = createPointOnLine(lineA,pointC,-angleDist)
    pointH.draw()
    pointH.setVisible(false)
    var pointI = createPointOnLine(lineD,pointC,angleDist)
    pointI.draw()
    pointI.setVisible(false)
    var angle3 = new Angle(pointI,pointC,pointH,'angle3')
    angle3.draw()
    setColor(angle3,'red')
    angle3.setCaption('\u03B1')
    angle3.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,2)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = Math.round(angle3.getValue()) 
    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['geometry','angle'],
        difficulty : ['medium'],
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

export async function class7_medium_geometry_angle_3(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)
    
    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(1,90,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,120,5)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    var angleDist=distanceAB*0.2
    var lineDangle = lineCangle+generateRandomNumberWithStep(30,50,5)
    var lineD = new Line(pointB,lineDangle,'lineD')
    lineD.draw()
    var pointC = getIntersection(lineA,lineD)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineA,pointA,+angleDist)
    pointD.draw()
    pointD.setVisible(false)
    var pointE = createPointOnLine(lineC,pointA,-angleDist)
    pointE.draw()
    pointE.setVisible(false)
    var angle1 = new Angle(pointE,pointA,pointD,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointF = createPointOnLine(lineC,pointB,-angleDist)
    pointF.draw()
    pointF.setVisible(false)
    var pointG = createPointOnLine(lineD,pointB,-angleDist)
    pointG.draw()
    pointG.setVisible(false)
    var angle2 = new Angle(pointF,pointB,pointG,'angle2')
    angle2.draw()
    var angle2color = getRandomColor(['red',angle1color])
    setColor(angle2,angle2color)
    angle2.setCaption(Math.round(angle2.getValue()).toString()+'°')
    angle2.setLabelVisible(true)
    var pointH = createPointOnLine(lineA,pointC,-angleDist)
    pointH.draw()
    pointH.setVisible(false)
    var pointI = createPointOnLine(lineD,pointC,angleDist)
    pointI.draw()
    pointI.setVisible(false)
    var angle3 = new Angle(pointI,pointC,pointH,'angle3')
    angle3.draw()
    setColor(angle3,'red')
    angle3.setCaption('\u03B1')
    angle3.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,2)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = Math.round(angle3.getValue()) 
    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['geometry','angle'],
        difficulty : ['medium'],
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

export async function class7_hard_geometry_angle_1(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    app.setRounding("10s")
    //await startPuzzleConstructionMode(template.cleanWithInput,false)
    
    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    pointA.setVisible(false)
    var lineAangle = generateRandomNumberWithStep(1,90,10) 
    var lineA = new Line(pointA,lineAangle,'lineA')
    lineA.draw()
    var lineB = createParallelLine(lineA,math.randomInt(1,5),'lineB')
    lineB.draw()
    var lineCangle = generateRandomNumberWithStep(lineAangle+40,120,5)
    var lineC = new Line(pointA,lineCangle,'lineC')
    lineC.draw()
    var pointB = getIntersection(lineB,lineC)
    pointB.draw()
    pointB.setVisible(false)
    var distanceAB = getDistanceBetweenPoints(pointA,pointB)
    var angleDist = distanceAB*0.2
    var lineDangle = lineCangle+generateRandomNumberWithStep(30,50,5)
    var lineD = new Line(pointB,lineDangle,'lineD')
    lineD.draw()
    var pointC = getIntersection(lineA,lineD)
    pointC.draw()
    pointC.setVisible(false)
    var pointD = createPointOnLine(lineA,pointA,-angleDist)
    pointD.draw()
    pointD.setVisible(false)
    var pointE = createPointOnLine(lineC,pointA,-angleDist)
    pointE.draw()
    pointE.setVisible(false)
    var angle1 = new Angle(pointD,pointA,pointE,'angle1')
    angle1.draw()
    var angle1color = getRandomColor(['red'])
    setColor(angle1,angle1color)
    angle1.setCaption(Math.round(angle1.getValue()).toString()+'°')
    angle1.setLabelVisible(true)
    var pointF = createPointOnLine(lineC,pointB,-angleDist)
    pointF.draw()
    pointF.setVisible(false)
    var pointG = createPointOnLine(lineD,pointB,-angleDist)
    pointG.draw()
    pointG.setVisible(false)
    var angle2 = new Angle(pointF,pointB,pointG,'angle2')
    angle2.draw()
    var angle2color = getRandomColor(['red',angle1color])
    setColor(angle2,angle2color)
    angle2.setCaption(Math.round(angle2.getValue()).toString()+'°')
    angle2.setLabelVisible(true)
    var pointH = createPointOnLine(lineA,pointC,angleDist)
    pointH.draw()
    pointH.setVisible(false)
    var pointI = createPointOnLine(lineD,pointC,angleDist)
    pointI.draw()
    pointI.setVisible(false)
    var angle3 = new Angle(pointH,pointC,pointI,'angle3')
    angle3.draw()
    setColor(angle3,'red')
    angle3.setCaption('\u03B1')
    angle3.setLabelVisible(true)

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,2)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    var sol = Math.round(angle3.getValue()) 
    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['geometry','angle'],
        difficulty : ['hard'],
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

