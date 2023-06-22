import { ref, set, get, update,child, query, orderByChild, startAt, limitToLast, limitToFirst, orderByValue, orderByKey, push, remove } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
import { db, firebaseConfig } from "../../main/db.js"
import { hasTrailingSpaces, containsSpecialCharacters, isNumeric, containsElements } from "../../main/helper.js"
import { genCalcMain } from "../../puzzleGenerator/calc/calcGenerator.js"

/*get school class from start page*/
export var schoolClass = localStorage.getItem('schoolClass')

/*----------------------------------------------------------------------------------------------------*/
/*----------------------------------------------HOST--------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

$('#createRoomButton').on('click',createRoom)
$('#startGameButton').on('click',createRoom)
async function createRoom(){
    var userInput = getUserInput()
    if(await checkCreateInput(userInput)){
        if(userInput.mode=='Duell'){
            $('#createRoomButtonText').addClass('d-none')
            $('#createRoomButtonSpinner').removeClass('d-none')
        } else {
            $('#startGameText').addClass('d-none')
            $('#startGameSpinner').removeClass('d-none')
        } 
        var [puzzleSet,pathToTemp] = await getPuzzleSet(userInput)
        await addRoomToDatabase(userInput,puzzleSet,pathToTemp)
        localStorage.setItem('mode',userInput.mode)
        var url = '../../main/game/game.html'
        window.location.href=url
    }  
}


/*----------------------------------------------------------------------------------------------------*/
function getUserInput(){
    var mode = $('.modeCheck:checked').attr('id');
    var difficulty = $('.difficultyCheck:checked').val()
    if(mode=='Training'){
        var duration = null
    } else {
        var duration = $('.durationCheck:checked').val()
    }
    if(duration==0){
        var limit = parseInt($('.limitCheck:checked').val())
    } else if(duration==null){
        /*set limit if training mode is selected*/
        var limit = 100
        /*change duration to seconds*/
    } else {
        /*IMPORTANT: set maximum number of puzzles, that get preloaded by creation puzzle list in next step*/
        var limit = 50
        /*change duration to seconds*/
        duration = parseInt(duration)*60
    }
    //console.log(mode,difficulty,duration,limit)
    var topics = []
    $('.topicCheck').each(function(){
        var check = $(this).is(':checked');
        if(check==true) topics.push($(this).val().split(','))
    })
    var playerName=$('#name-input').val()
    playerName = playerName.trim()
    if(mode=='Duell') var roomNumber=$('#room-input').val()
    else var roomNumber = math.randomInt(100000,200000).toString()

    var userInput = {
        schoolClass : schoolClass,
        roomNumber: roomNumber,
        playerName: playerName,
        mode: mode,
        difficulty: difficulty,
        duration: duration,
        limit: limit,
        topics: topics
    }
    console.log(userInput)
    return userInput
}

async function checkCreateInput(userInput){
    var numberOfSelectedTopics = userInput.topics.length
    var playerName = userInput.playerName
    var roomNumber = userInput.roomNumber
    if(numberOfSelectedTopics==0){
        alert("Wähle mindestens ein Themengebiet aus.")
        return false
    }

    /*TODO:filter for bad user names with browserify and bad-words library*/ 
    if(playerName=='' || containsSpecialCharacters(playerName)){
        alert("Gebe deinen Spielernamen an. Verwende nur Buchstaben und Zahlen.")
        return false
    } 

    if(!isNumeric(roomNumber)){
        alert("Raum Nr. muss eine Zahl sein.")
        return false
    }
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var connectedPlayersRef = child(gameRef,'connectedPlayers')
    var snapshot = await get(connectedPlayersRef)
    var connectedList = snapshot.val()
    /*user can only recreate a room, if every connected Player is set to false*/
    /*TODO: problem is, that game rooms dont get deleted over time -> maybe limit number of game rooms */
    for(var player in connectedList){
        if(connectedList[player]==true){
            alert("Raum Nr. ist bereits belegt. Du kannst dem Raum beitreten.")
            return false
        }
    }
    /*delete temps path if existing*/
    var tempsRef = child(root,'temps')
    var pathToTempRef = child(gameRef,'pathToTemp')
    var tempPath = await get(pathToTempRef)
    if(tempPath.val()!=null){
        var tempRef = child(tempsRef,tempPath.val())
        remove(tempRef)
    }
    return true
}

export async function deleteTemps(tempPath){
    /*delete previous temps node from room*/
    try{
    var root = ref(db)
    var temps = child(root,'temps')
    var tempRef = child(temps,tempPath)
    await remove(tempRef)
    } catch (error){
        console.log("no temp")
    }
}


/*----------------------------------------------------------------------------------------------------*/

export async function getPuzzleSet(userInput){
    /*get puzzleSet with path to puzzles and path to temp node for later deletion*/
    var schoolClass = userInput.schoolClass
    var topics = userInput.topics
    var difficulty = userInput.difficulty
    var tagKeys = await getTagKeys(schoolClass,topics,difficulty)
    var [puzzleSet,pathToTemp] = await createPuzzleSet(tagKeys,userInput.limit)
    return [puzzleSet,pathToTemp]
}

async function getTagKeys(schoolClass,topics,difficulty){
    /*get all tag keys under tags, that match schoolClass,topics and difficulty*/
    var tagKeys
    if(difficulty=='mix'){
        tagKeys = {
            easy: await getTagKeysDifficulty(schoolClass,topics,'easy'),
            medium: await getTagKeysDifficulty(schoolClass,topics,'medium'),
            hard: await getTagKeysDifficulty(schoolClass,topics,'hard')
        }
    } else tagKeys = await getTagKeysDifficulty(schoolClass,topics,difficulty)
    return tagKeys
}

