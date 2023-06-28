import {appID} from '../../main/parameters.js'
import {delay} from '../../main/helper.js'
import {colorMap} from '../../puzzleGenerator/ggbJS/ggbGenerator/constructionFunctions.js'

/*control checkers for mathquill enter handler*/

export async function checkGGBMain(puzzleData,mq){ 
    var scope = puzzleData.scope
    var sol = Object.values(scope)[0].sol
    var check = math.symbolicEqual(sol.toString(),mq.text())
    console.log(check)
    if(puzzleData.form=='drawInput'){
        if(check==true) drawFunction(mq,'green')
            else drawFunction(mq,'red')
        delay(500)
    }
    return Promise.resolve(check)
}


export async function drawFunction(mq,color='black'){
    var functionString = mq.text()
    var objName = eval(`${appID}.evalCommandGetLabels('f(x)=${functionString}')`) 
    app.setColor(objName,...colorMap[color])
}

