import {setCoordSystem,positionCoordSystem} from '../../../../puzzleGenerator/ggbJS/ggbDisplay.js'
import {ggbSetBase64,template,toolbar} from '../../../../main/parameters.js'
import {delay} from '../../../../main/helper.js'
import {Point,Segment,Line,Angle,importantPoints,resetImportantPoints} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/basis.js'
import {createTwoRandomPointsOnLine,getMaxAbsYCoordValue,createRandomPolyFunctionString,startPuzzleConstructionMode,colorMap,getRandomColor} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/constructionFunctions.js'

export async function class7_easy_function_assign_1(){
    resetImportantPoints()
    await ggbSetBase64(template.cleanFreeAxes64);
    //await startPuzzleConstructionMode(template.cleanWithInput,false)

    /*create random problem*/
    var randomXvalue = math.randomInt(-3,3)
    var randomFunctionString = createRandomPolyFunctionString(math.randomInt(1,5),-3,3)
    app.evalCommand('f(x)='+randomFunctionString)
    app.setColor('f',...colorMap[getRandomColor()])
    /*calculate solutions*/
    
    var sol = math.evaluate(randomFunctionString,{x:randomXvalue})
    /*init layout*/
    await positionCoordSystem(Math.abs(Number(sol))+1,0) 
    app.setOnTheFlyPointCreationActive(false)
    
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
        questionText : "Finde den zugeordneten y-Wert der Funktion.",
        scope : {
            'y':{sol:sol,unit:"",latex:'x='+randomXvalue+' \\ \\mapsto \\ y='}
        },
    }
    return puzzleData
}