async function getTagKeysDifficulty(schoolClass,topics,difficulty){
    /*get all Tag Keys for one specific difficulty but multiple topics*/
    console.log(topics)
    var tagKeys = []
    for(var i=0;i<topics.length;i++){
        var tagKeysTopic = await getTagKeysTopic(schoolClass,topics[i],difficulty)
        tagKeys = [...tagKeys,...tagKeysTopic]
    }
    return tagKeys
}

async function getTagKeysTopic(schoolClass,topic,difficulty){
    /*get all tag keys for one specific difficulty and one specific topic array*/
    var tagsRef = ref(db,'tags')
    var snapshot = await get(tagsRef)
    var tags = [...topic,difficulty,schoolClass]
    var tagKeys = []
    for (var key in snapshot.val()){
        var dbTags = snapshot.val()[key]
        if(containsElements(dbTags,tags)){
            tagKeys.push(key)
        }
    }
    return tagKeys
}

async function getRandomPuzzle(tagKey){
    /*extract one specific puzzle or template from one tag key under puzzles node*/
    var puzzlesRef = ref(db,'puzzles')
    var tagRef = child(puzzlesRef,tagKey)
    var randomQuery = await query(tagRef,orderByChild('random'),startAt(math.randomInt(1,10000)),limitToFirst(1))
    var snapshot = await get(randomQuery)
    var randomPuzzle = snapshot.val()
    while(randomPuzzle==null){
        randomQuery = await query(tagRef,orderByChild('random'),startAt(math.randomInt(1,10000)),limitToFirst(1))
        snapshot = await get(randomQuery)
        randomPuzzle = snapshot.val()
    }
    return Object.values(randomPuzzle)[0]
}

async function createPuzzleSet(tagKeys,limit,pathToTemp=null){
    /*loop through all tag keys and save path to puzzle or if template, create puzzle under temps and after that save path*/
    var puzzleSet = new Set()
    if(pathToTemp==null){
        var root = ref(db)
        var tempsRef = child(root,'temps')
        var tempKey = await push(tempsRef).key
        var pathToTemp = ""+tempKey
        var tempRef = child(tempsRef,tempKey)
    } else {
        /*let user pass specific temp path for createPuzzleSetMix*/
        var tempRef = ref(db,pathToTemp)
    }
    var i=0
    while(puzzleSet.size<limit){
        /*TODO: can i make this faster? Maybe dont fetch only one random puzzle with limitToFirst(1)*/
        /*and dont make to many calls to firebase?*/
        /*for host!!! save puzzles completly in local storage, so host dont need to read from database again*/
        var randomPuzzle = await getRandomPuzzle(tagKeys[i%tagKeys.length])
        if(randomPuzzle.form=='puzzle'){
            puzzleSet.add(randomPuzzle.path)  
        } else if(randomPuzzle.form=="template"){
            var tempPuzzleData = genCalcMain(randomPuzzle)
            var tempPuzzleKey = await push(tempRef)
            var pathToPuzzle = ""+tempPuzzleKey
            tempPuzzleData.path = pathToPuzzle.replace(firebaseConfig.databaseURL,"")
            await update(tempPuzzleKey,tempPuzzleData)
            puzzleSet.add(tempPuzzleData.path)
        }
        i++;
        console.log("puzzle added to set")
    }
    return [puzzleSet,pathToTemp]
}

async function createPuzzleSetMix(tagKeys,limit){
    /*create puzzle set for multiple difficulties --> start with easy at index 0 and increase*/
    var easyLimit = Math.floor(limit/3)+1
    var mediumLimit = Math.floor(limit/3)+1
    var hardLimit = Math.floor(limit/3)+1
    var [puzzleSetEasy,pathToTemp] = await createPuzzleSet(tagKeys.easy,easyLimit)
    var [puzzleSetMedium,pathToTemp] = await createPuzzleSet(tagKeys.medium,mediumLimit,pathToTemp)
    var [puzzleSetHard,pathToTemp] = await createPuzzleSet(tagKeys.hard,hardLimit,pathToTemp)
    var puzzleSet = [...puzzleSetEasy,...puzzleSetMedium,...puzzleSetHard]
    return [puzzleSet,pathToTemp]
}


export async function addRoomToDatabase(userInput,puzzleSet,pathToTemp){ 
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,userInput.roomNumber)
    var puzzleSetString = JSON.stringify(Array.from(puzzleSet))
    var topics = JSON.stringify(userInput.topics)
    var gameData = {
        schoolClass: schoolClass,
        mode : userInput.mode,
        difficulty : userInput.difficulty,
        limit : userInput.limit,
        time : {
            startTime : null,
            duration : userInput.duration,
        },
        puzzleSet : puzzleSetString,
        pathToTemp : pathToTemp,
        gameStatus : 'created', 
        pointsPlayers : {
            [userInput.playerName] : 0,
        },
        positionPlayers : {
            [userInput.playerName] : 0,
        },
        finishedPlayers : {
            [userInput.playerName] : false,
        },
        topics: topics
    }
    await update(gameRef,gameData)
    /*important to not include in gameData for end.js*/
    var connectedPlayersRef = child(gameRef,'connectedPlayers')
    await update(connectedPlayersRef,{
        [userInput.playerName]:true
    })
    /*save game data in local storage for host*/
    localStorage.setItem('puzzleSet',puzzleSetString)
    localStorage.setItem('pathToTemp',pathToTemp)
    localStorage.setItem('playerName',userInput.playerName)
    localStorage.setItem('roomNumber',userInput.roomNumber)
    var userInputString = JSON.stringify(userInput)
    localStorage.setItem('userInput',userInputString)
    return Promise.resolve()
}




