import {getGithubFiles} from '../../../helper/githubHelper.js'
import {appletSize,template,toolbar,injectGeoGebraApplet} from '../../../../main/parameters.js'
import {breakpoint} from '../../../../main/style.js'

var ggbFiles
window.addEventListener('load',async function(){
    /*github information*/
    const owner = 'mx3030';
    const repo = 'math-puzzle-trainer';
    const path = 'puzzleGenerator/ggbJS/ggbGenerator/templates/ggb';

    /*get array of ggb files from github*/
    /*TODO: faster solution for local dev*/
    ggbFiles = await getGithubFiles(owner,repo,path)
    /*correct path*/
    ggbFiles = ggbFiles.map(path => `../../../../${path}`);
    console.log(ggbFiles)
    await createGGBFilesDropdownMenu()
})

async function createGGBFilesDropdownMenu(){
    var ggbDropdownMenu = $('#load-template-selection')
    for(var i=0;i<ggbFiles.length;i++){
        var ggbStringSplit = ggbFiles[i].split('/')
        var ggbString = ggbStringSplit.pop()
        console.log(ggbFiles[i])
        var dropdownElement = $('<option></option>',{
            'value':ggbFiles[i],
            'id':'ggbFile'+i,
            'text':ggbString
        })
        ggbDropdownMenu.append(dropdownElement) 
    }
    return Promise.resolve()
}

$('#load-template-button').on('click',function(){
    var selectedGGBFile = $('#load-template-selection').val()
    console.log(selectedGGBFile)
    injectGeoGebraApplet(breakpoint,toolbar.simple,selectedGGBFile)
})


