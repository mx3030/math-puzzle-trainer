window.onload = async function(){
    var schoolClass = localStorage.getItem('schoolClass')
    await setClassLayout(schoolClass)
    setModeButtonsBehaviour() 
    setTimeButtonsBehaviour() 
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


