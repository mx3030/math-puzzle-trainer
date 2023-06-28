export var calc_percent_easy =
    {
        schoolClass:['class7'],
        topics : ['calc','percent'],
        difficulty:['easy'],
        layout:'calc',
        form:'template',
        questions: {
            question1 : {
                func:'genCalc',
                string:'myPercent(a,b,c)',
                vars:['x'],
                useSpecialSymbols:false,
                min:-10,
                max:10,
                questionText:'Berechne die Prozentangabe.',
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

