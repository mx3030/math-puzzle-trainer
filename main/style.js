import {appletSize,template,injectGeoGebraApplet} from './main/parameters.js'

window.addEventListener('load',async function(){
    breakpoint=await getCurrentBreakpoint()
    setProblemArea(breakpoint)
    injectGeoGebraApplet(template.clean,breakpoint,toolbar.simple)
})

export var breakpoint 

export async function getCurrentBreakpoint() {
    const breakpoints = {
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
    };
    const width = window.innerWidth;
    var breakpoint
    if (width < breakpoints.sm) {
        breakpoint="xs"
    } else if (width < breakpoints.md) {
        breakpoint="sm"
    } else if (width < breakpoints.lg) {
        breakpoint="md"
    } else if (width < breakpoints.xl) {
        breakpoint="lg"
    } else {
        breakpoint="xl"
    }
    return Promise.resolve(breakpoint)
}

/*
* sync size of left block with applet size according to breakpoint
* */
function setProblemArea(breakpoint){
    $('#left').children().each(function() {
        $(this).css('width',appletSize[breakpoint][0]+5)
        $(this).css('height',appletSize[breakpoint][1]+5)
    });
}

// Check if the browser is on iOS
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Disable scrolling on iOS
export function disableScrollOnIOS() {
    console.log(isIOS())
    if (isIOS()) {
        disableScroll()
    }
}

//https://stackoverflow.com/questions/7768269/ipad-safari-disable-scrolling-and-bounce-effect/49853392#49853392
function preventDefault(e){
    e.preventDefault();
}

function disableScroll(){
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
}
function enableScroll(){
    document.body.removeEventListener('touchmove', preventDefault);
}
