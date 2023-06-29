/*----------------------------switchToGithub------------------------*/
export const github = true
/*------------------------------------------------------------------*/

export const maxRandom = 100000
export function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function hasTrailingSpaces(str) {
    return /\s+$/.test(str);
}

export function containsSpecialCharacters(str) {
    return /[^a-zA-Z0-9]/.test(str);
}

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export function areEqual(array1, array2) {
    const sortedArr1 = [...array1].sort();
    const sortedArr2 = [...array2].sort();

    return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
}

export function containsElements(mainArray,subArray){
    var check = subArray.every(function(element){
        return mainArray.includes(element)
    })
    return check
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function roundToTens(number) {
    return Math.round(number / 10) * 10;
}

export function generateRandomNumberWithStep(min, max, step) {
    const range = max - min;
    const randomSteps = math.randomInt(range / step + 1);  // Generate random number of steps
    const randomNumber = min + randomSteps * step;  // Calculate the random number within the specified step

    return randomNumber;
}

export var gameURL 
export var puzzleGeneratorURL 
export var waitingRoomURL     
export var templatesURL 
if(github==false){
    /*dev urls*/
    gameURL = "/main/game/game.html"
    puzzleGeneratorURL = "/puzzleGenerator/puzzleGenerator_v2.html"
    waitingRoomURL = "/main/waitingRoom/waitingRoom.html"
    templatesURL = "/puzzleGenerator/ggbJS/ggbGenerator/templates/templates.html"
} else {
    /*github urls*/
    gameURL = 'https://mx3030.github.io/math-puzzle-trainer/main/game/game.html'
    puzzleGeneratorURL = 'https://mx3030.github.io/math-puzzle-trainer/puzzleGenerator/puzzleGenerator_v2.html'
    waitingRoomURL = 'https://mx3030.github.io/math-puzzle-trainer/main/waitingRoom/waitingRoom.html'
    templatesURL = 'https://mx3030.github.io/math-puzzle-trainer/puzzleGenerator/ggbJS/ggbGenerator/templates/templates.html'
}


