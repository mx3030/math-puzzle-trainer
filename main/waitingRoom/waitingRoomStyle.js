import { github, puzzleGeneratorURL } from "../../main/helper.js"
import { getGithubDirFolders } from "../../puzzleGenerator/helper/githubHelper.js"

window.onload = async function(){
    if(github==true) showPuzzleGenerator(false)
    else showPuzzleGenerator(true)
    var schoolClass = localStorage.getItem('schoolClass')
    await setClassLayout(schoolClass)
    await getTopicList(schoolClass)
    displayTopicsList()
    setModeButtonsBehaviour() 
    setTimeButtonsBehaviour() 
}

function showPuzzleGenerator(visible){
    if(visible==true){
        $('#puzzleGenerator-container').removeClass('d-none')
    } else { 
        $('#puzzleGenerator-container').addClass('d-none')
    }
}

async function setClassLayout(schoolClass){ 
    /*TODO: d-none on spinners and clear checkboxes*/
    var schoolClassNumber = schoolClass.charAt(schoolClass.length-1)
    $('#waiting-room-title').text('Puzzle-Trainer-'+schoolClassNumber)
    return Promise.resolve()
}

function setModeButtonsBehaviour(){
    $('#Training').change(function(){
        if($(this).is(':checked')){
            $('#duration-container').addClass('d-none')
            $('#room-container').removeClass('d-none')
            $('#startGameButton').addClass('d-none')
            $('#limit-container').addClass('d-none')
            $('#room-container').addClass('d-none')
            $('#startGameButton').removeClass('d-none')
        } else {
            $('#duration-container').removeClass('d-none')
            $('#room-container').addClass('d-none')
            $('#startGameButton').removeClass('d-none')
            $('#limit-container').removeClass('d-none')
            $('#room-container').removeClass('d-none')
            $('#startGameButton').addClass('d-none')
        }
    })
    $('#Rush').change(function(){
        if($(this).is(':checked')){
            $('#duration-container').removeClass('d-none')
            $('#room-container').addClass('d-none')
            $('#startGameButton').removeClass('d-none')
            $('#infin').addClass('d-none')
            $('#infin-label').addClass('d-none')
            $('#limit-container').addClass('d-none')
        } else {
            $('#duration-container').addClass('d-none')
            $('#room-container').removeClass('d-none')
            $('#startGameButton').addClass('d-none')
            $('#infin').removeClass('d-none')
            $('#infin-label').removeClass('d-none')
            $('#limit-container').removeClass('d-none')
        }
    })
    $('#Duell').change(function(){
        if($(this).is(':checked')){
            $('#duration-container').removeClass('d-none')
            $('#room-container').removeClass('d-none')
            $('#startGameButton').addClass('d-none')
            $('#infin').removeClass('d-none')
            $('#infin-label').removeClass('d-none')
        } else {
            $('#duration-container').addClass('d-none')
            $('#room-container').addClass('d-none')
            $('#startGameButton').removeClass('d-none')
            $('#infin').addClass('d-none')
            $('#infin-label').addClass('d-none')
        }
    })
}

function setTimeButtonsBehaviour(){
    $('#1_min').change(function(){
        if($(this).is(':checked')){
            $('#limit-container').addClass('d-none')
        } else {
            $('#limit-container').removeClass('d-none')
        }
    })
    $('#3_min').change(function(){
        if($(this).is(':checked')){
            $('#limit-container').addClass('d-none')
        } else {
            $('#limit-container').removeClass('d-none')
        }
    })
    $('#5_min').change(function(){
        if($(this).is(':checked')){
            $('#limit-container').addClass('d-none')
        } else {
            $('#limit-container').removeClass('d-none')
        }
    })
    $('#10_min').change(function(){
        if($(this).is(':checked')){
            $('#limit-container').addClass('d-none')
        } else {
            $('#limit-container').removeClass('d-none')
        }
    })
    $('#infin').change(function(){
        if($(this).is(':checked')){
            $('#limit-container').removeClass('d-none')
        } else {
            $('#limit-container').addClass('d-none')
        }
    })
}

async function getTopicList(schoolClass){
    /*github information*/
    const owner = 'mx3030';
    const repo = 'math-puzzle-trainer';
    const path = 'puzzles/'+schoolClass;

    /*get array of puzzle files in puzzles folder from github*/
    /*TODO: faster solution for local dev*/
    var topics = await getGithubDirFolders(owner,repo,path)
    var topicsList=[]
    for(var i=0;i<topics.length;i++){
        var topicsStringSplit = topics[i].split('/')
        topicsList.push(topicsStringSplit.pop())
    }
    console.log(topicsList)
}

export function displayTopicsList(){

}
