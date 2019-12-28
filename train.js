
let mobilenet;
let classifier;
let video;
let label = 'Please wait while the model loads';
let buttonOne;
let buttonTwo;
let buttonThree;
let buttonFour;
let buttonFive;
let buttonSix;
let buttonSeven;
let buttonEight;
let buttonNine;
let buttonTen;
let buttonShow;
let trainButton;
let saveButton;
let options = {numLabels: 11}


function modelReady() {
    label = 'Model is ready'
}

function videoReady() {
    label = 'Ready to Train'
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

    let buttonFiveCounter = 0
    buttonFive = createButton('5')
    buttonFive.mousePressed(function() {
        classifier.addImage('5')
        const five = document.querySelector("#buttonDiv button:nth-child(5)")
        buttonFiveCounter += 1
        five.innerText = `5: ${buttonFiveCounter}`
    })

    let buttonSixCounter = 0
    buttonSix = createButton('6')
    buttonSix.mousePressed(function() {
        classifier.addImage('6')
        const six = document.querySelector("#buttonDiv button:nth-child(6)")
        buttonSixCounter += 1
        six.innerText = `6: ${buttonSixCounter}`
    })

    let buttonSevenCounter = 0
    buttonSeven = createButton('7')
    buttonSeven.mousePressed(function() {
        classifier.addImage('7')
        const seven = document.querySelector("#buttonDiv button:nth-child(7)")
        buttonSevenCounter += 1
        seven.innerText = `7: ${buttonSevenCounter}`
    })

    let buttonEightCounter = 0
    buttonEight = createButton('8')
    buttonEight.mousePressed(function() {
        classifier.addImage('8')
        const eight = document.querySelector("#buttonDiv button:nth-child(8)")
        buttonEightCounter += 1
        eight.innerText = `8: ${buttonEightCounter}`
    })

    let buttonNineCounter = 0
    buttonNine = createButton('9')
    buttonNine.mousePressed(function() {
        classifier.addImage('9')
        const nine = document.querySelector("#buttonDiv button:nth-child(9)")
        buttonNineCounter += 1
        nine.innerText = `9: ${buttonNineCounter}`
    })

    let buttonTenCounter = 0
    buttonTen = createButton('10')
    buttonTen.mousePressed(function() {
        classifier.addImage('10')
        const ten = document.querySelector("#buttonDiv button:nth-child(10)")
        buttonTenCounter += 1
        ten.innerText = `10: ${buttonTenCounter}`
    })

    let buttonShowCounter = 0
    buttonShow = createButton('No number')
    buttonShow.mousePressed(function() {
        classifier.addImage('Show me a number')
        const show = document.querySelector("#buttonDiv button:nth-child(11)")
        buttonShowCounter += 1
        show.innerText = `No number: ${buttonShowCounter}`
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