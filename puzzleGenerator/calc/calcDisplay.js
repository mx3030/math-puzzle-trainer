import {breakpoint} from "./main/style.js"
import {myLatexHandler,myStringHandler} from ".main/puzzleGenerator/calc/calcGenerator.js"
import {loadPuzzle,updateInfos} from './main/game/game.js'

/*----------------------------------------------------------------------------------------------------*/
/*--------------------------------------pre Settings--------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

var mqFieldsEqEasy = []
export var MQ = MathQuill.getInterface(2);

export function getFontSize(){
    /*get variable styling*/
    /*TODO write separate function that checks question span width and matches font size accordingly*/
    var fontSize
    if(breakpoint=='xl'){
        fontSize='80px'
    } else if(breakpoint=='lg'){
        fontSize='40px'
    }
    return fontSize
}
/*----------------------------------------------------------------------------------------------------*/
/*--------------------------------------MAIN----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

export function displayLayoutMain(puzzleData,game=false,puzzleNumber=null){
    /*check for func*/
    var func = puzzleData.func
    if(func=="genCalc"){
        var node = JSON.parse(puzzleData.node,math.reviver)
        var sol = puzzleData.sol
        displayCalc(node,sol,game,puzzleNumber)
    } else if(func=="genEqEasy"){
        var leftNode = JSON.parse(puzzleData.leftNode.math.reviver)
        var sol = puzzleData.sol
        var scope = puzzleData.scope
        displayEqEasy(leftNode,sol,scope,game,puzzleNumber)
    } else if(func=="genEq"){
        var leftNode = JSON.parse(puzzleData.leftNode,math.reviver)
        var rightNode = JSON.parse(puzzleData.rightNode,math.reviver)
        var sol = puzzleData.sol
        var scope = puzzleData.scope
        displayEq(leftNode,rightNode,sol,scope,[false,true],game,puzzleNumber)
    }
}

/*----------------------------------------------------------------------------------------------------*/
/*--------------------------------------calc----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/
export function displayCalc(node,sol,game=false,puzzleNumber=null){
    var fontSize = getFontSize()    
    var problemArea = $('#algebra-problem-area')

    /*get latex from node*/
    var latexString = node.toTex({handler:myLatexHandler})

    /*generate question area*/
    var questionArea = $('<div>')
    .addClass('d-flex justify-content-center')
    .attr('id','question-area')
    .css('font-size',fontSize)
    problemArea.append(questionArea)
    var question = $('<span>')
    .addClass('mb-5 align-self-center')
    .attr('id','question')
    .css('font-size',fontSize)
    questionArea.append(question)
    var staticField = MQ.StaticMath(document.getElementById('question'))
    staticField.latex(latexString)

    /*generate answer area*/
    var answerArea = $('<div>')
    .addClass('d-flex flex-row justify-content-center')
    .attr('id','answer-area')
    .css('font-size',fontSize)
    problemArea.append(answerArea)
    var equalSign = $('<span>')
    .addClass('mt-5 align-self-center')
    .attr('id','equal-sign')
    .css('font-size','50px')
    answerArea.append(equalSign)
    MQ.StaticMath(document.getElementById('equal-sign')).latex('=')

    var answer = $('<span>')
    .addClass('mt-5 align-self-center')
    .attr('id','answer')
    .css('font-size',fontSize) 
    answerArea.append(answer)
    var mq = MQ.MathField(document.getElementById('answer'),{
        handlers: {
            enter: function() {
                var check = checkCalc(mq,sol)
                /*this is the connection to game code*/
                if(game==true){
                    loadPuzzle(puzzleNumber+1)
                    updateInfos(puzzleNumber,check)
                }
            }
        }
    })
    mq.focus()
}

function checkCalc(mq,sol){
    /*TODO: only one solution and every possible answer is tested with evaluation in the end*/
    var answerString = mq.text()
    var answerNode = math.parse(answerString)
    answerNode.forEach(function(node,path,parent){
        if(node.type=='OperatorNode' && node.op!='/'){
            return false
        }
    })
    for(var i=0;i<sol.length;i++){
        /*check if plain text String matches evaluation*/
        if(answerString==sol[i]) return true;
        /*check if string matches if converted to fraction*/
        else if(math.format(math.fraction(answerNode.evaluate()),{fraction:'ratio'})==sol[i]) return true;
        /*check if string matches if special format given*/
        /*only needed if sol[2] is given but for now disabled*/
        else if(mq.latex().replace(/\\ /g,'')==sol[i]) return true;
    } 

    /*check if answer is correct by eval but not fully simplified*/
    if(answerNode.evaluate()==sol[0]) console.log("nicht vereinfacht")
        return false
}

