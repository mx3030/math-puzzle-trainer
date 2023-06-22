import {appID,template,toolbar,injectGeoGebraApplet} from './main/parameters.js'
import {deepCopy} from './main/helper.js'
import {breakpoint,disableScrollOnIOS} from './main/style.js'
import * as ggbjsTopicFunctions from './puzzleGenerator/ggbJS/ggbPuzzles.js'
import * as calcTopicArrays from './puzzleGenerator/calc/calcPuzzles.js'
import {genCalcMain,genCalc, genEqEasy, genEq} from './puzzleGenerator/calc/calcGenerator.js'
import {displayLayoutMain,displayCalc, displayEqEasy, displayEq} from './puzzleGenerator/calc/calcDisplay.js'
import {displayLayoutGeogebra} from './puzzleGenerator/ggbJS/ggbDisplay.js'
import {uploadSingleGGBJSPuzzle,uploadGGBJSTopic,uploadAllGGBJSTopics} from './puzzleGenerator/ggbJS/ggbUpload.js'
import {extractPuzzleData, uploadCalcTopic,uploadAllCalcTopics} from './puzzleGenerator/calc/calcUpload.js'

var ggbjsTopics = Object.keys(ggbjsTopicFunctions).filter(key => typeof ggbjsTopicFunctions[key] === 'function');
var calcTopics = Object.keys(calcTopicArrays).filter(key => typeof calcTopicArrays[key] === 'object');


window.addEventListener('load',function(){
    //disableScrollOnIOS()
    createGGBJSTopicsDropdownMenu(ggbjsTopics)
    createCalcTopicsDropdownMenu(calcTopics)
})

/*---------------------------------------------------------------------------------------*/
/*---------------------------------------ggbjs-------------------------------------------*/
/*---------------------------------------------------------------------------------------*/
function createGGBJSTopicsDropdownMenu(topics){
    var dropdownContainer = $('#ggbjs-topics')
    for(var i=0;i<topics.length;i++){
        var dropdownElement = $('<option></option>',{
            'value':topics[i],
            'id':topics[i],
            'text':topics[i]
        })
        dropdownContainer.append(dropdownElement)
    }
}

var lastGeneratedGGBJS={}
$('#ggbjs-gen-button').click(async function(){
    $('#ggb-problem-area').empty()  
    $('#algebra-problem-area').empty()  
    $('#ggb').removeClass('d-none') 
    $('#algebra').addClass('d-none')
    var selectedTopic = $('#ggbjs-topics').val()
    var uploadData = await eval(`ggbjsTopicFunctions.${selectedTopic}()`)
    lastGeneratedGGBJS = uploadData
    displayLayoutGeogebra(uploadData)
})

$('#ggbjs-upload-generated-button').click(async function(){
    $('#ggbjsUploadGeneratedSpinner').removeClass('d-none')
    $('#ggbjs-upload-generated-text').addClass('d-none')
    await uploadSingleGGBJSPuzzle(lastGeneratedGGBJS)
    $('#ggbjsUploadGeneratedSpinner').addClass('d-none')
    $('#ggbjs-upload-generated-text').removeClass('d-none')
})

$('#ggbjs-upload-selected-button').click(async function(){
    var topic = $('#ggbjs-topics').val()
    var numberOfPuzzles = $('#ggbjs-number-of-puzzles').val()
    $('#ggbjsUploadSelectedSpinner').removeClass('d-none')
    $('#ggbjs-upload-selected-text').addClass('d-none')
    await uploadGGBJSTopic(topic,numberOfPuzzles)
    $('#ggbjsUploadSelectedSpinner').addClass('d-none')
    $('#ggbjs-upload-selected-text').removeClass('d-none')
})

$('#ggbjs-upload-all-button').click(async function(){
    var numberOfPuzzles = $('#ggbjs-number-of-puzzles').val()
    $('#ggbjsUploadAllSpinner').removeClass('d-none')
    $('#ggbjs-upload-all-text').addClass('d-none')
    await uploadAllGGBSTopics(numberOfPuzzles,true)
    $('#ggbjsUploadAllSpinner').addClass('d-none')
    $('#ggbjs-upload-all-text').removeClass('d-none')
})

/*---------------------------------------------------------------------------------------*/
/*---------------------------------------calc--------------------------------------------*/
/*---------------------------------------------------------------------------------------*/

function createCalcTopicsDropdownMenu(topics){
    var dropdownContainer = $('#calc-topics')
    for(var i=0;i<topics.length;i++){
        var topic = calcTopicArrays[topics[i]]
        var dropdownElement = $('<option></option>',{
            'value':topics[i],
            'id':'topic'+i,
            'text':topics[i]
        })
        dropdownContainer.append(dropdownElement)
        if(i==0) createCalcSubTopicsDropdownMenu(dropdownElement.text())
    }
    dropdownContainer.on("change",function(){
        var selectedDropdownElement=dropdownContainer.val()
        createCalcSubTopicsDropdownMenu(selectedDropdownElement)
    })
}

function createCalcSubTopicsDropdownMenu(topic){
    var dropdownContainer = $('#calc-topic')
    dropdownContainer.empty()
    var questions = calcTopicArrays[topic].questions
    for (var key in questions){
        var question = questions[key]
        var questionString = question.string
        var dropdownElement = $('<option></option>',{
            'value':key,
            'id':'question'+key,
            'text':questionString
        })
        dropdownContainer.append(dropdownElement)
    }
}

var lastGeneratedCalc={}
$('#calc-gen-button').click(async function(){
    $('#algebra-problem-area').empty()  
    $('#ggb-problem-area').empty()  
    /*get puzzle object refs*/
    var calcTopic = $('#calc-topics').val()
    var questionKey = $('#calc-topic').val()
    /*get puzzle Data from object*/
    var puzzleData = generatePuzzleData(calcTopic,questionKey)
    var uploadData=genCalcMain(puzzleData)
    /*save uploadData for upload button*/
    lastGeneratedCalc=uploadData
    /*display data*/
    $('#ggb').addClass('d-none') 
    $('#algebra').removeClass('d-none')
    displayLayoutMain(uploadData) 
})

function generatePuzzleData(calcTopic,questionKey){
    var calcTopicCopy = deepCopy(calcTopicArrays[calcTopic])
    var questionData = calcTopicCopy.questions[questionKey]
    delete calcTopicCopy.questions
    var puzzleData = {...calcTopicCopy,...questionData}
    return puzzleData
}

$('#calc-upload-generated-button').click(async function(){
    $('#calcUploadGeneratedSpinner').removeClass('d-none')
    $('#calc-upload-generated-text').addClass('d-none')
    await uploadSingleGGBJSPuzzle(lastGeneratedCalc)
    $('#calcUploadGeneratedSpinner').addClass('d-none')
    $('#calc-upload-generated-text').removeClass('d-none')
})


$('#calc-upload-selected-button').click(async function(){
    var topic = $('#calc-topics').val()
    $('#calcUploadSelectedSpinner').removeClass('d-none')
    $('#calc-upload-selected-text').addClass('d-none')
    await uploadCalcTopic(topic)
    $('#calcUploadSelectedSpinner').addClass('d-none')
    $('#calc-upload-selected-text').removeClass('d-none')
})

$('#calc-upload-all-button').click(async function(){
    $('#calcUploadAllSpinner').removeClass('d-none')
    $('#calc-upload-all-text').addClass('d-none')
    await uploadAllCalcTopics(true)
    $('#calcUploadAllSpinner').addClass('d-none')
    $('#calc-upload-all-text').removeClass('d-none')
})
