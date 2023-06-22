import { ref, set, get, update, onValue, onDisconnect, child, runTransaction, serverTimestamp, onChildAdded, onChildChanged, off, remove} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
import { db } from "./main/db.js"
import { startGame,stopGame } from "./main/game/game.js"

export async function updateWaitingStatus(playerName,roomNumber){
    var timerElement = $('#left-countdown-timer') 
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var timeRef = child(gameRef,'time')
    var waitingPlayersRef = child(gameRef,'waitingPlayers')
    var startTimeRef = child(timeRef,'startTime')
    await update(waitingPlayersRef,{
        [playerName] : true
    })

    if(await everyoneIsWaiting(roomNumber)){
        $('#left-start').addClass('d-none')
        $('#left-countdown').removeClass('d-none')
        /*if everyone is waiting, start countdown, if new player connects, reset countdown and only start, if new player is also waiting*/
        /*if countdown is at zero start game with clock depending on selected mode*/
        /*initialize serverTimestamp*/
        /*not sure, but if for some reason other player overwrites this value, there should only be a small glitch in other players countdown clock value*/
        await update(timeRef,{
            startTime: serverTimestamp()
        })
        update(gameRef,{
            gameStatus: 'waiting'
        })
        var snapshot = await get(startTimeRef)
        var startTime = snapshot.val()
        startTimer(timerElement,roomNumber,startTime,false) 
    } else {
        /*activate waiting screen*/
        $('#left-start').addClass('d-none')
        $('#left-wait').removeClass('d-none')
        /*start listener for new server timestamp*/
        /*IMPORTANT: ignore first call on attaching*/
        var isFirstCall = true
        await onValue(startTimeRef, (snapshot) => {
            if (isFirstCall){
                isFirstCall = false
                return
            }
            $('#left-wait').addClass('d-none')
            $('#left-countdown').removeClass('d-none')
            var startTime = snapshot.val()
            startTimer(timerElement,roomNumber,startTime,false)
            /*detach listener*/
            off(startTimeRef)
        });
    } 
}

/*reduced for single player mode (rush,training)*/
export async function updateWaitingStatusForSinglePlayer(playerName,roomNumber,timerElement){
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var timeRef = child(gameRef,'time')
    var startTimeRef = child(timeRef,'startTime')
    await update(timeRef,{
        startTime: serverTimestamp()
    })
    var snapshot = await get(startTimeRef)
    var startTime = snapshot.val()
    /*start main timer directly without countdown and no countdown value to get right duration*/
    update(gameRef,{
        gameStatus: 'running'    
    })
    startTimer(timerElement,roomNumber,startTime,true,0)
}

async function everyoneIsWaiting(roomNumber){
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var connectedPlayersRef = child(gameRef,'connectedPlayers')
    var waitingPlayersRef = child(gameRef,'waitingPlayers')
    var snapshot = await get(connectedPlayersRef)
    var snapshot2 = await get(waitingPlayersRef)
    var connected = snapshot.val()
    var waiting = snapshot2.val()
    var check = true
    for(var player in connected){
        //console.log(player,connected[player],waiting[player])
        if(connected[player]==true && waiting[player]!=true) check=false
    }
    return check
}

export async function startTimer(display,roomNumber,startTime,main=false,countdownValue=10) {  
    var minutes
    var seconds
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var timeRef = child(gameRef,'time')
    if(main==true){
        var durationRef = child(timeRef,'duration')
        var snapshot = await get(durationRef)
        var duration = snapshot.val()+countdownValue
    } else {
        var duration = countdownValue
    }
    const interval = setInterval(() => {
        //const timeLeft = (duration * 1000) - (Date.now() - startTime - serverTimeOffset);
        const timeLeft = (duration * 1000) - (Date.now() - startTime);
        if (timeLeft < 0) {
            clearInterval(interval);
            /*only start main timer if countdown is run down*/
            if(main==false){
                $('#left-countdown').addClass('d-none')
                $('#algebra').removeClass('d-none')
                update(gameRef,{
                    gameStatus: 'running'    
                })
                var timerElement = $('#timer')
                startTimer(timerElement,roomNumber,startTime,true)
                startGame(0)
            } else {
                stopGame()
                /*set value in database for game stop*/
                update(gameRef,{
                    gameStatus: 'finished'
                })
            }
        } else {             
            minutes = Math.floor(timeLeft/60000)
            seconds = Math.round(timeLeft%60000/1000)
            var formattedMinutes // Add leading zeros to minutes if necessary
            var formattedSeconds = seconds.toString().padStart(2, '0'); // Add leading zeros to seconds if necessary
            if (formattedSeconds=='60'){
                formattedSeconds = '00'
                formattedMinutes = (minutes+1).toString().padStart(2, '0')
            } else {
                formattedMinutes = minutes.toString().padStart(2, '0');
            }
            if(main==true) var formattedTime = `${formattedMinutes}:${formattedSeconds}`
            else var formattedTime=`${formattedSeconds}`
            display.text(formattedTime)
        }
    }, 100)
}