/*----------------------------------------------------------------------------------------------------*/
/*-------------------------------------easy Equation--------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/
//var mqFieldsEqEasy = []
export function displayEqEasy(leftNode,sol,scope,game=false,puzzleNumber=null){
    var fontSize=getFontSize() 
    var problemArea = $('#algebra-problem-area')

    /*gen latex right from sol value*/
    var solFractionNode = math.fraction(sol)
    var solString
    if(solFractionNode.d==1){
        solString = sol.toString()
    } else {
        solString =math.format(solFractionNode,{fraction:'ratio'})
    }
    var right = math.parse(solString).toTex({handler:myLatexHandler})

    /*gen latex left*/
    var left = leftNode.toTex({handler:myLatexHandler})

    /*gen question area and paste equation span*/
    var questionArea = $('<div>')
    .addClass('d-flex justify-content-center')
    .attr('id','question-area')
    .css('font-size',fontSize)
    problemArea.append(questionArea)
    var equation = $('<span>')
    .addClass('mb-5 align-self-center')
    .attr('id','equation')
    .css('font-size',fontSize)
    questionArea.append(equation)
    var staticField = MQ.StaticMath(document.getElementById('equation'))
    staticField.latex(left+'='+right)

    /*gen answer fields*/
    var scopeKeys = Object.keys(scope)
    var mqFieldsEqEasy = []
    for(var i=0;i<scopeKeys.length;i++){
        var answerArea = $('<div>')
        .addClass('d-flex justify-content-center')
        .attr('id','answer-area'+i)
        .css('font-size',fontSize)
        problemArea.append(answerArea)
        var answerVar = $('<span>')
        .addClass('mt-5 align-self-center')
        .attr('id','answerVar'+i)
        .css('font-size',fontSize)
        .css('width','8%')
        answerArea.append(answerVar)
        MQ.StaticMath(document.getElementById('answerVar'+i)).latex(scopeKeys[i])
        var equalSign = $('<span>')
        .addClass('mt-5 align-self-center')
        .attr('id','equal-sign'+i)
        .css('font-size',fontSize)
        answerArea.append(equalSign)
        MQ.StaticMath(document.getElementById('equal-sign'+i)).latex('=')
        var answer = $('<span>')
        .addClass('mt-5 align-self-center')
        .attr('id','answer'+i)
        .css('font-size',fontSize) 
        answerArea.append(answer)
        var mq = MQ.MathField(document.getElementById('answer'+i),{
            handlers: {
                enter: function(thisMQ) {
                    var check = checkEqEasy(mqFieldsEqEasy,scope,leftNode,sol,thisMQ.id)
                    if(game==true){
                        loadPuzzle(puzzleNumber+1)
                        updateInfos(puzzleNumber,check)
                    }
                }
            }
        })
        if(i==0) mq.focus()
            mqFieldsEqEasy.push(mq)
    }
}

function checkEqEasy(mqFieldsEqEasy,scope,leftNode,sol,id){ 
    var scopeVars = Object.keys(scope)
    var newScope = {}
    var numberOfMQ = mqFieldsEqEasy.length
    for(var i=0;i<numberOfMQ;i++){
        var mq = mqFieldsEqEasy[i]
        /*create answer node*/
        var answerString = mq.text()
        if(answerString=='') return false
        var answerNode = math.parse(answerString)
        /*check if answer node contains operators other than division*/
        answerNode.forEach(function(node,path,parent){
            if(node.type=='OperatorNode' && node.op!='/'){
                return false
            }
        })
        var answerLatex=mq.latex().replace(/\\ /g,'+')
        answerString = nerdamer.convertFromLaTeX(answerLatex).toString()
        answerNode = math.parse(answerString)
        var answer = answerNode.evaluate()
        console.log(answer)
        newScope[scopeVars[i]]=answer

        /*focus next mq field*/
        if(id==mq.id){
            mqFieldsEqEasy[(i+1)%numberOfMQ].focus()
        }
    }
    if(math.evaluate(leftNode.toString(),newScope)==sol) return true
    else return false
}

