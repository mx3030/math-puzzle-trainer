import {appID,template,toolbar,injectGeoGebraApplet} from '../main/parameters.js'
import {deepCopy} from '../main/helper.js'
import {breakpoint,disableScrollOnIOS} from '/main/style.js'
import * as ggbjsTopicFunctions from './ggbJS/ggbPuzzles.js'
import * as calcTopicArrays from './calc/calcPuzzles.js'
import {genCalcMain,genCalc, genEqEasy, genEq} from './calc/calcGenerator.js'
import {displayLayoutMain,displayCalc, displayEqEasy, displayEq} from './calc/calcDisplay.js'
import {displayLayoutGeogebra} from './ggbJS/ggbDisplay.js'
import {uploadSingleGGBJSPuzzle,uploadGGBJSTopic,uploadAllGGBJSTopics} from './ggbJS/ggbUpload.js'
import {extractPuzzleData, uploadCalcTopic,uploadAllCalcTopics} from './calc/calcUpload.js'
import {getPuzzleFiles} from './helper/githubHelper.js'

var puzzleImports = {}
var ggbjsTopics = {}
var calcTopics = {}

window.addEventListener('load',async function(){
    const owner = 'mx3030';
    const repo = 'math-puzzle-trainer';
    const path = 'puzzles';

    var puzzleFiles = await getPuzzleFiles(owner,repo,path)
    var puzzleFiles = puzzleFiles.map(path => `../${path}`);

    Promise.all(puzzleFiles.map(puzzleFile => import(puzzleFile)))
    .then(modules => {
        for(var i=0;i<puzzleFiles.length;i++){
            puzzleImports[puzzleFiles[i]]=modules[i]
        } 
        for(var i=0;i<puzzleFiles.length;i++){
            var functionPuzzles = Object.keys(puzzleImports[puzzleFiles[i]]).filter(key => typeof puzzleImports[puzzleFiles[i]][key] === 'function')
            if(functionPuzzles.length!=0) ggbjsTopics[puzzleFiles[i]]=functionPuzzles
            var arrayPuzzles  = Object.keys(puzzleImports[puzzleFiles[i]]).filter(key => typeof puzzleImports[puzzleFiles[i]][key] === 'object');
            if(arrayPuzzles.length!=0) calcTopics[puzzleFiles[i]]= arrayPuzzles
        }
        
        createGGBJSTopicsDropdownMenu(ggbjsTopics)
        createCalcTopicsDropdownMenu(calcTopics)
    })
})

/*---------------------------------------------------------------------------------------*/
/*---------------------------------------ggbjs-------------------------------------------*/
/*---------------------------------------------------------------------------------------*/
function createGGBJSTopicsDropdownMenu(topics){
    var fileContainer = $('#js-files')
    var functionsContainer = $('#file-functions')
    for(var path in topics){
        var dropdownElement = $('<option></option>',{
            'value':path,
            'id':path,
            'text':path
        })
        fileContainer.append(dropdownElement)
        for(var i=0;i<topics[path].length;i++){
            var dropdownElement = $('<option></option>',{
                'value':topics[path][i],
                'id':topics[path][i],
                'text':topics[path][i]
            })
            functionsContainer.append(dropdownElement)
        }
    } 
}

var lastGeneratedGGBJS={}
$('#ggbjs-gen-button').click(async function(){
    $('#ggb-problem-area').empty()  
    $('#algebra-problem-area').empty()  
    $('#ggb').removeClass('d-none') 
    $('#algebra').addClass('d-none')
    var selectedFile = $('#js-files').val()
    var matchingModule = puzzleImports[selectedFile]
    console.log(matchingModule)
    var selectedFunction = $('#file-functions').val()
    console.log(selectedFunction)
    var uploadData = await matchingModule[selectedFunction]() 
    console.log(uploadData)
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
    var fileContainer = $('#calc-files')
    var functionsContainer = $('#file-arrays')
    for(var path in topics){
        var dropdownElement = $('<option></option>',{
            'value':path,
            'id':path,
            'text':path
        })
        fileContainer.append(dropdownElement)
        for(var i=0;i<topics[path].length;i++){
            var dropdownElement = $('<option></option>',{
                'value':topics[path][i],
                'id':topics[path][i],
                'text':topics[path][i]
            })
            functionsContainer.append(dropdownElement)
        }
    }
}


var lastGeneratedCalc={}
$('#calc-gen-button').click(async function(){
    $('#algebra-problem-area').empty()  
    $('#ggb-problem-area').empty()  
    var puzzleData = generatePuzzleData()
    var uploadData=genCalcMain(puzzleData)
    lastGeneratedCalc=uploadData
    $('#ggb').addClass('d-none') 
    $('#algebra').removeClass('d-none')
    displayLayoutMain(uploadData) 
})

function generatePuzzleData(calcTopic,questionKey){
    var selectedFile = $('#calc-files').val()
    var matchingModule = puzzleImports[selectedFile]
    var selectedArray = $('#file-arrays').val()
    var questionKey = $('#array-questions').val()
    var calcTopicCopy = deepCopy(matchingModule[selectedArray])
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
