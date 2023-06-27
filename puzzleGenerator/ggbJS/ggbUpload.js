import {db, firebaseConfig} from '../../main/db.js'
import {ref, get, update, remove, push, child } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
import * as ggbjsTopicFunctions from '../../puzzleGenerator/ggbJS/ggbPuzzles.js'
import {areEqual} from '../../main/helper.js'
import {puzzleImports,ggbjsPuzzles,calcPuzzles} from '../../puzzleGenerator/puzzleGenerator_v2.js'

export const maxRandom = 10000

export async function uploadAllGGBJSTopics(numberOfPuzzles=10,resetDatabase=false){
    if(resetDatabase==true){
        remove(ref(db)) 
    }
    /*upload all functions from ggbGenerator.js with export statment*/
    var ggbjsTopics = Object.keys(ggbjsTopicFunctions)
    for(var i=0;i<ggbjsTopics.length;i++){
        await uploadTopic(ggbjsTopics[i],numberOfPuzzles)
    } 
    console.log("upload done")
}

export async function uploadGGBJSTopic(topicName,numberOfPuzzles=10){ 
    for(var i=0;i<numberOfPuzzles;i++){
        var puzzleData = await eval(`ggbjsTopicFunctions.${topicName}()`)
        await uploadSingleGGBJSPuzzle(puzzleData)
    }
}

/*this will be used on all puzzle uploads*/
export async function uploadSingleGGBJSPuzzle(puzzleData){
    var tags = [...puzzleData.topics,...puzzleData.difficulty,puzzleData.form,...puzzleData.schoolClass]
    var root = ref(db)
    /*generate tags section if needed*/
    var tagsRef = child(root,'tags')
    var snapshot = await get(tagsRef)
    var tagKey = null
    for (var key in snapshot.val()){
        var existingTags = snapshot.val()[key]
        if(areEqual(existingTags,tags)){
            tagKey = key
            break
        }
    }
    if(tagKey==null){
        tagKey = await push(tagsRef).key
        await update(tagsRef,{
            [tagKey] : tags
        })
    }    
    
    /*insert puzzle under tag key*/
    puzzleData.random = math.randomInt(1,maxRandom)
    var puzzlesRef = child(root,'puzzles')
    var puzzlesTagRef = child(puzzlesRef,tagKey)
    var puzzlesTagRefKey = await push(puzzlesTagRef)
    var pathToPuzzle = ""+puzzlesTagRefKey
    puzzleData.path = pathToPuzzle.replace(firebaseConfig.databaseURL,"")
    await update(puzzlesTagRefKey,puzzleData) 
    console.log("puzzle uploaded")
}
