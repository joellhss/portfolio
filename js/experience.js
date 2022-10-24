let boxes = document.getElementById("experience-boxes")
let newArray = []
let verificador = 1
let numberStart = 0
let numberEnd = 4

fetch("https://api.github.com/users/joellhss/repos?sort=created")
    .then(response => response.json())
    .then(array => {

        for(let i = 0; i < array.length; i++) {
            if (array[i].name !== "joellhss") {
                newArray.push(array[i])
            }
        }


        let numbersLinks = document.getElementById("numbers-link")
        let arrowLinks = document.getElementById("experience-guide")
        let quantity = Math.ceil(newArray.length / 4, 1)

        for (let i = 1; i <= quantity; i++) {
            numbersLinks.innerHTML += `<span id="${i}">${i}</span>`
        }

        document.getElementById("1").setAttribute("class", "ativo")
       
        let position = ""


        numbersLinks.addEventListener("click", e => {
            
           if(isNaN(e.target.id) !== true) {
            removeAdicionaAtivo(e.target.id)
            window.scroll(364, 2135)
           }
        })

        let positionArrow = 1
        arrowLinks.addEventListener("click", e => {
            if (e.target.className === "ph-caret-right-bold" && e.target.id !== "block") {
                positionArrow++
                removeAdicionaAtivo(positionArrow)
                window.scroll(364, 2135)
            } else if(e.target.className === "ph-caret-left-bold" && e.target.id !== "block") {
                positionArrow--
                removeAdicionaAtivo(positionArrow)
                window.scroll(364, 2135)
            }
        })

        function removeAdicionaAtivo (x) {
            positionArrow = parseInt(x)
            let idAtivo = document.getElementsByClassName("ativo")[0].id
            document.getElementById(idAtivo).removeAttribute("class", "ativo")
            document.getElementById(x).setAttribute("class", "ativo")

            numberEnd = parseInt(x) * 4
            numberStart = numberEnd - 4
            exibeBox(numberStart, numberEnd)
            verificaAtivo(quantity.toString())
           }

        function exibeBox(start, end) {
            let content = ""


            for(let cont = start; cont < end; cont++) {
    
                if (cont < newArray.length) {

                    let img = ""
                    fetch(`https://api.github.com/repos/joellhss/${newArray[cont].name}/contents/`)
                        .then(get => get.json())
                        .then(json => {
                            
                            if(verificador == 1) {
                                position = "right"
                                verificador++
                            } else {
                                position = "left"
                                verificador--
                            } 
            
                            json.forEach(element => {
                                if(element.name == "demo.png") {
                                    img = element.download_url
                                }
                            });
                            let newName = reformaNome(newArray[cont].name)
                            content += `
                            <div class="experience-box-${position}">
                                <img class="experience-box__img" src="${img}" alt="Imagem demonstrativa">
                                <div class="experience-box__content">
                                    <h3>${newName}</h3>
                                    <p>${newArray[cont].description}</p>
                                    <div class="experience-box__buttons">
                                        <a href="${newArray[cont].html_url}" class="repositorio">Repositório</a>
                                        <a href="${newArray[cont].homepage}" class="demo">Ver demo</a>
                                    </div>
                                </div>
                            </div>`
            
                            boxes.innerHTML = content
                    
                })
                }
    
            }
        
        }

        exibeBox(numberStart, numberEnd)
        verificaAtivo(quantity.toString())



    })
    .catch(err => {
        console.error(err)
    })


    function reformaNome(x) {
        let Array = x.split("-")
        let newText = []
        Array.forEach(item => {
            newText += " " + item.toUpperCase()
        })

        return newText

    }

    function verificaAtivo(x) {
        let arrowRight = document.getElementsByClassName("ph-caret-right-bold")[0];
        let arrowLeft = document.getElementsByClassName("ph-caret-left-bold")[0];
        let numbers = document.getElementById("numbers-link").children

        for(let i=0; i < numbers.length; i++) {
            if(numbers[i].className === "ativo" && numbers[i].id === "1") {
                arrowLeft.setAttribute("id", "block")
                arrowRight.removeAttribute("id", "block")
                break
            } else if (numbers[i].className === "ativo" && numbers[i].id === x) {
                arrowRight.setAttribute("id", "block")
                arrowLeft.removeAttribute("id", "block")
                break
            } else {
                arrowRight.removeAttribute("id", "block")
                arrowLeft.removeAttribute("id", "block")
            }


        }

    }

