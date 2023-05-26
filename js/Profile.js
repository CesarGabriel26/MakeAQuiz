let ChoseFIle = document.getElementById("ChoseFIle")
let Bestscore = document.getElementById("Bestscore")
let scoreHistori = document.getElementById("scoreHistori")

if (localStorage.getItem("UserName") != "") {
    document.getElementById("Nome").innerHTML = `<h2>${localStorage.getItem('UserName')}</h2>`

    //document.getElementById("Senha").innerHTML = `<input type="password"  value="${localStorage.getItem('PassWord')}" readonly id="PassWord" >`

    //document.getElementById("Email").innerHTML = `<h2>${localStorage.getItem('Email')}</h2>`

    var pfp = document.querySelectorAll("#PFP")
    pfp.forEach(Pf => {
        Pf.src = localStorage.getItem('Pfp')
    })

    UpdateScoreDisplay()

}

function LogOut() {
    localStorage.setItem('UserName', "")
    localStorage.setItem('PassWord', "")
    localStorage.setItem('Email', "")
    localStorage.setItem('Pfp', "")
    localStorage.setItem('BestScore', "")
    localStorage.setItem('ScoreHistory', "")


    window.location.href = '../index.html'

}

function ChangePfp() {
    ChoseFIle.click()
}

function UpdateScoreDisplay() {

    Bestscore.innerHTML = localStorage.getItem('BestScore')
    var ScoreHistory = localStorage.getItem('ScoreHistory')

    scoreHistori.innerHTML = ""

    var array = JSON.parse("[" + ScoreHistory + "]");

    array.forEach(value => {
        scoreHistori.innerHTML += `<p>${value}</p>`

    })
}