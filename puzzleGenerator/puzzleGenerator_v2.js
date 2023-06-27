import {appID,template,toolbar,injectGeoGebraApplet} from '../main/parameters.js'
import {deepCopy} from '../main/helper.js'
import {breakpoint,disableScrollOnIOS} from '/main/style.js'
import {genCalcMain,genCalc, genEqEasy, genEq} from './calc/calcGenerator.js'
import {displayLayoutMain,displayCalc, displayEqEasy, displayEq} from './calc/calcDisplay.js'
import {displayLayoutGeogebra} from './ggbJS/ggbDisplay.js'
import {uploadSingleGGBJSPuzzle,uploadGGBJSTopic,uploadAllGGBJSTopics} from './ggbJS/ggbUpload.js'
import {extractPuzzleData, uploadCalcTopic,uploadAllCalcTopics} from './calc/calcUpload.js'
import {getPuzzleFiles} from './helper/githubHelper.js'

export var puzzleImports = {}
export var ggbjsPuzzles = {}
export var calcPuzzles = {}

/*init puzzle modules and dropdown menu*/
window.addEventListener('load',async function(){
    /*github information*/
    const owner = 'mx3030';
    const repo = 'math-puzzle-trainer';
    const path = 'puzzles';

    /*get array of puzzle files in puzzles folder from github*/
    /*TODO: faster solution for local dev*/
    var puzzleFiles = await getPuzzleFiles(owner,repo,path)
    var puzzleFiles = puzzleFiles.map(path => `../${path}`);

    Promise.all(puzzleFiles.map(puzzleFile => import(puzzleFile)))
    .then(async (modules) => {
        /*import puzzle files functions/arrays as modules*/
        for(var i=0;i<puzzleFiles.length;i++){
            puzzleImports[puzzleFiles[i]]=modules[i]
        } 
        /*split function and array names in different objects*/
        for(var i=0;i<puzzleFiles.length;i++){
            var functionPuzzles = Object.keys(puzzleImports[puzzleFiles[i]]).filter(key => typeof puzzleImports[puzzleFiles[i]][key] === 'function')
            if(functionPuzzles.length!=0) ggbjsPuzzles[puzzleFiles[i]]=functionPuzzles
            var arrayPuzzles  = Object.keys(puzzleImports[puzzleFiles[i]]).filter(key => typeof puzzleImports[puzzleFiles[i]][key] === 'object');
            if(arrayPuzzles.length!=0) calcPuzzles[puzzleFiles[i]]= arrayPuzzles
        }
        /*initalize dropdown menus*/
        await createGGBJSFilesDropdownMenu(ggbjsPuzzles)
        createGGBJSFunctionsDropdownMenu(ggbjsPuzzles)
        await createCalcFilesDropdownMenu(calcPuzzles)
        createCalcArraysDropdownMenu(calcPuzzles)
        createCalcQuestionsDropdownMenu(puzzleImports)
    })
})

/*---------------------------------------------------------------------------------------*/
/*---------------------------------------ggbjs-------------------------------------------*/
/*---------------------------------------------------------------------------------------*/

async function createGGBJSFilesDropdownMenu(puzzles){
    var fileContainer = $('#js-files')
    var functionsContainer = $('#file-functions')
    for(var path in puzzles){
        var dropdownElement = $('<option></option>',{
            'value':path,
            'id':path,
            'text':path
        })
        fileContainer.append(dropdownElement) 
    }
    return Promise.resolve()
}

$('#js-files').on('change',function(){
    createGGBJSFunctionsDropdownMenu(ggbjsPuzzles)
})

function createGGBJSFunctionsDropdownMenu(puzzles){
    $('#file-functions').empty()
    var selectedFile = $('#js-files').val()
    var functionsContainer = $('#file-functions')
    for(var i=0;i<puzzles[selectedFile].length;i++){
        var dropdownElement = $('<option></option>',{
            'value':puzzles[selectedFile][i],
            'id':puzzles[selectedFile][i],
            'text':puzzles[selectedFile][i]
        })
        functionsContainer.append(dropdownElement)
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
    var selectedFunction = $('#file-functions').val()
    var uploadData = await matchingModule[selectedFunction]() 
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

async function createCalcFilesDropdownMenu(puzzles){
    var fileContainer = $('#calc-files')
    for(var path in puzzles){
        var dropdownElement = $('<option></option>',{
            'value':path,
            'id':path,
            'text':path
        })
        fileContainer.append(dropdownElement)
    }
    return Promise.resolve()
}

$('#calc-files').on('change',function(){
    createCalcArraysDropdownMenu(calcPuzzles)
})

function createCalcArraysDropdownMenu(puzzles){
    $('#file-arrays').empty() 
    var arrayContainer = $('#file-arrays')
    var selectedFile = $('#calc-files').val()
    for(var i=0;i<puzzles[selectedFile].length;i++){
        var dropdownElement = $('<option></option>',{
            'value':puzzles[selectedFile][i],
            'id':puzzles[selectedFile][i],
            'text':puzzles[selectedFile][i]
        })
        arrayContainer.append(dropdownElement)
    }
}

$('#file-arrays').on('change',function(){
    createCalcQuestionsDropdownMenu(puzzleImports)
})

function createCalcQuestionsDropdownMenu(puzzleImports){
    $('#array-questions').empty()
    var questionContainer = $('#array-questions')
    var selectedFile = $('#calc-files').val()
    var selectedArray = $('#file-arrays').val()
    var questions = puzzleImports[selectedFile][selectedArray].questions
    for (var key in questions){
        var question = questions[key]
        var questionString = question.string
        var dropdownElement = $('<option></option>',{
            'value':key,
            'id':'question'+key,
            'text':questionString
        })
        questionContainer.append(dropdownElement)
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
