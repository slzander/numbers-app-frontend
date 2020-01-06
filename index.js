let mobilenet;
let classifier;
let video;
let label = '...'

const baseURL = 'https://write-and-count.herokuapp.com'

document.addEventListener("DOMContentLoaded", () => {
    const numberList = document.querySelector("#numberList")
    const favoriteList = document.querySelector("#favoriteList")
    const numberButton = document.querySelector("#showMeNumbers")

    numberButton.innerText = "..."

    numberButton.addEventListener("click", () => {
        let number = label
        numberList.innerHTML = ''
        favoriteList.innerHTML = ''
        showNumbers(number)
        showFavorites()
    })

    function showNumbers(numberInput){
        fetch(`${baseURL}/numbers`)
            .then(response => response.json())
            .then(numbers => numbers.map(number => {
                if (number.num == numberInput)
                    showNumberNotFavorites(number)
            }))
    }

    function showNumberNotFavorites(number){
        fetchFavoritesList()
            .then(favoritesIds => {
                if (!favoritesIds.includes(number.id)){
                    createNumberCard(number)
                }
            })
    }

    function fetchFavoritesList(){
        return fetch(`${baseURL}/favorites`)
            .then(response => response.json())
            .then(favorites => favorites.map(favorite => {
                return favorite.number_id
            }))
    }

    function createNumberCard(number){
        const li = document.createElement("li")
        const countImage = document.createElement("img")
        const addButton = document.createElement("button")
        const numberCardDiv = document.createElement("div")

        li.id = number.name
        li.className = "cardLi"
        countImage.src = number.count_image
        addButton.innerText = "+"
        countImage.className = "count-image"

        li.append(countImage, addButton)
        numberCardDiv.appendChild(li)
        numberList.appendChild(numberCardDiv)

        addButton.addEventListener("click", (event) => {
            numberCardDiv.remove()
            let faveID = 0
            const li = document.createElement("li")
            const countImage = document.createElement("img")
            const deleteButton = document.createElement("button")
            const cardDiv = document.createElement("div")

            countImage.src = number.count_image

            deleteButton.innerText = "-"
            li.className = "cardLi"
            countImage.className = "count-image"
            li.append(countImage, deleteButton)
            cardDiv.appendChild(li)
            favoriteList.appendChild(cardDiv)

            fetch(`${baseURL}/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                   number_id: number.id
                })
            }).then(response => response.json())
            .then(favorite => faveID = favorite.id)

            deleteButton.addEventListener("click", function(event){
                cardDiv.remove()
                fetch(`${baseURL}/favorites/${faveID}`, {
                    method: "DELETE"
                })     
            })
        })
    }

    function showFavorites(){
        fetch(`${baseURL}/favorites`)
            .then(response => response.json())
            .then(favorites => favorites.map(favorite => {
                    createFavoriteCard(favorite)
            }))
    }

    function createFavoriteCard(favorite){
        const li = document.createElement("li")
        const countImage = document.createElement("img")
        const deleteButton = document.createElement("button")
        const cardDiv = document.createElement("div")
        const fave = favorite

        countImage.src = favorite.number.count_image

        deleteButton.innerText = "-"
        li.className = "cardLi"
        countImage.className = "count-image"
        
        li.append(countImage, deleteButton)
        cardDiv.appendChild(li)
        favoriteList.appendChild(cardDiv)

        deleteButton.addEventListener("click", function(event){
            cardDiv.remove()
            fetch(`${baseURL}/favorites/${fave.id}`, {
                method: "DELETE"
            })     
        })
    }
})

function modelReady() {
  classifier.load('model.json', customModelReady)
}

function customModelReady() {
  label = '...'
  classifier.classify(gotResults)
}

function videoReady() {
  console.log('Video is ready')
}

function setup() {
    createCanvas(465, 385)
    video = createCapture(VIDEO)
    video.hide()
    background(0)

    const canvas = document.querySelector(".p5Canvas")
    const canvasDiv = document.querySelector("#canvasDivIndex")

    canvasDiv.append(canvas)

    mobilenet = ml5.featureExtractor('MobileNet', modelReady)
    classifier = mobilenet.classification(video, videoReady)
}

function draw() {
  background(0)
  image(video, 10, 10, 444, 333)
  fill(255)
  textSize(16)
}

function gotResults(error, result) {
  if (error) {
    console.error(error)
  } else {
    label = result[0].label
    const showNumbersButton = document.querySelector("#showMeNumbers")
    showNumbersButton.innerText = label
    classifier.classify(gotResults)
  }
}




