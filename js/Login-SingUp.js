let ShowPassWord = document.getElementById("ShowPassWord")
let PassWordInp = document.getElementById("PassWord")
let PassWordInpConfirm = document.getElementById("ConfirmPassWord")
let ImgShow = document.getElementById('ImgShow')



ShowPassWord.addEventListener("click", () => {

    if (PassWordInp.type === "password") {

        ImgShow.src = "../svg/eye-off-outline.svg"

        PassWordInp.type = "text";
        if (PassWordInpConfirm) {
            PassWordInpConfirm.type = "text";
            
        }

    } else {

        PassWordInp.type = "password";
        ImgShow.src = "../svg/eye-outline.svg"

        if (PassWordInpConfirm) {
            PassWordInpConfirm.type = "password";
        }
    }

})