/*----------------------------------------------------------------------------------------------------*/
/*--------------------------------------equation------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/
export function displayEq(leftNode,rightNode,scope,simplify=[false,true],game=false,puzzleNumber=null){
    var fontSize=getFontSize() 
    var problemArea = $('#algebra-problem-area')

    /*gen latex left*/
    var left = leftNode.toTex({handler:myLatexHandler})
    if(simplify[0]==true){
        //var leftString = leftNode.toString({handler:myStringHandler})
        //var leftSimpleNode = math.simplify(leftString,{},{exactFractions:true})
        //left = leftSimpleNode.toTex({handler:myLatexHandler})
    } 
    var right = rightNode.toTex({handler:myLatexHandler})
    if(simplify[1]==true){
        var rightString = rightNode.toString({handler:myStringHandler})
        var rightSimpleNode = math.simplify(rightString,{},{exactFractions:true})
        right = rightSimpleNode.toTex({handler:myLatexHandler})
    }

    /*gen question area and paste equation span*/
    var questionArea = $('<div>')
    .addClass('d-flex justify-content-center')
    .attr('id','question-area')
    .css('font-size',fontSize)
    problemArea.append(questionArea)
    var equation = $('<span>')
    .addClass('mb-5 align-self-center')
    .attr('id','equation')
    .css('font-size',fontSize)
    questionArea.append(equation)
    var staticField = MQ.StaticMath(document.getElementById('equation'))
    staticField.latex(left+'='+right)

    /*gen answer fields*/
    var scopeKeys = Object.keys(scope)
    var mqFieldsEq = []
    for(var i=0;i<scopeKeys.length;i++){
        var answerArea = $('<div>')
        .addClass('d-flex justify-content-center')
        .attr('id','answer-area'+i)
        .css('font-size',fontSize)
        problemArea.append(answerArea)
        var answerVar = $('<span>')
        .addClass('mt-5 align-self-center')
        .attr('id','answerVar'+i)
        .css('font-size',fontSize)
        .css('width','8%')
        answerArea.append(answerVar)
        MQ.StaticMath(document.getElementById('answerVar'+i)).latex(scopeKeys[i])
        var equalSign = $('<span>')
        .addClass('mt-5 align-self-center')
        .attr('id','equal-sign'+i)
        .css('font-size',fontSize)
        answerArea.append(equalSign)
        MQ.StaticMath(document.getElementById('equal-sign'+i)).latex('=')
        var answer = $('<span>')
        .addClass('mt-5 align-self-center')
        .attr('id','answer'+i)
        .css('font-size',fontSize) 
        answerArea.append(answer)
        var mq = MQ.MathField(document.getElementById('answer'+i),{
            handlers: {
                enter: function(thisMQ) {
                    var check = checkEq(mqFieldsEq,scope,leftNode,rightNode,thisMQ.id)
                    if(game==true){
                        loadPuzzle(puzzleNumber+1)
                        updateInfos(puzzleNumber,check)
                    }
                }
            }
        })
        if(i==0) mq.focus()
            mqFieldsEq.push(mq)
    }
}

function checkEq(mqFieldsEq,scope,leftNode,rightNode,id){
    var scopeVars = Object.keys(scope)
    var newScope = {}
    var numberOfMQ = mqFieldsEq.length
    for(var i=0;i<numberOfMQ;i++){
        var mq = mqFieldsEq[i]
        /*create answer node*/
        var answerString = mq.text()
        if(answerString=='') return false
        var answerNode = math.parse(answerString)
        /*check if answer node contains operators other than division*/
        answerNode.forEach(function(node,path,parent){
            if(node.type=='OperatorNode' && node.op!='/'){
                return false
            }
        })
        var answerLatex=mq.latex().replace(/\\ /g,'+')
        answerString = nerdamer.convertFromLaTeX(answerLatex).toString()
        answerNode = math.parse(answerString)
        var answer = answerNode.evaluate()
        newScope[scopeVars[i]]=answer

        /*focus next mq field*/
        if(id==mq.id){
            mqFieldsEq[(i+1)%numberOfMQ].focus()
        }
    }
    if(math.evaluate(leftNode.toString(),newScope)==math.evaluate(rightNode.toString(),newScope)) return true
    else return false

}

export function randomCalc(string,min,max){
    var temp = genCalc(string,min,max)
    displayCalc(temp[0],temp[1])
}
export function randomEq(string,min,max,vars=['x','y','z']){
    var temp = genEq(string,min,max,true,vars)
    displayEq(temp[0],temp[1],temp[2])
}


