import { ref, set, get, update, onValue, onDisconnect, child} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
import { db } from "./main/db.js"
import {updateWaitingStatus, startTimer, updateWaitingStatusForSinglePlayer} from "./main/game/wait.js"
import {startGame} from "https://raw.githubusercontent.com/mx3030/math-puzzle-trainer/master/main/game/game.js"
import {displayProgressBars} from "./main/game/gameStyle.js"
import {deleteTemps} from './main/waitingRoom/waitingRoom.js'

/*values player need to know on start*/
export var roomNumber
export var playerName
export var pathToTemp
export var puzzleSet
export var mode
export var userInput
export var schoolClass

/*if serverTimeOffset is used for timer, it looks asynchron*/
//var offsetRef = ref(db,'.info/serverTimeOffset')
//var serverTimeOffset
//onValue(offsetRef,(snap)=>{
//serverTimeOffset = snap.val()
//})

window.addEventListener('load',async function(){ 
    /*populate saved values in local storage*/
    /*this enables a player to reconnect after leaving unintentionally*/
    var saved = await getSavedValues()
    roomNumber = saved.roomNumber
    playerName = saved.playerName
    puzzleSet = saved.puzzleSet
    pathToTemp = saved.pathToTemp
    mode = saved.mode
    userInput = saved.userInput
    schoolClass = saved.schoolClass
    await startMode(mode,roomNumber,playerName)
})

export async function getSavedValues(){
    var saved = {
        roomNumber : localStorage.getItem('roomNumber'),
        playerName : localStorage.getItem('playerName'),
        puzzleSet : JSON.parse(localStorage.getItem('puzzleSet')),
        pathToTemp : localStorage.getItem('pathToTemp'),
        mode: localStorage.getItem('mode'),
        userInput : JSON.parse(localStorage.getItem('userInput')),
        schoolClass : localStorage.getItem('schoolClass')
    }
    return Promise.resolve(saved)
}

export async function startMode() {
    /*delete old temp node if called from end.js*/
    /*TODO: better!!!*/
    //await deleteAndCreateTempBackup() 
    
    if(mode=='Duell') startDuellMode(roomNumber,playerName) 
    else if(mode=='Rush') startRushMode(roomNumber,playerName)
    else if(mode=='Training') startTrainingMode(roomNumber,playerName)
}

async function deleteAndCreateTempBackup(){
    var tempPath = localStorage.getItem('pathToTempBackup')
    await deleteTemps(tempPath)
    tempPath = localStorage.getItem('pathToTemp')
    localStorage.setItem('pathToTempBackup',tempPath)
}

export async function startRushMode(roomNumber,playerName){
    /*style right side of window depending on game mode selected in waiting room*/
    setRushLayout() 

    /*manage different times player reenter games*/
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var gameStatusRef = child(gameRef,'gameStatus')
    var timeRef = child(gameRef,'time')
    var startTimeRef = child(timeRef,'startTime')
    var startTimeSnapshot = await get(startTimeRef)
    var startTime = startTimeSnapshot.val()
    var gameStatusSnapshot = await get(gameStatusRef)
    var gameStatus = gameStatusSnapshot.val()

    if(gameStatus=='created'){
        /*show start button*/
        $('#left-start').removeClass('d-none')
        $('#algebra').addClass('d-none')
        $('#ggb').addClass('d-none')
    } else if(gameStatus=='running'){
        /*players can only connect if they have been connected before*/
        /*start timer with main==true*/
        $('#left-start').addClass('d-none')
        $('#algebra').removeClass('d-none')
        var timerElement = $('#timer-2') 
        startTimer(timerElement,roomNumber,startTime,true)
        /*call startGame function if entering running game*/
        var positionPlayersRef = child(gameRef,'positionPlayers')
        var positionPlayerRef = child(positionPlayersRef,playerName)
        var positionPlayerSnapshot = await get(positionPlayerRef)
        startGame(positionPlayerSnapshot.val())
    } else if(gameStatus=='finished'){
        /*show restart button*/
        
    } 

    /*use special updateWaitingStatus for single player*/
    $('#start-button').on('click',function(){ 
        $('#left-start').addClass('d-none')
        var timerElement = $('#timer-2')
        updateWaitingStatusForSinglePlayer(playerName,roomNumber,timerElement) 
        startGame(0)
    })
}

function setRushLayout(){
    $('#control-bar').removeClass('d-none')
    $('#control-bar-points').removeClass('d-none')
    $('#control-bar-points-container').removeClass('d-none')
    $('#right-top').removeClass('d-none')
    $('#right-top').css('height','40%')
    $('#right-middle').removeClass('d-none')
    $('#right-middle').css('height','30%')
    $('#right-bottom').css('height','30%')
    $('#user-points').addClass('d-none')
    $('#time-container-2').removeClass('d-none')
    $('#right-bottom').removeClass('d-none') 
    $('#history-container-2').removeClass('d-none') 
}

