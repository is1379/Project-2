class smileyFace {
  constructor(x, y, diameter, stroke, color, offset, angle) {
    this.x = x
    this.y = y
    this.diameter = diameter
    this.stroke = stroke
    this.color = color
    this.smileOffset = offset
    this.angle = angle
  }
  
  drawSmiley () {
    push()
    stroke(0)
    strokeWeight(this.stroke)
    fill(this.color[0], this.color[1], this.color[2])
    circle(this.x, this.y, this.diameter)
    fill(0)
    ellipse(this.x - this.diameter/7, this.y - this.diameter/7, this.diameter/14, this.diameter/6)
    ellipse(this.x + this.diameter/7, this.y - this.diameter/7, this.diameter/14, this.diameter/6)
    pop()
  }
  
  drawMouth () {
    stroke(0)
    noFill()
    strokeWeight(this.stroke * 1.2)
    arc(this.x, this.y + this.smileOffset, 0.6 * this.diameter, this.angle[2] * this.diameter, this.angle[0] * PI, this.angle[1] * PI);
  }
}

let sliderValue = 500
let oldSliderValue = 500
let newSliderValue = [500]

let mainSmiley
let submitSmiley
let userSmiley
let showUserSmiley = true
let min

function setup() {
  createCanvas(windowWidth, windowHeight);
  min = Math.min(windowWidth, windowHeight)
  $('#smile_input').width(width/2 + 25)
  
  mainSmiley = new smileyFace (width/2, height/2, min * 0.5, 3, [254,230,0], min/10, [0.01, 0.99, 0.01])
  
  submitSmiley = new smileyFace (width * 0.75 + 17, 30, 35, 1, [254,230,0], height/100, [0.01, 0.99, 0.01])
  
  userSmiley = new smileyFace (mouseX, mouseY, 30, 1, [254,230,0], height/100, [0.01, 0.99, 0.01] )
}

function draw() {
  clear()
  
  mainSmiley.drawSmiley()
  mainSmiley.drawMouth()
  
  submitSmiley.drawSmiley()
  submitSmiley.drawMouth()
  
  if (showUserSmiley) {
    userSmiley.drawSmiley()
    userSmiley.drawMouth()
  }
  
  submitMood(oldSliderValue)
  
  if (oldSliderValue < newSliderValue[0]) {
    oldSliderValue += 5
  } else if (oldSliderValue > newSliderValue[0]) {
    oldSliderValue -= 5
  } else {
    if (newSliderValue.length > 1) {
      newSliderValue.splice(0,1)
    } else {
      oldSliderValue = newSliderValue[0]
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  min = Math.min(windowWidth, windowHeight)
  $('#smile_input').width(width/2 + 25)
  
  mainSmiley = new smileyFace (width/2, height/2, min * 0.5, 3, [254,230,0], min/10, [0.01, 0.99, 0.01])
  
  submitSmiley = new smileyFace (width * 0.75 + 17, 30, 35, 1, [254,230,0], height/100, [0.01, 0.99, 0.01])
  
  userSmiley = new smileyFace (mouseX, mouseY, 30, 1, [254,230,0], height/100, [0.01, 0.99, 0.01] )
}

function mousePressed () {
  if (dist(mouseX, mouseY, submitSmiley.x, submitSmiley.y) <= 17.5) {
    if (newSliderValue.length > 1) {
      newSliderValue.push(sliderValue)
    } else {
      newSliderValue[0] = sliderValue
    }
  }
}

function submitMood (value) {
  let newValueMain = min/500*value/10
  let newValueUser = min/500*value/100
  mainSmiley.smileOffset = newValueMain
  userSmiley.smileOffset = newValueUser
  
  if (value < 500) {
    mainSmiley.angle[0] = map(value, 0, 500, 0.1, 0.01)
    mainSmiley.angle[1] = map(value, 0, 500, 0.9, 0.99)
    mainSmiley.angle[2] = map(value, 0, 500, 0.6, 0.01)
    
    userSmiley.angle[0] = map(value, 0, 500, 0.1, 0.01)
    userSmiley.angle[1] = map(value, 0, 500, 0.9, 0.99)
    userSmiley.angle[2] = map(value, 0, 500, 0.6, 0.01)
  } else if (value === 500) {
    mainSmiley.angle[0] = 0
    mainSmiley.angle[1] = 1
    mainSmiley.angle[2] = 0.01
    
    userSmiley.angle[0] = 0
    userSmiley.angle[1] = 1
    userSmiley.angle[2] = 0.01
  } else {
    mainSmiley.angle[0] = map(value, 500, 1000, 1.01, 1.1)
    mainSmiley.angle[1] = map(value, 500, 1000, -0.01, -0.1)
    mainSmiley.angle[2] = map(value, 500, 1000, 0.01, 0.6)
  
    userSmiley.angle[0] = map(value, 500, 1000, 1.01, 1.1)
    userSmiley.angle[1] = map(value, 500, 1000, -0.01, -0.1)
    userSmiley.angle[2] = map(value, 500, 1000, 0.01, 0.6)
  }  
}

function updateSubmitSmiley (value) {
  sliderValue = value
  let newValue = min/5000*value/10
  submitSmiley.smileOffset = newValue
  
  if (value < 500) {
    submitSmiley.angle[0] = map(value, 0, 500, 0.1, 0.01)
    submitSmiley.angle[1] = map(value, 0, 500, 0.9, 0.99)
    submitSmiley.angle[2] = map(value, 0, 500, 0.6, 0.01)
  } else if (value === 500) {
    submitSmiley.angle[0] = 0
    submitSmiley.angle[1] = 1
    submitSmiley.angle[2] = 0.01
  } else {
    submitSmiley.angle[0] = map(value, 500, 1000, 1.01, 1.1)
    submitSmiley.angle[1] = map(value, 500, 1000, -0.01, -0.1)
    submitSmiley.angle[2] = map(value, 500, 1000, 0.01, 0.6)
  }  
}

function hideUserSmiley () {
  console.log("HIDE")
  showUserSmiley = false
}

function mouseMoved () {
  userSmiley.x = mouseX
  userSmiley.y = mouseY
}