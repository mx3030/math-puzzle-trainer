/*math js toTex and toString handler */
export const myLatexHandler = {
    'myDiv':function(node,options){
        return node.args[0].toTex(options) + '\\div' + node.args[1].toTex(options)
    }, 
    'Eq':function(node,options){
        return node.args[0].toTex(options) +'='+node.args[1].toTex(options)
    },
    'invDiv':function(node,options){
        return '\\frac{' + node.args[0].toTex(options) + '}{' + node.args[1].toTex(options) + '}'
    },
    'myMult':function(node,options){
        return node.args[0].toTex(options)+ '\\cdot' + node.args[1].toTex(options)
    },
    'myPercent':function(node,options){
        return node.args[0].toTex(options)+'\\% \,\,\\text{von}\,\,'+node.args[1].toTex(options)+'\,\,\\text{'+node.args[2].toTex(options)+'}'
    }
}

export const myStringHandler = {
    'myDiv':function(node,options){
        return '('+node.args[0].toString(options)+') / ('+node.args[1].toString(options)+')'
    },
    'Eq':function(node,options){
        return node.args[0].toString(options)+'='+node.args[1].toString(options)
    },
    'invDiv':function(node,options){
        return '(' + node.args[0].toString(options) + ')/(' + node.args[1].toString(options) + ')'
    },
    'myMult':function(node,options){
        return '('+node.args[0].toString(options)+')*('+node.args[1].toString(options)+')' 
    },
    'myPercent':function(node,options){
        return '('+node.args[0].toString(options)+'/100)*'+node.args[1].toString(options)
    }
}

/*----------------------------------------------------------------------------------------------------*/
/*--------------------------------------MAIN----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

export function genCalcMain(puzzleData){
    /*input: general calc data object --> output: specific calc data object*/
    var func = puzzleData.func
    var string = puzzleData.string
    var vars = puzzleData.vars
    var useSpecialSymbols = puzzleData.useSpecialSymbols
    var max = puzzleData.max
    var min = puzzleData.min
    if(func=="genCalc"){
        var [node,sol] = genCalc(string,min,max)
        /*change and add new puzzleData entrys*/
        puzzleData.node = JSON.stringify(node,math.replacer)
        puzzleData.sol = sol 
    } else if(func=="genEqEasy"){
        var [leftNode,sol,scope]=genEqEasy(string,min,max,useSpecialSymbols,vars)
        puzzleData.leftNode = JSON.stringify(leftNode,math.replacer)
        puzzleData.sol = sol //right side of equation
        puzzleData.scope = scope // values for variables --> solution
    } else if(func=="genEq"){
        var [leftNode,rightNode,scope]=genEq(string,min,max,useSpecialSymbols,vars)
        puzzleData.leftNode = JSON.stringify(leftNode,math.replacer)
        puzzleData.rightNode = JSON.stringify(rightNode,math.replacer)
        puzzleData.scope = scope
    }
    puzzleData.form = 'puzzle'
    return puzzleData
}

/*----------------------------------------------------------------------------------------------------*/
/*--------------------------------------calc----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

export function genCalc(string,min,max){
    /*generate term with min/max numbers without variables for plain calculation*/
    /*return latex string for mathquill and solution array (only fractions and integer numbers)*/
    var questionString = string;
    var questionNode = math.parse(questionString)
    var randomQuestionNode = questionNode.transform(function(node,path,parent){
        if(node.isSymbolNode && node.name.length==1){
            var randomInt = math.randomInt(min,max)
            while(randomInt==0){
                randomInt=math.randomInt(min,max)
            }
            if(randomInt<0){
                return new math.ParenthesisNode(new math.ConstantNode(randomInt))
            } else {
                return new math.ConstantNode(randomInt)
            }
        } else {
            return node
        }
    })
    return [randomQuestionNode,genCalcSol(randomQuestionNode)]
}

function genCalcSol(node){
    var sol = []
    var temp = node.toString({handler:myStringHandler})
    var temp2 = math.parse(temp).evaluate()
    var temp3 = math.fraction(temp2)
    var temp4 = math.format(temp3,{fraction:'ratio'})
    var temp5 = temp3.toLatex({excludeWhole:true})
    sol.push(temp2)
    sol.push(temp4)
    /*dont allow this solution because some situations are very easy*/
    //sol.push(temp5)
    //console.log(sol)
    return sol
}


/*----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------easy equation----------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

/*special symbols to replace x*/
var specialSymbols=['\u260E','\u2606','\u2602',"\u2603","\u2600","\u25ff"]
const isAlphaOriginal = math.parse.isAlpha
/*create new parser, which contains original characters and new characters*/
math.parse.isAlpha = function (c, cPrev, cNext) {
    return isAlphaOriginal(c, cPrev, cNext) || specialSymbols.includes(c)
}

