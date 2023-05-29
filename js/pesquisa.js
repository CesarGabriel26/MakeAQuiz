let PesqInput = document.getElementById("Pesquisar")
let Cards = document.querySelectorAll("#card")

window.addEventListener('load', ()=>{
  loadquiz()
})

function pesquisar(){
  var filtro
  var Titulos = []
  
  filtro = PesqInput.value.toUpperCase();


  Cards.forEach(card => {

      Titulos.push(card.getElementsByTagName('h3')[0])
  })

  //console.log(Titulos);

  for (let i = 0; i < Titulos.length; i++) {
      var Item = Titulos[i];

      if(Item.innerHTML.toUpperCase().indexOf(filtro)>-1){
          Cards[i].style.display = "";
        }else{
          Cards[i].style.display = "none";
        }
      
  }
}

function GotoQuiz(quiz) {
  localStorage.setItem('Quiz',quiz)
  window.location.href = 'QuizPlayer.html'
}
