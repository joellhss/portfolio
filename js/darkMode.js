const darkMode = document.getElementById("darkMode")
console.log()

function darkModeAuto() {
    if(localStorage.getItem('darkMode') === "on") {
        darkMode.childNodes[1].className = "ph-moon-bold"
        document.querySelector("body").setAttribute("class", "dark")  
    } else {
        darkMode.childNodes[1].className = "ph-sun-bold"
        document.querySelector("body").removeAttribute("class", "dark")
    }
}

darkModeAuto()

darkMode.addEventListener("click", e => {
    if (e.target.className === "ph-sun-bold") {
        dark = true
    } else if (e.target.className === "ph-moon-bold"){
        dark = false
    } else if (e.target.firstElementChild.className === "ph-sun-bold") {
        dark = true
    } else if (e.target.firstElementChild.className === "ph-moon-bold") {
        dark = false
    }

    if (dark === true) {
        darkMode.childNodes[1].className = "ph-moon-bold"
        document.querySelector("body").setAttribute("class", "dark")
        localStorage.setItem('darkMode', 'on');
    } else {
        darkMode.childNodes[1].className = "ph-sun-bold"
        document.querySelector("body").removeAttribute("class", "dark")
        localStorage.setItem('darkMode', 'off')
    }
})