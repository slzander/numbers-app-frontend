
let mobilenet;
let classifier;
let video;
let label = 'Please wait while the model loads';
let buttonOne;
let buttonTwo;
let buttonThree;
let buttonFour;
let trainButton;
let saveButton;
let options = {numLabels: 4}


function modelReady() {
    // console.log('Model is ready!!!')
}

function videoReady() {
    label = "Ready to Train"
}

function setup() {
    createCanvas(455, 375)
    video = createCapture(VIDEO)
    video.hide()
    background(0)

    const canvas = document.querySelector(".p5Canvas")
    const canvasDiv = document.querySelector("#canvasDivTrain")

    canvasDiv.append(canvas)

    mobilenet = ml5.featureExtractor('MobileNet', options, modelReady)
    classifier = mobilenet.classification(video, videoReady)

    let buttonOneCounter = 0
    buttonOne = createButton('1')
    buttonOne.mousePressed(function() {
        classifier.addImage('1')
        const one = document.querySelector("#buttonDiv button:nth-child(1)")
        buttonOneCounter += 1
        one.innerText = `1: ${buttonOneCounter}`
    })

    let buttonTwoCounter = 0
    buttonTwo = createButton('2')
    buttonTwo.mousePressed(function() {
        classifier.addImage('2')
        const two = document.querySelector("#buttonDiv button:nth-child(2)")
        buttonTwoCounter += 1
        two.innerText = `2: ${buttonTwoCounter}`
    })

    let buttonThreeCounter = 0
    buttonThree = createButton('3')
    buttonThree.mousePressed(function() {
        classifier.addImage('3')
        const three = document.querySelector("#buttonDiv button:nth-child(3)")
        buttonThreeCounter += 1
        three.innerText = `3: ${buttonThreeCounter}`
    })

    let buttonFourCounter = 0
    buttonFour = createButton('4')
    buttonFour.mousePressed(function() {
        classifier.addImage('4')
        const four = document.querySelector("#buttonDiv button:nth-child(4)")
        buttonFourCounter += 1
        four.innerText = `4: ${buttonFourCounter}`
    })

    trainButton = createButton('train')
    trainButton.mousePressed(function() {
        classifier.train(whileTraining)
    })

    saveButton = createButton('save')
    saveButton.mousePressed(function () {
        classifier.save()
    })

    const buttons = document.querySelectorAll("button")
    const buttonDiv = document.querySelector("#buttonDiv")

    buttonArray = Array.from(buttons)

    buttonArray.map(button => {
        buttonDiv.appendChild(button)
    })
}

function draw() {
    background(0)
    image(video, 5, 5, 444, 333)
    fill(255)
    textSize(16)
    text(label, 10, height - 10)
}

function whileTraining(loss) {
    if (loss == null) {
        classifier.classify(gotResults)
    } else {
        label = 'Training...'
    }
}

function gotResults(error, result) {
    if (error) {
        label = error
    } else {
        label = result[0].label
        classifier.classify(gotResults)
    }
}