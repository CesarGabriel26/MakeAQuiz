const firebaseConfig = {
    apiKey: "AIzaSyBeqdMEFA63Q46_KZlhfYbKNKsCeGLEX3Q",
    authDomain: "math-quiz-users.firebaseapp.com",
    databaseURL: "https://math-quiz-users-default-rtdb.firebaseio.com",
    projectId: "math-quiz-users",
    storageBucket: "math-quiz-users.appspot.com",
    messagingSenderId: "302530069236",
    appId: "1:302530069236:web:b38e7b839520a4a61454a1",
    measurementId: "G-YLBRLW20SV"

};

// ! inicializando firebase
firebase.initializeApp(firebaseConfig);

// ! referenciando database
var Users_DB = firebase.database()

loadquiz()

var DataQuizLevels = 0
var DataQuizQuestions = []

function loadquiz() {
    var data = []

    Users_DB.ref("quizzes/" + localStorage.getItem('Quiz')).on('value', (Snapshot) => {

        Snapshot.forEach(Get_password_Username => {
            data.push(Get_password_Username.val())
        })

        StoreData(data)
    });
}

function StoreData(data_) {
    var Levels = data_[0]
    var Questions = data_[3]



    DataQuizLevels = Levels

    DataQuizQuestions = Questions

    Iniciar()
}

/*Utilizando os dados*/

let pergunta = document.getElementById('Pergunta')
let contador = document.getElementById('contador')

let opcoesCl = document.querySelectorAll('.opcao')
let opcoes = document.querySelectorAll('#opcao')

var index = 0
var Status = {
    "Erros": 0,
    "Acertos": 0
}

function Iniciar() {

    var Tx_Pergunta = DataQuizQuestions[index][0]
    pergunta.innerHTML = Tx_Pergunta
    contador.innerHTML = `<h3>${index + 1}<h3>`

    var Respostas = DataQuizQuestions[index][1]

    for (let i = 0; i < Respostas.length; i++) {
        opcoes[i].innerHTML = Respostas[i][0]
    }

    opcoesCl.forEach(opc => {
        opc.addEventListener('click', () => {
            var respostaQuadro = opc.getElementsByTagName('p')[0].innerHTML

            for (let i = 0; i < Respostas.length; i++) {
                if (respostaQuadro == Respostas[i][0]) {

                    if (Respostas[i][1] == true) {
                        Play_Audio("Acerto")
                        Status["Acertos"] += 1
                        Avancar()
                    } else {
                        Play_Audio("Errado")
                        Status["Erros"] += 1
                        Avancar()
                    }

                }
            }

        })
    })

}

function Avancar() {
    if (index < (DataQuizLevels-1)) {
        index++
        Iniciar()
    }else{
        Play_Audio("Vitoria")
        let Finalizar = document.getElementById('Finalizar')
        Finalizar.style.display = "flex"
    }
}

/* ================================================================ */

function SaveOnList() {

    var data = []

    Users_DB.ref("Usuarios/" + localStorage.getItem('UserName')).on('value', (Snapshot) => {

        Snapshot.forEach(Get_password_Username => {
            data.push(Get_password_Username.val())
        })
    });

    var MyList_ = data[2]

    if(MyList_){
        MyList_.forEach(item => {
            if(item != localStorage.getItem('Quiz')){
                MyList_.push(localStorage.getItem('Quiz'))
            }
        })
    }else {
        MyList_.push(localStorage.getItem('Quiz'))
    }

    var NewUserForm = Users_DB.ref('Usuarios').child(localStorage.getItem('UserName'));

    NewUserForm.update({
        MyList: MyList_
    })
    Voltar()
}

function Voltar() {
    window.location.href = 'Jogos.html'
    localStorage.setItem('Quiz', "")
}
