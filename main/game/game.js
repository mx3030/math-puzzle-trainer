import { ref, set, get, update, onValue, onDisconnect, child, increment, remove} from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"
import { db } from "../../main/db.js"
import { roomNumber, playerName, pathToTemp, puzzleSet } from '../../main/game/start.js'
import {displayLayoutMain} from '../../puzzleGenerator/calc/calcDisplay.js'
import {displayLayoutGeogebra} from '../../puzzleGenerator/ggbJS/ggbDisplay.js'

export async function startGame(puzzleNumber){
    //console.log(puzzleSet)
    await loadPuzzle(puzzleNumber)
    /*set up listeners*/
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var pointsPlayersRef = child(gameRef,'pointsPlayers')
    onValue(pointsPlayersRef,(snap)=>{
        updateProgressBar(snap.val())
    })
    updateHistoryButtons()
}

export async function loadPuzzle(number){
    /*first puzzle gets called from startGame function*/
    /*next puzzles get called from mathquill handler in puzzleGenerator files*/
    $('#ggb-problem-area').empty()  
    $('#algebra-problem-area').empty()
    var path = puzzleSet[number]
    var puzzleRef = ref(db,path)
    var snapshot = await get(puzzleRef)
    var puzzleData = snapshot.val()
    if(puzzleData.layout=='geogebra'){
        $('#ggb').removeClass('d-none')
        $('#algebra').addClass('d-none')
        app.setBase64(puzzleData.question)
        displayLayoutGeogebra(puzzleData,true,number)
    } else if(puzzleData.layout=='calc'){
        $('#algebra').removeClass('d-none')
        $('#ggb').addClass('d-none')
        displayLayoutMain(puzzleData,true,number)
    }
    addQuestionText(puzzleData.questionText)
}

function addQuestionText(questionString){
    var questionTextElement = document.getElementById('question-text')
    questionTextElement.textContent = questionString
    renderMathInElement(questionTextElement, {
        delimiters: [
            {left: '$$', right: '$$', display: false},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
        ],
        throwOnError : false
    });

}

export async function updateInfos(puzzleNumber,check){
    /*gets called from mathquill handler in puzzleGenerator files*/
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var pointsPlayersRef = child(gameRef,'pointsPlayers')
    var positionPlayersRef = child(gameRef,'positionPlayers')
    var historyPlayersRef = child(gameRef,'historyPlayers')
    var historyPlayerRef = child(historyPlayersRef,playerName)
    if(check==true){
        await update(pointsPlayersRef,{
            [playerName]:increment(1)
        })
        await update(historyPlayerRef,{
            [puzzleNumber]:true
        })
    } else {
        await update(historyPlayerRef,{
            [puzzleNumber]:false
        })
    }
    await update(positionPlayersRef,{
        [playerName]:increment(1)
    })
    addHistoryButton(puzzleNumber,check)
}

function addHistoryButton(puzzleNumber,check){
    /*add button to control bar history*/
    var historyButtons = $('#historyButtons')
    var newButton = $("<button></button>")
    newButton.addClass('btn border rounded-0 m-1')
    if(check==true) newButton.addClass('btn-outline-success border-success')
        else newButton.addClass('btn-outline-danger border-danger')
    newButton.attr('id','historyButton_'+(puzzleNumber+1))
    newButton.text(puzzleNumber)
    historyButtons.append(newButton)
    /*hacky solution for single player layout*/
    var historyButtons2 = $('#historyButtons-2')
    var newButton2 = newButton.clone()
    newButton2.attr('id','historyButton2_'+(puzzleNumber+1))
    historyButtons2.append(newButton2)
}

async function updateHistoryButtons(){
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    var historyPlayersRef = child(gameRef,'historyPlayers')
    var historyPlayerRef = child(historyPlayersRef,playerName)
    var historySnapshot = await get(historyPlayerRef)
    var history = historySnapshot.val()
    for(var puzzleNumber in history){
        addHistoryButton(puzzleNumber,history[puzzleNumber])
    }
}

function updateProgressBar(points){
    /*update all points on progressBars -> ingnore if player connected or not because if not connected not shown*/
    var ranking = Object.fromEntries(
        Object.entries(points).sort((a, b) => b[1] - a[1])
    );
    var maxPoints = Object.values(ranking)[0]
    var limit = ((parseInt(maxPoints/10)+1)*10)+2
    /*set order to 2, so that player progress bar can be 1*/
    var order = 2
    for(var player in ranking){
        /*update points of progress bar*/
        var pointsElement = $('#'+player+'-points-bar-points')
        pointsElement.text(points[player])
        /*update points of control bar and training mode (hacky)*/
        if(player==playerName){
            $('#control-bar-user-points').text(points[player])
            $('#user-points-2').text(points[player])
        }

        /*update width of progress bar*/
        var width = (points[player]/limit)*80
        var progressElement = $('#'+player+'-points-bar-progress')
        progressElement.css('width',`${width}%`)
        /*update order of progress bars (player always on top)*/
        var parentElement = progressElement.parent()
        if(player==playerName){
            parentElement.css('order',1)
        }else {
            parentElement.css('order',order)
            order++
        }

    }
}

export async function stopGame(){
    /*remove temp node -> better at new game button for checking and correct answers afterwards*/
    $('#algebra').addClass('d-none') 
    $('#ggb').addClass('d-none') 
    $('#left-end').removeClass('d-none')
    /*everybody tells database*/
    var root = ref(db)
    var gamesRef = child(root,'games')
    var gameRef = child(gamesRef,roomNumber)
    await update(gameRef,{
        gameStatus:'finished'
    })
    /*clear waiting status of players*/
    var waitingPlayersRef = child(gameRef,'waitingPlayers')
    await update(waitingPlayersRef,{
        [playerName]:false
    }) 
}

