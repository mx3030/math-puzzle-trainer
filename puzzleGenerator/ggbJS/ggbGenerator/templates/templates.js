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
    await createGGBFilesDropdownMenu()
})

async function createGGBFilesDropdownMenu(){
    var ggbDropdownMenu = $('#load-template-selection')
    for(var i=0;i<ggbFiles.length;i++){
        var ggbStringSplit = ggbFiles[i].split('/')
        var ggbString = ggbStringSplit.pop()
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
    injectGeoGebraApplet(breakpoint,toolbar.simple,selectedGGBFile)
})

$('#gen-base64-button').on('click',function(){
    var filename = $('#load-template-selection').find('option:selected').text()
    var filenameArray = filename.split('.')
    var filenameNoExtension = filenameArray[0]
    var base64string = app.getBase64() 
    saveAs(createBlob(base64string),filenameNoExtension+'.base64')
})

//https://muhimasri.com/blogs/how-to-save-files-in-javascript/
function saveAs(content,fileName){
    const a = document.createElement("a");
    const isBlob = content.toString().indexOf("Blob") > -1;
    let url = content;
    if (isBlob) {
        url = window.URL.createObjectURL(content);
    }
    a.href = url;
    a.download = fileName;
    a.click();
    if (isBlob) {
        window.URL.revokeObjectURL(url);
    }
}

function createBlob(data) {
  return new Blob([data], { type: "text/plain" });
}


