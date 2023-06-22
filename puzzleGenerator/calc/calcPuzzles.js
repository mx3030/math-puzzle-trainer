export var calc_integer_easy =
    {
        schoolClass:['class7'],
        topics : ['calc','integer'],
        difficulty:['easy'],
        layout:'calc',
        form:'template',
        questions: {
            question1 : {
                func:'genCalc',
                string:'a-b',
                vars:['x'],
                useSpecialSymbols:false,
                min:-20,
                max:20,
                questionText:'Berechne das Ergebnis.'
            },
            question2 : {
                func:'genCalc',
                string:'a+b',
                vars:['x'],
                useSpecialSymbols:false,
                min:-20,
                max:20,
                questionText:'Berechne das Ergebnis'
            },
            question3 : {
                func:'genCalc',
                string:'(a+b)-c',
                vars:['x'],
                useSpecialSymbols:false,
                min:-10,
                max:10,
                questionText:'Berechne das Ergebnis',
            },
            question4 : {
                func:'genCalc',
                string:'-a-b',
                vars:['x'],
                useSpecialSymbols:false,
                min:-10,
                max:10,
                questionText:'Berechne das Ergebnis',
            },
            question5 : {
                func:'genCalc',
                string:'a*b',
                vars:['x'],
                useSpecialSymbols:false,
                min:-10,
                max:10,
                questionText:'Berechne das Ergebnis',
            },
            question6 : {
                func:'genCalc',
                string:'a*(b+c)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-3,
                max:3,
                questionText:'Berechne das Ergebnis',
            }

            
        },
    }

export var calc_integer_medium =
    {
        schoolClass:['class7'],
        topics : ['calc','integer'],
        difficulty:['medium'],
        layout:'calc',
        form:'template',
        questions: {
            question1 : {
                func:'genCalc',
                string:'(a+b)-c',
                vars:['x'],
                useSpecialSymbols:false,
                min:-10,
                max:10,
                questionText:'Berechne und Kürze das Ergebnis',
            },
            question2 : {
                func:'genCalc',
                string:'(a-b)+(c+d)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und Kürze das Ergebnis',
            },
            question2 : {
                func:'genCalc',
                string:'(a-b)*c',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und Kürze das Ergebnis',
            },
        },
    }


export var calc_power_easy =
    {
        schoolClass:['class7'],
        topics : ['calc','power'],
        difficulty:['easy'],
        layout:'calc',
        form:'template',
        questions: { 
            question1 : {
                func:'genCalc',
                string:'a^b',
                vars:['x'],
                useSpecialSymbols:false,
                min:0,
                max:4,
                questionText:'Berechne das Ergebnis',
            },
            question2 : {
                func:'genCalc',
                string:'a^0',
                vars:['x'],
                useSpecialSymbols:false,
                min:1,
                max:20,
                questionText:'Berechne das Ergebnis',
            },
            question2 : {
                func:'genCalc',
                string:'0^a',
                vars:['x'],
                useSpecialSymbols:false,
                min:1,
                max:20,
                questionText:'Berechne das Ergebnis',
            },
            
        },
    }
export var calc_fractions_easy =
    {
        schoolClass:['class7'],
        topics : ['calc','fractions'],
        difficulty:['medium'],
        layout:'calc',
        form:'template',
        questions: {
            question1 : {
                func:'genCalc',
                string:'myMult(a/b, b/c)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und Kürze das Ergebnis'
            },
            question2 : {
                func:'genCalc',
                string:'a/b + c',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und Kürze das Ergebnis'
            },
            question3 : {
                func:'genCalc',
                string:'myMult(a/b,c)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und Kürze das Ergebnis'
            },
            
        },
    }


export var calc_fractions_medium =
    {
        schoolClass:['class7'],
        topics : ['calc','fractions'],
        difficulty:['medium'],
        layout:'calc',
        form:'template',
        questions: {
            question1 : {
                func:'genCalc',
                string:'myDiv(a/b,c)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-5,
                max:5,
                questionText:'Berechne und Kürze das Ergebnis'
            },
            question2 : {
                func:'genCalc',
                string:'myMult(a+b/c,d/e)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-3,
                max:3,
                questionText:'Berechne und Kürze das Ergebnis'
            },
            question3 : {
                func:'genCalc',
                string:'myMult(a/b,(myMult(c/d,e/f)))',
                vars:['x'],
                useSpecialSymbols:false,
                min:1,
                max:5,
                questionText:'Berechne und Kürze das Ergebnis'
            },
            
        },
    }

