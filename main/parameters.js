/*insert geogebra applet with different sizes by getting breakpoint size*/
/*other options like setting scaleContainerClass or allowUpscale dont keep zoom*/
/*if setting for example "scaleContainerClass"="myContainerClass", width and height are disabled and set via css*/
//<div class="myContainerClass" style="width:500px;height:600px">
//<div id="applet_container"></div>
//</div>

import {breakpoint} from './style.js'

export var appID  = "app"

export var appletSize = {
    xs:[400,400],
    sm:[500,500],
    md:[600,600],
    lg:[675,625],
    xl:[1220,825]
}

export var template = {
    geo:'../puzzleGenerator/ggbJS/ggbGenerator/templates/ggb/geo.ggb',
    geo64:'../puzzleGenerator/ggbJS/ggbGenerator/templates/base64/geo.base64',
    clean:'../puzzleGenerator/ggbJS/ggbGenerator/templates/ggb/clean.ggb',
    cleanWithInput:'../puzzleGenerator/ggbJS/ggbGenerator/templates/ggb/cleanWithInput.ggb',
    clean64:'../puzzleGenerator/ggbJS/ggbGenerator/templates/base64/clean.base64', 
    cleanFreeAxes:'../puzzleGenerator/ggbJS/ggbGenerator/templates/ggb/cleanFreeAxes.ggb',
    cleanFreeAxes64:'../puzzleGenerator/ggbJS/ggbGenerator/templates/ggb/cleanFreeAxes.ggb'
}

export var toolbar = {
    simple:"0|17|62|1|2|3|4|5|38|6"
}


var parameters_xs = {
    "id":appID,
    //"filename":ggbFile,
    "width":appletSize.xs[0],
    "height":appletSize.xs[1],
    "prerelease":false,
    "showToolBar":false,
    "borderColor":"#FFFFFF",
    "showMenuBar":false,
    "showAlgebraInput":false,
    "showResetIcon":true,
    "enableLabelDrags":false,
    "enableShiftDragZoom":true,
    "enableRightClick":false,
    "capturingThreshold":null,
    "showToolBarHelp":false,
    "errorDialogsActive":true,
    "useBrowserForJS":true,
};


var parameters_sm = {
    "id":appID,
    //"filename":ggbFile,
    "width":appletSize.sm[0],
    "height":appletSize.sm[1],
    "prerelease":false,
    "showToolBar":false,
    "borderColor":"#FFFFFF",
    "showMenuBar":false,
    "showAlgebraInput":false,
    "showResetIcon":true,
    "enableLabelDrags":false,
    "enableShiftDragZoom":true,
    "enableRightClick":false,
    "capturingThreshold":null,
    "showToolBarHelp":false,
    "errorDialogsActive":true,
    "useBrowserForJS":true,
};

var parameters_md = {
    "id":appID,
    //"filename":ggbFile,
    "width":appletSize.md[0],
    "height":appletSize.md[1],
    "prerelease":false,
    "showToolBar":false,
    "borderColor":"#FFFFFF",
    "showMenuBar":false,
    "showAlgebraInput":false,
    "showResetIcon":true,
    "enableLabelDrags":false,
    "enableShiftDragZoom":true,
    "enableRightClick":false,
    "capturingThreshold":null,
    "showToolBarHelp":false,
    "errorDialogsActive":true,
    "useBrowserForJS":true,
};

var parameters_lg = {
    "id":appID,
    //"filename":ggbFile,
    "width":appletSize.lg[0],
    "height":appletSize.lg[1],
    "prerelease":false,
    "showToolBar":true,
    "borderColor":"#FFFFFF",
    "showMenuBar":false,
    "showAlgebraInput":false,
    "showResetIcon":true,
    "enableLabelDrags":false,
    "enableShiftDragZoom":true,
    "enableRightClick":false,
    "capturingThreshold":null,
    "showToolBarHelp":false,
    "errorDialogsActive":true,
    "useBrowserForJS":true,
};

var parameters_xl = {
    "id":appID,
    //"filename":template.clean,
    "width":appletSize.xl[0],
    "height":appletSize.xl[1],
    "prerelease":false,
    "showToolBar":true,
    "borderColor":"#FFFFFF",
    "showMenuBar":false,
    "showAlgebraInput":false,
    "showResetIcon":true,
    "enableLabelDrags":false,
    "enableShiftDragZoom":true,
    "enableRightClick":false,
    "capturingThreshold":null,
    "showToolBarHelp":false,
    "errorDialogsActive":true,
    "useBrowserForJS":true,
};


export async function injectGeoGebraApplet(breakpoint,toolbarString,template=template.clean){
    if(breakpoint=='xs'){
        parameters_xs['filename']=template
        if(toolbarString!=false) parameters_xs['customToolBar']=toolbarString
        var applet_xs = new GGBApplet('5.0', parameters_xs);
        applet_xs.inject('applet_container')
    } else if(breakpoint=='sm'){
        parameters_sm['filename']=template
        if(toolbarString!=false) parameters_sm['customToolBar']=toolbarString
        var applet_sm = new GGBApplet('5.0', parameters_sm);
        applet_sm.inject('applet_container')
    } else if(breakpoint=='md'){
        parameters_md['filename']=template
        if(toolbarString!=false) parameters_md['customToolBar']=toolbarString
        var applet_md = new GGBApplet('5.0', parameters_md);
        applet_md.inject('applet_container')
    }else if(breakpoint=='lg'){
        parameters_lg['filename']=template
        if(toolbarString!=false) parameters_lg['customToolBar']=toolbarString
        var applet_lg = new GGBApplet('5.0', parameters_lg);
        applet_lg.inject('applet_container')
    }else{
        parameters_xl['filename']=template
        if(toolbarString!=false) parameters_xl['customToolBar']=toolbarString
        var applet_xl = new GGBApplet('5.0', parameters_xl);
        applet_xl.inject('applet_container')
    }
    return Promise.resolve()
}

export async function ggbSetBase64(base64file) { 
    return new Promise(async (resolve, reject) => {
        try {
            var file=await fetch(base64file)
            var base64string = await file.text()
            app.setBase64(base64string,()=>{
                resolve()
            })
        } catch (error) {
            console.log(error);
        }
    });
}


