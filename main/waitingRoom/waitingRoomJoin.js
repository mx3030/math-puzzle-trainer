import { ref, set, get, update, child } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
import { db } from "../../main/db.js"

$('#joinRoomButton').on('click',joinRoom)
async function joinRoom(){
    var playerName=$('#name-input').val()
    var roomNumber=$('#room-input').val()
    if(await checkJoinInput(playerName,roomNumber)){
        $('#createJoinButtonText').addClass('d-none')
        $('#createJoinButtonSpinner').removeClass('d-none')
        var mode = await addPlayerToDatabase(playerName,roomNumber)
        var [puzzleSetLinks,pathToTemp] = await downloadPuzzleSetLinks(roomNumber)
        /*TODO: create complete puzzleSet from links or download while playing?*/
        //var puzzleSet = await createPuzzleSet(puzzleSetLinks)
        /*IMPORTANT: save puzzleList in local storage of browser*/
        var userInput = await getUserInput(roomNumber,playerName)
        localStorage.setItem('puzzleSet',puzzleSetLinks)
        localStorage.setItem('pathToTemp',pathToTemp)
        localStorage.setItem('playerName',playerName)
        localStorage.setItem('roomNumber',roomNumber)
        var userInputString = JSON.stringify(userInput)
        localStorage.setItem('userInput',userInputString)
        /*open game mode html*/
        var url = '/main/game/game.html'
        window.location.href=url
    }
}

async function checkJoinInput(playerName,roomNumber){
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var connectedPlayersRef = child(gameRef,'connectedPlayers')
    var snapshot = await get(connectedPlayersRef)
    var connected = snapshot.val()
    var playerNames = Object.keys(connected)
    if(playerNames==null){
        alert('Spiel existiert nicht.')
        return false
    }
    if(playerNames.includes(playerName) && connected[playerName]==true){
        console.log(playerName + " tritt wieder dem Spiel bei.") 
        alert('Spielername bereits im Spiel.')
        return false
    } 
    return true
}

export async function addPlayerToDatabase(playerName,roomNumber){ 
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber) 
    var connectedPlayersRef = child(gameRef,'connectedPlayers')
    var connectedData = {[playerName]:true}
    update(connectedPlayersRef,connectedData)
    var pointsPlayersRef = child(gameRef,'pointsPlayers')
    var pointsPlayerData = {[playerName]:0}
    update(pointsPlayersRef,pointsPlayerData)
    var positionPlayersRef = child(gameRef,'positionPlayers')
    var positionPlayerData = {[playerName]:0}
    update(positionPlayersRef,positionPlayerData)
}

async function getUserInput(roomNumber,playerName){
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var modeRef = child(gameRef,'mode')
    var modeSnapshot = await get(modeRef)
    var mode = modeSnapshot.val()
    var difficultyRef = child(gameRef,'difficulty')
    var difficultySnapshot = await get(difficultyRef)
    var difficulty = difficultySnapshot.val()
    var timeRef = child(gameRef,'time')
    var durationRef = child(timeRef,'duration')
    var durationSnapshot = await get(durationRef)
    var duration = durationSnapshot.val()
    var limitRef = child(gameRef,'limit')
    var limitSnapshot = await get(limitRef)
    var limit = limitSnapshot.val()
    var topicsRef = child(gameRef,'topics')
    var topicsSnapshot = await get(topicsRef)
    var topicsString = topicsSnapshot.val()
    var topics = JSON.parse(topicsString)
    var schoolClassRef = child(gameRef,'schoolClass')
    var schoolClassSnapshot = await get(schoolClassRef)
    var schoolClass = schoolClassSnapshot.val()
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
    return userInput
}

export async function downloadPuzzleSetLinks(roomNumber){
    /*download list of path links to puzzles*/
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var puzzleSetRef = child(gameRef,'puzzleSet')
    var puzzleSet = await get(puzzleSetRef)
    var tempRef = child(gameRef,'pathToTemp')
    var pathToTemp = await get(tempRef)
    return [puzzleSet.val(),pathToTemp.val()]
}

