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
        let emotion = label
        activityList.innerHTML = ''
        favoriteList.innerHTML = ''
        favH2.innerText = `Your numbers:`
        showActivities(emotion)
        showFavorites(emotion)
    })

    function showActivities(emotionInput){
        fetch("http://localhost:3000/activities/")
            .then(response => response.json())
            .then(activities => activities.map(activity => {
                if (activity.emotion == emotionInput)
                    showActivityNotFavorites(activity)
            }))
    }

    function showActivityNotFavorites(activity){
        fetchFavoritesList()
            .then(favoritesIds => {
                if (!favoritesIds.includes(activity.id)){
                    createActivityCard(activity)
                }
            })
    }

    function fetchFavoritesList(){
        return fetch("http://localhost:3000/activity_favorites")
            .then(response => response.json())
            .then(activity_favorites => activity_favorites.map(activity_favorite => {
                return activity_favorite.activity_id
            }))
    }

    function createActivityCard(activity){
        const li = document.createElement("li")
        const activityDescription = document.createElement("p")
        const addButton = document.createElement("button")

        li.id = activity.name
        li.setAttribute("class", "cardLi")
        activityDescription.innerText = activity.description
        addButton.innerText = "+"

        li.append(addButton, activityDescription)
        activityList.appendChild(li)

        addButton.addEventListener("click", (event) => {
            const li = document.createElement("li")
            const favoriteDescription = document.createElement("p")
            const deleteButton = document.createElement("button")
            const cardDiv = document.createElement("div")
    
            favoriteDescription.innerText = activity.description
            deleteButton.innerText = "-"
            li.setAttribute("class", "cardLi")
    
            li.append(deleteButton, favoriteDescription)
            cardDiv.append(li)
            favoriteList.appendChild(cardDiv)

            const activityName = activity.name
            const activityAddedP = document.querySelector("#" + activityName)
            activityAddedP.remove()

            fetch("http://localhost:3000/activity_favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                   activity_id: activity.id,
                   favorite_id: 1
                })
            }).then(response => response.json())
            .then(activity_favorite => 
                deleteButton.addEventListener("click", function(event){
                    console.log(activity_favorite)
                    cardDiv.remove()
                    fetch(`http://localhost:3000/activity_favorites/${activity_favorite.id}`, {
                        method: "DELETE"
                })     
            }))
        })
    }

    function showFavorites(emotionInput){
        fetch("http://localhost:3000/activity_favorites/")
            .then(response => response.json())
            .then(activity_favorites => activity_favorites.map(activity_favorite => {
                if (activity_favorite.activity.emotion == emotionInput)
                    createFavoriteCard(activity_favorite)
            }))
    }

    function createFavoriteCard(activity_favorite){
        const li = document.createElement("li")
        const favoriteDescription = document.createElement("p")
        const deleteButton = document.createElement("button")
        const cardDiv = document.createElement("div")
        const AF = activity_favorite

        li.setAttribute("class", "cardLi")
        favoriteDescription.innerText = activity_favorite.activity.description
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
            activityDescription.innerText = AF.activity.description
            addButton.innerText = "+"
    
            li.append(addButton, activityDescription)
            activityList.appendChild(li)
            
            fetch(`http://localhost:3000/activity_favorites/${AF.id}`, {
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
    showActivitiesButton.innerText = `This looks like the letter ${label}`
    classifier.classify(gotResults)
  }
}




