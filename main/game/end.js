import { ref, set, get, update, onValue, onDisconnect, child, increment, runTransaction,off} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
import { db } from "../../main/db.js"
import {roomNumber,pathToTemp,playerName,mode,startMode,userInput} from "../../main/game/start.js"
import {getPuzzleSet,addRoomToDatabase} from "../../main/waitingRoom/waitingRoom.js"
import {updateWaitingStatus} from "../../main/game/wait.js"
import {downloadPuzzleSetLinks,addPlayerToDatabase} from "../../main/waitingRoom/waitingRoomJoin.js"
import { gameURL } from "../../main/helper.js"

$('#replay-button').on('click',async function(){
    await replayRoom()
})
$('#waitingRoom-button').on('click',function(){
    var url = "../waitingRoom/waitingRoom.html"
    var currentURL = window.location.href
    var newURL = currentURL.substring(0, currentURL.lastIndexOf("/") + 1) + url;
    window.location.href=newURL
})

async function replayRoom(){
    /*make a transaction to gameStatus so that only one player can create new puzzle set*/
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var gameStatusRef = child(gameRef,'gameStatus')
    var host = false
    await runTransaction(gameStatusRef,(snap)=>{
        if(snap){
            if(snap=='finished'){
                /*if gameStatus still finished user can be the creater of new puzzleSet for next game*/
                snap = 'creating'
                host = true    
            }
        }
        return snap
    })
    console.log(host)
    if(host==true){
        await createNewGame()
    }
    else{
        $('#replay-button-symbol').addClass('d-none') 
        $('#replayButtonSpinner').removeClass('d-none')
        onValue(gameStatusRef,async (snap)=>{
            if(snap.val()=='created'){
                await joinNewGame()
                off(gameStatusRef)
            }
        })      
    } 
}

async function createNewGame(){
    $('#replay-button-symbol').addClass('d-none') 
    $('#replayButtonSpinner').removeClass('d-none')
    var [puzzleSet,pathToTemp] = await getPuzzleSet(userInput)
    await addRoomToDatabase(userInput,puzzleSet,pathToTemp)
    //await startMode(mode,roomNumber,playerName)
    //updateWaitingStatus(playerName,roomNumber)
    //var url = '../game/game.html'
    var url = gameURL
    window.location.href=url

}

async function joinNewGame(){ 
    await addPlayerToDatabase(playerName,roomNumber)
    var [puzzleSetLinks,pathToTemp] = await downloadPuzzleSetLinks(roomNumber)
    localStorage.setItem('puzzleSet',puzzleSetLinks)
    localStorage.setItem('pathToTemp',pathToTemp)
    //localStorage.setItem('playerName',playerName)
    //localStorage.setItem('roomNumber',roomNumber)
    //localStorage.setItem('mode',mode)
    //await startMode(mode,roomNumber,playerName)
    //updateWaitingStatus(playerName,roomNumber)
    //var url = '../game/game.html'
    var url = gameURL
    window.location.href=url

}



