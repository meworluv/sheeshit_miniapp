let angryScale = 0
class Button {
    cost;
    buttPos;
    butt = document.createElement('button')
    constructor (textButt, posButt, costAnsw = 0) {
        this.buttText = textButt
        this.cost = costAnsw
        this.buttPos = posButt
    }
    createButt () {
        const buttonPlace = document.getElementById(this.buttPos)
        buttonPlace.hidden = false
        buttonPlace.appendChild(this.butt)
        this.butt.textContent = this.buttText
    }
    buttonClick (nextText, answCost = this.cost) {this.butt.addEventListener('click', function() {
        changeText(nextText);
        if (angryScale === 0 && answCost < 0) {
            console.log(`Шкала злости: ${angryScale}`)
            return
        }
        else {
            angryScale = angryScale + answCost
            console.log(`Шкала злости: ${angryScale}`)
        }
    })}
    remove () {
        const buttonPlace = document.getElementById(this.buttPos)
        buttonPlace.removeChild(this.butt)
        buttonPlace.hidden = true
    }
}

const buttonLi1 = document.getElementById('li1')
const buttonLi2 = document.getElementById('li2')
const buttonLi3 = document.getElementById('li3')
let enemyText = document.getElementById('textEnemy')
const buttList = document.getElementById('buttonList')
const mainContainer = document.getElementById('mainContainer')

let typed = new Typed(enemyText, {
    strings: ['Здарова'],
    smartBackspace: false,
    typeSpeed: 30,
    showCursor: false,
    //loop = false
})


/*function changeEnemyText (newText) {
    typed.destroy()
    typed = new Typed(enemyText, {
    strings: newText,
    smartBackspace: false,
    typeSpeed: 30,
    showCursor: false
    })
}*/


/*function hideButtons () {
    buttonLi1.hidden = true
    buttonLi2.hidden = true
    buttonLi3.hidden = true
}

function showButtons () {
    buttonLi1.hidden = false
    buttonLi2.hidden = false
    buttonLi3.hidden = false
}

function isButtonsHide () {
    if (buttonLi1.hidden === true && buttonLi2.hidden === true && buttonLi3.hidden === true) {
        return true
    }
    else {
        return false
    }
}

function isButtonsShow () {
    if (buttonLi1.hidden === false && buttonLi2.hidden === false && buttonLi3.hidden === false) {
        return true
    }
    else {
        return false
    }
}*/

function changeText(text) {
    let typed = new Typed(enemyText, {
    strings: text,
    smartBackspace: false,
    typeSpeed: 30,
    showCursor: false,
    //loop = false
})
    }


   /*isTextClicked(true)
   console.log(isTextClicked())
   changeText('лох')*/

/*function isTextClicked (bool) {
    console.log(bool)
    if (bool === true) {
        return true
        console.log(bool)
    } 
    else {
        return false
    }
}*/

/*function changeText (text) {
    if (isTextClicked()) {
        enemyText.textContent = text
        //isTextClicked(false)
    }
    
}*/

/*function isAnimEnd () {
    return true
}
function skipText () {
    if (isAnimEnd === true) {
        enemyText.hidden = true
    }

}*/

/*function mainFunct () {
    hideButtons()
        .then(() => {
        return clickChangeText('саси');
        })
        .then(() => {
        return clickChangeText('не саси');
        })
        .then(() => {
        return showButtons();
        })
}*/

/*onStringTyped: (arrayPos, self) => {
    isAnimEnd()
}*/
const failButton = new Button('неправильна кнопка', 'li2', -1)
const correctButton = new Button('правильна кнопка', 'li1', 1)
const regularButton = new Button('средняя кнопка', 'li3')
//changeText('здароваЫ')
failButton.createButt()
failButton.buttonClick(['неправильно нажал'])
regularButton.createButt()
regularButton.buttonClick(['нажал'])
correctButton.buttonClick(['правильно нажал'])
correctButton.createButt()
/*regularButton.remove()
failButton.remove()
regularButton.remove()*/
