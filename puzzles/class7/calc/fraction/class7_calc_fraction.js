export var class7_easy_calc_fraction=
    {
        schoolClass:['class7'],
        topics : ['calc','fraction'],
        difficulty:['easy'],
        layout:'calc',
        form:'template',
        questions: {
            question1 : {
                func:'genCalc',
                string:'myMult(a/b,c/d)',
                vars:['x'],
                useSpecialSymbols:false,
                min:1,
                max:10,
                questionText:'Berechne und kürze das Ergebnis.',
                simplify:true
            },
            question2 : {
                func:'genCalc',
                string:'myMult(a/b,c)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und kürze das Ergebnis.'
            },
            question3 : {
                func:'genCalc',
                string:'myDiv(a/b,c)',
                vars:['x'],
                useSpecialSymbols:false,
                min:1,
                max:10,
                questionText:'Berechne und kürze das Ergebnis.'
            },
            question4 : {
                func:'genCalc',
                string:'a/b+c/d',
                vars:['x'],
                useSpecialSymbols:false,
                min:1,
                max:5,
                questionText:'Berechne und kürze das Ergebnis.'
            }
        },
    }

export var class7_medium_calc_fraction=
    {
        schoolClass:['class7'],
        topics : ['calc','fraction'],
        difficulty:['medium'],
        layout:'calc',
        form:'template',
        questions: {
            question1 : {
                func:'genCalc',
                string:'myMult(a/b,c/d)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-10,
                max:10,
                questionText:'Berechne und kürze das Ergebnis.',
                simplify:true
            },
            question2 : {
                func:'genCalc',
                string:'myDiv(a/b,c)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und kürze das Ergebnis.'
            },
            question3 : {
                func:'genCalc',
                string:'myDiv(a/b,c/d)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und kürze das Ergebnis.'
            },
            question4 : {
                func:'genCalc',
                string:'a/b+c/d',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und kürze das Ergebnis.'
            }
        },
    }

export var class7_hard_calc_fraction=
    {
        schoolClass:['class7'],
        topics : ['calc','fraction'],
        difficulty:['hard'],
        layout:'calc',
        form:'template',
        questions: {
            question1 : {
                func:'genCalc',
                string:'myMult(a/b,c/d)+e/f',
                vars:['x'],
                useSpecialSymbols:false,
                min:-10,
                max:10,
                questionText:'Berechne und kürze das Ergebnis.',
                simplify:true
            },
            question2 : {
                func:'genCalc',
                string:'myMult((myDiv(a/b,c)),d/f)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und kürze das Ergebnis.'
            },
            question3 : {
                func:'genCalc',
                string:'myDiv(a/b,c/d)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-10,
                max:10,
                questionText:'Berechne und kürze das Ergebnis.'
            },
            question4 : {
                func:'genCalc',
                string:'myDiv((a/b+c/d),e/f)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und kürze das Ergebnis.'
            }
        },
    }

