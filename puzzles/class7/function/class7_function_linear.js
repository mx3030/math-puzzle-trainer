import {setCoordSystem,positionCoordSystem} from '../../../../puzzleGenerator/ggbJS/ggbDisplay.js'
import {ggbSetBase64,template,toolbar} from '../../../../main/parameters.js'
import {delay,generateRandomNumberWithStep} from '../../../../main/helper.js'
import {Point,Segment,Line,Angle,importantPoints,resetImportantPoints} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/basis.js'
import {createTwoRandomPointsOnLine,getMaxAbsYCoordValue,colorMap,setColor,getRandomColor,setPointStyle,createRandomPolyFunctionString,createRandomLinearFunctionString} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/constructionFunctions.js'

export async function class7_easy_function_linear_1(){
    /*draw horizontal functions*/
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var yIntersection = math.randomInt(-5,5)
    var pointsOnLine = createTwoRandomPointsOnLine(0,yIntersection,-5,5,1)
    var point1 = pointsOnLine[0]
    point1.draw()
    setColor(point1,'dodgerblue')
    setPointStyle(point1,6,0)
    var point2 = pointsOnLine[1]
    point2.draw()
    setColor(point2,'dodgerblue')
    setPointStyle(point2,6,0)

    /*init layout and ruler*/
    var maxYCoord = 5
    await positionCoordSystem(maxYCoord*1.5,-(maxYCoord)*0.2)
    //app.setCoords('G',center[0],center[1])
    //app.setGridVisible(false)
    //app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)

    /*calculate solutions*/
    var sol=yIntersection 

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['function','linear'],
        difficulty : ['easy'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'drawInput',
        question : app.getBase64(),
        questionText : "Bestimme die lineare Funktion durch die beiden Punkte.",
        scope : {
            'y':{sol:sol,unit:""}
        },
    }
    return puzzleData
}

export async function class7_easy_function_linear_2(){
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var randomFunctionString = createRandomLinearFunctionString(math.randomInt(-5,5),math.randomInt(-5,5),true)
    app.evalCommand('f(x)='+randomFunctionString)
    app.setColor('f',...colorMap[getRandomColor()])

    /*init layout and ruler*/
    await positionCoordSystem(10)
    //app.setCoords('G',center[0],center[1])
    //app.setGridVisible(false)
    //app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)

    /*calculate solutions*/
    var sol=randomFunctionString 

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['function','linear'],
        difficulty : ['easy'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'puzzle',
        question : app.getBase64(),
        questionText : "Welche lineare Funktion ist dargestellt?",
        scope : {
            'y':{sol:sol,unit:""}
        },
    }
    return puzzleData
}

export async function class7_easy_function_linear_3(){
    /*setup points of random functions throuch (0,0)*/
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var point = new Point(math.randomInt(-5,5),math.randomInt(-5,5))
    point.draw()
    setColor(point,'dodgerblue')
    setPointStyle(point,6,0)

    /*init layout and ruler*/
    var maxYCoord = getMaxAbsYCoordValue(importantPoints)
    await positionCoordSystem(maxYCoord*1.5,-(maxYCoord)*0.2)
    app.setOnTheFlyPointCreationActive(false)

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['function','linear'],
        difficulty : ['easy'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'drawInput',
        question : app.getBase64(),
        questionText : "Bestimme eine lineare Funktion durch den Punkt.",
        scope : {
            'y':{sol:[point.x,point.y],unit:"",checker:'pointOnFunction'}
        },
    }
    return puzzleData
}

export async function class7_easy_function_linear_4(){
    /*setup points of random functions throuch (0,0)*/
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    /*create array with 10 random points*/
    var pointsList = []
    for(var i=0;i<10;i++){
        var point = new Point(math.randomInt(-10,10),math.randomInt(-10,10))
        point.draw()
        pointsList.push([point.x,point.y])
        setColor(point,'dodgerblue')
        setPointStyle(point,6,0)
    }
    /*init layout and ruler*/
    var maxYCoord = getMaxAbsYCoordValue(importantPoints)
    await positionCoordSystem(maxYCoord*1.5,-(maxYCoord)*0.2)
    app.setOnTheFlyPointCreationActive(false)

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['function','linear'],
        difficulty : ['easy'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'drawInput',
        question : app.getBase64(),
        questionText : "Bestimme eine lineare Funtion durch 2 beliebige Punkte.",
        scope : {
            'y':{sol:pointsList,unit:"",checker:'pointsOnFunction'}
        },
    }
    return puzzleData
}

