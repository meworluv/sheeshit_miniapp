class Button {
    butt = document.createElement('button')
    constructor (textButt, costAnsw = 0) {
        this.buttText = textButt
        this.cost = costAnsw
    }
    createButt (posId) {
        const buttonPlace = document.getElementById(posId)
        buttonPlace.appendChild(this.butt)
        this.butt.textContent = this.buttText
    }
    buttonClick (nextText) {this.butt.addEventListener('click', function() {
        changeText(nextText);
        angryScale = angryScale + this.cost
        console.log(`Шкала злости: ${angryScale}`)
})}
}
function changeText(text) {
        enemyText.textContent = text
        return
    }
const buttonLi1 = document.getElementById('li1')
const buttonLi2 = document.getElementById('li2')
const buttonLi3 = document.getElementById('li3')
let angryScale = 0
let enemyText = document.getElementById('textEnemy')

const failButton = new Button('неправильна кнопка', -10)
const correctButton = new Button('правильна кнопка', 10)
const normalButton = new Button('средняя кнопка')
/*console.log(angryScale)
console.log(failButton.cost)*/
failButton.createButt('li2')
failButton.buttonClick('неправильно нажал')
correctButton.createButt('li1')
correctButton.buttonClick('правильно нажал')
normalButton.createButt('li3')
normalButton.buttonClick('нажал')