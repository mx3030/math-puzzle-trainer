export var class7_easy_calc_percent =
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
                        max:100
                    },
                    b:{
                        min:1,
                        max:100
                    },
                },
                questionText:'Berechne die Prozentangabe.',
            }
        },
    }

export var class7_medium_calc_percent =
    {
        schoolClass:['class7'],
        topics : ['calc','percent'],
        difficulty:['medium'],
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
            },
            question2 : {
                func:'genPercentileCalc',
                string:'myPercent(a,b)',
                useSpecialSymbols:false,
                range:{
                    a:{
                        min:1,
                        max:10
                    },
                    b:{
                        min:1,
                        max:100
                    },
                },
                questionText:'Berechne die Prozentangabe.',
            }
        },
    }

export var class7_hard_calc_percent =
    {
        schoolClass:['class7'],
        topics : ['calc','percent'],
        difficulty:['hard'],
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
                        max:500
                    },
                    b:{
                        min:1,
                        max:300
                    },
                },
                questionText:'Berechne die Prozentangabe.',
            },
            question2 : {
                func:'genPercentileCalc',
                string:'myPercent(a,b)',
                useSpecialSymbols:false,
                range:{
                    a:{
                        min:1,
                        max:10
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