export async function class7_medium_function_linear_1(){
    /*setup points of random functions throuch (0,0)*/
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var gradient = math.randomInt(-5,5)
    var pointsOnLine = createTwoRandomPointsOnLine(gradient,0,-5,5,1)
    var point1 = pointsOnLine[0]
    point1.draw()
    setColor(point1,'dodgerblue')
    setPointStyle(point1,6,0)
    var point2 = pointsOnLine[1]
    point2.draw()
    setColor(point2,'dodgerblue')
    setPointStyle(point2,6,0)

    /*init layout and ruler*/
    var maxYCoord = getMaxAbsYCoordValue(importantPoints)
    await positionCoordSystem(maxYCoord*1.5,-(maxYCoord)*0.2)
    app.setOnTheFlyPointCreationActive(false)

    /*calculate solutions*/
    if(gradient==0) var sol=point1.y
    else var sol = gradient+'*x' 

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['function','linear'],
        difficulty : ['medium'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'drawInput',
        question : app.getBase64(),
        questionText : "Bestimme die lineare Funktion durch die beiden Punkte.",
        scope : {
            'y':{sol:sol,unit:""}
        },
    }
    return puzzleData
}

export async function class7_medium_function_linear_2(){
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var randomFunctionString = createRandomLinearFunctionString(math.randomInt(-10,10),math.randomInt(-10,10),true)
    app.evalCommand('f(x)='+randomFunctionString)
    app.setColor('f',...colorMap[getRandomColor()])

    /*init layout and ruler*/
    await positionCoordSystem(10)
    //app.setCoords('G',center[0],center[1])
    //app.setGridVisible(false)
    //app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)

    /*calculate solutions*/
    var sol=randomFunctionString 

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['function','linear'],
        difficulty : ['medium'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'puzzle',
        question : app.getBase64(),
        questionText : "Welche lineare Funktion ist dargestellt?",
        scope : {
            'y':{sol:sol,unit:""}
        },
    }
    return puzzleData
}

export async function class7_medium_function_linear_3(){
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var randomFunctionString = createRandomLinearFunctionString(math.randomInt(-5,5),math.randomInt(-5,5),false)
    app.evalCommand('f(x)='+randomFunctionString)
    app.setColor('f',...colorMap[getRandomColor()])

    /*init layout and ruler*/
    await positionCoordSystem(10)
    //app.setCoords('G',center[0],center[1])
    //app.setGridVisible(false)
    //app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)

    /*calculate solutions*/
    var sol=randomFunctionString 

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['function','linear'],
        difficulty : ['medium'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'puzzle',
        question : app.getBase64(),
        questionText : "Welche lineare Funktion ist dargestellt?",
        scope : {
            'y':{sol:sol,unit:""}
        },
    }
    return puzzleData
}



export async function class7_hard_function_linear_1(){
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var gradient = math.randomInt(-5,5)
    var yIntersection = math.randomInt(-5,5)
    var pointsOnLine = createTwoRandomPointsOnLine(gradient,yIntersection,-5,5,1)
    var point1 = pointsOnLine[0]
    point1.draw()
    setColor(point1,'dodgerblue')
    setPointStyle(point1,6,0)
    var point2 = pointsOnLine[1]
    point2.draw()
    setColor(point2,'dodgerblue')
    setPointStyle(point2,6,0)

    /*init layout and ruler*/
    var maxYCoord = getMaxAbsYCoordValue(importantPoints)
    await positionCoordSystem(maxYCoord*1.5,-(maxYCoord)*0.2)
    app.setOnTheFlyPointCreationActive(false)

    /*calculate solutions*/
    var sol=gradient+'*x+'+yIntersection

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['function','linear'],
        difficulty : ['hard'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'drawInput',
        question : app.getBase64(),
        questionText : "Bestimme die lineare Funktion durch die beiden Punkte.",
        scope : {
            'y':{sol:sol,unit:""}
        },
    }
    return puzzleData
}

export async function class7_hard_function_linear_2(){
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var randomFunctionString = createRandomLinearFunctionString(generateRandomNumberWithStep(-5,5,0.5),generateRandomNumberWithStep(-5,5,0.5),false)
    app.evalCommand('f(x)='+randomFunctionString)
    app.setColor('f',...colorMap[getRandomColor()])

    /*init layout and ruler*/
    await positionCoordSystem(10)
    //app.setCoords('G',center[0],center[1])
    //app.setGridVisible(false)
    //app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)

    /*calculate solutions*/
    var sol=randomFunctionString 

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['function','linear'],
        difficulty : ['medium'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'puzzle',
        question : app.getBase64(),
        questionText : "Welche lineare Funktion ist dargestellt?",
        scope : {
            'y':{sol:sol,unit:""}
        },
    }
    return puzzleData
}

