import {appID} from '../../main/parameters.js'
import {delay} from '../../main/helper.js'
import {colorMap} from '../../puzzleGenerator/ggbJS/ggbGenerator/constructionFunctions.js'

/*control checkers for mathquill enter handler*/

export async function checkGGBMain(puzzleData,mq){ 
    var scope = puzzleData.scope
    var firstItem = Object.values(scope)[0]
    var sol = Object.values(scope)[0].sol
    if(firstItem.checker==null){
        var check = math.symbolicEqual(sol.toString(),mq.text())
    } else if(firstItem.checker=='pointOnFunction'){
        var check = checkPointOnFunction(sol,mq.text())
    } else if(firstItem.checker=='pointsOnFunction'){
        var check = checkPointsOnFunction(sol,mq.text())
    }
    console.log(check)
    if(puzzleData.form=='drawInput'){
        if(check==true) await drawFunction(mq,'green')
            else await drawFunction(mq,'red')
        delay(500)
    }
    return Promise.resolve(check)
}

function checkPointOnFunction(sol,input){
    var xVal = sol[0]
    var myYVal = math.evaluate(input,{x:xVal})
    if(myYVal==sol[1]) return true
    else return false
}

function checkPointsOnFunction(pointsList,input){
    var checkCount = 0
    for(var i=0;i<pointsList.length;i++){
        if(checkPointOnFunction(pointsList[i],input)==true) checkCount++
        if(checkCount==2) return true
    } 
    return false
}

export async function drawFunction(mq,color='black'){
    var functionString = mq.text()
    var objName = eval(`${appID}.evalCommandGetLabels('f(x)=${functionString}')`) 
    app.setColor(objName,...colorMap[color])
}

