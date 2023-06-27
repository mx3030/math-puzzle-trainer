window.addEventListener('load',async function(){
    /*github information*/
    const owner = 'mx3030';
    const repo = 'math-puzzle-trainer';
    const path = 'puzzleGenerator/ggbjs/ggbGenerator/templates/ggb';

    /*get array of puzzle files in puzzles folder from github*/
    /*TODO: faster solution for local dev*/
    var puzzleFiles = await getPuzzleFiles(owner,repo,path)
    console.log(puzzleFiles)

})

$('#load-template-button').on('click',function(){

})


