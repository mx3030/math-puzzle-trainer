import {breakpoint} from '../../main/style.js'
import {appletSize,appID} from '../../main/parameters.js'
import {getFontSize} from '../../puzzleGenerator/calc/calcDisplay.js'
import {loadPuzzle,updateInfos} from '../../main/game/game.js'
import {checkGGBMain} from '../../puzzleGenerator/ggbJS/ggbCheckers.js'

/*zoom coordinate system to object*/
export async function setCoordSystem(points,space=1){
    var maxX=points[0].x+space;
    var minX=points[0].x-space;
    var maxY=points[0].y+space;
    var minY=points[0].y-space;
    points.forEach(object => {
        if(object.x>maxX) maxX = object.x+space
        else if(object.x<minX) minX = object.x-space
        if(object.y>maxY) maxY = object.y+space
        else if(object.y<minY) minY = object.y-space
    });
    var distX = maxX-minX
    var distY = maxY-minY
    var distXnew
    var distYnew
    if(distX>distY){
        distYnew = distX*(appletSize[breakpoint][1]/appletSize[breakpoint][0])
        /*center object*/
        var temp=maxY
        maxY = minY+distYnew //only this -> not centered
        var temp2 = maxY-temp
        maxY = temp+temp2/2
        minY = minY-temp2/2
    } else {
        distXnew = distY*(appletSize[breakpoint][0]/appletSize[breakpoint][1])
        var temp = maxX
        maxX = minX+distXnew
        var temp2 = maxX-temp
        maxX = temp + temp2/2
        minX = minX - temp2/2
    }
    app.setCoordSystem(minX,maxX,minY,maxY)
    return Promise.resolve([(minX+maxX)/2,(minY+maxY)/2])
}

export async function positionCoordSystem(max,yMovement=0){
    var centerPoint = {
        point:'temp',
        x:0,
        y:yMovement
    }
    return await setCoordSystem([centerPoint],max)
}


/*----------------------------------------------------------------------------------------------------*/
/*--------------------------------------MAIN----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

var MQ = MathQuill.getInterface(2);

export function displayLayoutGeogebra(puzzleData,game=false,puzzleNumber=null){
    //await ggbSetBase64(puzzleData.question)
    /*show ruler control if needed*/
    if(puzzleData.ruler==true) $('#geo').removeClass('d-none')
    else $('#geo').addClass('d-none')
    /*show toolbar if needed*/
    if(puzzleData.toolbar!=false){
        eval(`${appID}.setCustomToolBar(${puzzleData.toolbar})`)
        eval(`${appID}.showToolBar(true)`)
    } else {
        eval(`${appID}.showToolBar(false)`)
    }

    var fontSize = getFontSize()    
    var problemArea = $('#ggb-problem-area')
    var question = $('<span>')
    .addClass('align-self-center')
    .attr('id','question')
    .css('font-size',fontSize)
    problemArea.append(question)
    var staticField = MQ.StaticMath(document.getElementById('question'))
    var scope = puzzleData.scope
    /*TODO: manage multiple solution fields*/
    var scopeLatex = Object.values(scope)[0].latex
    /*check if puzzle has specific question string for solution input*/
    if((typeof scopeLatex)!='string') staticField.latex(Object.keys(scope)[0]+'=')
    else staticField.latex(scopeLatex)
    var answer = $('<span>')
    .addClass('align-self-center')
    .attr('id','answer')
    .css('font-size',fontSize) 
    problemArea.append(answer)
    var mq = MQ.MathField(document.getElementById('answer'),{
        handlers: {
            enter: async function() {
                /*run different checkers depending on puzzle*/
                /*TODO: checker for drawings*/
                var check = await checkGGBMain(puzzleData,mq) 
                if(game==true){
                    loadPuzzle(puzzleNumber+1)
                    updateInfos(puzzleNumber,check)
                }
            }
        }
    })
    mq.focus()
    var answerUnit = $('<span>')
    .addClass('align-self-center ms-3')
    .attr('id','answerUnit')
    .css('font-size',fontSize)
    problemArea.append(answerUnit)
    var staticField2 = MQ.StaticMath(document.getElementById('answerUnit'))
    staticField2.latex(Object.values(scope)[0].unit)
}



