let svg = document.getElementById('eXAJFrmsfpE1')

svg.classList.remove('active')
addActive()

function addActive() {
    svg.classList.add('active')
    setInterval(removeActive, 1500)
}
function removeActive() {
    svg.classList.remove('active')
    setInterval(addActive, 1500)
}