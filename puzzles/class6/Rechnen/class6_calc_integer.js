export var class6_easy_calc_integer_1=
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

