let success = false

class Button {
    cost;
    buttPos;
    buttText;
    butt = null; // Будем создавать при отрисовке или в конструкторе

    constructor(textButt, posButt, costAnsw = 0) {
        this.buttText = textButt;
        this.cost = costAnsw;
        this.buttPos = posButt;
    }

    createButt(textOnButt = this.buttText, positionButt = this.buttPos) {
        const buttonPlace = document.getElementById(positionButt);
        if (!buttonPlace) return console.error(`Элемент #${positionButt} не найден!`);

        // Если кнопка еще не создана — создаем её
        if (!this.butt) {
            this.butt = document.createElement('button');
        }

        buttonPlace.hidden = false;
        buttonPlace.appendChild(this.butt);
        this.butt.textContent = textOnButt;
    }

    buttonClick(nextText, answCost = this.cost) {
    return new Promise((resolve) => {
        this.butt.addEventListener('click', () => {
            changeText(nextText);

            // Прибавляем или отнимаем время/злость в зависимости от ответа
            // (answCost может быть как положительным +15, так и отрицательным -20)
            angryScale += answCost; 
            updateTimerUI(); // Сразу визуально обновляем полоску

            resolve('CLICKED');
        }, { once: true }); 
    });
}

    destroy() {
        if (this.butt) {
            this.butt.remove(); // Удаляем из HTML
            this.butt = null;   // Сбрасываем ссылку, чтобы при следующем createButt создалась чистая кнопка
        }
        
        // Опционально: скрываем контейнер, если он пуст
        const buttonPlace = document.getElementById(this.buttPos);
        if (buttonPlace && buttonPlace.children.length === 0) {
            buttonPlace.hidden = true;
        }
    }
}
// Настройки таймера
let angryScale = 100; // Начинаем со 100% времени
const MAX_TIME = 100;
let timerInterval = null;
let gameOverByTimer = false; // Флаг, чтобы понять, почему завершилась игра
let resolveCurrentQuestion = null; // Ссылка для принудительного сброса ожидания кнопки

const timerBar = document.getElementById('timer-bar');

// Функция обновления визуальной шкалы
function updateTimerUI() {
    if (timerBar) {
        // Ограничиваем шкалу от 0 до 100%
        angryScale = Math.max(0, Math.min(angryScale, MAX_TIME));
        timerBar.style.width = `${angryScale}%`;
    }
}

// Запуск тиканья таймера
function startTimer() {
    // Очищаем старый интервал, если он был
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        angryScale -= 5; // Сколько процентов отнимать каждую секунду (например, 5%)
        updateTimerUI();

        if (angryScale <= 0) {
            clearInterval(timerInterval);
            gameOverByTimer = true;
            
            // КРИТИЧЕСКИЙ МОМЕНТ: Если время вышло, мы принудительно "выталкиваем" 
            // код из ожидания нажатия кнопки
            if (resolveCurrentQuestion) {
                resolveCurrentQuestion('TIMEOUT'); 
            }
        }
    }, 1000); // Раз в секунду
}
const buttonLi1 = document.getElementById('li1')
const buttonLi2 = document.getElementById('li2')
const buttonLi3 = document.getElementById('li3')
let enemyText = document.getElementById('textEnemy')
const buttList = document.getElementById('buttonList')
const mainContainer = document.getElementById('mainContainer')
const quizQuestions = [
    {
        questionText: ["На одном стуле пики точёные, на другом хуи дроченые, куда сядешь, куда мать посадишь?"],
        // Описываем, какие кнопки должны создаться на этом шаге
        buttons: [
            { text: 'Постою', pos: 'li1', cost: 0, response: ['Ну пойдет'] },
            { text: 'Сам на хуи, а мать на пики', pos: 'li3', cost: -10, response: ['Ну ты и даун'] },
            { text: 'Возьму пики точеные срублю хуи дроченые', pos: 'li2', cost: 10, response: ['Красава'] }
        ]
    },
    {
        questionText: ["У тебя упало мыло в душе. Что будешь делать?"],
        buttons: [
            { text: 'Наклонюсь и подниму', pos: 'li2', cost: -5, response: ['Ты чо гей'] },
            { text: 'Ничего не буду делать', pos: 'li1', cost: 5, response: ['Харош, все верно'] }
        ]
    }
];

