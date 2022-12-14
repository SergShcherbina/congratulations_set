const buttonMen = document.querySelector('.header__button-gender_men');
const buttonWomen = document.querySelector('.header__button-gender_women');
const cardText = document.querySelector('.card__text');
const cardImage = document.querySelector('.card__img');
const btnChangeText = document.querySelector('.header__button-change_text');
const btnChangeImg = document.querySelector('.header__button-change_img');
const body = document.body;

const state = {                                                            //с помощью обьекта отслеживаем класс в body 
    gender: body.classList.contains('women') ? 'women' : 'men'                   
}

const getRandomForArr = (arr) => {                                         //рандомные числа подставляем в индекс масива
    let randomNumber = Math.floor(Math.random() * arr.length);
    return arr[randomNumber];
};

const getData = () => {                                                    //получаем промис из базы данных
    return fetch('db.json').then(response => response.json());
};

const changeDOM = () => {
    if(state.photo.includes('black')){                                     //если в названии картинки есть слово black - меняем цвет текста
        cardText.style = 'color: #fff';
    } else {
        cardText.style = '';
    }

    cardImage.src = `img/${state.photo}`;                                  //в путь картинки прописываем через интерполяцию название картинки 
    cardText.innerHTML = state.text.replaceAll('/n', '<br/>');             //в полученом тексте все переносы /n меняем на <br/>   
};

const getDateToCard = () => {                                              //парсим промис и вызываемв рандом с аргументом из данных промиса
    getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);             //результат звписываем в обьект state
        state.photo = getRandomForArr(data.photo[state.gender]);
        changeDOM();
    });
}

getDateToCard();

const changeToMen = () => {
    if(state.gender !== 'men'){
        body.classList.add('men');
        body.classList.remove('women');
        state.gender = 'men'
        getDateToCard();
    }
};

const chengeToWomen = () => {
    if(state.gender !== 'women'){
        body.classList.add('women');
        body.classList.remove('men');
        state.gender = 'women'
        getDateToCard();
    }
};

const changeText = () =>{
    getData().then(data => {
        state.text = getRandomForArr(data.text[state.gender]);
        changeDOM();
    });
};

const changeImg = () =>{
    getData().then(data => {
        state.photo = getRandomForArr(data.photo[state.gender]);
            changeDOM();
    });
};

buttonMen.addEventListener('click', changeToMen);
buttonWomen.addEventListener('click', chengeToWomen);
btnChangeText.addEventListener('click', changeText);
btnChangeImg.addEventListener('click', changeImg);

//!скачивание картинки с текстом с помошью библиотеки canvas2html
const cardWrapper = document.querySelector('.card__wrapper');
const btnDowloand = document.querySelector('.card__button')

btnDowloand.addEventListener('click', () => {

    const newWindow = window.open(                                     //подготовили новое окно браузера для создаваемых img
        '',
        '', 
        `width=840, height=520,`
    );

    html2canvas(cardWrapper).then(canvas => {                          //получили картинку в виде промиса и обрабатываем
        canvas.style.maxWidth = "100%";
        canvas.style.height = 'auto';
        newWindow.document.body.prepend(canvas);                       //полученый из промиса img(canvas) помещаем в newWindow
    });
});
