import {db} from '../../main/db.js'
import {ref, get, update, remove, push, child } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
import {deepCopy} from '../../main/helper.js'
import {uploadSingleGGBJSPuzzle} from '../../puzzleGenerator/ggbJS/ggbUpload.js'
import {genCalcMain} from './calcGenerator.js'

/*puzzleImports contains puzzle modules generated in puzzleGenerator.js*/
import {puzzleImports,ggbjsPuzzles,calcPuzzles} from '../../puzzleGenerator/puzzleGenerator_v2.js'

export async function uploadCalcAll(){ 
    console.log(calcPuzzles)
    for(var path in calcPuzzles){
        /*loop over files in calcPuzzles array*/
        await uploadCalcFile(path)
    }
}

export async function uploadCalcFile(path){
    for(var i=0;i<calcPuzzles[path].length;i++){
        /*loop over arrays in file*/
        await uploadCalcArray(path,calcPuzzles[path][i])
    }
}

export async function uploadCalcArray(path,array){
    var questions = puzzleImports[path][array].questions
    for(var question in questions){
        /*loop over questions in array*/
        await uploadCalcQuestion(path,array,question)
    }
}

export async function uploadCalcQuestion(path,array,question){
    var puzzleData = await generatePuzzleData(path,array,question)
    await uploadSingleGGBJSPuzzle(puzzleData)
}

export async function generatePuzzleData(path,array,question){
    var matchingModule = puzzleImports[path]
    var puzzleObjectCopy = deepCopy(matchingModule[array])
    var questionNode = puzzleObjectCopy.questions[question]
    delete puzzleObjectCopy.questions
    var puzzleData = {...puzzleObjectCopy,...questionNode}
    return Promise.resolve(puzzleData)
}

