import {setCoordSystem,positionCoordSystem} from '../../../../puzzleGenerator/ggbJS/ggbDisplay.js'
import {ggbSetBase64,template,toolbar} from '../../../../main/parameters.js'
import {delay} from '../../../../main/helper.js'
import {Point,Segment,Line,Angle,importantPoints,resetImportantPoints} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/basis.js'
import {createTwoRandomPointsOnLine,getMaxAbsYCoordValue} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/constructionFunctions.js'

export async function class7_functions_linear_easy_1(){
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var gradient = math.randomInt(-5,5)
    var pointsOnLine = createTwoRandomPointsOnLine(gradient,0,-5,5,1)
    var point1 = pointsOnLine[0]
    point1.draw()
    var point2 = pointsOnLine[1]
    point2.draw()
    

    /*init layout and ruler*/
    var maxYCoord = getMaxAbsYCoordValue(importantPoints)
    await positionCoordSystem(maxYCoord*1.5,-(maxYCoord)*0.2)
    //app.setCoords('G',center[0],center[1])
    //app.setGridVisible(false)
    //app.setAxesVisible(false)
    app.setOnTheFlyPointCreationActive(false)
    
    /*calculate solutions*/
    if(gradient==0) var sol=point1.y
    else var sol = gradient+'*x' 

    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class7'],
        topics : ['functions','linear'],
        difficulty : ['easy'],
        layout : 'geogebra',
        ruler : false,
        toolbar : false,
        form : 'puzzle',
        question : app.getBase64(),
        questionText : "Bestimme die lineare Funktion durch die beiden Punkte.",
        scope : {
            'y':{sol:sol,unit:""}
        },
    }
    return puzzleData
}

