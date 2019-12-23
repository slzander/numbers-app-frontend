let mobilenet;
let classifier;
let video;
let label = '...'

document.addEventListener("DOMContentLoaded", () => {
    const activityList = document.querySelector("#activityList")
    const favoriteList = document.querySelector("#favoriteList")
    const howImFeelingButton = document.querySelector("#showMeActivities")
    const favH2 = document.querySelector("#favH2")

    howImFeelingButton.innerText = "Model is loading..."

    howImFeelingButton.addEventListener("click", () => {
        let number = label
        activityList.innerHTML = ''
        favoriteList.innerHTML = ''
        favH2.innerText = `Your numbers:`
        showActivities(number)
        showFavorites(number)
    })

    function showActivities(numberInput){
        fetch("http://localhost:3000/numbers/")
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
        return fetch("http://localhost:3000/favorites")
            .then(response => response.json())
            .then(favorites => favorites.map(favorite => {
                return favorite.number_id
            }))
    }

    function createNumberCard(number){
        const li = document.createElement("li")
        const countImage = document.createElement("img")
        const addButton = document.createElement("button")

        li.id = number.name
        li.className = "cardLi"
        countImage.src = number.count_image
        addButton.innerText = "+"
        countImage.className = "count-image"

        li.append(countImage, addButton)
        activityList.appendChild(li)

        addButton.addEventListener("click", (event) => {
            const li = document.createElement("li")
            const favoriteDescription = document.createElement("p")
            const deleteButton = document.createElement("button")
            const cardDiv = document.createElement("div")
    
            favoriteDescription.innerText = number.description
            deleteButton.innerText = "-"
            li.className = "cardLi"
    
            li.append(deleteButton, favoriteDescription)
            cardDiv.append(li)
            favoriteList.appendChild(cardDiv)

            const activityName = number.name
            const numberAddedP = document.querySelector("#" + activityName)
            numberAddedP.remove()

            fetch("http://localhost:3000/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                   number_id: number.id
                })
            }).then(response => response.json())
            .then(favorite => 
                deleteButton.addEventListener("click", function(event){
                    console.log(favorite)
                    cardDiv.remove()
                    fetch(`http://localhost:3000/favorites/${favorite.id}`, {
                        method: "DELETE"
                })     
            }))
        })
    }

    function showFavorites(emotionInput){
        fetch("http://localhost:3000/favorites/")
            .then(response => response.json())
            .then(favorites => favorites.map(favorite => {
                if (favorite.activity.emotion == emotionInput)
                    createFavoriteCard(favorite)
            }))
    }

    function createFavoriteCard(favorite){
        const li = document.createElement("li")
        const favoriteDescription = document.createElement("p")
        const deleteButton = document.createElement("button")
        const cardDiv = document.createElement("div")
        const fave = favorite

        li.setAttribute("class", "cardLi")
        favoriteDescription.innerText = favorite.activity.description
        deleteButton.innerText = "-"

        li.append(deleteButton, favoriteDescription)
        cardDiv.append(li)
        favoriteList.appendChild(cardDiv)

        deleteButton.addEventListener("click", function(event){
            cardDiv.remove()
            const li = document.createElement("li")
            const activityDescription = document.createElement("p")
            const addButton = document.createElement("button")

            li.setAttribute("class", "cardLi")
            activityDescription.innerText = fave.activity.description
            addButton.innerText = "+"
    
            li.append(addButton, activityDescription)
            activityList.appendChild(li)
            
            fetch(`http://localhost:3000/favorites/${fave.id}`, {
                method: "DELETE"
            })     
        })
    }
})

function modelReady() {
  console.log('Model is ready!!!')
  classifier.load('model.json', customModelReady)
}

function customModelReady() {
  console.log('Custom Model is ready!!!')
  label = '...'
  classifier.classify(gotResults)
}

function videoReady() {
  console.log('Video is ready!!!')
}

function setup() {
    createCanvas(455, 375)
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
  image(video, 5, 5, 444, 333)
  fill(255)
  textSize(16)
//   text(label, 20, height - 10)
}

function gotResults(error, result) {
  if (error) {
    console.error(error)
  } else {
    label = result[0].label
    const showActivitiesButton = document.querySelector("#showMeActivities")
    showActivitiesButton.innerText = `This looks like the number ${label}`
    classifier.classify(gotResults)
  }
}




