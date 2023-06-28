import {setCoordSystem} from '../../../../puzzleGenerator/ggbJS/ggbDisplay.js'
import {ggbSetBase64,template,toolbar} from '../../../../main/parameters.js'
import {delay} from '../../../../main/helper.js'
import {Point,Segment,Line,Angle,importantPoints,resetImportantPoints} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/basis.js'

export async function class7_functions_linear_1(){
    resetImportantPoints()
    await ggbSetBase64(template.clean64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var pointA = new Point(math.randomInt(1,1),math.randomInt(1,1),'A')
    pointA.draw()
    var pointB = new Point(math.randomInt(-5,5),math.randomInt(-5,5),'B')
    pointB.draw()
    

    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints,3)
    app.setCoords('G',center[0],center[1])
    //app.setGridVisible(false)
    //app.setAxesVisible(false)
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
        questionText : "Finde eine lineare Funktion durch die beiden Punkte.",
        scope : {
            '\\alpha':{sol:sol,unit:"°"}
        },
    }
    return puzzleData
}

