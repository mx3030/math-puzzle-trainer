export var calc_percent_easy =
    {
        schoolClass:['class7'],
        topics : ['calc','percent'],
        difficulty:['easy'],
        layout:'calc',
        form:'template',
        questions: {
            question1 : {
                func:'genPercentileCalc',
                string:'myPercent(a,b)',
                useSpecialSymbols:false,
                range:{
                    a:{
                        min:1,
                        max:200
                    },
                    b:{
                        min:1,
                        max:200
                    },
                },
                questionText:'Berechne die Prozentangabe.',
            }
        },
    }


