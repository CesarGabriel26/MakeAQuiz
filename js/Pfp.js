if (localStorage.getItem("UserName") != "") {

    var pfp = document.querySelectorAll("#PFP")
    pfp.forEach(Pf => {
        Pf.src = localStorage.getItem('Pfp')
    })

}