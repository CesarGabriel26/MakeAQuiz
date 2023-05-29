let Pergunta = document.getElementById('Pergunta')
let Respostas = document.querySelectorAll('#opcaoinp')
let RadioButton = document.querySelectorAll('#checkbox')

//! Controles
let BuildQuiz_ = document.getElementById('BuildQuiz')
let Back_ = document.getElementById('Back')
let Delet_ = document.getElementById('Delet')
let contador = document.getElementById('contador')
let Add_ = document.getElementById('Add')
let Foward_ = document.getElementById('Forward')

// ?=======================

let ImagemQuiz = document.getElementById('ImagemQuiz')
let ImagemQuizINP = document.getElementById('ImagemQuizINP')
let img = document.getElementById('img')


ImagemQuiz.addEventListener('click', ()=>{
    ImagemQuizINP.click()
})

//?========================

var Index = 0
var data_final = []
var data_atual = [

    Pergunta.value,

    [
        [Respostas[0].value, RadioButton[0].checked],
        [Respostas[1].value, RadioButton[1].checked],
        [Respostas[2].value, RadioButton[2].checked],
        [Respostas[3].value, RadioButton[3].checked]
    ]
]




setInterval(() => {
    if (Index < 1) {
        Back_.disabled = true
    } else {
        Back_.disabled = false
    }

    if (data_final.length <= 1 || Index == data_final.length - 1) {
        Foward_.disabled = true
    } else {
        Foward_.disabled = false
    }

    if (data_final.length == 40) {
        Add_.disabled = true
    } else {
        Add_.disabled = false
    }

    if (data_final.length <= 1) {
        Delet_.disabled = true
    } else {
        Delet_.disabled = false
    }

    data_atual = [

        Pergunta.value,

        [
            [Respostas[0].value, RadioButton[0].checked],
            [Respostas[1].value, RadioButton[1].checked],
            [Respostas[2].value, RadioButton[2].checked],
            [Respostas[3].value, RadioButton[3].checked]
        ],

        img.src
    ]

    data_final[Index] = data_atual

    contador.innerHTML = `<h3>${Index + 1}</h3>`

}, 200);

Back_.addEventListener('click', Back)
Foward_.addEventListener('click', Foward)
Add_.addEventListener('click', Add)
Delet_.addEventListener('click', Del)
BuildQuiz_.addEventListener('click',BuildQuiz)

function Back() {
    if (Index > 0) {
        Index--

        Pergunta.value = data_final[Index][0]

        for (let i = 0; i < data_final[Index][1].length; i++) {
            var array = data_final[Index][1][i]

            Respostas[i].value = array[0]
            RadioButton[i].checked = array[1]
        }
    }
}

function Foward() {
    Index++

    if (data_final[Index] !== undefined) {
        Pergunta.value = data_final[Index][0]

        for (let i = 0; i < data_final[Index][1].length; i++) {
            var array = data_final[Index][1][i]

            Respostas[i].value = array[0]
            RadioButton[i].checked = array[1]
        }
    } else {
        Index--
    }
}

function Add() {

    RadioButton.forEach(Button => {

        if (Button.checked) {
            Index++
            Pergunta.value = ""
            for (let i = 0; i < Respostas.length; i++) {
                Respostas[i].value = ""
                RadioButton[i].checked = false
            }
        }else{
            ShakeText()
        }
    })
}

function Del() {
    if (data_final.length > 1) {
        data_final.splice(Index, 1);
        Back()
    }
}

//========================ADD ima on questions


img.addEventListener('click', () => {
    var inp = document.getElementById('imgInp')
    inp.click()

    inp.addEventListener('change', () => {
        const file = inp.files[0]
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            img.src = reader.result
        })
        reader.readAsDataURL(file);
    })

})

//=========================================================
function ShakeText() {
    let ShakeText = document.getElementById('ShakeText')

    ShakeText.classList.add('horizontal-shake')

    ShakeText.onanimationend = () => {
        ShakeText.classList.remove('horizontal-shake')
    };
}
//=========================================================
function BuildQuiz() {
    let Finalizar = document.getElementById('Finalizar')
    Finalizar.style.display = 'flex'
}
function Voltar() {
    let Finalizar = document.getElementById('Finalizar')
    Finalizar.style.display = 'none'
}
//==========================================================
var QuizImage 
ImagemQuizINP.addEventListener('change',()=>{
    const file = ImagemQuizINP.files[0]
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            console.log(reader.result)
            QuizImage = reader.result
        })
        reader.readAsDataURL(file);
})

function SaveQuizOnFireBase() {

    let QuizName = document.getElementById('NomeQuiz').value

    var QuizLevels = data_final.length
    var QuestionsArray = data_final

    if (QuizImage) {
        savequiz(QuizName,QuizLevels,QuizImage,QuestionsArray)
    }
    Voltar()
}

