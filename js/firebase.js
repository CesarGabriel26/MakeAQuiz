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


let ConfirmButton = document.getElementById("ConfirmButton");
let ConfirmButtonLogin = document.getElementById("ConfirmButtonLogin");
let SingUpForm = document.getElementById("SingUpForm");
let Message = document.querySelector(".Message")

var pfpInput = document.getElementById('pfpInput')
let pfpInputPerfil = document.getElementById('ChoseFIle')

var PfpPath


if (pfpInput) {
    pfpInput.addEventListener('change', e => {
        const file = pfpInput.files[0]
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            console.log(reader.result)
            PfpPath = reader.result
        })
        reader.readAsDataURL(file);
    })
}

const getElementValue = (id) => {
    return document.getElementById(id).value;
};

if (ConfirmButton) {
    ConfirmButton.addEventListener('click', () => {

        var UserName = getElementValue('UserName')
        var Email = getElementValue('Email')
        var PassWord = getElementValue('PassWord')
        var ConfirmPassWord = getElementValue('ConfirmPassWord')



        if (PassWord == ConfirmPassWord) {

            SaveData(UserName, Email, PassWord, PfpPath)

        } else {
            alert("As senhas devem ser identicas");
        }


    });
}

const SaveData = (UserName, UserEmail, UserPassWord, PfpPath) => {
    var NewUserForm = Users_DB.ref('Usuarios').child(UserName);


    NewUserForm.update({
        Email: UserEmail,
        PassWord: UserPassWord,
        Pfp: PfpPath,
        BestScore: 0,
        ScoreHistory: {
            0: 0,
            1: 0
        }
    })


    Message.style.display = "flex"
    setTimeout(() => {
        Message.style.display = "none"
    }, 3000)

    SingUpForm.reset()
}

if (ConfirmButtonLogin) {
    ConfirmButtonLogin.addEventListener('click', () => {

        var UserName = getElementValue('UserName')

        var data = []

        Users_DB.ref("Usuarios/" + UserName).on('value', (Snapshot) => {

            Snapshot.forEach(Get_password_Username => {
                data.push(Get_password_Username.val())
            })
            EfetuarLogin(data)
        });
    });
}

function EfetuarLogin(data) {


    var UserName = getElementValue('UserName')
    var PassWord = getElementValue('PassWord')


    var BestScore = data[0]
    var Email = data[1]
    var MyList = data[2]
    var DataPassWord = data[3]
    var Pfp = data[4]
    var ScoreHistory = data[5]

    console.log(DataPassWord);

    if (PassWord == DataPassWord) {
        Message.innerHTML = `Login efetuado`

        Message.style.display = "flex"
        setTimeout(() => {
            Message.style.display = "none"
        }, 3000)

        SingUpForm.reset()

        localStorage.setItem('UserName', UserName)
        localStorage.setItem('PassWord', DataPassWord)
        localStorage.setItem('Email', Email)
        localStorage.setItem('Pfp', Pfp)
        localStorage.setItem('BestScore', BestScore)
        localStorage.setItem('ScoreHistory', ScoreHistory)
        localStorage.setItem('MyList', MyList)
        
        window.location.href = 'perfil.html'

    } else {
        Message.innerHTML = `senha incorreto`
        Message.style.display = "flex"
        setTimeout(() => {
            Message.style.display = "none"
        }, 3000)
    }
}

if (pfpInputPerfil) {
    pfpInputPerfil.addEventListener('change', e => {
        const file = pfpInputPerfil.files[0]
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            console.log(reader.result)
            UpdatePfp(reader.result)
        })
        reader.readAsDataURL(file);
    })
}

function UpdatePfp(path) {
    var NewUserForm = Users_DB.ref('Usuarios').child(localStorage.getItem('UserName'));

    NewUserForm.update({
        Pfp: path
    })


    localStorage.setItem('Pfp', path)
    var pfp = document.querySelectorAll("#PFP")
    pfp.forEach(Pf => {
        Pf.src = localStorage.getItem('Pfp')
    })

}

function UpdateScore(NewScore) {

    var NewUserForm = Users_DB.ref('Usuarios').child(localStorage.getItem('UserName'));

    var data = []
    var NewBestScore = 0

    Users_DB.ref("Usuarios/" + UserName).on('value', (Snapshot) => {

        Snapshot.forEach(Get_password_Username => {
            data.push(Get_password_Username.val())
        })
    });

    var BestScore = data[0]
    var ScoreHistory = data[4]

    if (NewScore > BestScore) {
        NewBestScore = NewScore
        ScoreHistory.push(BestScore)
    } else {
        NewBestScore = BestScore
        ScoreHistory.push(NewScore)
    }

    NewUserForm.update({
        BestScore: NewBestScore,
        ScoreHistory: ScoreHistory,
    })

    localStorage.setItem('BestScore', NewBestScore)
    localStorage.setItem('ScoreHistory', ScoreHistory)

}

function savequiz(QuizName, QuizLevels, QuizImage, QuestionsArray) {
    var Quiz_DB = Users_DB.ref('quizzes').child(QuizName);


    Quiz_DB.update({
        Name: QuizName,
        Levels: QuizLevels,
        Pfp: QuizImage,
        Questions: QuestionsArray
    })

}

function loadquiz() {

    Users_DB.ref("quizzes").on('value', (Snapshot) => {

        Snapshot.forEach(Get_password_Username => {
            data = Get_password_Username.val()
            addcards(data)
        })
    });

    
}

function addcards(data_) {
    let cards = document.getElementById('cards')
    cards.innerHTML = ""
  
  
    
    var Name = data_['Name']
    var Pfp = data_['Pfp']


    var html = `
    
    <a onclick="GotoQuiz('${Name}')" id="card" class="CardOpcao">
        <div class="imagemContainer">
            <img src="${Pfp}" class="Image">
        </div>

        <h3  class="Texto">${Name}</h3>

    </a>

    `
    cards.innerHTML += html
  
}
