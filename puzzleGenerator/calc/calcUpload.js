import {db} from '/main/db.js'
import {ref, get, update, remove, push, child } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
import {deepCopy} from '/main/helper.js'
import {uploadSingleGGBJSPuzzle} from '../ggbJS/ggbUpload.js'
import * as calcTopicArrays from './calcPuzzles.js'

export async function uploadAllCalcTopics(resetDatabase=false){
    if(resetDatabase==true){
        remove(ref(db,'puzzles')) 
    } 
    var calcTopics = Object.keys(calcTopicArrays)
    for (var i=0;i<calcTopics.length;i++){
        await uploadCalcTopic(calcTopics[i])
    } 
}

export async function uploadCalcTopic(topic){ 
    var puzzleObject = calcTopicArrays[topic]
    var questions = puzzleObject.questions
    for(var key in questions){
        var puzzleData = await extractPuzzleData(puzzleObject,key)
        await uploadSingleGGBJSPuzzle(puzzleData)
    }
}

export async function extractPuzzleData(puzzleObject,questionKey){
    var puzzleObjectCopy = deepCopy(puzzleObject)
    var questionNode = puzzleObjectCopy.questions[questionKey]
    delete puzzleObjectCopy.questions
    var puzzleData = {...puzzleObjectCopy,...questionNode}
    return Promise.resolve(puzzleData)
}
