var audio = document.createElement('audio')
var one_shot = true

function Play_Audio(File) {
    
    audio.src = `../audio/${File}.mp3`
    audio.play()

    sound.addEventListener("ended", () => {
        return true
    })

}
