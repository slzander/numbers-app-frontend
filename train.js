
let mobilenet;
let classifier;
let video;
let label = 'Please wait while the model loads';
let buttonA;
let buttonB;
let buttonC;
let buttonD;
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

    let buttonACounter = 0
    buttonA = createButton('A')
    buttonA.mousePressed(function() {
        classifier.addImage('A')
        const a = document.querySelector("#buttonDiv button:nth-child(1)")
        buttonACounter += 1
        a.innerText = `A: ${buttonACounter}`
    })

    let buttonBCounter = 0
    buttonB = createButton('B')
    buttonB.mousePressed(function() {
        classifier.addImage('B')
        const b = document.querySelector("#buttonDiv button:nth-child(2)")
        buttonBCounter += 1
        b.innerText = `B: ${buttonBCounter}`
    })

    let buttonCCounter = 0
    buttonC = createButton('C')
    buttonC.mousePressed(function() {
        classifier.addImage('C')
        const c = document.querySelector("#buttonDiv button:nth-child(3)")
        buttonCCounter += 1
        c.innerText = `C: ${buttonCCounter}`
    })

    let buttonDCounter = 0
    buttonD = createButton('D')
    buttonD.mousePressed(function() {
        classifier.addImage('D')
        const d = document.querySelector("#buttonDiv button:nth-child(4)")
        buttonDCounter += 1
        d.innerText = `D: ${buttonDCounter}`
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