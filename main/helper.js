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

/*dev urls*/
export var gameURL = "/main/game/game.html"
export var puzzleGeneratorURL = "/puzzleGenerator/puzzleGenerator_v2.html"
export var waitingRoomURL = "/main/waitingRoom/waitingRoom.html"
export var templatesURL = "/puzzleGenerator/ggbJS/ggbGenerator/templates/templates.html"
/*github urls*/
//export var gameURL = 'https://mx3030.github.io/math-puzzle-trainer/main/game/game.html'
//export var puzzleGeneratorURL = 'https://mx3030.github.io/math-puzzle-trainer/puzzleGenerator/puzzleGenerator_v2.html'
//export var waitingRoomURL = 'https://mx3030.github.io/math-puzzle-trainer/main/waitingRoom/waitingRoom.html'
//export var templatesURL = 'https://mx3030.github.io/math-puzzle-trainer/puzzleGenerator/ggbJS/ggbGenerator/templates/templates.html'
