import {breakpoint} from './main/style.js'
import {appletSize} from './main/parameters.js'
import {getFontSize} from './puzzleGenerator/calc/calcDisplay.js'
import {loadPuzzle,updateInfos} from './main/game/game.js'

/*zoom coordinate system to object*/
export async function setCoordSystem(points){
    var maxX=points[0].x+1;
    var minX=points[0].x-1;
    var maxY=points[0].y+1;
    var minY=points[0].y-1;
    points.forEach(object => {
        if(object.x>maxX) maxX = object.x+1
        else if(object.x<minX) minX = object.x-1
        if(object.y>maxY) maxY = object.y+1
        else if(object.y<minY) minY = object.y-1
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


/*----------------------------------------------------------------------------------------------------*/
/*--------------------------------------MAIN----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

var MQ = MathQuill.getInterface(2);

export function displayLayoutGeogebra(puzzleData,game=false,puzzleNumber=null){
    //await ggbSetBase64(puzzleData.question)
    var fontSize = getFontSize()    
    var problemArea = $('#ggb-problem-area')
    var question = $('<span>')
    .addClass('align-self-center')
    .attr('id','question')
    .css('font-size',fontSize)
    problemArea.append(question)
    var staticField = MQ.StaticMath(document.getElementById('question'))
    var scope = puzzleData.scope
    staticField.latex(Object.keys(scope)[0]+'=')
    var answer = $('<span>')
    .addClass('align-self-center')
    .attr('id','answer')
    .css('font-size',fontSize) 
    problemArea.append(answer)
    var mq = MQ.MathField(document.getElementById('answer'),{
        handlers: {
            enter: function() {
                var check = checkGGB(mq,Object.values(scope)[0].sol)
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

function checkGGB(mq,sol){
    if(Number(mq.text())==sol) return true
    else return false
}

