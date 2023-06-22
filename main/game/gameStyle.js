import {mode} from '../../main/game/start.js'

var controlElementsDuell = ['control-bar-time','control-bar-points','control-bar-aufgabe','control-bar-history','control-bar-bestenliste','control-bar-ranking']
var controlElementsRush = ['control-bar-points','control-bar-aufgabe','control-bar-newGame']
var controlElementsTraining = ['control-bar-aufgabe','control-bar-newGame']


var leftButton = $('#control-bar-button-left')
var rightButton = $('#control-bar-button-right')
var controlBarPosition=0

leftButton.on('click',function (){
    if(mode=='Duell') moveLeft(controlElementsDuell,controlBarPosition)
    else if(mode=='Rush') moveLeft(controlElementsRush,controlBarPosition)
    else if(mode=='Training') moveLeft(controlElementsTraining,controlBarPosition)
    controlBarPosition--
})
rightButton.on('click',function (){
    if(mode=='Duell') moveRight(controlElementsDuell,controlBarPosition)
    else if(mode=='Rush') moveRight(controlElementsRush,controlBarPosition)
    else if(mode=='Training') moveRight(controlElementsTraining,controlBarPosition)
    controlBarPosition++
})

function moveLeft(controlElements,controlBarPosition){
    var numberOfControlElements = controlElements.length
    var nextControlElementIndex = (controlBarPosition-1)%numberOfControlElements
    if(nextControlElementIndex<0) nextControlElementIndex = nextControlElementIndex+controlElements.length
    for(var i=0;i<numberOfControlElements;i++){
        if(i==nextControlElementIndex){
            $('#'+controlElements[i]).removeClass('d-none')
            $('#'+controlElements[i]+'-container').removeClass('d-none')
        } else {
            $('#'+controlElements[i]).addClass('d-none')
            $('#'+controlElements[i]+'-container').addClass('d-none')
        }
    }
}

function moveRight(controlElements,controlBarPosition){
    var numberOfControlElements = controlElements.length
    var nextControlElementIndex = (controlBarPosition+1)%numberOfControlElements
    if(nextControlElementIndex<0) nextControlElementIndex = nextControlElementIndex+controlElements.length
    for(var i=0;i<numberOfControlElements;i++){
        if(i==nextControlElementIndex){
            $('#'+controlElements[i]).removeClass('d-none')
            $('#'+controlElements[i]+'-container').removeClass('d-none')
        } else {
            $('#'+controlElements[i]).addClass('d-none')
            $('#'+controlElements[i]+'-container').addClass('d-none')
        }
    }
}

export async function displayProgressBars(connected){
    /*only show progress bar for connected players*/
    var bootstrapColors = ["success","danger","info","warning","primary","primary-subtle","secondary","secondary-subtle","success-subtle","danger-subtle","warning-subtle","info-subtle","light","light-subtle","dark","dark-subtle","black,white"]
    var colorIndex = 0
    for(var player in connected){
        if(connected[player]==true){
            showProgressbar(player,bootstrapColors[colorIndex])
            colorIndex++
        }
    }
    return Promise.resolve()
}

function showProgressbar(player,color){
    /*update progress bar if bar already exists and append new one if not*/
    /*dont delete bars of players that left but maybe reorder -> use order from bootstrap*/
    /*or create progressbar for every player on connection and set d-none on disconnect*/
    var progressbarID = player+'-points-bar'
    if ($('#'+progressbarID).is('*')) {
        //console.log("change existing")
    } else {
        //console.log("create new one")
        createProgressbar(player,color)
    }
}

/*maybe move to gameStyle.js*/
function createProgressbar(player,color){
    var element = $('#user-points-bar-template').clone()
    element.attr('id',player+'-points-bar')
    element.removeClass('d-none')
    element.children('#user-points-bar-container').children('#user-points-bar-points').attr('id',player+'-points-bar-points')
    element.children('#user-points-bar-container').removeClass('border-success')
    element.children('#user-points-bar-container').addClass('border-'+color)
    element.children('#user-points-bar-progress').children('#user-points-bar-name').text(player)
    element.children('#user-points-bar-progress').removeClass('bg-success')
    element.children('#user-points-bar-progress').addClass('bg-'+color)
    element.children('#user-points-bar-progress').parent().removeClass('border-success')
    element.children('#user-points-bar-progress').parent().addClass('border-'+color)
    element.children('#user-points-bar-progress').attr('id',player+'-points-bar-progress')
    var user_points_area = $('#user-points')
    user_points_area.append(element)
    return element
}



