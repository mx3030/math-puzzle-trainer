import {appID,template,toolbar,injectGeoGebraApplet} from '../main/parameters.js'
import {deepCopy,templatesURL} from '../main/helper.js'
import {breakpoint,disableScrollOnIOS} from '../main/style.js'
import {genCalcMain} from './calc/calcGenerator.js'
import {displayLayoutMain,displayCalc, displayEqEasy, displayEq} from './calc/calcDisplay.js'
import {displayLayoutGeogebra} from './ggbJS/ggbDisplay.js'
import {uploadSingleGGBJSPuzzle,uploadGGBJSFile,uploadGGBJSFunction,uploadGGBJSAll} from './ggbJS/ggbUpload.js'
import {generatePuzzleData, uploadCalcFile,uploadCalcArray,uploadCalcQuestion,uploadCalcAll} from './calc/calcUpload.js'
import {getPuzzleFiles} from './helper/githubHelper.js'
import {deleteTemps,deletePuzzles,resetDatabase, deleteRooms} from './helper/databaseHelper.js'

export var puzzleImports = {}
export var ggbjsPuzzles = {}
export var calcPuzzles = {}

/*init puzzle modules and dropdown menu*/
window.addEventListener('load',async function(){
    var schoolClass = localStorage.getItem('schoolClass')
    /*github information*/
    const owner = 'mx3030';
    const repo = 'math-puzzle-trainer';
    const path = 'puzzles/'+schoolClass;

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

$('#manage-templates-button').on('click',function(){
    window.location.href=templatesURL
})

async function createGGBJSFilesDropdownMenu(puzzles){
    var fileContainer = $('#js-files')
    for(var path in puzzles){
        var pathSplit = path.split('/')
        var pathEnd = pathSplit.pop()
        var dropdownElement = $('<option></option>',{
            'value':path,
            'id':path,
            'text':pathEnd
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

/*puzzle data from generate button*/
var lastGeneratedGGBJS={}

$('#ggbjs-single-gen-button').click(async function(){
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

$('#ggbjs-single-upload-button').click(async function(){
    /*upload single ggbjs puzzle that is generated (-> lastGeneratedGGBJS needs to be set)*/
    $('#ggbjs-single-spinner').removeClass('d-none')
    $('#ggbjs-single-upload-text').addClass('d-none')
    await uploadSingleGGBJSPuzzle(lastGeneratedGGBJS)
    $('#ggbjs-single-spinner').addClass('d-none')
    $('#ggbjs-single-upload-text').removeClass('d-none')
})

$('#js-files-upload-button').click(async function(){
    /*upload all puzzles in selected file*/
    var numberOfPuzzles = $('#js-files-num').val()
    var selectedFile = $('#js-files').val()
    $('#js-files-spinner').removeClass('d-none')
    $('#js-files-upload-text').addClass('d-none')
    await uploadGGBJSFile(selectedFile,numberOfPuzzles)
    $('#js-files-spinner').addClass('d-none')
    $('#js-files-upload-text').removeClass('d-none')
})

$('#file-functions-upload-button').click(async function(){
    var numberOfPuzzles = $('#file-functions-num').val()
    var selectedFile = $('#js-files').val()
    var selectedFunction = $('#file-functions').val()
    $('#file-functions-spinner').removeClass('d-none')
    $('#file-functions-upload-text').addClass('d-none')
    await uploadGGBJSFunction(selectedFile,selectedFunction,numberOfPuzzles)
    $('#file-functions-spinner').addClass('d-none')
    $('#file-functions-upload-text').removeClass('d-none')
})

$('#ggbjs-upload-all-button').click(async function(){
    var numberOfPuzzles = $('#ggbjs-upload-all-num').val()
    $('#ggbjs-upload-all-spinner').removeClass('d-none')
    $('#ggbjs-upload-all-text').addClass('d-none')
    await uploadGGBJSAll(numberOfPuzzles,false)
    $('#ggbjs-upload-all-spinner').addClass('d-none')
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
    $('#file-arrays').trigger('change')
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
$('#calc-single-gen-button').click(async function(){
    $('#algebra-problem-area').empty()  
    $('#ggb-problem-area').empty()  
    
    var selectedFile = $('#calc-files').val()
    var selectedArray = $('#file-arrays').val()
    var selectedQuestion = $('#array-questions').val()
    var puzzleData = await generatePuzzleData(selectedFile,selectedArray,selectedQuestion)

    var uploadData=genCalcMain(puzzleData)
    lastGeneratedCalc=uploadData
    $('#ggb').addClass('d-none') 
    $('#algebra').removeClass('d-none')
    displayLayoutMain(uploadData) 
})


$('#calc-single-upload-button').click(async function(){
    $('#calc-single-spinner').removeClass('d-none')
    $('#calc-single-upload-text').addClass('d-none')
    await uploadSingleGGBJSPuzzle(lastGeneratedCalc)
    $('#calc-single-spinner').addClass('d-none')
    $('#calc-single-upload-text').removeClass('d-none')
})

$('#calc-files-upload-button').click(async function(){
    var test = $('#calc-files-num').val()
    if(test=='') console.log(true)
    var selectedFile = $('#calc-files').val()
    $('#calc-files-spinner').removeClass('d-none')
    $('#calc-files-upload-text').addClass('d-none')
    await uploadCalcFile(selectedFile)
    $('#calc-files-spinner').addClass('d-none')
    $('#calc-files-upload-text').removeClass('d-none')
})

$('#file-arrays-upload-button').click(async function(){ 
    var selectedFile = $('#calc-files').val()
    var selectedArray = $('#file-arrays').val()
    $('#file-arrays-spinner').removeClass('d-none')
    $('#file-arrays-upload-text').addClass('d-none')
    await uploadCalcArray(selectedFile,selectedArray)
    $('#file-arrays-spinner').addClass('d-none')
    $('#file-arrays-upload-text').removeClass('d-none')
})

$('#array-questions-upload-button').click(async function(){
    var selectedFile = $('#calc-files').val()
    var selectedArray = $('#file-arrays').val()
    var selectedQuestion = $('#array-questions').val()
    $('#array-questions-spinner').removeClass('d-none')
    $('#array-questions-upload-text').addClass('d-none')
    await uploadCalcQuestion(selectedFile,selectedArray,selectedQuestion)
    $('#array-questions-spinner').addClass('d-none')
    $('#array-questions-upload-text').removeClass('d-none')
})

$('#calc-upload-all-button').click(async function(){
    $('#calc-upload-all-spinner').removeClass('d-none')
    $('#calc-upload-all-text').addClass('d-none')
    await uploadCalcAll()
    $('#calc-upload-all-spinner').addClass('d-none')
    $('#calc-upload-all-text').removeClass('d-none')
})


/*---------------------------------------------------------------------------------------*/
/*---------------------------------------db----------------------------------------------*/
/*---------------------------------------------------------------------------------------*/

$('#delete-puzzles-button').click(async function(){
    await deletePuzzles()
})

$('#delete-temps-button').click(async function(){
    await deleteTemps()
})

$('#reset-db-button').click(async function(){
    await resetDatabase()
})

$('#delete-rooms-button').click(async function(){
    await deleteRooms()
})