export function genEqEasy(left,min,max,useSpecialSymbols=true,vars=['x']){
    /*gen left side node and keep variables from vars array in place*/
    var leftNode = math.parse(left)
    var varsUpdated=[]
    var randomLeftNode = leftNode.transform(function(node,path,parent){
        if(node.isSymbolNode && node.name.length==1){
            var randomInt = math.randomInt(min,max)
            while(randomInt==0){
                randomInt=math.randomInt(min,max)
            }
            if(vars.includes(node.name)){
                if(varsUpdated.includes(node.name)==false) varsUpdated.push(node.name)
                return new math.SymbolNode(node.name)
            }
            else return new math.ConstantNode(randomInt)
        } else {
            return node
        }
    })
    /*gen random scope for solution on right side*/
    var tempString = randomLeftNode.toString({handler:myStringHandler})
    var scope = {}
    for(var i=0;i<varsUpdated.length;i++){
        var variableName = varsUpdated[i]
        scope[variableName]=math.randomInt(min,max)
    }
    var sol = math.evaluate(tempString,scope)

    /*change character symbols to elements in specialSymbols array*/
    if(useSpecialSymbols==true){
        var arr
        [arr,scope] = changeVarSymbols([randomLeftNode],scope)
        randomLeftNode=arr[0]
    }

    return [randomLeftNode,sol,scope]
}

function changeVarSymbols(nodeArr,scope){
    var scopeVars = Object.keys(scope)
    var mapping={}
    var newScope={}
    var newNodeArr=[]
    var randomInt = math.randomInt(0,specialSymbols.length)
    for(var i=0;i<nodeArr.length;i++){
        for(var j=0;j<scopeVars.length;j++){
            mapping[scopeVars[j]]=specialSymbols[(randomInt+j)%specialSymbols.length]
            newScope[specialSymbols[(randomInt+j)%specialSymbols.length]]=scope[scopeVars[j]]
        }
        var newNode = nodeArr[i].transform(function(node,path,parent){
            if(node.isSymbolNode && node.name.length==1){
                return new math.SymbolNode(mapping[node.name])
            } else {
                return node
            }
        })
        newNodeArr.push(newNode)
    }

    return [newNodeArr,newScope]
}


/*----------------------------------------------------------------------------------------------------*/
/*------------------------------------------equation--------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

export function genEq(string,min,max,useSpecialSymbols=true,vars=['x']){
    var parts = string.split('=')
    var left = parts[0]
    var right = parts[1]
    var leftNode = math.parse(left)
    var rightNode = math.parse(right)
    var randomMapping = {}
    var varsUpdated = []
    var randomLeftNode = leftNode.transform(function(node,path,parent){
        if(node.isSymbolNode && node.name.length==1){
            var randomInt = math.randomInt(min,max)
            while(randomInt==0){
                randomInt=math.randomInt(min,max)
            }
            if(vars.includes(node.name)) {
                if(varsUpdated.includes(node.name)==false) varsUpdated.push(node.name)
                    return new math.SymbolNode(node.name)
            }
            else{
                if(typeof randomMapping[node.name]==='undefined'){
                    randomMapping[node.name]=randomInt
                }
                return new math.ConstantNode(randomMapping[node.name])
            } 
        } else {
            return node
        }
    })
    var randomRightNode = rightNode.transform(function(node,path,parent){
        if(node.isSymbolNode && node.name.length==1){
            var randomInt = math.randomInt(min,max)
            while(randomInt==0){
                randomInt=math.randomInt(min,max)
            }
            if(vars.includes(node.name)){ 
                if(varsUpdated.includes(node.name)==false) varsUpdated.push(node.name)
                    return new math.SymbolNode(node.name)
            }
            else{
                if(typeof randomMapping[node.name]==='undefined'){
                    randomMapping[node.name]=randomInt
                    return new math.ConstantNode(randomInt)
                } else {
                    return new math.ConstantNode(randomMapping[node.name])
                }
            } 
        } else {
            return node
        }
    })
    /*gen random scope for solution on right side*/
    var tempNode = new math.OperatorNode('-','minus',[randomLeftNode,new math.ParenthesisNode(randomRightNode)])
    var tempString = tempNode.toString({handler:myStringHandler})
    var scope = {}
    var tempRightString = 'Infinity'
    while(tempRightString=='Infinity'){
        for(var i=0;i<varsUpdated.length;i++){
            var variableName = varsUpdated[i]
            scope[variableName]=math.randomInt(min,max)
        }
        /*important!!! solution of left(x)-right(x)*/
        tempRightString = math.evaluate(tempString,scope)
    }
    var tempRightFractionNode = math.fraction(tempRightString)
    if(tempRightFractionNode.d==1){
        tempRightString = tempRightFractionNode.toString()
    } else {
        tempRightString =math.format(tempRightFractionNode,{fraction:'ratio'})
    }
    var tempRightNode = math.parse(tempRightString)
    //mix sol with right node
    randomRightNode = new math.OperatorNode('+','add',[tempRightNode,new math.ParenthesisNode(randomRightNode)])

    /*change character symbols to elements in specialSymbols array*/
    if(useSpecialSymbols==true){
        var arr
        [arr,scope] = changeVarSymbols([randomLeftNode,randomRightNode],scope)
        randomLeftNode = arr[0]
        randomRightNode = arr[1]
    }

    return [randomLeftNode,randomRightNode,scope]
}


/*----------------------------------------------------------------------------------------------------*/
/*------------------------------------------percentile------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------*/

export function genPercentileCalc(string,percentile,whole){

}
