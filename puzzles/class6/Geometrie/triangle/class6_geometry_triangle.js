import {setCoordSystem} from '../../../../puzzleGenerator/ggbJS/ggbDisplay.js'
import {Point,Segment,Angle,importantPoints,resetImportantPoints} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/basis.js'
import {Triangle,Pgramm,Polygon,Rectangle} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/shapes.js'
import {getDistance,setColor,startPuzzleConstructionMode} from '../../../../puzzleGenerator/ggbJS/ggbGenerator/constructionFunctions.js'
import {ggbSetBase64,template,toolbar} from '../../../../main/parameters.js'

export async function class6_easy_geometry_triangle(){
    /*initalize puzzle*/
    resetImportantPoints()
    await ggbSetBase64(template.geo64);
    //await startPuzzleConstructionMode(template.geo,toolbar.simple)
    
    /*create random problem*/
    var pointA = new Point(math.randomInt(1,20),math.randomInt(1,20),'A')
    var pointB = new Point(math.randomInt(10,1),math.randomInt(6,15),'B')
    var seg1 = new Segment(pointA,pointB,null,'s1')
    var seg2 = new Segment(seg1.start,5,80,'s2') 
    var t1 = new Triangle(seg1,seg2,null,'t1')
    t1.draw() 
    t1.drawPoints(false)
    setColor(t1.seg3,'purple')
    var sol = Number(getDistance(t1.seg3,t1.getOppositePoint(t1.seg3)).toFixed(1))
    
    /*init layout and ruler*/
    var center = await setCoordSystem(importantPoints)
    app.setCoords('G',center[0],center[1])
    app.setGridVisible(false)
    app.setOnTheFlyPointCreationActive(false)
 
    /*create data for upload*/
    var puzzleData = {
        schoolClass : ['class6'],
        topics : ['geometry','triangle'],
        difficulty : ['easy'],
        layout : 'geogebra',
        ruler : true,
        toolbar : toolbar.simple,
        form : 'puzzle',
        question : app.getBase64(),
        questionText : "Bestimme die Höhe $$h$$ des Dreiecks.",
        scope : {
            'h':{sol:sol,unit:"cm"}
        },
    }
    return puzzleData
}