let typed = new Typed(enemyText, {
    strings: ['Вечер в хату'],
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

/*function changeText(text) {
    let typed = new Typed(enemyText, {
    strings: text,
    smartBackspace: false,
    typeSpeed: 30,
    showCursor: false,
})
    }*/
// 1. Объявляем переменную для хранения текущей анимации ВНЕ функции
let currentTypedInstance = null;

function changeText(text) {
    // 2. Если анимация уже идет (экземпляр существует), уничтожаем её
    if (currentTypedInstance) {
        currentTypedInstance.destroy();
    }

    // 3. Создаем новую анимацию и сохраняем ссылку на неё в нашу переменную
    currentTypedInstance = new Typed(enemyText, {
        strings: text,
        smartBackspace: false,
        typeSpeed: 30,
        showCursor: false,
    });
}

// Вспомогательная функция для ожидания клика по любой из созданных кнопок
function waitForAnswer(buttons) {
    return new Promise((resolve) => {
        buttons.forEach(btnObj => {
            // Навешиваем клик на кнопку
            btnObj.instance.buttonClick([btnObj.responseAfterClick]).then(() => {
                // Как только кликнули, возвращаем инфо о правильности
                resolve(btnObj.isCorrect);
            });
        });
    });
}

// Главная функция викторины
async function startQuiz() {
    gameOverByTimer = false;
    angryScale = 100;
    updateTimerUI();

    // Вводный шаг
    changeText(['Щас мы тебя проверим на знание понятий']);
    const introBtn = new Button('Ну валяй', 'li1', 0);
    introBtn.createButt();
    await introBtn.buttonClick(['Жми для начала игры!']);
    introBtn.destroy();

    // ВКЛЮЧАЕМ ТАЙМЕР только после того, как игра реально началась
    startTimer();

    for (const step of quizQuestions) {
        // Если за время паузы или прошлого шага таймер кончился — выходим из цикла
        if (gameOverByTimer) break;

        changeText(step.questionText);

        const activeButtons = step.buttons.map(btnData => {
            const btnInstance = new Button(btnData.text, btnData.pos, btnData.cost);
            btnInstance.createButt();
            return { instance: btnInstance, responseData: btnData.response };
        });

        // Ждем либо клика по кнопке, либо срабатывания таймера (TIMEOUT)
        const reason = await new Promise((resolve) => {
            // Сохраняем resolve в глобальную переменную, чтобы функция таймера могла его вызвать
            resolveCurrentQuestion = resolve;

            activeButtons.forEach(activeBtn => {
                activeBtn.instance.buttonClick(activeBtn.responseData).then(() => {
                    resolve('CLICKED');
                });
            });
        });

        // Подчищаем кнопки текущего вопроса
        activeButtons.forEach(activeBtn => activeBtn.instance.destroy());

        // Если причиной выхода стал таймер — мгновенно прекращаем квиз
        if (reason === 'TIMEOUT' || gameOverByTimer) {
            break; 
        }

        // Небольшая пауза между вопросами
        await new Promise(r => setTimeout(r, 2000));
    }

    // Очищаем интервал в конце игры, чтобы он не тикал вхолостую
    clearInterval(timerInterval);

    // Проверяем, как закончилась игра
    if (gameOverByTimer) {
        changeText(['Время вышло! Ты проиграл. шкала злости переполнилась/опустела.']);
    } else {
        changeText(['Поздравляем! Вы прошли викторину!']);
    }
}

// Запуск игры
startQuiz();

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