export async function startTrainingMode(roomNumber,playerName){
    setTrainingLayout()

    /*manage different times player reenter games*/
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var gameStatusRef = child(gameRef,'gameStatus')
    var gameStatusSnapshot = await get(gameStatusRef)
    var gameStatus = gameStatusSnapshot.val()

    if(gameStatus=='created'){
        /*show start button*/
        $('#left-start').removeClass('d-none')
        $('#algebra').addClass('d-none')
        $('#ggb').addClass('d-none')
    } else if(gameStatus=='running'){
        /*players can only connect if they have been connected before*/
        /*start timer with main==true*/
        $('#left-start').addClass('d-none')
        $('#algebra').removeClass('d-none')
        var positionPlayersRef = child(gameRef,'positionPlayers')
        var positionPlayerRef = child(positionPlayersRef,playerName)
        var positionPlayerSnapshot = await get(positionPlayerRef)
        startGame(positionPlayerSnapshot.val())
    } else if(gameStatus=='finished'){
        /*show restart button*/
    } 


    $('#start-button').on('click',function(){ 
        var root = ref(db)
        var gamesRef = child(root,'games')
        var gameRef = child(gamesRef,roomNumber)
        update(gameRef,{
            gameStatus: 'running'    
        })
        $('#left-start').addClass('d-none')
        startGame(0)
    })

}

function setTrainingLayout(){
    $('#control-bar').removeClass('d-none')
    $('#control-bar-aufgabe').removeClass('d-none')
    $('#control-bar-aufgabe-container').removeClass('d-none')
    $('#right-top').removeClass('d-none')
    $('#right-top').css('height','40%')
    $('#right-middle').removeClass('d-none')
    $('#right-middle').css('height','30%')
    $('#right-bottom').css('height','30%')
    $('#user-points').addClass('d-none')
    $('#points-container-2').removeClass('d-none')
    $('#user-points-2').removeClass('d-none')
    $('#right-bottom').removeClass('d-none') 
    $('#history-container-2').removeClass('d-none') 
}

async function startDuellMode(roomNumber,playerName){
    /*init important listeners*/
    var root = ref(db)
    var connectedRef = child(root, ".info/connected");
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var connectedPlayersRef = child(gameRef,'connectedPlayers')
    var connectedPlayerRef = child(connectedPlayersRef,playerName)
    var waitingPlayersRef = child(gameRef,'waitingPlayers')
    var waitingPlayerRef = child(waitingPlayersRef,playerName)
    /*update connection of player in database node connectPlayerRef*/
    onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
            set(connectedPlayerRef,true)
            set(waitingPlayerRef,false)
        }
    })

    onDisconnect(connectedPlayerRef).set(false)

    /*register a connectedPlayersRef listener for progress bars*/
    onValue(connectedPlayersRef,async (snap)=>{
        var connected = snap.val()
        await displayProgressBars(connected)
    })

    /*set specific layout of right side*/
    setDuellLayout()

    /*manage different times player enter games*/
    var gameStatusRef = child(gameRef,'gameStatus')
    var timeRef = child(gameRef,'time')
    var startTimeRef = child(timeRef,'startTime')
    var startTimeSnapshot = await get(startTimeRef)
    var startTime = startTimeSnapshot.val()
    var gameStatusSnapshot = await get(gameStatusRef)
    var gameStatus = gameStatusSnapshot.val()

    if(gameStatus=='created'){
        /*show start button*/
        $('#left-start').removeClass('d-none')
        $('#left-end').addClass('d-none')
        $('#algebra').addClass('d-none')
        $('#ggb').addClass('d-none')
        $('#replay-button-symbol').removeClass('d-none') 
        $('#replayButtonSpinner').addClass('d-none')
    } else if(gameStatus=='waiting'){
        /*start timer with main==false*/
        $('#left-start').addClass('d-none')
        $('#left-end').addClass('d-none')
        $('#left-countdown').removeClass('d-none')
        $('#replay-button-symbol').removeClass('d-none') 
        $('#replayButtonSpinner').addClass('d-none')
        var timerElement = $('#left-countdown-timer') 
        startTimer(timerElement,roomNumber,startTime,false)
    } else if(gameStatus=='running'){
        /*players can only connect if they have been connected before*/
        /*start timer with main==true*/
        $('#left-start').addClass('d-none')
        $('#left-end').addClass('d-none')
        $('#algebra').removeClass('d-none')
        $('#replay-button-symbol').removeClass('d-none') 
        $('#replayButtonSpinner').addClass('d-none')

        var timerElement = $('#timer') 
        startTimer(timerElement,roomNumber,startTime,true)
        /*call startGame function if entering running game*/
        var positionPlayersRef = child(gameRef,'positionPlayers')
        var positionPlayerRef = child(positionPlayersRef,playerName)
        var positionPlayerSnapshot = await get(positionPlayerRef)
        startGame(positionPlayerSnapshot.val())
    } else if(gameStatus=='finished' || gameStatus=='creating'){
        /*show restart button*/
        $('#algebra').addClass('d-none') 
        $('#ggb').addClass('d-none') 
        $('#left-start').addClass('d-none')
        $('#left-end').removeClass('d-none')
        $('#replay-button-symbol').removeClass('d-none') 
        $('#replayButtonSpinner').addClass('d-none')

    } 

    $('#start-button').on('click',function(){
        //updateWaitingStatus(playerName,roomNumber,serverTimeOffset)
        updateWaitingStatus(playerName,roomNumber)
    })
}

function setDuellLayout(){
    /*set specific layout of right side*/
    $('#control-bar').removeClass('d-none')
    $('#control-bar-time').removeClass('d-none')
    $('#control-bar-time-container').removeClass('d-none')
    $('#right-top').removeClass('d-none')
    $('#right-middle').removeClass('d-none')
    $('#user-points').removeClass('d-none')
    $('#middle-time-container').addClass('d-none')
    $('#right-bottom').addClass('d-none')
    $('#right-top').css('height','40%')
    $('#right-middle').css('height','60%')
}

